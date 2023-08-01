'use strict'

document.querySelectorAll('.close-modal').forEach( (close_modal_button) => {
  close_modal_button.addEventListener('click', function (event) {
    document.getElementById(event.target.getAttribute('toggle-display')).setAttribute('aria-hidden','true');
    document.getElementById(event.target.getAttribute('toggle-overlay')).className += ' dialog-overlay-hidden'
    document.querySelector('open-modal').focus()
  })
})


document.querySelectorAll('.open-modal').forEach( (open_modal_button) => {
  open_modal_button.addEventListener('click', function (event) {
    document.getElementById(event.target.getAttribute('toggle-display')).setAttribute('aria-hidden','false');
    document.getElementById(event.target.getAttribute('toggle-overlay')).className =
      document.getElementById(event.target.getAttribute('toggle-overlay')).className.replace(' dialog-overlay-hidden','')
    let first_field = document.getElementById(event.target.getAttribute('toggle-display')).querySelector('input')
    if (first_field) {
      first_field.focus()
    }
  })
})
