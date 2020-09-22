import marked from "marked";

import {highlightAuto} from "highlight.js";

export class Markdown {
    public static parse(markdownText: string): string {
        return marked(markdownText, {
            highlight: function (code, lang) {
                return highlightAuto(code, [lang]).value;
            },
            breaks: true,
            gfm: true,
            sanitize: false,
            silent: false,
            langPrefix: "rounded p-3 hljs font-hack-gen language-"
        });
    }
}