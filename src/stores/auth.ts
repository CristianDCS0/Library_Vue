import { defineStore } from 'pinia'
import { apiAuth } from '@/apiBackend.ts'

export const useAuthStore = defineStore("auth", {
  state:() =>({
    authUser: null,
    authToken: null,
  }),
  getters: {
    user: (state) => state.authUser,
  },
  actions:{
    async Register(values: any) {
      try {
        const response = await apiAuth.post('register', values);
        this.authUser = response.data.user;
        this.authToken = response.data.authorization.token;
      } catch (e) {
        console.error("Error al registrar usuario:", e.response?.data || e.message);
      }
    },
    async Login(values: any) {
      try {
        const response = await apiAuth.post('login', values);
        this.authUser = response.data.user;
        this.authToken = response.data.authorization.token;
      } catch (e) {
        console.error("Error al iniciar sesión:", e.response?.data || e.message);
      }
    },
    async RefreshToken(){
      try {
        if (!this.authToken) {
          throw new Error("No hay token disponible");
        }
        const response = await apiAuth.post('refresh', {}, {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        });
        this.authUser = response.data.user;
        this.authToken = response.data.authorization.token;
        console.log("Token refrescado exitosamente");
      } catch (e) {
        console.error("Error al refrescar token:", e.response?.data || e.message);
      }
    },
    async Logout(){
      try {
        if (!this.authToken) throw new Error("No hay token disponible");
        await apiAuth.post('logout', null, {
          headers: { Authorization: `Bearer ${this.authToken}` },
        });
        this.authUser = null;
        this.authToken = null;
      } catch (e) {
        console.error("Error al cerrar sesión:", e.response?.data || e.message);
      }
    },
    async getProfile() {
      try{
        if (!this.authUser) throw new Error('Inicie sesion')
        const response = await apiAuth.post('profile', null, {
          headers: { Authorization: `Bearer ${this.authToken}` }
        })
        this.authUser = response.data.user;
      }catch (e) {
        console.error("Error al obtener el perfil:", e.response?.data || e.message);
      }
    }
  },
  persist: {
    key: 'auth',
    paths: ['authUser', 'authToken'], // Propiedades a persistir
  },
})
