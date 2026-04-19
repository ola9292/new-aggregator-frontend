
<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue'
const authStore = useAuthStore()

const formData = ref({
    email:null,
    password:null,
})

const errors = ref(null)
const handleLogin = async () => {
    
    await authStore.login(formData.value)
 
}
</script>

<template>
    <main class="border rounded w-96 mx-auto mt-16 p-4">
        <div>
            <h1 class="text-2xl">Login</h1>
        </div>
        <div v-if="authStore.errors">{{ authStore.errors }}</div>
        <form @submit.prevent="handleLogin">
           
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Email</legend>
                <input type="email" class="input w-full" placeholder="Type here" v-model="formData.email"/>
                <p v-if="authStore.errors?.email" class="label">{{ authStore.errors.email[0] }}</p>
            </fieldset>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Password</legend>
                <input type="password" class="input w-full" placeholder="johndoe@example.com" v-model="formData.password"/>
                <p v-if="authStore.errors?.password" class="label">{{ authStore.errors.password[0] }}</p>
            </fieldset>
           
            <div>
                <button type="submit" class="btn btn-neutral">Login</button>
            </div>
        </form>
    </main>
</template>