<script setup>
import { useBlogStore } from '@/stores/blog';
import { ref, onMounted } from 'vue'
import news from '@/assets/news.jpg'
import { useAuthStore } from '@/stores/auth';

const blogStore = useBlogStore()
const authStore = useAuthStore()
const blogs = ref(null)
const featured = ref(null)
const pagination = ref(null)
const newsLoading = ref(true)
const initialLoading = ref(true)
const activeTab = ref('all')

const retrieveBlogs = async (page_number, category='all') => {  
    newsLoading.value = true
    const result = await blogStore.getBlogs(page_number, category)
    blogs.value = result.blogs.data
    featured.value = result.featured
    pagination.value = result.blogs.meta
    activeTab.value = category

    initialLoading.value = false
    newsLoading.value = false
}



onMounted(async () => {
    initialLoading.value = true
    retrieveBlogs(1)
})

</script>

<template>
    <main class="max-w-6xl mx-auto px-4 py-10">
        <!-- <p>{{ authStore.user.name }}</p> -->
        <div class="flex justify-center" v-if="initialLoading">
            <span class="loading loading-dots loading-xl"></span>
        </div>
        <div v-else>
                <div>
                    <p class="text-center">Filters</p>
                    <div class="my-4 flex justify-center gap-2">
                        <button @click="retrieveBlogs(1, 'sports')" class="btn" :class="activeTab == 'sports' ? 'btn-primary' : 'btn-neutral'">Sports</button>
                        <button @click="retrieveBlogs(1, 'news')" class="btn" :class="activeTab == 'news' ? 'btn-primary' : 'btn-neutral'">News</button>
                        <button @click="retrieveBlogs(1, 'politics')" class="btn" :class="activeTab == 'politics' ? 'btn-primary' : 'btn-neutral'">Politics</button>
                        <button @click="retrieveBlogs(1)" class="btn" :class="activeTab == 'all' ? 'btn-primary' : 'btn-neutral'">All</button>
                    </div>
                </div>
                
                <div v-if="featured" class="mb-12">
                    <div class="relative group cursor-pointer overflow-hidden rounded-3xl bg-base-300 shadow-2xl h-[450px]">
                        <img :src="featured.image" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        
                        <div class="absolute bottom-0 p-8 md:p-12 text-white max-w-3xl">
                        <div class="badge badge-primary mb-4 uppercase font-bold">{{ featured.category }}</div>
                        <h1 class="text-3xl md:text-5xl font-black mb-4 leading-tight">
                             <RouterLink 
                                :to="{ name: 'show', params: { slug: featured.slug } }" 
                                class="hover:underline"
                                >
                               {{ featured.title }}
                            </RouterLink>
                        </h1>
                        <p class="text-gray-300 line-clamp-2 mb-4" v-html="featured.content"></p>
                        <div class="flex items-center gap-4 text-sm font-medium opacity-80">
                            <span>{{ featured.source }}</span>
                            <span>•</span>
                            <span>{{ featured.published_at }}</span>
                        </div>
                        </div>
                    </div>
                </div>

                <div v-if="newsLoading">
                    <span class="loading loading-dots loading-xl"></span>
                </div>
                <div v-else>
                    <div class="flex items-center justify-between mb-8">
                        <h2 class="text-2xl font-black uppercase tracking-tight">Recent Updates</h2>
                        <div class="h-1 flex-grow mx-4 bg-base-200 hidden md:block"></div>
                    </div>

                    <div class="grid grid-cols-1 gap-8">
                        <div v-for="blog in blogs" :key="blog.id" class="group bg-base-100 border border-base-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div class="flex flex-col md:flex-row">
                            
                            <div class="md:w-1/3 h-52 md:h-auto overflow-hidden">
                                <img v-if="blog.image" :src="blog.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <img v-else :src="news" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>

                            <div class="md:w-2/3 p-6 flex flex-col justify-between">
                                <div>
                                <div class="flex items-center gap-2 mb-3">
                                    <span class="text-xs font-bold uppercase text-primary tracking-widest">{{ blog.category }}</span>
                                    <span class="text-xs opacity-50">•</span>
                                    <span class="text-xs font-medium opacity-60">{{ blog.source }}</span>
                                </div>
                                <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                    <!-- <a :href="'/news/' + blog.slug">{{ blog.title }}</a> -->
                                    <RouterLink 
                                        :to="{ name: 'show', params: { slug: blog.slug } }" 
                                        class="hover:underline"
                                        >
                                    {{ blog.title }}
                                    </RouterLink>
                                </h3>
                                <p class="text-sm opacity-70 line-clamp-2" v-html="blog.content"></p>
                                </div>

                                <div class="flex items-center justify-between mt-6">
                                <span class="text-xs font-medium opacity-50">{{ blog.published_at }}</span>
                                <div class="flex items-center gap-4">
                                    <div class="flex items-center gap-1 opacity-50 text-xs">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    {{ blog.comment_count }}
                                    </div>
                                <RouterLink 
                                        :to="{ name: 'show', params: { slug: blog.slug } }" 
                                        class="btn btn-ghost btn-sm btn-circle"
                                        >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </RouterLink >
                                </div>
                                </div>
                            </div>

                            </div>
                        </div>
                    </div>

                    <div v-if="pagination" class="flex justify-center mt-12 gap-2">
                        <button 
                            class="btn btn-outline" 
                            :disabled="pagination.current_page === 1"
                            @click="retrieveBlogs(pagination.current_page - 1)"
                        >« Prev</button>
                    
                        <button class="btn btn-primary no-animation">Page {{ pagination.current_page }}</button>
                        
                        <button 
                            class="btn btn-outline" 
                            :disabled="pagination.current_page === pagination.last_page"
                            @click="retrieveBlogs(pagination.current_page + 1)"
                        >Next »</button>
                    </div>
                </div>
                
        </div>
        
    </main>
</template>