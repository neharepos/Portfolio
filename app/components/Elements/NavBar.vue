<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

// Toggle menu state
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
    if (import.meta.client) {
        document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
    }
}

// Close menu (used when clicking a link)
const closeMenu = () => {
    isMenuOpen.value = false
    if (import.meta.client) {
        document.body.style.overflow = ''
    }
}
</script>

<template>
    <nav class="fixed top-4 right-4 z-[9999] font-poppins">
        <div class="flex items-center justify-end">
            
            <!-- Mobile Toggle Button (Visible lg:hidden) -->
            <button 
                @click="toggleMenu" 
                class="lg:hidden relative z-[10000] p-2 text-white bg-[#111113]/80 backdrop-blur-md rounded-lg border border-white/10 shadow-lg transition-transform active:scale-95"
                aria-label="Toggle Navigation"
            >
                <div class="relative w-6 h-6 flex items-center justify-center overflow-hidden">
                    <svg 
                        class="w-6 h-6 absolute transition-all duration-300 transform" 
                        :class="isMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'"
                        fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                    <svg 
                        class="w-6 h-6 absolute transition-all duration-300 transform"
                        :class="isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'"
                        fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>
            </button>

            <!-- Navigation Links Container -->
            <div 
                :class="[
                    isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 lg:translate-x-0 lg:opacity-100',
                    'fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-[#050505]/95 backdrop-blur-xl transition-all duration-300 ease-in-out',
                    'lg:static lg:block lg:w-auto lg:bg-[#111113]/60 lg:backdrop-blur-md lg:border lg:border-white/10 lg:rounded-2xl lg:px-6 lg:py-3 lg:shadow-xl'
                ]"
            >
                <ul class="flex flex-col items-center space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8">
                    <li v-for="link in ['Home', 'Blog', 'Work', 'Project']" :key="link">
                        <NuxtLink 
                            :to="link === 'Home' ? '/' : `/${link.toLowerCase()}`"
                            @click="closeMenu"
                            class="text-2xl lg:text-sm font-medium text-white/60 transition-colors duration-200 hover:text-white"
                            active-class="!text-white"
                        >
                            {{ link }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>

        </div>
    </nav>
</template>