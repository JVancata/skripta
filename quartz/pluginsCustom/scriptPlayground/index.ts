import { Root as MdRoot, Code } from "mdast";
import { visit } from "unist-util-visit";
import { VFile } from "vfile";
import { PLAYGROUND_ELEMENT_TAG, SUPPORTED_LANGUAGES } from "./const";
import { QuartzEmitterPlugin, QuartzTransformerPlugin } from "../../plugins/types";

// @ts-ignore
import elementScript from "./element.inline"

const PLUGIN_NAME = "ScriptPlayground" as const;

const markdownPlaygroundElementFilter = (tree: MdRoot, file: VFile) => {
    visit(tree, "code", (node: Code) => {
        if (!SUPPORTED_LANGUAGES.some(lang => lang === node.lang)) {
            return;
        }

        node.data = {
            hName: PLAYGROUND_ELEMENT_TAG,
            hProperties: {
                language: node.lang,
                "data-clipboard": JSON.stringify(node.value),
            },
        }

        file.data.hasScriptPlayground = true;
    })
}


export const Transformer: QuartzTransformerPlugin = () => {
    return {
        name: PLUGIN_NAME,
        markdownPlugins(_ctx) {
            return [
                () => markdownPlaygroundElementFilter,
            ]
        },
    }
}

export const Emitter: QuartzEmitterPlugin = () => {
    return {
        name: PLUGIN_NAME,
        externalResources: () => {
            return {
                js: [
                    {
                        contentType: "inline",
                        script: elementScript,
                        loadTime: "beforeDOMReady",
                    }
                ]
            }
        },
        async emit() {
            return [];
        },
    }
}

declare module "vfile" {
    interface DataMap {
        hasScriptPlayground: boolean | undefined
    }
}
