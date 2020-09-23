import Vue from 'vue';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import Home from '../vue/template/Home.vue';

const PRODUCTION =  process.env.NODE_ENV === "production";
Vue.config.devtools = !PRODUCTION;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Home({el: "#app"});
