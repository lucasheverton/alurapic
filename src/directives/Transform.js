export default {
  bind(el, binding, vnode) {
    let eixo = 0;

    el.addEventListener('dblclick', function() {

      let increment = binding.value || 90;
      let efeito;

      if(!binding.arg || binding.arg == 'rotate') {

        binding.modifiers.reverse ? eixo -= increment : eixo += increment;
        efeito = `rotate(${eixo}deg)`;

      } else if (binding.arg == 'scale') {
        efeito = `scale(${increment})`;
      }

      el.style.transform = efeito;


      if (binding.modifiers.animate) {
        el.style.transition = '1s';
      }

    })
  }
}
