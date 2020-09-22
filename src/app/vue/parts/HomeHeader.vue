<template>
    <header class="w-100 pt-2 pb-2 header-style">
        <div class="container">
            <h1 class="font-hack-gen">Fake SQL Generator</h1>
        </div>
    </header>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({})
    export default class HomeHeader extends Vue {

    }
</script>

<style scoped>
    .header-style {
        background: #666;
        color: #dfdfdf;
    }
</style>