<template>
    <b-form-textarea class="w-100" rows="8" v-bind:value="outputSql"></b-form-textarea>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({})
    export default class SqlOutputTextArea extends Vue {
        @Prop({default: "", required: true})
        private outputSql!: string;
    }
</script>

<style scoped>

</style>