function toggle_check_state(toggle_target_el,hidden_checkbox) {
  toggle_target_el.setAttribute(
    'data-checked',
    (!JSON.parse(toggle_target_el.getAttribute('data-checked'))).toString()
  )
  hidden_checkbox.checked = JSON.parse(toggle_target_el.getAttribute('data-checked'))
}

document.querySelectorAll('div.ghost-toggle').forEach( (toggle_target) => {

  if (JSON.parse(toggle_target.getAttribute('data-checked'))) {
    document.getElementById(toggle_target.id.replace('-toggle-slider','')).checked = true
  }

  toggle_target.addEventListener('click', function (event) {
    let hidden_checkbox = document.getElementById(event.target.id.replace('-toggle-slider',''))
    toggle_check_state(event.target.parentElement,hidden_checkbox)
  })
  toggle_target.addEventListener('keydown', function (event) {
    if (event.code==='Enter') {
      let hidden_checkbox = document.getElementById(event.target.id.replace('-toggle-slider',''))
      toggle_check_state(event.target.parentElement,hidden_checkbox)
    }
  })
})
