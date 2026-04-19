import { defineStore } from 'pinia'
import axios from '@/axios.js'


export const useAuthStore = defineStore('authStore', {
  state: () => {
    return { 
        count: 0,
        user: null,
        errors: null,
        lightTheme : true
    }
  },

  actions: {
     async login(formData) {
        try {
            const response = await axios.post('/api/login', formData);
            localStorage.setItem("token", response.data.token)
            this.user = response.data.user
            //redirect user to homepage
            this.router.push({name: 'home'})

        } catch (error) {
            this.errors = error.response.data.errors
        }
    },
    async register(formData) {
        try {
            const response = await axios.post('/api/register', formData);
            
            localStorage.setItem("token", response.data.token)
            this.user = response.data.user
            //redirect user to homepage
            this.router.push({name: 'home'})

        } catch (error) {
            console.error('Full error:', error.response.data);
            this.errors = error.response.data.errors
        }
    },
    async getUser() {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get('/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // console.log(response);
            this.user = response.data
        } catch (error) {
            console.error(error.response.data);
        }
    },
    async logout() {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post('/api/logout',{}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            localStorage.removeItem("token")
            this.user = null
            this.errors = null
            
            //redirect user to login
            this.router.push({name: 'home'})
        } catch (error) {
            console.error('Full error:', error.response.data);
            this.errors = error.response.data.errors
        }
    },
  },
})