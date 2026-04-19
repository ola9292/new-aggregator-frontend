
<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue'
const authStore = useAuthStore()

const formData = ref({
    name:null,
    email:null,
    password:null,
    password_confirmation:null
})
const errors = ref(null)
const handleRegister = async () => {
   
    await authStore.register(formData.value)
}
</script>

<template>
    <main class="border rounded w-96 mx-auto mt-16 p-4">
        <div>
            <h1 class="text-2xl">Register</h1>
        </div>
       
        <form @submit.prevent="handleRegister">
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Name</legend>
                <input type="text" class="input w-full" placeholder="John" v-model="formData.name"/>
                <p v-if="authStore.errors?.name" class="label text-red-500">{{ authStore.errors.name[0] }}</p>
            </fieldset>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Email</legend>
                <input type="email" class="input w-full" placeholder="johndoe@example.com" v-model="formData.email"/>
                <p v-if="authStore.errors?.email" class="label text-red-500">{{ authStore.errors.email[0] }}</p>
            </fieldset>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Password</legend>
                <input type="password" class="input w-full" placeholder="" v-model="formData.password"/>
                <p v-if="authStore.errors?.password" class="label text-red-500">{{ authStore.errors.password[0] }}</p>
            </fieldset>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Password Confirmation</legend>
                <input type="password" class="input w-full" placeholder="" v-model="formData.password_confirmation"/>
                
            </fieldset>
            <div>
                <button type="submit" class="btn btn-neutral">Register</button>
            </div>
        </form>
    </main>
</template>