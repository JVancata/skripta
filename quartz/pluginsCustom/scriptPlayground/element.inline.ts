import { EditorView, basicSetup } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { keymap } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"

class PlaygroundElement {
    private readonly editor: EditorView;
    private readonly originalCode: string;

    constructor(element: Element) {
        this.originalCode = element.textContent;

        const container = createDiv('container');
        const { container: header, runButton, resetButton } = createHeader();
        const editor = createDiv('editor');

        container.append(
            header,
            editor
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

        resetButton.addEventListener('click', () => this.resetEditor());

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
}

const createHeader = () => {
    const container = createDiv('playground-header');

    const runButton = createButton();
    runButton.id = 'run-button';
    runButton.classList.add('success');
    runButton.textContent = '▶️ Run';

    const resetButton = createButton();
    resetButton.id = 'reset-button';
    resetButton.disabled = true;
    resetButton.textContent = '🔁 Reset';

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

const createDiv = (id: string): HTMLDivElement => {
    const div = document.createElement('div');
    div.id = id;

    return div;
};

const targetElements = document.querySelectorAll('pre code[class="language-javascript"]');

targetElements.forEach((element) => new PlaygroundElement(element));