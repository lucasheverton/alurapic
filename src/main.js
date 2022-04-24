import Vue from 'vue'
import App from './App.vue'
import VueResorce from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import './directives/Transform';
import VeeValidade from 'vee-validate';
import msg from './pt_BR';


import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.js';
import 'bootstrap/dist/js/bootstrap.js';

import './assets/css/teste.css';
import './assets/js/index';

Vue.use(VueResorce);
// centralizando o dominio da API
Vue.http.options.root = process.env.API_URL ? process.env.API_URL: 'http://localhost:3000';

/* Vue.http.interceptors.push((req, next) => {
  //Informações do header antes do envio da requisição
  req.headers.set('Authorization', 'informação de segurança aqui');
  console.log('Lidando com o request');

  next(res => {
    console.log('Lidando com a resposta.');

    // é possível acessar os dados da resposta e realizar transformações antes.
    console.log(res.body);
  })
}); */

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
  mode: 'history' //serve para tirar o #/ na url
});

// Plugin de terceiros usado para validação visual do form de cadastro
Vue.use(VeeValidade, {
  // Usando o português BR como principal
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
