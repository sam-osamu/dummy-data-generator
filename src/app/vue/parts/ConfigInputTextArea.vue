<template>
    <b-form-textarea class="w-100 font-hack-gen font-size-code" rows="16" v-bind:value="text" @input="onTextAreaChanged"></b-form-textarea>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {ApplicationStore} from "../../ts/store/ApplicationStoreModule";

    @Component
    export default class ConfigInputTextArea extends Vue {
        get text() {
            return ApplicationStore.getConfigText;
        }

        onTextAreaChanged(event: any) {
            if (event.target instanceof HTMLInputElement) {
                const element = event.target;
                if (element.textContent !== null) {
                    ApplicationStore.setConfigText(element.textContent)
                }
            } else if (typeof event === "string") {
                ApplicationStore.setConfigText(event)
            }
        }
    }
</script>

<style scoped>

</style>