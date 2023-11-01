<template>
  <div class="pure-menu">
    <div class="container">
      <router-link :to="{ path: '/' }">Home</router-link>
      <router-link :to="{ path: '/new' }">New</router-link>
    </div>
  </div>
</template>

<style scoped>
.pure-menu {
  background-color: #e17842;
  margin-bottom: 0.5rem;
}

.pure-menu a {
  color: white;
  padding-right: 1rem;
}
</style>
