<!-- alurapic/src/components/cadastro/Cadastro.vue -->

<template>

  <div>
    <h1 class="center">Cadastro</h1>
    <h2 class="center">{{ foto.titulo }}</h2>

    <h2 v-if="foto._id" class="center">Alterando</h2>
    <h2 v-else class="center">Incluindo</h2>

    <form @submit.prevent="gravar()">
      <div class="control">
        <label for="titulo">TÍTULO</label>
        <input v-validate data-vv-rules="required|min:3|max:30" data-vv-as="título" name="title" id="titulo" autocomplete="off" v-model="foto.titulo">
        <span class="error" v-show="errors.has('title')">{{ errors.first('title') }}</span>
      </div>

      <div class="control">
        <label for="url">URL</label>
        <input v-validate data-vv-rules="required" name="url" id="url" autocomplete="off" v-model="foto.url">
        <span class="error" v-show="errors.has('url')">{{ errors.first('url') }}</span>
        <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/>
      </div>

      <div class="control">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.descricao">
        </textarea>
      </div>

      <div class="center">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        <router-link :to="{name: 'home'}"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>

    </form>
  </div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue'
import Foto from '../../domain/foto/Foto.js'
import FotoService from '../../domain/foto/FotoService.js'

export default {

  components: {
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao': Botao
  },

  data() {
    return {
      foto: new Foto(),
      id: this.$route.params.id
    }
  },
  methods: {
    gravar() {
      this.$validator
        .validateAll()
        .then(sucess => {
          if(sucess) {
            this.service
            .register(this.foto)
            .then(() => {
              if(this.id) { this.$router.push({ name: 'home'})};
              this.foto = new Foto()
              }, err => console.log(err));
          }
        })
    }
  },
  created() {
    this.service = new FotoService(this.$resource);

    if(this.id) {
      this.service
        .search(this.id)
        .then(foto => this.foto = foto);
    }
  }
}

</script>
<style scoped>

  .center {
    text-align: center;
  }
  .control {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .control label {
    display: block;
    font-weight: bold;
  }

 .control label + input, .control textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .control > textarea {
    height: 200px;
  }

  .error {
    font-size: 12px;
    color: firebrick;
    font-weight: 500;
  }
</style>
