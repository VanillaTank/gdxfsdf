import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import './style.css'
import App from './App.vue'
import MainPage from "./pages/MainPage.vue";
import TestPage from "./pages/TestPage.vue";
import {store} from "./store/index.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage,
    },
    {
      path: '/',
      name: 'test',
      component: TestPage,
    },
  ]
})

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
