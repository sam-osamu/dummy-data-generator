<template>
    <b-form-textarea class="w-100" rows="16" v-model:value="configJson"></b-form-textarea>
</template>

<script lang="ts">
    import {Component, Emit, Vue, Watch} from "vue-property-decorator";
    import {GeneratorConfig} from "../../ts/generator/config/GeneratorConfig";

    @Component({})
    export default class ConfigInputTextArea extends Vue {
        private configJson: string = "";

        @Watch("configJson")
        private onConfigJsonChanged() {
            const config: GeneratorConfig = JSON.parse(this.configJson);
            this.emitConfigChanged(config);
        }

        @Emit("on-config-changed")
        private emitConfigChanged(config: GeneratorConfig) {

        }
    }
</script>

<style scoped>

</style>