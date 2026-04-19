import { defineStore } from 'pinia'
import axios from '@/axios.js'


export const useBlogStore = defineStore('blogStore', {
  state: () => {
    return { 
        count: 0,
        user: "olamide"
        
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async getBlogs(page, category) {
        try {
            // const token = localStorage.getItem("token");
            const response = await axios.get(`/api/news?page=${page}&category=${category}`);
            
            return response.data
        } catch (error) {
            console.error(error.response.data);
        }
    },
    async getSingleBlog(slug) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`/api/news/${slug}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            return response.data
        } catch (error) {
            console.error(error.response.data);
        }
    },
    
    async addComment(slug, comment) {
        //console.log(slug, comment)
        const formData = {"message": comment}
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`/api/blogs/comment/${slug}`, formData ,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data)
            return response.data.data
        } catch (error) {
            this.errors = error.response.data.errors
        }
    },
    async comment(slug, comment){
        try {
            const formData = {"body": comment}
            const token = localStorage.getItem("token");
            const response = await axios.post(`/api/news/comment/${slug}`,formData,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
           console.log(response.data)
            return response.data
        } catch (error) {
            this.errors = error.response.data.errors
        }
    },
    async toggleLike(comment) {
       
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`/api/comments/${comment.id}/like`,{},{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('here')
           console.log(response.data)
            return response.data
        } catch (error) {
            this.errors = error.response.data.errors
        }
    },
  },
})