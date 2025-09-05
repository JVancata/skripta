import { EditorView, basicSetup } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { keymap } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"
import { ScriptSandbox } from "./sandbox";
import { PLAYGROUND_ELEMENT_TAG, RUNNER_HTML_PATH } from "./const";
import { ConsoleEventLevel } from "./sandbox/messages";
import { oneDarkTheme as customTheme } from "./editorTheme";

const EDITOR_COLOR_MAP = new Map([
    ['rgb(0, 0, 255)', 'rgb(100, 100, 255)'], // variables
    ['rgb(0, 0, 204)', 'rgb(100, 100, 235)'], // field names
    ['rgb(119, 0, 136)', 'rgb(166, 72, 179)'], // flow-control
    ['rgb(34, 17, 153)', 'rgb(114, 102, 192)'], // bool literals
    ['rgb(17, 102, 68)', 'rgb(55, 145, 109)'], // num literals
    ['rgb(170, 17, 17)', 'rgb(214, 39, 39)'], // string literals
]);


class PlaygroundElement {
    private readonly sandbox: ScriptSandbox;
    private readonly log: PlaygroundLog;
    private readonly editorContainer: HTMLElement;
    private readonly editor: EditorView;
    private readonly originalCode: string;

    constructor(element: Element) {
        this.originalCode = element.textContent;

        const container = document.createElement('div');
        container.classList.add('playground-container');

        const { container: header, runButton, resetButton } = createHeader();

        this.editorContainer = document.createElement('editor');

        this.log = new PlaygroundLog();

        container.append(
            header,
            this.editorContainer,
            this.log.element,
        );

        this.editor = new EditorView({
            parent: this.editorContainer,
            doc: this.originalCode,
            extensions: [
                basicSetup,
                keymap.of([indentWithTab]),
                javascript(),
                customTheme,
                EditorView.updateListener.of((updateEvent) => {
                    this.unfuckEditorColors();

                    const currentCode = updateEvent.state.doc.toString();
                    const isCodeUntouched = currentCode === this.originalCode;

                    resetButton.disabled = isCodeUntouched;
                })
            ],
        });

        this.sandbox = new ScriptSandbox({
            parent: container,
            iFrameSource: RUNNER_HTML_PATH,
            onLog: (e) => { this.log.appendLine(e.level, e.arguments.join(' ')) },
            onError: (e) => { this.log.appendLine('error', `${e.message}`) },
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
                    this.log.appendFinish('Script finished');
                });
        });

        element.replaceChildren(container);
    }

    private unfuckEditorColors() {
        const spans = this.editorContainer.querySelectorAll('.cm-content span');

        spans.forEach(span => {
            if (!(span instanceof HTMLSpanElement)) return;

            const styles = window.getComputedStyle(span);

            const currentColor = styles.color;
            if (!currentColor) return;

            const colorFix = EDITOR_COLOR_MAP.get(currentColor);
            if (!colorFix) return;

            span.style.color = colorFix;
        });
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

    appendLine(level: ConsoleEventLevel, text: string) {
        const row = document.createElement('tr');

        const levelCell = document.createElement('td');
        levelCell.textContent = level.toUpperCase();
        levelCell.classList.add('log-level', level);

        const textCode = document.createElement('pre');
        textCode.textContent = text;

        const textCell = document.createElement('td');
        textCell.append(textCode);

        row.append(levelCell, textCell);

        this.body.append(row);
    }

    appendFinish(text: string) {
        const row = document.createElement('tr');

        const cell = document.createElement('td');
        cell.textContent = text;
        cell.classList.add('log-finish');
        cell.colSpan = 2;

        row.append(cell);

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

const targetElements = document.querySelectorAll(PLAYGROUND_ELEMENT_TAG);

targetElements.forEach((element) => new PlaygroundElement(element));