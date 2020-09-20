// import Vue from 'vue'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import Home from '../vue/template/Home.vue';
//
// // Install BootstrapVue
// Vue.use(BootstrapVue);
// // Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin);
//
// new Home({el: "#app"});
console.log("test");
var SQLGenerator_1 = require("./generator/SQLGenerator");
var config = {
    defaultCount: 30,
    tables: [
        {
            name: "t_ochinchin_info",
            count: 5,
            columns: [
                {
                    name: "id",
                    autoIncrement: true
                },
                {
                    name: "name",
                    fakerOrder: "name.findName"
                },
                {
                    name: "zip_code",
                    fakerOrder: "address.zipCode"
                },
                {
                    name: "address",
                    fakerOrder: ["address.state", "address.city", "address.streetAddress", "address.secondaryAddress"]
                },
                {
                    name: "telephone",
                    fakerOrder: "phone.phoneNumber"
                },
                {
                    name: "email",
                    fakerOrder: "internet.email"
                },
                {
                    name: "remarks",
                    fakerOrder: "lorem.text"
                }
            ]
        },
        {
            name: "t_ochinchin_sub_info",
            count: 10,
            columns: [
                {
                    name: "id",
                    autoIncrement: true
                },
                {
                    name: "main_id",
                    foreignKey: {
                        table: "t_ochinchin_info",
                        column: "id"
                    }
                },
                {
                    name: "remarks",
                    fakerOrder: "lorem.text"
                }
            ]
        },
    ]
};
var gen = new SQLGenerator_1.SQLGenerator(config);
console.log(gen.generate());
