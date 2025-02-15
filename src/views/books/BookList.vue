<script setup lang="ts">
import { useBookStore } from '@/stores/book';
import {useBookTest} from '@/stores/bookTest.ts'
import { onMounted } from 'vue'
import {toast} from 'vue-sonner'

//Component CRUD
import BookCreate from '@/views/books/BookCreate.vue'
import BookUpdate from '@/views/books/BookUpdate.vue'
import BookShow from '@/views/books/BookShow.vue'

//Shadcn
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-vue-next'

const bookStore = useBookStore();
const bookTest = useBookTest();

onMounted(async () => {
  //await bookStore.BookList();
  await bookTest.BookListTest();
});

const onDelete = (title: string) => {
  toast(`Are you sure?`, {
    description: `DELETE: ${title}`,
    action:{
      label: 'Delete',
      onClick: async () => await bookTest.BookDeleteTest(title)
    }
  });
}
</script>

<template>
  <ScrollArea class="m-3 p-3">
    <div v-if="bookStore.bookGetter || bookTest.bookGetter">
      <BookCreate />
      <Separator class="my-5"/>
      <div class="grid grid-cols-3 gap-3 min-w-min sm:grid-cols-4 sm:mr-2">
        <Card v-for="b in bookTest.bookGetter" :key="b.id" class="mt-2 sm:p-0 sm:min-w-min">
          <CardHeader>
            <CardTitle class="text-sm h-12 sm:h-10">
              {{ b.title }}
            </CardTitle>
            <CardDescription>
              <p class="text-sm h-10">{{ b.author }} </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
<!--            <img :src="`http://localhost:8000/storage/${b.img_book}`" class="h-24 w-40" alt="img" v-if="b.img_book"/>-->
            <img :src="b.img_book" class="h-24 w-40" alt="img" v-if="b.img_book"/>
            <p v-else>No image available</p>
          </CardContent>
          <CardFooter class="grid grid-flow-col justify-items-center">
            <BookShow :book-id=b.id />
            <BookUpdate :book-id=b.id />
            <Button variant="destructive" size="icon" @click="onDelete(b.title)">
              <Trash2/>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
    <div v-else>
      <p>No hay libros disponibles.</p>
    </div>
  </ScrollArea>
</template>
