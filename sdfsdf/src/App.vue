<script setup>
import TestPage from "./pages/TestPage.vue";
import MainPage from "./pages/MainPage.vue";
</script>

<template>
  <div class="container">
<!--    <nav class="nav">-->
<!--      <router-link :to="{name: 'main'}">MAIN</router-link>-->
<!--      <router-link :to="{name: 'test'}">TEST</router-link>-->
<!--    </nav>-->

<!--    <router-view />-->
    <TestPage />
    <MainPage/>
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  gap: 30px;
}
</style>
