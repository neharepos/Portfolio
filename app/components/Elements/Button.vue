<script setup>
const scrollToForm = () => {
  const element = document.getElementById('contact-form');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>



<template>
  <div class=" flex gap-4 md:justify-start md:ml-54 mt-5">
    <div class="p-1 ">
    <button class="border flex rounded px-4 py-1 bg-[#0a0a0a] text-white border-gray-600  hover:bg-slate-900">
        <svg 
        class="flex w-5 h-5 fill-current"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 640 640">
        <path d="M192 112L304 112L304 200C304 239.8 336.2 272 376 272L464 272L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 128C176 119.2 183.2 112 192 112zM352 131.9L444.1 224L376 224C362.7 224 352 213.3 352 200L352 131.9zM192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 250.5C512 233.5 505.3 217.2 493.3 205.2L370.7 82.7C358.7 70.7 342.5 64 325.5 64L192 64zM248 320C234.7 320 224 330.7 224 344C224 357.3 234.7 368 248 368L392 368C405.3 368 416 357.3 416 344C416 330.7 405.3 320 392 320L248 320zM248 416C234.7 416 224 426.7 224 440C224 453.3 234.7 464 248 464L392 464C405.3 464 416 453.3 416 440C416 426.7 405.3 416 392 416L248 416z"/></svg>
       <span class="text-sm font-medium">Resume/CV</span> 
    </button>
    </div>

    <div class="p-1">
  <button
  @click="scrollToForm"
    class="flex items-center gap-3 rounded-md px-4 py-1
           bg-white text-black border border-gray-600
           hover:bg-slate-900 hover:text-white transition"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 640"
      class="w-5 h-5 fill-current"
    >
      <path d="M320 72C183 72 72 183 72 320C72 457 183 568 320 568C457 568 568 457 568 320C568 183 457 72 320 72zM435 240.7C431.3 279.9 415.1 375.1 406.9 419C403.4 437.6 396.6 443.8 390 444.4C375.6 445.7 364.7 434.9 350.7 425.7C328.9 411.4 316.5 402.5 295.4 388.5C270.9 372.4 286.8 363.5 300.7 349C304.4 345.2 367.8 287.5 369 282.3C369.2 281.6 369.3 279.2 367.8 277.9C366.3 276.6 364.2 277.1 362.7 277.4C360.5 277.9 325.6 300.9 258.1 346.5C248.2 353.3 239.2 356.6 231.2 356.4C222.3 356.2 205.3 351.4 192.6 347.3C177.1 342.3 164.7 339.6 165.8 331C166.4 326.5 172.5 322 184.2 317.3C256.5 285.8 304.7 265 328.8 255C397.7 226.4 412 221.4 421.3 221.2C423.4 221.2 427.9 221.7 430.9 224.1C432.9 225.8 434.1 228.2 434.4 230.8C434.9 234 435 237.3 434.8 240.6z"/>
    </svg>
    <span class="text-sm font-medium">Get In Touch</span>
  </button>
</div>
</div>

</template>