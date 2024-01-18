'use strict'

let open_modal_button = document.getElementById('sign-in')
let login_modal = document.getElementById('login')

if (open_modal_button && login_modal) {
  open_modal_button.addEventListener('click', function () {
    login_modal.setAttribute(
      'aria-hidden',
      !JSON.parse(login_modal.getAttribute('aria-hidden'))
    )
  })
}
