<template>
  <div>
    <div class="absolute right-0 top-0 -z-1 w-full max-w-[250px] xl:max-w-[450px] opacity-20 pointer-events-none">
      <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="1" class="text-amber-500/30"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
    <div class="absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180 xl:max-w-[450px] opacity-20 pointer-events-none">
      <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  </div>
</template>

