<template>
    <b-button variant="link" v-on:click="copy">クリップボードにコピー</b-button>
</template>

<script lang="js">
    import Vue from "vue"
    import Toasted from 'vue-toasted';
    import VueClipboard from 'vue-clipboard2';
    import {ApplicationStore} from "../../ts/store/ApplicationStoreModule";

    Vue.use(Toasted);
    Vue.use(VueClipboard);

    const toastOptions = {
        duration: 3000,
        position: 'bottom-center',
    };

    new Vue({
        computed: {
            sql: () => ApplicationStore.getGeneratedSql
        },
        methods: {
            copy: () => {
                this.$copyText(this.sql()).then(() => {
                    this.$toasted.success("クリップボードにコピーしました", this.toastOptions);
                }, () => {
                    this.$toasted.error("クリップボードへのコピーに失敗しました", this.toastOptions);
                });
            }
        }
    })
</script>
