<script setup lang="ts">
import LoginView from "@/views/session/LoginView.vue"
import RegisterView from '@/views/session/RegisterView.vue'
</script>

<template>
  <div class="grid grid-cols-2 h-screen w-screen">
    <div>
      <img class="object-cover h-full" src="https://www.jacobscomm.com/wp-content/uploads/2024/09/Hero-Image-background-20.png" alt=""/>
    </div>
    <div class="grid grid-flow-row">
      <div class="row-start-1">
        <div class="grid justify-end">
          <themeSwitch />
        </div>
        <div class="grid justify-items-center">
          <RegisterView/>
        </div>
      </div>
      <div class="row-start-2 grid justify-items-center content-center">
          <LoginView />
      </div>
      <div class="row-start-3 grid justify-items-end content-end p-5">
        <p>by Cristian Cobaxin. &copy; {{ new Date().getFullYear() }} </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
