<script setup>
import { useBlogStore } from '@/stores/blog';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import news from '@/assets/news.jpg'
import { useAuthStore } from '@/stores/auth';

const route = useRoute()
const blogStore = useBlogStore()
const authStore = useAuthStore()
const blog = ref(null)
const loading = ref(true)
const comment = ref(null)

const submitComment = async (slug) => {
    const result = await blogStore.comment(slug, comment.value)
    blog.value.comments.push(result.data)
    comment.value = null
}

const toggleLike = async (comment) => {
    //console.log(comment)
    const result = await blogStore.toggleLike(comment)
    
    const targetComment = blog.value.comments.find(c => c.id === comment.id)
    targetComment.is_liked = result.is_liked
    targetComment.likes_count = result.likes_count
}

onMounted( async () => {
    loading.value = true
    const slug = route.params.slug
    const result = await blogStore.getSingleBlog(slug)
    blog.value = result.data

    loading.value = false
})

</script>

<template>
    <main class="max-w-6xl mx-auto px-4 py-10">
        <div v-if="loading">
            <span class="loading loading-dots loading-xl"></span>
        </div>
        <div v-else class="min-h-screen bg-base-100 py-8">
            <nav class="max-w-4xl mx-auto px-4 mb-6">
                <button @click="$router.back()" class="btn btn-ghost btn-sm gap-2 normal-case">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to News
                </button>
            </nav>

            <article class="max-w-4xl mx-auto px-4">
                <header class="mb-8">
                    <div class="flex items-center gap-3 mb-4">
                    <span class="badge badge-primary font-bold tracking-wider">{{ blog.category }}</span>
                    <span class="text-sm opacity-60">{{ blog.published_at }}</span>
                    </div>
                    
                    <h1 class="text-3xl md:text-5xl font-black leading-tight mb-6">
                    {{ blog.title }}
                    </h1>

                    <div class="flex items-center justify-between border-y border-base-200 py-4">
                    <div class="flex items-center gap-3">
                        <div class="avatar placeholder">
                        <div class="bg-neutral text-neutral-content rounded-full w-10">
                            <span class="text-xs">{{ blog.source.substring(0, 2) }}</span>
                        </div>
                        </div>
                        <div>
                        <p class="font-bold text-sm">{{ blog.source }}</p>
                        <p class="text-xs opacity-50">Reporting via {{ blog.source }}</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-2">
                        <button class="btn btn-circle btn-ghost btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 100-2.684 3 3 0 000 2.684z" /></svg>
                        </button>
                    </div>
                    </div>
                </header>

                <figure class="mb-10 rounded-3xl overflow-hidden shadow-xl">
                    <img v-if="blog.image" :src="blog.image" :alt="blog.title" class="w-full h-auto object-cover max-h-[500px]" />
                    <img v-else :src="news" :alt="blog.title" class="w-full h-auto object-cover max-h-[500px]" />
                </figure>

                <section 
                    class="prose prose-lg md:prose-xl max-w-none prose-headings:font-black prose-p:leading-relaxed prose-img:rounded-3xl"
                    v-html="blog.content"
                >
                </section>
                <section class="mt-8 border-t border-base-200 pt-6">
                    <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                        Comments 
                        <span class="badge badge-sm badge-neutral">{{ blog.comments.length }}</span>
                    </h3>

                    <div v-if="authStore.user" class="mb-6">
                        <div class="join w-full">
                            <input 
                                type="text" 
                                placeholder="Write a thought..." 
                                v-model="comment" 
                                class="input input-bordered join-item w-full focus:outline-none focus:border-primary"
                            />
                            <button @click="submitComment(blog.slug)" class="btn btn-neutral join-item">
                                Comment
                            </button>
                        </div>
                    </div>

                    <div class="max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                        <div class="space-y-6">
                            <div v-for="c in blog.comments" :key="c.id" class="flex gap-4 group">
                                <div class="avatar placeholder h-10 w-10 shrink-0">
                                    <div class="bg-primary text-primary-content rounded-full w-10">
                                        <span class="text-xs font-bold">{{ c.user.name.substring(0, 2).toUpperCase() }}</span>
                                    </div>
                                </div>

                                <div class="flex-1 border-b border-base-100 pb-4">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class="font-bold text-sm">{{ c.user.name }}</span>
                                        <span class="text-[10px] opacity-40 uppercase">{{ c.created_at }}</span>
                                    </div>
                                    <p class="text-sm opacity-80 leading-relaxed">{{ c.body }}</p>
                                </div>
                                <div class="flex items-center gap-2 mt-2">
                                    <button @click="toggleLike(c)" class="btn btn-ghost btn-xs gap-1 px-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                            class="h-4 w-4" 
                                            :class="c.is_liked ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-current'" 
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        <span class="text-xs opacity-60">{{ c.likes_count || 0 }}</span>
                                    </button>
                                </div>
                            </div>

                            <div v-if="blog.comments.length === 0" class="text-center py-10 opacity-40 italic text-sm">
                                No comments yet.
                            </div>
                        </div>
                    </div>
                </section>


                <footer class="mt-16 pt-8 border-t border-base-200">
                    <div class="flex flex-wrap gap-4 items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-bold">Source:</span>
                            <a :href="blog.link" target="_blank" class="link link-primary text-sm font-medium">{{ blog.link }}</a>
                        </div>
                        
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-1 text-sm opacity-60">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                {{ blog.comment_count }} Comments
                            </div>
                        </div>
                    </div>
                </footer>
            </article>
        </div>
    </main>
</template>
<style scoped>
/* Slim modern scrollbar for the comment section */
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--bc) / 0.2);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--bc) / 0.3);
}
</style>