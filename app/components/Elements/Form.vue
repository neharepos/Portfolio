<script setup>
import { reactive, ref } from 'vue'

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  message: '',
  hp_field: '' //honeypot
})

// UI State
const isSubmitting = ref(false)
const status = ref({ type: '', message: '' }) // 'success' | 'error'

const handleSubmit = async () => {
  isSubmitting.value = true
  status.value = { type: '', message: '' }

  try {
    // Sending data to your Nuxt Server Route (/server/api/contact.post.ts)
    await $fetch('/api/contact', {
      method: 'POST',
      body: formData
    })

    // On Success
    status.value = {
      type: 'success',
      message: 'Message sent! I will get back to you soon.'
    }

    // Reset form fields
    Object.assign(formData, { firstName: '', lastName: '', email: '', message: '' })

  } catch (err) {
    // On Error
    status.value = {
      type: 'error',
      message: 'Something went wrong. Please try again later.'
    }
  } finally {
    isSubmitting.value = false
    // Clear status after 5 seconds
    setTimeout(() => { status.value = { type: '', message: '' } }, 5000)
  }
}
</script>

<template>
  <section id="contact-form">
    <div class="bg-[#0a0a0a] px-6 md:px-16 py-8 mt-5">
      <div
        class="max-w-2xl mx-auto p-8 md:p-12 bg-[#0a0a0a] border-2 border-zinc-800 rounded-2xl backdrop-blur-sm shadow-xl">
        <h2 class="text-3xl font-bold text-white mb-2 font-poppins">Get in touch</h2>
        <p class="text-gray-400 mb-8">Have a project in mind? Let's build something together.</p>

        <Transition enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform -translate-y-2 opacity-0" enter-to-class="transform translate-y-0 opacity-100"
          leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <div v-if="status.message"
            :class="status.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'"
            class="mb-6 p-4 rounded-xl border text-sm font-medium">
            {{ status.message }}
          </div>
        </Transition>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-zinc-400 ml-1">First Name</label>
              <input v-model="formData.firstName" type="text" placeholder="John"
                class="bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all placeholder:text-zinc-600 disabled:opacity-50"
                :disabled="isSubmitting" required />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-zinc-400 ml-1">Last Name</label>
              <input v-model="formData.lastName" type="text" placeholder="Doe"
                class="bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all placeholder:text-zinc-600 disabled:opacity-50"
                :disabled="isSubmitting" required />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-zinc-400 ml-1">Email Address</label>
            <input v-model="formData.email" type="email" placeholder="your-mail@company.com"
              class="bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all placeholder:text-zinc-600 disabled:opacity-50"
              :disabled="isSubmitting" required />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-zinc-400 ml-1">Message</label>
            <textarea v-model="formData.message" rows="5" placeholder="The message you would like to convey...."
              class="bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all placeholder:text-zinc-600 resize-none disabled:opacity-50"
              :disabled="isSubmitting" required></textarea>
          </div>
          <div class="hidden" aria-hidden="true">
            <input v-model="formData.hp_field" type="text" name="hp_field" tabindex="-1" autocomplete="off">
          </div>

          <button type="submit" :disabled="isSubmitting"
            class="w-full bg-blue-700 hover:bg-blue-600 disabled:bg-zinc-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2">
            <span v-if="!isSubmitting">Send Message</span>
            <span v-else class="flex items-center gap-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              Sending...
            </span>
            <svg v-if="!isSubmitting" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>