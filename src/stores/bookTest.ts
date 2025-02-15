import {defineStore} from 'pinia'

export const useBookTest = defineStore('bookTest', {
  state:() =>({
    bookState: [],
    bookById: []
  }),
  getters: {
    bookGetter:(state) => state.bookState,
    bookGetId: (state) => state.bookById,
  },
  actions: {
    async BookListTest() {
      try {
        return this.bookState;
      } catch (e) {
        console.error(e.response?.data || e.message)
      }
    },
    async BookCreateTest(values: any){
      try{
        if (values.img_book instanceof File) {
          values.img_book = await this.convertFileToBase64(values.img_book);
        }
        this.bookState.push(values)
      }catch (e) {
        console.error(e.response?.data || e.message)
      }
    },
    async convertFileToBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    },
    async BookDeleteTest(title: string){
      try{
        this.bookState = this.bookState.filter((book) => book.title !== title);
      } catch(e) {
        console.error('Error deleting book:', e.response?.data || e.message);
      }
    },
    async BookUpdate(id:string, values:any){
      try{
        const index = this.bookState.findIndex((book) => book.id === id);
        if (index !== -1) {
          this.bookState[index] = response.data.book; // Actualizar estado
        }
      }catch (e) {
        console.error('Error updating book:', e.response?.data || e.message);
      }
    },
    async BookShow(title: string){
      try {
        this.bookById = this.bookState.find((book) => book.title === title);
      } catch (e) {
        console.error('Failed to fetch book details:', e.response?.data || e.message);
      }
    },
  },
  persist: {
    key: 'bookTest',
    paths: ['bookState'],
  }
})
