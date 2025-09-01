import { PLAYGROUND_ELEMENT_TAG } from "./const";
import { EditorView, basicSetup } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { keymap } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"

class ScriptPlaygroundElement extends HTMLElement {
    private editorView: EditorView | undefined;

    connectedCallback() {
        const clipboardData = this.attributes.getNamedItem("data-clipboard");
        if (!clipboardData) {
            console.error("Missing data-clipboard prop");
            return;
        }

        const shadow = this.attachShadow({ mode: 'open' });

        const container = document.createElement('div', {});

        shadow.appendChild(container);

        this.editorView = new EditorView({
            parent: container,
            doc: JSON.parse(clipboardData.value),
            extensions: [basicSetup, keymap.of([indentWithTab]), javascript()],
        });
    }
}

window.customElements.define(PLAYGROUND_ELEMENT_TAG, ScriptPlaygroundElement);
