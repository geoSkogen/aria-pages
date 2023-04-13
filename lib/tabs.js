'use strict'


/**
* @param Element event_target
*/
function toggleTabPanel(target) {
  const toggle_panel = document.querySelector('#' + target.getAttribute('aria-controls'))
  let tab_selected_state = JSON.parse(target.getAttribute('aria-selected'))
  let panel_hidden_state = JSON.parse(toggle_panel.getAttribute('aria-hidden'))
  target.setAttribute('aria-selected',JSON.stringify(!tab_selected_state))
  toggle_panel.setAttribute('aria-hidden',JSON.stringify(!panel_hidden_state))
}


/**
* @param Event event
*/
function tabPanelNavigation(event) {
  const current_tab = document.querySelector('.tab-button[aria-selected="true"]')
  const new_tab = null
  switch(event.code) {
    case 'ArrowLeft' :
    case 'Left' :
      event.preventDefault()
      if (current_tab.previousElementSibling) {
        toggleTabPanel(current_tab)
        toggleTabPanel(current_tab.previousElementSibling)
      } else {
        const targets = current_tab.parentElement.querySelectorAll('.' + current_tab.className)
        toggleTabPanel(current_tab)
        toggleTabPanel(targets[targets.length-1])
      }
      break
    case 'ArrowRight' :
    case 'Right' :
      event.preventDefault()
      if (current_tab.nextElementSibling) {
        toggleTabPanel(current_tab)
        toggleTabPanel(current_tab.nextElementSibling)
      } else {
        toggleTabPanel(current_tab)
        toggleTabPanel(current_tab.parentElement.querySelector('.' + current_tab.className))
      }
      break
    case 'Home' :
      event.preventDefault()
      toggleTabPanel(current_tab)
      toggleTabPanel(current_tab.parentElement.querySelector('.' + current_tab.className))
      break;
    case 'End' :
      event.preventDefault()
      const targets = current_tab.parentElement.querySelectorAll('.' + current_tab.className)
      toggleTabPanel(current_tab)
      toggleTabPanel(targets[targets.length-1])
      break;
    default :
  }
}


document.querySelectorAll('.tab-button').forEach( (this_tab_button) => {

  this_tab_button.addEventListener('focus', function (event) {
    toggleTabPanel(document.querySelector('.tab-button[aria-selected="true"]'))
  toggleTabPanel(event.target)
  })

  this_tab_button.addEventListener('keydown', function (event) {
    tabPanelNavigation(event)
  })
})
