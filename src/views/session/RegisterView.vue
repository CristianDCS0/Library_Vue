<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form'
import {useAuthStore} from "@/stores/auth.ts"
import {useRouter} from 'vue-router'
import {format} from 'date-fns';
import {es} from 'date-fns/locale';

//shadcn
import { Button } from '@/components/ui/button'
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog'
import {Save} from "lucide-vue-next"
import { Card, CardContent} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {toast} from 'vue-sonner'

const router = useRouter();
const d = format(new Date(), 'PPPPp', {locale:es});

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(50),
}));

const form = useForm({ validationSchema: formSchema });

const authStore = useAuthStore();
const onSubmit = form.handleSubmit(async (values) => {
  try {
    await authStore.Register(values);
    toast(`Registro exitoso: ${d}`, {
      description: `Bienvenido: ${values.name}`,
    });
    router.push('/dashboard');
  } catch (error) {
    console.error(error);
  }
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="default">
        <Save/>
        Sign up
      </Button>
    </DialogTrigger>
    <DialogContent class="h-min w-min">
      <DialogHeader>
        <DialogTitle>Registrate</DialogTitle>
        <DialogDescription>Crea una nueva cuenta</DialogDescription>
      </DialogHeader>
      <Card class="h-min">
        <CardContent>
          <form @submit="onSubmit">
            <FormField v-slot="{componentField}" name="name">
              <FormItem class="F_i">
                <FormLabel class="F_l">Name user</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" class="F_in"/>
                </FormControl>
                <FormMessage class="F_m"/>
              </FormItem>
            </FormField>

            <FormField v-slot="{componentField}" name="email">
              <FormItem class="F_i">
                <FormLabel class="F_l">Email</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" class="F_in"/>
                </FormControl>
                <FormMessage class="F_m"/>
              </FormItem>
            </FormField>

            <FormField v-slot="{componentField}" name="password">
              <FormItem class="F_i">
                <FormLabel class="F_l">Password</FormLabel>
                <FormControl>
                  <Input type="password" v-bind="componentField" class="F_in"/>
                </FormControl>
                <FormMessage class="F_m"/>
              </FormItem>
            </FormField>

            <Button type="submit" variant="default" class="mt-5">
              <Save/>
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </DialogContent>
  </Dialog>
</template>

<style scoped>

</style>
