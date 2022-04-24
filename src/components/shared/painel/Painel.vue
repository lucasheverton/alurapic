<template>
  <div class="painel">
    <h2 class="subtitle-painel" @dblclick="visible = !visible" v-text="titulo"></h2>
    <transition name="painel-fade">
      <div class="painel-content" v-show="visible">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['titulo'],

  data () {
    return {
      visible: true
    }
  }
}
</script>


<!-- scoped -> faz com que o estilo se aplique só ao componente -->
<style scoped>
  .painel {
    padding: 0 auto;
    border: 2px solid grey;
    display: inline-block;
    margin: 5px;
    box-shadow: 5px 5px 10px grey;
    width: 320px;
    height: 100%;
    vertical-align: top;
    text-align: center;
  }

  .painel .subtitle-painel {
    text-align: center;
    border: 2px solid;
    background: lightblue;
    margin: 0 0 15px 0;
    padding: 10px;
    text-transform: uppercase;
  }

  * {
    box-shadow: 5px 5px 10px #ffa7a7;
  }

  .painel-fade-enter,
  .painel-fade-leave-active {
    opacity: 0;
  }

  .painel-fade-enter-active,
  .painel-fade-leave-active {
    transition: opacity .4s;
  }

  .painel-content {
    overflow: hidden;
  }
</style>
