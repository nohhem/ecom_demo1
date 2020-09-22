var Vue = require('vue/dist/vue.js')
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


Vue.component('pagination', require('../../views/components/pagination.vue'));

const app = new Vue({
    el: '#app'
})