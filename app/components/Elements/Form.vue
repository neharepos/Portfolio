<script setup>
import { reactive, ref, computed } from 'vue'

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  message: '',
  hp_field: '' 
})

// Track which fields the user has interacted with
const touched = reactive({
  firstName: false,
  lastName: false,
  email: false,
  message: false
})

const isSubmitting = ref(false)
const status = ref({ type: '', message: '' })

// Validation Logic
const errors = computed(() => {
  const e = {}
  if (!formData.firstName.trim()) e.firstName = 'First name is required'
  if (!formData.lastName.trim()) e.lastName = 'Last name is required'
  
  if (!formData.email) {
    e.email = 'Email is required'
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    e.email = 'Please enter a valid email address'
  }

  if (formData.message.length < 10) {
    e.message = 'Message must be at least 10 characters'
  }
  return e
})

const isFormValid = computed(() => Object.keys(errors.value).length === 0)

const handleSubmit = async () => {
  // Mark all fields as touched to show errors if they try to submit incomplete form
  Object.keys(touched).forEach(key => touched[key] = true)

  if (!isFormValid.value) return

  isSubmitting.value = true
  status.value = { type: '', message: '' }

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: formData
    })

    status.value = { type: 'success', message: 'Message sent! I will get back to you soon.' }
    
    // Reset
    Object.assign(formData, { firstName: '', lastName: '', email: '', message: '', hp_field: '' })
    Object.keys(touched).forEach(key => touched[key] = false)

  } catch (err) {
    status.value = { 
      type: 'error', 
      message: err.data?.statusMessage || 'Something went wrong. Please try again later.' 
    }
  } finally {
    isSubmitting.value = false
    setTimeout(() => { status.value = { type: '', message: '' } }, 6000)
  }
}
</script>

<template>
  <section id="contact-form">
    <div class="bg-[#0a0a0a] px-6 md:px-16 py-12">
      <div class="max-w-2xl mx-auto p-8 md:p-12 bg-[#0d0d0d] border border-zinc-800 rounded-3xl shadow-2xl">
        <h2 class="text-3xl font-bold text-white mb-2">Get in touch</h2>
        <p class="text-zinc-400 mb-8">Have a project in mind? Let's build something together.</p>

        <Transition name="fade-slide">
          <div v-if="status.message"
            :class="status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'"
            class="mb-6 p-4 rounded-xl border text-sm flex items-center gap-3">
            <span class="w-2 h-2 rounded-full" :class="status.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'"></span>
            {{ status.message }}
          </div>
        </Transition>

        <form @submit.prevent="handleSubmit" class="space-y-5" novalidate>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">First Name</label>
              <input v-model="formData.firstName" @blur="touched.firstName = true" type="text" placeholder="John"
                :class="[touched.firstName && errors.firstName ? 'border-rose-500/50 focus:ring-rose-500/20' : 'border-zinc-800 focus:ring-blue-600/20']"
                class="bg-zinc-900/50 border text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-4 transition-all placeholder:text-zinc-700" />
              <p v-if="touched.firstName && errors.firstName" class="text-rose-500 text-xs ml-1 mt-1">{{ errors.firstName }}</p>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Last Name</label>
              <input v-model="formData.lastName" @blur="touched.lastName = true" type="text" placeholder="Doe"
                :class="[touched.lastName && errors.lastName ? 'border-rose-500/50 focus:ring-rose-500/20' : 'border-zinc-800 focus:ring-blue-600/20']"
                class="bg-zinc-900/50 border text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-4 transition-all placeholder:text-zinc-700" />
              <p v-if="touched.lastName && errors.lastName" class="text-rose-500 text-xs ml-1 mt-1">{{ errors.lastName }}</p>
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Email Address</label>
            <input v-model="formData.email" @blur="touched.email = true" type="email" placeholder="john@example.com"
              :class="[touched.email && errors.email ? 'border-rose-500/50 focus:ring-rose-500/20' : 'border-zinc-800 focus:ring-blue-600/20']"
              class="bg-zinc-900/50 border text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-4 transition-all placeholder:text-zinc-700" />
            <p v-if="touched.email && errors.email" class="text-rose-500 text-xs ml-1 mt-1">{{ errors.email }}</p>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Message</label>
            <textarea v-model="formData.message" @blur="touched.message = true" rows="4" placeholder="Tell me about your project..."
              :class="[touched.message && errors.message ? 'border-rose-500/50 focus:ring-rose-500/20' : 'border-zinc-800 focus:ring-blue-600/20']"
              class="bg-zinc-900/50 border text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-4 transition-all placeholder:text-zinc-700 resize-none"></textarea>
            <p v-if="touched.message && errors.message" class="text-rose-500 text-xs ml-1 mt-1">{{ errors.message }}</p>
          </div>

          <div class="hidden" aria-hidden="true">
            <input v-model="formData.hp_field" type="text" tabindex="-1" autocomplete="off">
          </div>

          <button type="submit" :disabled="isSubmitting"
            class="group w-full bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden relative">
            
            <div v-if="isSubmitting" class="flex items-center gap-2">
              <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing...</span>
            </div>
            
            <template v-else>
              <span>Send Message</span>
              <svg class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </template>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>