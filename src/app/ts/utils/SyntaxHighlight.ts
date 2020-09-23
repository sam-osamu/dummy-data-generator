//@ts-ignore
import highlight from "highlight.js/lib/core"

//@ts-ignore
import json from "highlight.js/lib/languages/json.js"

highlight.registerLanguage("json", json);

export class SyntaxHighlight {
    public static highlight(value: string, languageSubset?: string[]): string {
        return highlight.highlightAuto(value, languageSubset).value
    }
}