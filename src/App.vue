<template>
 <div class="container">

   <meu-menu :rotas="routes"></meu-menu>

  <transition name="page">
   <router-view></router-view>
  </transition>

 </div>
</template>

<script>
import { routes } from './routes';
import Menu from './components/shared/menu/Menu.vue';

export default {
  components: {
    'meu-menu': Menu
  },
  data() {
    return {
      routes: routes.filter(route => route.menu)
    }
  }
}
</script>

<style>
  .container {
    font-family: Helvetica, sans-serif;
    width: 96%;
    margin: 0 auto;
  }

  .page-enter,
  .page-leave-active {
    opacity: 0;
  }

  .page-enter-active,
  .page-leave-active {
    transition: opacity .4s;
  }
</style>
