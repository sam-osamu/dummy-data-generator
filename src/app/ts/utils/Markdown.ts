import marked from "marked";
import {SyntaxHighlight} from "./SyntaxHighlight";

export class Markdown {
    public static parse(markdownText: string): string {
        return marked(markdownText, {
            highlight: function (code, lang) {
                return SyntaxHighlight.highlight(code, [lang]);
            },
            breaks: true,
            gfm: true,
            sanitize: false,
            silent: false,
            langPrefix: "rounded p-3 hljs font-hack-gen language-"
        });
    }
}