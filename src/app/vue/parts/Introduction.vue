<template>
    <div v-html="text" />
</template>

<script lang="ts">
    //@ts-ignore
    import IntroductionMd from "../../md/Introduction.md";

    import {Component, Vue} from "vue-property-decorator";
    import {Markdown} from "../../ts/utils/Markdown";

    @Component
    export default class Introduction extends Vue {
        get text() {
            return Markdown.parse(IntroductionMd)
        }
    }
</script>
