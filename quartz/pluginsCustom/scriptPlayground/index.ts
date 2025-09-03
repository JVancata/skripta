import { Root as MdRoot, Code } from "mdast";
import { visit } from "unist-util-visit";
import { VFile } from "vfile";
import { RUNNER_HTML_FILENAME, RUNNER_HTML_PATH, SUPPORTED_LANGUAGES } from "./const";
import { QuartzEmitterPlugin, QuartzTransformerPlugin } from "../../plugins/types";
import { write } from "../../plugins/emitters/helpers";
import { isFullSlug } from "../../util/path";

// @ts-ignore
import sandboxRunnerScript from './sandbox/runner.inline';
// @ts-ignore
import elementScript from "./element.inline"

import style from "./styles/playground.scss"

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
        async emit(ctx) {
            if (!isFullSlug(RUNNER_HTML_FILENAME)) {
                throw new Error('Invalid RUNNER_HTML_FILENAME configured.');
            }

            const runnerHtml = `<script type="text/javascript">${sandboxRunnerScript}</script>`;

            return [
                await write({
                    ctx,
                    content: runnerHtml,
                    slug: RUNNER_HTML_FILENAME,
                    ext: ".html",
                })
            ];
        },
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
    }
}

declare module "vfile" {
    interface DataMap {
        hasScriptPlayground: boolean | undefined
    }
}
