<template>
    <b-button block variant="primary" v-on:click="generate">作る！</b-button>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue} from "vue-property-decorator";
    import {GeneratorConfig} from "../../ts/generator/config/GeneratorConfig";
    import {SQLGenerator} from "../../ts/generator/SQLGenerator";

    @Component({})
    export default class GenerateButton extends Vue {
        @Prop({default: null, required: true})
        private generateConfig!: GeneratorConfig;

        @Emit("on-generate-completed")
        private emitOnGenerateCompleted(result: string) {}

        private generate() {
            const gen = new SQLGenerator(this.generateConfig);
            this.emitOnGenerateCompleted(gen.generate());
        }
    }
</script>

<style scoped>

</style>