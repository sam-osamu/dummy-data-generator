<template>
    <div>
        <home-header class="mb-4"/>
        <div class="container">
            <b-card>
                <div v-html="sampleMdHtml"/>
                <div class="d-flex justify-content-end">
                    <insert-sample-button/>
                </div>
                <config-input-text-area class="w-100"/>
            </b-card>
            <generate-button class="mt-4 mb24"/>
            <sql-output-text-area/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import GenerateButton from "../parts/GenerateButton.vue";
    import ConfigInputTextArea from "../parts/ConfigInputTextArea.vue";
    import SqlOutputTextArea from "../parts/SqlOutputTextArea.vue";
    import HomeHeader from "../parts/HomeHeader.vue";
    import InsertSampleButton from "../parts/InsertSampleButton.vue";
    import sampleMd from "../../md/sample.md"
    import {highlightAuto} from "highlight.js";
    import marked from "marked";

    @Component({
        components: {InsertSampleButton, HomeHeader, SqlOutputTextArea, ConfigInputTextArea, GenerateButton}
    })
    export default class Home extends Vue {
        mounted() {
            marked.setOptions({
                highlight: function (code, lang) {
                    return highlightAuto(code, [lang]).value;
                },
                pedantic: false,
                gfm: true,
                breaks: true,
                sanitize: true,
                silent: false
            });
        }

        get sampleMdHtml(): string {
            return marked(sampleMd.source)
        }
    }
</script>
