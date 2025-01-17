<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/ui/sidebar/AppSidebar.vue"
import Separator  from "@/components/ui/separator/Separator.vue"
import {useAuthStore} from '@/stores/auth.ts'
import { useColorMode } from '@vueuse/core'
import { Skeleton } from '@/components/ui/skeleton'
const authStore = useAuthStore();
const mode = useColorMode()
</script>

<template>
  <div  v-if="authStore.user">
    <SidebarProvider>
      <AppSidebar />
      <div class="flex flex-col h-screen w-full ml-2 mr-2">
        <SidebarTrigger />
        <Separator />
        <RouterView />
      </div>
    </SidebarProvider>
  </div>
  <div v-else class="mode:auto h-screen grid justify-items-center content-center">
    <p class="text-[25px]">Inicia sesión</p>
    <div class="flex flex-col space-y-3">
      <Skeleton class="h-[125px] w-[250px] rounded-xl" />
      <div class="space-y-2">
        <Skeleton class="h-4 w-[250px]" />
        <Skeleton class="h-4 w-[200px]" />
      </div>
    </div>
  </div>
</template>
