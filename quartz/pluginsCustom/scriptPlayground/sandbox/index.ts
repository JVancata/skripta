import {
    getSandboxMessageFromEvent,
    SandboxConsoleEventMessage,
    SandboxErrorEventMessage,
    SandboxExecuteCommandMessage
} from "./messages";

export class ScriptSandbox {
    public readonly iFrame: HTMLIFrameElement;

    private pendingExecute: Promise<void> | undefined;

    constructor({
        parent,
        iFrameSource,
        onLog,
        onError,
    }: ScriptSandboxConfig) {
        const iFrame = document.createElement('iframe');
        iFrame.classList.add('script-sandbox-iframe')
        iFrame.src = iFrameSource;

        parent.appendChild(iFrame);
        this.iFrame = iFrame;

        window.addEventListener('message', (event) => {
            if (!this.isEventOwned(event)) {
                return;
            }

            const message = getSandboxMessageFromEvent(event);
            if (!message) {
                return;
            }

            switch (message.kind) {
                case 'console':
                    onLog?.(message);
                    break;
                case 'error':
                    onError?.(message);
            }
        });
    }

    async executeScript(script: string): Promise<void> {
        await this.pendingExecute;

        this.iFrame.contentWindow?.location.reload();

        const executePromise = new Promise<void>((res) => {
            const abortController = new AbortController();

            window.addEventListener('message', (e) => {
                if (!this.isEventOwned(e)) {
                    return;
                }

                const message = getSandboxMessageFromEvent(e);
                if (!message) {
                    return;
                }

                if (message.kind !== 'finished') {
                    return;
                }

                abortController.abort();
                res();
            }, {
                signal: abortController.signal,
            });

            this.iFrame.contentWindow?.postMessage({
                kind: 'execute',
                script,
            } satisfies SandboxExecuteCommandMessage);
        });

        this.pendingExecute = executePromise;
        return executePromise;
    }

    private isEventOwned(event: MessageEvent<any>): boolean {
        return event.source === this.iFrame.contentWindow;
    }
}

type ScriptSandboxConfig = {
    parent: Element,
    iFrameSource: string,
    onLog?: (e: SandboxConsoleEventMessage) => void;
    onError?: (e: SandboxErrorEventMessage) => void;
}
