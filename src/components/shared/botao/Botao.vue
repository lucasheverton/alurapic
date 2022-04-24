<template>
  <button @click="disparaAcao()" class="button" :class="estiloDoBotao" :type="tipo"> {{ rotulo }} </button>
</template>

<script>
export default {
  props: {

    tipo: {
      required: true,
      type: String
    },

    rotulo: {
      required: true,
      type: String
    },

    confirmacao: {
      required: false,
      type: Boolean
    },

    estilo: {
      required: false ,
      type: String
    }

  },
  methods: {
    disparaAcao() {
      if(this.confirmacao) {
        if(confirm("Deseja remover a foto?")) {
          this.$emit("botaoAtivado");
        }
        return;
      }
        this.$emit("botaoAtivado");
    }
  },
  computed: {
    estiloDoBotao() {
      if (this.estilo == 'padrao' || !this.estilo) {
        return 'default-button';
      }

      if (this.estilo == 'perigo') {
        return 'danger-button';
      }
    }
  }
}
</script>

<style lang="sass">
  @import './Botao.scss';
</style>
