<script setup lang="ts">
import { useBookStore } from '@/stores/book.ts'

//Shadcn
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye } from 'lucide-vue-next'

interface Props { bookId: string }
const props = defineProps<Props>();

const bookStore = useBookStore();

const onClickShow = async () => {
  try{
    await bookStore.BookShow(props.bookId);
  }catch (e) {
    console.log('Error al mostrar el libro')
  }
};
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="secondary" size="icon" @click="onClickShow">
        <Eye/>
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Titulo: {{bookStore.bookGetId.title}}</DialogTitle>
        <DialogDescription>Autor: {{bookStore.bookGetId.author}}</DialogDescription>
      </DialogHeader>
      <Card class="h-min">
        <CardHeader>
          <CardDescription>Género: {{bookStore.bookGetId.genre}}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <h2 class="font-bold">Descripción:</h2>
            <p class="text-justify text-sm mb-3">{{bookStore.bookGetId.description}}</p>
            <div class="grid justify-items-center">
              <img :src="`http://localhost:8000/storage/${bookStore.bookGetId.img_book}`" class="w-3/12" alt="img" v-if="bookStore.bookGetId.img_book"/>
              <p v-else>No image available</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>Fecha de publicación: {{bookStore.bookGetId.date_published}}</CardFooter>
      </Card>
    </DialogContent>
  </Dialog>
</template>

<style scoped>

</style>
