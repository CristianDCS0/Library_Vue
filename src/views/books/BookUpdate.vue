<script setup lang="ts">
import { useBookStore } from '@/stores/book.ts'
import {formSchema } from '@/views/books/FormBook.ts'
import { useForm } from 'vee-validate'

//Shadcn
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog'
import { Pencil, Save } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'vue-sonner'
interface Props { bookId: string }

const props = defineProps<Props>();
const bookStore = useBookStore();

const form = useForm({
  validationSchema:formSchema,
});
const onClickUp = async () => {
  try{
    await bookStore.BookShow(props.bookId);
    form.resetForm({
      values: {
        title: bookStore.bookGetId.title,
        author: bookStore.bookGetId.author,
        editorial: bookStore.bookGetId.editorial,
        genre: bookStore.bookGetId.genre,
        description: bookStore.bookGetId.description,
        img_book: null,
        date_published: bookStore.bookGetId.date_published,
      },
    });
  }catch (e) {
    console.log('Error al mostrar el libro')
  }
};

const onUpdate = form.handleSubmit(async (values) => {
  try{
    await bookStore.BookUpdate(bookStore.bookGetId.id, values);
    toast("Book updated successfully", {
      description: `Book: ${values}`,
    });
  }catch (e) {
    console.error(e);
  }
});

</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button size="icon" @click="onClickUp">
        <Pencil/>
      </Button>
    </DialogTrigger>
    <DialogContent class="h-min w-min">
      <DialogHeader>
        <DialogTitle>Update book</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <Card class="h-min">
        <CardContent>
          <form @submit="onUpdate">
            <FormField v-slot="{ componentField }" name="title">
              <FormItem class="F_i">
                <FormLabel class="F_l">Title</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" class="F_in"/>
                </FormControl>
                <FormMessage class="F_m"/>
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="author">
              <FormItem class="F_i">
                <FormLabel class="F_l">Author</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" class="F_in"/>
                </FormControl>
                <FormMessage class="F_m"/>
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="editorial">
              <FormItem class="F_i">
                <FormLabel class="F_l">Editorial</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" class="F_in"/>
                </FormControl>
                <FormMessage class="F_m"/>
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="genre">
              <FormItem class="F_i">
                <FormLabel class="F_l">Genre</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" class="F_in"/>
                </FormControl>
                <FormMessage class="F_m"/>
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="description">
              <FormItem class="F_i">
                <FormLabel class="F_l">Description</FormLabel>
                <FormControl>
                  <Textarea v-bind="componentField" placeholder="Max 255 char" class="F_in"/>
                </FormControl>
                <FormMessage class="F_m"/>
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="img_book">
              <FormItem class="F_i">
                <FormLabel class="F_l">Image</FormLabel>
                <FormControl>
                  <input type="file" accept="image/*" v-bind="componentField" class="F_in h-10 rounded-md border border-input p-1.5 file:border-0 file:bg-transparent file:text-sm file:font-black dark:file:text-white" />
                </FormControl>
                <FormMessage class="F_m"/>
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="date_published">
              <FormItem class="F_i">
                <FormLabel class="F_l">Date published</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="YYYY-MM-DD"  v-bind="componentField" class="F_in"/>
                </FormControl>
                <FormMessage class="F_m"/>
              </FormItem>
            </FormField>
            <DialogClose as-child>
              <Button type="submit" variant="default" class="mt-5">
                <Save />
                Save book
              </Button>
            </DialogClose>
          </form>
        </CardContent>
      </Card>
    </DialogContent>
  </Dialog>
</template>

<style scoped>

</style>
