<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts';
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const authStore = useAuthStore();

const router = useRouter();
const userRefreshToken = async () => {
  await authStore.RefreshToken();
};
</script>

<template>
    <div v-if="authStore.authUser">
      <h1>Perfil del Usuario</h1>
      <p><strong>Nombre:</strong> {{ authStore.authUser.name }}</p>
        <Button @click="userRefreshToken">Actualizar token</Button>
    </div>
    <div v-else>
      <div>
        <p>Debes iniciar sesión o registrarte para ver tu información personal.</p>
        <Button @click="router.push('/')">Inicio</Button>
      </div>
    </div>
</template>
