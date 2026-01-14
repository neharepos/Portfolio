<script setup>
import { reactive } from 'vue'

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  console.log('Form Submitted:', formData)
  alert('Message sent successfully!')
  // Reset form
  formData.firstName = ''
  formData.lastName = ''
  formData.email = ''
  formData.message = ''
}
</script>

<template>
  <section id="contact-form">
  <div class="bg-[#0a0a0a] px-19 ">
  <div class="max-w-2xl mx-auto p-12 bg-[#0a0a0a] border-2  border-zinc-800  group-hover:w-full transition-all duration-500 rounded-2xl backdrop-blur-sm shadow-xl">
    <h2 class="text-3xl font-bold text-white mb-2 font-poppins">Get in touch</h2>
    <p class="text-gray-400 mb-8">Have a project in mind? Let's build something together.</p>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-zinc-400 ml-1">First Name</label>
          <input 
            v-model="formData.firstName"
            type="text" 
            placeholder="John"
            class="bg-zinc-700/50 border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all placeholder:text-zinc-600"
            required
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-zinc-400 ml-1">Last Name</label>
          <input 
            v-model="formData.lastName"
            type="text" 
            placeholder="Doe"
            class="bg-zinc-700/50 border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all placeholder:text-zinc-600"
            required
          />
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-zinc-400 ml-1">Email Address</label>
        <input 
          v-model="formData.email"
          type="email" 
          placeholder="john@example.com"
          class="bg-zinc-700/50 border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all placeholder:text-zinc-600"
          required
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-zinc-400 ml-1">Message</label>
        <textarea 
          v-model="formData.message"
          rows="5"
          placeholder="Tell me about your project..."
          class="bg-zinc-700/50 border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all placeholder:text-zinc-600 resize-none"
          required
        ></textarea>
      </div>

      <button 
        type="submit"
        class="w-full bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <span>Send Message</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      </button>
    </form>
  </div>
  </div>
  </section>
</template>