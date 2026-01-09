<template>
  <div class="error_page">
    <div class="error__icon i-carbon:warning-alt text-6xl mx-auto"></div>
    <div class="error__code text-red:500 text-xl my2 font-mono">404</div>
    <div class="error__msg text-gray font-mono opacity80">Page Not Found.</div>
    <div class="error__footer my4">
      <div class="error__footer__text"></div>
      $
      <RouterLink to="/" font-mono opacity-75>cd ..</RouterLink>
    </div>
  </div>
</template>
