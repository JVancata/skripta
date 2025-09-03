import { Root as MdRoot, Code } from "mdast";
import { visit } from "unist-util-visit";
import { VFile } from "vfile";
import { SUPPORTED_LANGUAGES } from "./const";
import { QuartzEmitterPlugin, QuartzTransformerPlugin } from "../../plugins/types";
import style from "./styles/playground.scss"

// @ts-ignore
import elementScript from "./element.inline"

const PLUGIN_NAME = "ScriptPlayground" as const;

const markdownPlaygroundElementFilter = (tree: MdRoot, file: VFile) => {
    visit(tree, "code", (node: Code) => {
        if (!SUPPORTED_LANGUAGES.some(lang => lang === node.lang)) {
            return;
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
                        loadTime: "afterDOMReady",
                    }
                ],
                css: [
                    {
                        content: style,
                        inline: true,
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
