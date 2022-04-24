<template>
 <div>
   <!-- <img src="/static/cat.jpeg" alt=""> -->
   <!-- <h1 v-text="titulo"></h1> -->
   <h1 class="center">{{ titulo }}</h1>

  <p class="center" v-show="message">{{ message }}</p>

   <!-- Não é permitido usar interpolação nos atributos, por isso usamos o v-bind ou simplismente :nome do atributo -->

  <input type="search" class="filter" @input="filtro = $event.target.value" placeholder="Filtre pelo título">

   <ul class="photos-list">
     <li class="photos-list--item" v-for="foto of fotosComFiltro" :key="foto._id">
       <meu-painel :titulo="foto.titulo">
         <imagem-responsiva v-my-transform:scale.animate="1.2" :url="foto.url" :titulo="foto.titulo"/>
          <!--
           Quando tentamos utilizar o @click que equivale ao onclick no
           Vanilha ele não funciona no componente só em elementos nativos,
           por isso se quisermos passar devemos colocar o ".native"
          -->

         <router-link :to="{ name: 'alterar', params: { id: foto._id} }">
           <botao tipo="button" rotulo="ALTERAR" />
         </router-link>

         <botao
          tipo="button"
          rotulo="REMOVER"
          @botaoAtivado="buttonRemove(foto)"
          :confirmacao="true"
          estilo="perigo"/>

       </meu-painel>

     </li>
   </ul>

 </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';
import FotoService from '../../domain/foto/FotoService';

import transform from '../../directives/Transform';

export default {
  components: {
    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'botao': Botao
  },

  directives: {
    'my-transform': transform
  },

  data() {
    return {
      titulo: 'Alurapic',
      fotos: [],
      filtro: '',
      message: ''
    }
  },
  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  },
  methods: {
    buttonRemove(foto) {
        this.service.delete(foto._id)
          .then(() => {
            // encontra a posiçao da foto na lista de fotos
            let indice = this.fotos.indexOf(foto);
            // altera o array removendo o indice.
            this.fotos.splice(indice, 1);
            this.message = 'Foto removida com sucesso.';
          })
          .catch(err => {
            this.message = err.message;
          })
    }
  },
  /* Função chamada assim que o componente é criado/chamado faz parte do Lifecycle Hooks*/
  created() {

    this.service = new FotoService(this.$resource);

    this.service
      .list()
      .then(fotosAPI => this.fotos = fotosAPI)
      .catch(err => {
        this.message = err.message;
      })

    }
}
</script>

<style>
  /* .container {
    font-family: Helvetica, sans-serif;
    width: 96%;
    margin: 0 auto;
  } */

  .center {
    text-align: center;
  }

  .photos-list {
    list-style-type: none;
  }

  .photos-list .photos-list--item {
    display: inline-block;
    margin: 10px;
  }

  .filter {
    display: block;
    width: 100%;
    height: 30px;
  }

</style>
