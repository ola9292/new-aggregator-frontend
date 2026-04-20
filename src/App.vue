<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref, onMounted } from 'vue'
const authStore = useAuthStore()


const handleLogout = () => {
  authStore.logout();
}

onMounted(() => {
  authStore.getUser();
})
</script>

<template>
  <div>
        <header>
            <div>
              <div class="navbar bg-primary text-white w-full">
                <div class="navbar-start">
                  <label for="mobile-menu" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                  </label>
                  <button class="btn btn-ghost text-xl"> <a href="/">Naija Palava</a> <p v-if="authStore.user">(welcome {{ authStore.user.name }})</p></button>
                </div>
          
                <div class="navbar-end hidden lg:flex">
                  <ul class="menu menu-horizontal px-1">
                    <!-- <li><a><RouterLink :to="{name: 'create'}">Create</RouterLink></a></li> -->
                    <li v-if="!authStore.user"><a><RouterLink :to="{name: 'login'}">Login</RouterLink></a></li>
                    <li v-if="!authStore.user"><a><RouterLink :to="{name: 'register'}">Register</RouterLink></a></li>
                    <li v-if="authStore.user">
                      <form @submit.prevent="handleLogout">
                          <button class="btn btn-danger">Logout</button>
                      </form>
                    </li>
                  </ul>
                </div>

                <!-- <div class="navbar-end">
                  <input type="text" placeholder="Search" class="input input-bordered w-full max-w-xs" />
                </div> -->
            </div>

        <input type="checkbox" id="mobile-menu" class="peer hidden" />
        
        <div class="hidden peer-checked:block lg:hidden bg-base-100 border-t border-base-300">
          <ul class="menu w-full p-4">
            <!-- <li><a>Item 1</a></li> -->
            <!-- <li>
              <details>
                <summary>Parent</summary>
                <ul>
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li> -->
            <li v-if="!authStore.user"><a><RouterLink :to="{name: 'login'}">Login</RouterLink></a></li>
              <li v-if="!authStore.user"><a><RouterLink :to="{name: 'register'}">Register</RouterLink></a></li>
              <li v-if="authStore.user">
                <form @submit.prevent="handleLogout">
                    <button class="btn btn-danger">Logout</button>
                </form>
              </li>
          </ul>
        </div>
            </div>
        </header>
        <RouterView />
  </div>

</template>

<style>
:root {
  --primary-bg-color: #202020;
  --secondary-bg-color: #ffffff;
}
  .dark-mode{
    background-color: var(--primary-bg-color);
    color: var(--secondary-bg-color);
  }
  .light-mode{
    background-color: var(--secondary-bg-color)
  }
</style>
