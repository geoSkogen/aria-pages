'use strict'

document.querySelector('#close-modal').addEventListener('click', function (event) {
  document.getElementById(event.target.getAttribute('toggle-display')).style.display = 'none';
  document.getElementById(event.target.getAttribute('toggle-display')).setAttribute('aria-hidden','true');
  document.querySelector('#open-modal').focus()
})

document.querySelector('#open-modal').addEventListener('click', function (event) {
  document.getElementById(event.target.getAttribute('toggle-display')).style.display = 'flex';
  document.getElementById(event.target.getAttribute('toggle-display')).setAttribute('aria-hidden','false');
  let first_field = document.getElementById(event.target.getAttribute('toggle-display')).querySelector('input')
  if (first_field) {
    first_field.focus()
  }
})
