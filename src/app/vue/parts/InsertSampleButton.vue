<template>
    <b-button variant="link" v-on:click="insert">サンプルを挿入</b-button>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {ApplicationStore} from "../../ts/store/ApplicationStoreModule";

    @Component({})
    export default class InsertSampleButton extends Vue {
        insert() {
            ApplicationStore.setConfigText(`
{
    "defaultCount": 30,
    "tables": [
        {
            "name": "employee_table",
            "count": 5,
            "columns": [
                {
                    "name": "id",
                    "autoIncrement": true
                },
                {
                    "name": "name",
                    "fakerOrder": "name.findName"
                },
                {
                    "name": "zip_code",
                    "fakerOrder": "address.zipCode"
                },
                {
                    "name": "address",
                    "fakerOrder": [
                        "address.state",
                        "address.city",
                        "address.streetAddress",
                        "address.secondaryAddress"
                    ]
                }
            ]
        },
        {
            "name": "employee_comments_table",
            "count": 100,
            "columns": [
                {
                    "name": "id",
                    "autoIncrement": true
                },
                {
                    "name": "main_id",
                    "foreignKey": {
                        "table": "employee_table",
                        "column": "id"
                    }
                },
                {
                    "name": "chooseSample",
                    "chooseFrom": ["おはよう！", "こんにちは！", "こんばんは！"]
                }
            ]
        }
    ]
}
            `.trim())
        }
    }
</script>

<style scoped>

</style>