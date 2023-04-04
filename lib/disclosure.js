'use strict'

const buttons = document.querySelectorAll('.disclosure-control')

buttons.forEach( (button) => {
  button.addEventListener('click', function (event) {
    let toggle_el = null
    let display_props = ['block','none']
    let toggle_display = JSON.parse(event.target.getAttribute('aria-expanded'))
    if (toggle_display) { display_props.reverse() }
    toggle_el = document.querySelector('#' + event.target.getAttribute('aria-controls'))
    if (toggle_el) {
      toggle_el.style.display = display_props[0]
      event.target.setAttribute('aria-expanded',JSON.stringify(!toggle_display))
    }
  })
})
