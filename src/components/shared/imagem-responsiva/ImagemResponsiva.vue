<template>
  <img class="responsive-img" :src="url" :alt="titulo" :title="titulo" />
</template>

<script>
  export default {
    props: ['url', 'titulo']
  }
</script>

<!-- scoped -> faz com que o estilo se aplique só ao componente -->
<style scoped>
  img {
    width: 100%;
  }
</style>
