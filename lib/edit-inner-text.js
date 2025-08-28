(function () {

const textarea = document.getElementById('inner-text-editor')
const section = document.getElementById('inner-text')
const edit_button = document.getElementById('edit-inner-text')
const submit_button = document.getElementById('submit-inner-text')

edit_button.addEventListener('click', function () {
  textarea.value = section.innerText
  section.setAttribute('aria-hidden','true')
  textarea.setAttribute('aria-hidden','false')
  edit_button.setAttribute('aria-hidden','true')
  submit_button.setAttribute('aria-hidden','false')

  textarea.focus()
})

submit_button.addEventListener('click', function () {
  section.innerText = textarea.value
  section.setAttribute('aria-hidden','false')
  textarea.setAttribute('aria-hidden','true')
  edit_button.setAttribute('aria-hidden','false')
  submit_button.setAttribute('aria-hidden','true')

  section.focus()
})

})()
