import { Root as MdRoot, Code } from "mdast";
import { visit } from "unist-util-visit";
import { VFile } from "vfile";
import { PLAYGROUND_ELEMENT_TAG, REQUIRED_META_PARAM, RUNNER_HTML_FILENAME, SUPPORTED_LANGUAGES } from "./const";
import { QuartzEmitterPlugin, QuartzTransformerPlugin } from "../../plugins/types";
import { write } from "../../plugins/emitters/helpers";
import { isFullSlug } from "../../util/path";

// @ts-ignore
import sandboxRunnerScript from './sandbox/runner.inline';
// @ts-ignore
import elementScript from "./element.inline"

import style from "./styles/playground.scss"

const PLUGIN_NAME = "ScriptPlayground" as const;

const CSS_FILE_NAME = 'script-playground' as const;

const markdownPlaygroundElementFilter = (tree: MdRoot, file: VFile) => {
    visit(tree, "code", (node: Code) => {
        if (!SUPPORTED_LANGUAGES.some(lang => lang === node.lang)) {
            return;
        }

        if (node.meta !== REQUIRED_META_PARAM) {
            return;
        }

        file.data.hasScriptPlayground = true;
        node.data = {
            hName: PLAYGROUND_ELEMENT_TAG,
        }
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

            if (!isFullSlug(CSS_FILE_NAME)) {
                throw new Error('Invalid CSS_FILE_NAME configured.');
            }

            const runnerHtml = `<script type="text/javascript">${sandboxRunnerScript}</script>`;

            return [
                await write({
                    ctx,
                    content: runnerHtml,
                    slug: RUNNER_HTML_FILENAME,
                    ext: ".html",
                }),
                await write({
                    ctx,
                    content: style,
                    slug: CSS_FILE_NAME,
                    ext: ".css",
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
                    // Inline CSS doesn't work for some reason
                    {
                        content: `/${CSS_FILE_NAME}.css`,
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
