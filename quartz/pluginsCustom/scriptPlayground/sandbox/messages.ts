// Events
// --

export type ConsoleEventLevel = 'log' | 'info' | 'warn' | 'error';

export type SandboxConsoleEventMessage = {
    kind: 'console',
    level: ConsoleEventLevel,
    arguments: string[],
}

export type SandboxErrorEventMessage = {
    kind: 'error',
    message: string,
}

export type SandboxFinishedEventMessage = {
    kind: 'finished',
}

export type SandboxEventMessage = SandboxConsoleEventMessage | SandboxErrorEventMessage | SandboxFinishedEventMessage;

// Commands
// --

export type SandboxExecuteCommandMessage = {
    kind: 'execute',
    script: string,
}

export type SandboxCommandMessage = SandboxExecuteCommandMessage;

// Helpers
// --

export type SandboxMessage = SandboxEventMessage | SandboxCommandMessage

export function getSandboxMessageFromEvent(event: MessageEvent<any>): SandboxMessage | undefined {
    const { data } = event;
    if (!data.kind) return;

    // Not safe... but idc!
    return data;
}
