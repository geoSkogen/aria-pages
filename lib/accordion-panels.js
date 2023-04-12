'use strict'

/**
* Toggle visibility of accordion panel content, reset aria attributes of toggle button
* @param "DOM Node" button
*/
function toggleAccordian(button,) {
  const icon_props = ['down','up']

  let accordion_content_panel = document.getElementById(button.getAttribute('aria-controls'))
  let display_toggle = accordion_content_panel ? JSON.parse(accordion_content_panel.getAttribute('aria-hidden')) : null
  let expand_toggle = JSON.parse(button.getAttribute('aria-expanded'))

  if (display_toggle) {
    icon_props.reverse()
  }

  if (accordion_content_panel) {
    accordion_content_panel.setAttribute('aria-hidden',JSON.stringify(!display_toggle))
    button.setAttribute('aria-expanded',JSON.stringify(!expand_toggle))
  }

  if (button.querySelector('i')) {
    button.querySelector('i').className = button.querySelector('i').className.replace(icon_props[0],icon_props[1])
  }
}

if (document.querySelectorAll('.dropdown-header-button')) {
  document.querySelectorAll('.dropdown-header-button').forEach( (accordion_button) => {

    accordion_button.addEventListener('click', function (event) {
      document.querySelectorAll('.dropdown-header-button[aria-expanded="true"]').forEach( (test_button) => {
        if (test_button.id!=event.target.id) {
          toggleAccordian(test_button)
        }
      })
      toggleAccordian(event.target)
    })
  })
}
