'use strict'


function toggleAccordian(button) {
  const display_props = ['block','none']
  const aria_hidden_props = ['false','true']
  const icon_props = ['down','up']

  let accordion_content_panel = document.getElementById(button.getAttribute('aria-controls'))
  let display_toggle = accordion_content_panel ? JSON.parse(button.getAttribute('aria-expanded')) : null

  let icon_el = button.querySelector('i')

  if (display_toggle) {
    display_props.reverse()
    aria_hidden_props.reverse()
    icon_props.reverse()
  }

  if (accordion_content_panel) {
    accordion_content_panel.style.display = display_props[0]
    accordion_content_panel.setAttribute('aria-hidden',aria_hidden_props[0])
    button.setAttribute('aria-expanded',JSON.stringify(!display_toggle))
  }

  if (icon_el) {
    icon_el.className = icon_el.className.replace(icon_props[0],icon_props[1])
  }
}


const accordion_buttons = document.querySelectorAll('.dropdown-header-button')


if (accordion_buttons) {
  accordion_buttons.forEach( (accordion_button) => {

    accordion_button.addEventListener('click', function (event) {
      accordion_buttons.forEach( (test_button) => {
        if (test_button.id!=event.target.id) {
          test_button.setAttribute('aria-expanded','true')
          toggleAccordian(test_button)
        }
      })
      toggleAccordian(event.target)
    })
  })
}
