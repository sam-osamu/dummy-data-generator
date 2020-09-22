<template>
    <b-button block variant="dark" class="pt-2 pb-2" v-on:click="generate">Generate!</b-button>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {ApplicationStore} from "../../ts/store/ApplicationStoreModule";

    @Component({})
    export default class GenerateButton extends Vue {
        generate() {
            ApplicationStore.generate()
        }
    }
</script>

<style scoped>

</style>