import {
    getSandboxMessageFromEvent,
    SandboxConsoleEventMessage,
    SandboxErrorEventMessage,
    SandboxExecuteCommandMessage,
    SandboxFinishedEventMessage
} from "./messages";

type ConsoleLogFn = (...args: any[]) => void;

function hookConsole() {
    const createPostConsoleMessageFn = (originalFn: ConsoleLogFn, level: SandboxConsoleEventMessage['level']): ConsoleLogFn => {
        return (...args: unknown[]) => {
            originalFn(...args);

            const stringArgs = stringifyValues(args);

            window.parent.postMessage({
                kind: 'console',
                level,
                arguments: stringArgs,
            } satisfies SandboxConsoleEventMessage);
        }
    }

    console.log = createPostConsoleMessageFn(console.log, 'log');
    console.info = createPostConsoleMessageFn(console.info, 'info');
    console.warn = createPostConsoleMessageFn(console.warn, 'warn');
    console.error = createPostConsoleMessageFn(console.error, 'error');
}

function stringifyValues(args: unknown[]) {
    return args.map(arg => {
        if (typeof arg === 'object') {
            return JSON.stringify(arg, undefined, 2);
        }

        return String(arg);
    });
}

function evalScript(script: string) {
    try {
        eval?.(script);
    } catch (e: unknown) {
        const message = errorToMessage(e);

        window.parent.postMessage(message);
    }
}

function errorToMessage(error: unknown): SandboxErrorEventMessage {
    if (error instanceof Error) {
        return {
            kind: 'error',
            message: error.message,
            stack: error.stack,
        }
    }

    return {
        kind: 'error',
        message: String(error),
        stack: undefined,
    }
}

function handleExecuteCommand(command: SandboxExecuteCommandMessage) {
    evalScript(command.script);

    window.parent.postMessage({
        kind: 'finished',
    } satisfies SandboxFinishedEventMessage);
}

function startRunner() {
    hookConsole();

    window.addEventListener('message', (messageEvent) => {
        const message = getSandboxMessageFromEvent(messageEvent);
        if (!message) return;

        if (message.kind === 'execute') {
            handleExecuteCommand(message);
        }
    });
}

startRunner();