<template>
    <b-button variant="link" v-on:click="copy">クリップボードにコピー</b-button>
</template>

<script lang="ts">
    import Vue from "vue"
    import Toasted, {ToastOptions} from 'vue-toasted';
    import copy from "clipboard-copy";
    import {ApplicationStore} from "../../ts/store/ApplicationStoreModule";

    Vue.use(Toasted);

    export default class CopyToClipboardButton extends Vue {
        copy() {
            copy(ApplicationStore.getGeneratedSql);

            const toastOptions: ToastOptions = {
                duration: 3000,
                position: 'bottom-center',
            };

            Vue.toasted.success("クリップボードにコピーしました", toastOptions);
        }
    }

    // const toastOptions = {
    //     duration: 3000,
    //     position: 'bottom-center',
    // };
    //
    // export default new Vue({
    //     computed: {
    //         sql: () => ApplicationStore.getGeneratedSql
    //     },
    //     methods: {
    //         copy: () => {
    //             this.$copyText(this.sql()).then(() => {
    //                 this.$toasted.success("クリップボードにコピーしました", this.toastOptions);
    //             }, () => {
    //                 this.$toasted.error("クリップボードへのコピーに失敗しました", this.toastOptions);
    //             });
    //         }
    //     }
    // })
</script>
