<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts';
import { useRouter } from 'vue-router'
import {useAuthTest} from '@/stores/authTest.ts'

//shadcn
import {Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@/components/ui/sidebar"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu'
import SidebarHeader from '@/components/ui/sidebar/SidebarHeader.vue'
import SidebarFooter from '@/components/ui/sidebar/SidebarFooter.vue'

//Icon
import { Home, LogOut, LibraryBig, Settings } from "lucide-vue-next";
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Books",
    url: "/dashboard/booklist",
    icon: LibraryBig,
  },
]

const authStore = useAuthStore();
const authTest = useAuthTest();

const router = useRouter();
const userLogout = async() => {
  try{
    toast('Cerrando sesion', {
    });
    //await authStore.Logout();
    await authTest.Logout();
    router.push('/');
  }catch (e) {
    console.error("Error al cerrar sesión", e);
  }
};
</script>

<template>
  <Sidebar :variant="'floating'">
    <SidebarHeader>
      <div class="grid grid-cols-2 gap-4 justify-items-stretch">
        <div class="grid justify-items-center content-center">
          <h1>Biblioteca Sys</h1>
        </div>
        <div class="grid justify-self-end">
          <themeSwitch/>
        </div>
      </div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Main</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="i in items" :key="i.title">
              <SidebarMenuButton is-active>
                  <router-link :to="i.url" class="flex w-full">
                    <component :is="i.icon" class="mr-3 size-5" />
                    {{ i.title }}
                  </router-link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" class="m-2">
<!--            {{ authStore.user.name }}-->
            {{ authTest.userTest.authUserTest || 'Admin Prueba' }}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-auto">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem>
            <Button variant="ghost" @click="router.push('/dashboard/profile')" class="flex items-center">
              <Settings class="w-4 h-4 mr-2"/>
              Settings
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="ghost" @click="userLogout" class="flex items-center">
              <LogOut class="w-4 h-4 mr-2"/>
              <p>Logout</p>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarFooter>
  </Sidebar>
</template>
