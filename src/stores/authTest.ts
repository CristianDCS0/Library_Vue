import { defineStore } from 'pinia'
export const useAuthTest = defineStore("authTest", {
  state:() =>({
    authUserTest: null as string | null,
    authEmailTest: null as string | null,
    authPasswordTest: null as string | null,
  }),
  getters: {
    userTest: (state: any) => ({
      authUserTest: state.authUserTest,
      authEmailTest: state.authEmailTest,
      authPasswordTest: state.authPasswordTest,
    }),
  },
  actions:{
    async RegisterTest(values: any) {
      try {
        this.authUserTest = values.name;
        this.authEmailTest = values.email;
        this.authPasswordTest = values.password;
      } catch (e) {
        console.error("Error al registrar usuario:", e.response?.data || e.message);
      }
    },
    async LoginTest(values: any) {
      try {
        this.authEmailTest = values.email;
        this.authPasswordTest = values.password;
      } catch (e) {
        console.error("Error al iniciar sesión:", e.response?.data || e.message);
      }
    },
    async Logout(){
      try {
        this.authUserTest = null;
        this.authEmailTest = null;
        this.authPasswordTest = null;
      } catch (e) {
        console.error("Error al cerrar sesión:", e.response?.data || e.message);
      }
    },
    async getProfile() {
      try{
        if (!this.userTest){
          this.authUserTest = "Admin Prueba";
          this.authEmailTest = "admin_prueba@email.com";
          this.authPasswordTest = "admin123";
        }
        return {
          authUserTest: this.authUserTest,
          authEmailTest: this.authEmailTest,
          authPasswordTest: this.authPasswordTest,
        };
      }catch (e) {
        console.error("Error al obtener el perfil:", e.response?.data || e.message);
      }
    }
  },
  persist: {
    key: 'authTest',
    paths: ['authUserTest', 'authEmailTest', 'authPasswordTest'], // Propiedades a persistir
  },
})
