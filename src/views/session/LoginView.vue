<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useAuthStore } from '@/stores/auth.ts';
import {useRouter} from 'vue-router';
import {format} from 'date-fns';
import {es} from 'date-fns/locale';

//shadcn
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'

//Icon
import {LogIn} from 'lucide-vue-next'

//const
const authStore = useAuthStore();
const router = useRouter();
const d = format(new Date(), 'PPPPp', {locale:es});

const formSchema = toTypedSchema(z.object({
  email: z.string().email({ message: 'El correo no es válido.' }),
  password: z.string().min(2, { message: 'La contraseña debe tener al menos 2 caracteres.' }),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: '',
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    await authStore.Login(values);
    toast(`Inicio de sesion exitoso: ${d}`, {
      description: `Bienvenido: ${authStore.user.name}`,
    });
    router.push('/dashboard');
  }catch{
    toast('Error con el servidor', {
      description: 'Error de inicio de sesión'
    });
  }
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Login</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormDescription>
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" />
            </FormControl>
            <FormDescription>
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" variant="default">
          <LogIn/>
          Login
        </Button>
      </form>
    </CardContent>
  </Card>
</template>

<style scoped>

</style>
