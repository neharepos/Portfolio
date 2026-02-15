<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { 
    BadgeCheck, 
    Volume2, 
    Code2, 
    Lightbulb, 
    MapPin, 
    Phone, 
    Globe, 
    Clock, 
    Mail, 
    Mars 
} from 'lucide-vue-next'


// --- Time Logic ---
const timeDisplay = ref('')
const timeDifference = ref('')
let timer: ReturnType<typeof setInterval> | null = null

const updateTime = () => {
    const now = new Date();
    
    // 1. Get exact time in India (IST)
    timeDisplay.value = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    // 2. Calculate Time Difference (IST is UTC+5:30 = 330 mins)
    const indiaOffset = -330; 
    const viewerOffset = now.getTimezoneOffset(); // Returns minutes behind UTC
    const diffMinutes = viewerOffset - indiaOffset;
    const diffHours = Math.round(diffMinutes / 60);

    if (diffHours === 0) {
        timeDifference.value = "Same time";
    } else if (diffHours > 0) {
        timeDifference.value = `${Math.abs(diffHours)}h behind`;
    } else {
        timeDifference.value = `${Math.abs(diffHours)}h ahead`;
    }
}

onMounted(() => {
    updateTime();
    timer = setInterval(updateTime, 1000);
})

onUnmounted(() => {
    if (timer) clearInterval(timer);
})
</script>

<template>
    <!-- 
        MAIN CONTAINER 
        - Mobile: Transparent/Simple
        - Desktop: Grid Pattern, Border, Rounded-3xl
    -->
    <div class="bg-[#0a0a0a] relative p-12 w-full md:p-10  md:bg-[#0a0a0a] md:overflow-hidden group">
        
        <!-- Background Grid Pattern (Desktop Only) -->
        <div class="hidden md:block absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style="background-image: radial-gradient(#3f3f46 1px, transparent 1px); background-size: 24px 24px;">
        </div>

        <div class="relative z-10 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center">
            
            <!-- LEFT: Avatar (Shared) -->
            <div class="relative shrink-0">
                <!-- Avatar Circle -->
                <div class="relative w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-[#1c1c1e] md:border-zinc-800 md:bg-zinc-900/50 overflow-hidden shadow-2xl">
                    <ElementsAvatar 
                        path="/profile/profile-pic-4.jpg" 
                        class="w-full h-full object-cover"
                    />
                </div>
                
                <!-- Flag Badge -->
                <div class="absolute -top-1 -left-1 bg-zinc-900 p-1 rounded-lg md:rounded-xl border border-zinc-700 shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300 z-20">
                    <img 
                        src="https://flagcdn.com/w80/in.png" 
                        alt="India Flag" 
                        class="w-8 h-5 md:w-10 md:h-7 rounded md:rounded-md object-cover"
                    />
                </div>
            </div>

            <!-- RIGHT: Information -->
            <div class="flex-1 w-full space-y-6">
                
                <!-- 1. HEADER (Shared Logic) -->
                <div class="space-y-2">
                    <div class="flex flex-wrap items-center gap-3">
                        <h1 class="text-3xl md:text-5xl font-bold text-white tracking-tight">
                            Neha<span class="text-white ml-2 md:text-zinc-400">Keshri</span>
                        </h1>
                        <BadgeCheck class="w-6 h-6 md:w-8 md:h-8 text-blue-500 fill-blue-500/10" />
                        <button class="p-2 rounded-full hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors">
                            <Volume2 class="w-5 h-5" />
                        </button>
                    </div>
                    
                    <p class="text-lg text-zinc-400 font-medium font-mono">
                        Open Source Contributor
                    </p>
                </div>

                <!-- 2. DESKTOP VIEW (Original Grid Layout) -->
                <div class="hidden md:block">
                    <div class="h-px w-full bg-zinc-800/60 mb-6"></div>
                    
                    <div class="space-y-3 mb-4 font-mono">
                        <div class="flex items-center gap-3 text-zinc-300">
                            <Code2 class="w-5 h-5 text-zinc-500" />
                            <span>Web Development<span class="text-zinc-500">@Company</span></span>
                        </div>
                        <div class="flex items-center gap-3 text-zinc-300">
                            <Lightbulb class="w-5 h-5 text-zinc-500" />
                            <span>Making creative designs</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-zinc-400 font-mono">
                        <div class="flex items-center gap-3">
                            <MapPin class="w-4 h-4 text-zinc-600" />
                            <span>Ranchi, India</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <Clock class="w-4 h-4 text-zinc-600" />
                            <span>{{ timeDisplay }} <span class="text-zinc-600">// {{ timeDifference }}</span></span>
                        </div>
                        <div class="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                            <Phone class="w-4 h-4 text-zinc-600 group-hover:text-green-500" />
                            <span>+91 8809501856</span>
                        </div>
                        <div class="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                            <Mail class="w-4 h-4 text-zinc-600 group-hover:text-yellow-500" />
                            <a href="mailto:nehakeshri12c@gmail.com"><span>nehakeshri12c@gmail.com</span></a>
                        </div>
                        <div class="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                            <Globe class="w-4 h-4 text-zinc-600 group-hover:text-blue-500" />
                            <a href="https://neha.in"><span>neha.in</span></a>
                        </div>
                        <div class="flex items-center gap-3">
                            <Mars class="w-4 h-4 text-zinc-600" />
                            <span>she/her</span>
                        </div>
                    </div>
                </div>

                <!-- 3. MOBILE VIEW (New "Boxed" List Layout) -->
                <div class="flex flex-col gap-4 md:hidden">
                    
                    <!-- Bio Text -->
                    <div class="font-mono text-sm text-zinc-400 leading-relaxed border-l-2 border-zinc-700 pl-3 mb-2">
                        <p>Web Development</p>
                        <p>Making creative designs</p>
                    </div>

                    <!-- List Items with Boxed Icons -->
                    <div class="flex items-center gap-4 group">
                        <div class="w-12 h-12 flex items-center justify-center rounded-xl bg-[#1c1c1e] border border-zinc-800 text-zinc-400">
                            <Code2 class="w-5 h-5" />
                        </div>
                        <div class="font-mono text-sm">
                            <div class="text-zinc-200 font-bold">Web Developer</div>
                            <div class="text-zinc-500">@Company</div>
                        </div>
                    </div>

                    <div class="flex items-center gap-4 group">
                        <div class="w-12 h-12 flex items-center justify-center rounded-xl bg-[#1c1c1e] border border-zinc-800 text-zinc-400">
                            <MapPin class="w-5 h-5" />
                        </div>
                        <div class="font-mono text-sm text-zinc-200">Ranchi, India</div>
                    </div>

                    <div class="flex items-center gap-4 group">
                        <div class="w-12 h-12 flex items-center justify-center rounded-xl bg-[#1c1c1e] border border-zinc-800 text-zinc-400">
                            <Clock class="w-5 h-5" />
                        </div>
                        <div class="font-mono text-sm flex flex-col">
                            <span class="text-white font-bold tracking-widest">{{ timeDisplay }}</span>
                            <span class="text-zinc-500 text-xs">{{ timeDifference }}</span>
                        </div>
                    </div>

                    <a href="tel:+917209879211" class="flex items-center gap-4 group">
                        <div class="w-12 h-12 flex items-center justify-center rounded-xl bg-[#1c1c1e] border border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-colors">
                            <Phone class="w-5 h-5" />
                        </div>
                        <div class="font-mono text-sm text-zinc-200">+91 8809501856</div>
                    </a>

                    <a href="mailto:nehakeshri12c@gmail.com" class="flex items-center gap-4 group">
                        <div class="w-12 h-12 flex items-center justify-center rounded-xl bg-[#1c1c1e] border border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-colors">
                            <Mail class="w-5 h-5" />
                        </div>
                        <div class="font-mono text-sm text-zinc-200">nehakeshri12c@gmail.com</div>
                    </a>

                    <a href="https://neha.in" class="flex items-center gap-4 group">
                        <div class="w-12 h-12 flex items-center justify-center rounded-xl bg-[#1c1c1e] border border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-colors">
                            <Globe class="w-5 h-5" />
                        </div>
                        <div class="font-mono text-sm text-zinc-200">https://neha.in</div>
                    </a>
                </div>
                <!-- End Mobile View -->
                
            </div>
        </div>
        <div>
            <ElementsButton/>
        </div>
        
    </div>
    
</template>