<template>
    <div class="container" style="height: 100vh; background-color:pink">
        <home-header />
        <config-input-text-area class="w-100" rows="16" v-on:on-config-changed="onConfigChanged"/>
        <generate-button class="mt-2 mb-2"
                         v-bind:generate-config="generatorConfig"
                         v-on:on-generate-completed="onGenerateCompleted"/>
        <sql-output-text-area v-bind:output-sql="outputSql"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {GeneratorConfig} from "../../ts/generator/config/GeneratorConfig";
    import GenerateButton from "../parts/GenerateButton.vue";
    import ConfigInputTextArea from "../parts/ConfigInputTextArea.vue";
    import SqlOutputTextArea from "../parts/SqlOutputTextArea.vue";
    import HomeHeader from "../parts/HomeHeader.vue";

    @Component({
        components: {HomeHeader, SqlOutputTextArea, ConfigInputTextArea, GenerateButton}
    })
    export default class Home extends Vue {
        private generatorConfig: GeneratorConfig | null = null;
        private outputSql: string | null = null;

        private onConfigChanged(config: GeneratorConfig) {
            this.generatorConfig = config;
        }

        private onGenerateCompleted(sql: string) {
            this.outputSql = sql;
        }
    }
</script>
