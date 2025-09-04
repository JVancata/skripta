import { EditorView, basicSetup } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { keymap } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"
import { ScriptSandbox } from "./sandbox";
import { RUNNER_HTML_PATH } from "./const";

class PlaygroundElement {
    private readonly sandbox: ScriptSandbox;
    private readonly log: PlaygroundLog;
    private readonly editor: EditorView;
    private readonly originalCode: string;

    constructor(element: Element) {
        this.originalCode = element.textContent;

        const container = document.createElement('div');
        container.classList.add('playground-container');

        const { container: header, runButton, resetButton } = createHeader();

        const editor = document.createElement('editor');

        this.log = new PlaygroundLog();

        container.append(
            header,
            editor,
            this.log.element,
        );

        this.editor = new EditorView({
            parent: editor,
            doc: this.originalCode,
            extensions: [
                basicSetup,
                keymap.of([indentWithTab]),
                javascript(),
                EditorView.updateListener.of((updateEvent) => {
                    const currentCode = updateEvent.state.doc.toString();
                    const isCodeUntouched = currentCode === this.originalCode;

                    resetButton.disabled = isCodeUntouched;
                })
            ],
        });

        this.sandbox = new ScriptSandbox({
            parent: container,
            iFrameSource: RUNNER_HTML_PATH,
            onLog: (e) => { this.log.appendLine(e.arguments.join(' ')) },
            onError: (e) => { this.log.appendLine(`${e.message}`) },
        });

        resetButton.addEventListener('click', () => {
            this.log.reset();
            this.resetEditor();
        });

        runButton.addEventListener('click', () => {
            this.log.reset();

            runButton.disabled = true;

            this.runScript()
                .finally(() => {
                    runButton.disabled = false;
                });
        });

        element.replaceChildren(container);
    }

    private resetEditor() {
        this.editor.dispatch({
            changes: {
                from: 0,
                to: this.editor.state.doc.length,
                insert: this.originalCode
            }
        });
    }

    private async runScript() {
        const script = this.editor.state.doc.toString();

        return this.sandbox.executeScript(script);
    }
}

class PlaygroundLog {
    public readonly element: HTMLDivElement;

    private readonly body: HTMLTableSectionElement;

    constructor() {
        const container = document.createElement('div');
        container.classList.add('playground-log-container', 'table-container');

        const table = document.createElement('table');
        container.append(table);

        const body = document.createElement('tbody');
        table.append(body);

        this.body = body;
        this.element = container;
    }

    appendLine(text: string) {
        const row = document.createElement('tr');

        const textCode = document.createElement('code');
        textCode.textContent = text;

        const textCell = document.createElement('td');
        textCell.append(textCode);

        row.append(textCell);

        this.body.append(row);
    }

    reset() {
        this.body.replaceChildren();
    }
}

const createHeader = () => {
    const container = document.createElement('div');
    container.classList.add('playground-header');

    const runButton = createButton();
    runButton.id = 'run-button';
    runButton.classList.add('success', 'play');
    runButton.textContent = 'Run';

    const resetButton = createButton();
    resetButton.id = 'reset-button';
    resetButton.classList.add('undo');
    resetButton.disabled = true;
    resetButton.textContent = 'Reset';

    container.append(runButton, resetButton);

    return {
        container,
        runButton,
        resetButton,
    };
};

const createButton = (): HTMLButtonElement => {
    const button = document.createElement('button');
    button.className = 'playground-button';

    return button;
}

const targetElements = document.querySelectorAll('pre code[class="language-javascript"]');

targetElements.forEach((element) => new PlaygroundElement(element));