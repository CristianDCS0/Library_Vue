import {defineStore} from 'pinia'
import {apiBook} from '@/apiBackend.ts'
import {useAuthStore} from '@/stores/auth.ts'

const authStore = useAuthStore();

export const useBookStore = defineStore('book', {
  state:() =>({
    bookState: [],
    bookById: []
  }),
  getters: {
    bookGetter:(state) => state.bookState,
    bookGetId: (state) => state.bookById,
  },
  actions: {
    async BookList() {
      try {
        const response = await apiBook.get('book', {
          headers: {
            'Authorization': `Bearer ${authStore.authToken}`,
            'Content-Type': 'multipart/form-data',
          }
        })
        this.bookState = response.data.books;
      } catch (e) {
        console.error(e.response?.data || e.message)
      }
    },
    async BookCreate(values: any){
      try{
        const response = await apiBook.post('book', values, {
          headers: {
            'Authorization': `Bearer ${authStore.authToken}`,
          }
        });
        this.bookState.push(response.data.book)
      }catch (e) {
        console.error(e.response?.data || e.message)
      }
    },
    async BookDelete(id: string){
      try{
        await apiBook.delete(`book/${id}`,{
          headers: { 'Authorization': `Bearer ${authStore.authToken}`, }
        });
        this.bookState = this.bookState.filter((book) => book.id !== id);
      } catch(e) {
        console.error('Error deleting book:', e.response?.data || e.message);
      }
    },
    async BookUpdate(id:string, values:any){
      try{
        const response = await apiBook.post(`book/${id}`, values, {
          headers: {
            'Authorization': `Bearer ${authStore.authToken}`,
          }
        });
        const index = this.bookState.findIndex((book) => book.id === id);
        if (index !== -1) {
          this.bookState[index] = response.data.book; // Actualizar estado
        }
      }catch (e) {
        console.error('Error updating book:', e.response?.data || e.message);
      }
    },
    async BookShow(id: string){
      try {
        const response = await apiBook.get(`book/${id}`, {
          headers: { Authorization: `Bearer ${authStore.authToken}` },
        });
        this.bookById = response.data.book;
      } catch (e) {
        console.error('Failed to fetch book details:', e.response?.data || e.message);
      }
    },
  },
  persist: {
    key: 'book',
    paths: ['bookState'],
  }
})
