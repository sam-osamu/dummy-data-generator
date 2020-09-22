import Vue from 'vue';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import Home from '../vue/template/Home.vue';

Vue.config.devtools = process.env.NODE_ENV !== "production";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Home({el: "#app"});
