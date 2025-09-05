/**
 * Partially stolen from @codemirror/theme-one-dark https://github.com/codemirror/theme-one-dark
 * npm package doesn't work with the retarded Quartz bundler
 */

import { EditorView } from "codemirror";

// Using https://github.com/one-dark/vscode-one-dark-theme/ as reference for the colors
const chalky = "#e5c07b", coral = "#e06c75", cyan = "#56b6c2", invalid = "#ffffff", ivory = "#abb2bf", stone = "#7d8799", // Brightened compared to original to increase contrast
    malibu = "#61afef", sage = "#98c379", whiskey = "#d19a66", violet = "#c678dd", darkBackground = "var(--dark)", highlightBackground = "var(--lightgray)", background = "var(--light)", tooltipBackground = "#353a42", selection = "#3e4451b4", cursor = "var(--gray)";

/**
The editor theme styles for One Dark.
*/
export const oneDarkTheme = EditorView.baseTheme({
    "&": {
        backgroundColor: background
    },
    ".cm-cursor, .cm-dropCursor": { borderLeftColor: cursor },
    ".cm-activeLine": { backgroundColor: "#6699ff02" },
    ".cm-gutters": {
        backgroundColor: background,
        color: stone,
        border: "none"
    },
    ".cm-activeLineGutter": {
        backgroundColor: highlightBackground
    },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: selection },
    ".cm-selectionMatch": {
        backgroundColor: "#aafe660e"
    },
    ".cm-foldPlaceholder": {
        backgroundColor: "transparent",
        border: "none",
        color: "#ddd"
    },
});
