<template>
    <b-form-textarea class="w-100 font-hack-gen font-size-code" rows="8" v-bind:value="outputSql"></b-form-textarea>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {ApplicationStore} from "../../ts/store/ApplicationStoreModule";

    @Component
    export default class SqlOutputTextArea extends Vue {
        get outputSql(): string {
            return ApplicationStore.getGeneratedSql;
        }
    }
</script>

<style scoped>

</style>