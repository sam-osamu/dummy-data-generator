<template>
    <div class="rounded">
        <home-header class="mb-4"/>
        <div class="container">
            <b-card class="mb-4">
                <introduction/>
            </b-card>
            <b-card class="mb-4">
                <b-card-header header-tag="h4">ダミーデータ生成設定値</b-card-header>
                <div class="d-flex justify-content-end">
                    <insert-sample-button/>
                </div>
                <config-input-text-area class="w-100"/>
                <generate-button class="mt-4"/>
            </b-card>
            <b-card class="mb-4">
                <b-card-header header-tag="h4">出来上がったダミーデータ</b-card-header>
                <div class="d-flex justify-content-end">
                    <copy-to-clipboard-button/>
                </div>
                <sql-output-text-area/>
            </b-card>

        </div>
    </div>
</template>


<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import GenerateButton from "../parts/GenerateButton.vue";
    import ConfigInputTextArea from "../parts/ConfigInputTextArea.vue";
    import SqlOutputTextArea from "../parts/SqlOutputTextArea.vue";
    import HomeHeader from "../parts/HomeHeader.vue";
    import InsertSampleButton from "../parts/InsertSampleButton.vue";
    import Introduction from "../parts/Introduction.vue";
    import CopyToClipboardButton from "../parts/CopyToClipboardButton.vue";

    @Component({
        components: {
            CopyToClipboardButton,
            Introduction, InsertSampleButton, HomeHeader, SqlOutputTextArea, ConfigInputTextArea, GenerateButton
        }
    })
    export default class Home extends Vue {

    }
</script>
