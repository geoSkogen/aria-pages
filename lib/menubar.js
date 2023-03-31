'use strict'

function toggleNextLevelMenu(top_level_menu_item) {
  const display_props = ['block','none'];
  let display_toggle = top_level_menu_item ? JSON.parse(top_level_menu_item.getAttribute('aria-expanded')) : null
  if (display_toggle) {
    display_props.reverse();
  }
  if (top_level_menu_item.nextElementSibling) {
    top_level_menu_item.nextElementSibling.style.display = display_props[0]
    top_level_menu_item.setAttribute('aria-expanded',JSON.stringify(!display_toggle))
  }
}


const top_level_menu_items = document.querySelectorAll('.top-level-menu-item');
const secondary_menu_items = document.querySelectorAll('.secondary-menu-item');
const app_state = { selection:null }


if (top_level_menu_items) {
  top_level_menu_items.forEach( (top_level_menu_item) => {

    top_level_menu_item.addEventListener('keyup', function (event) {
       if (event.code==='Enter'||event.code==='Space') {
         toggleNextLevelMenu(event.target)
       }
       if (JSON.parse(event.target.getAttribute('aria-expanded')) && event.code==='ArrowDown') {
         let secondary_menu_first_item = event.target.nextElementSibling.querySelector('.secondary-menu-item')
         if (secondary_menu_first_item) { secondary_menu_first_item.focus() }
       }
    })

    top_level_menu_item.addEventListener('keydown', function (event) {
      if (JSON.parse(event.target.getAttribute('aria-expanded')) && event.code==='Tab') {
        toggleNextLevelMenu(event.target)
      }
    })

    top_level_menu_item.addEventListener('click', function (event) {
      top_level_menu_items.forEach( (top_level_menu_item) => {
        top_level_menu_item.setAttribute('aria-expanded','true')
        toggleNextLevelMenu(top_level_menu_item)
      })
      toggleNextLevelMenu(event.target)
    })
  })
}

if (secondary_menu_items) {
  secondary_menu_items.forEach( (secondary_menu_item) => {

    secondary_menu_item.addEventListener('keyup', function (event) {
       if (event.code==='ArrowDown') {
         if (event.target.nextElementSibling) {
           event.target.nextElementSibling.focus()
         } else {
           event.target.parentElement.querySelector('.secondary-menu-item').focus()
         }
       }
       if (event.code==='ArrowUp') {
         if (event.target.previousElementSibling) {
           event.target.previousElementSibling.focus()
         } else {
           let sibling_menu_items = event.target.parentElement.querySelectorAll('.secondary-menu-item')
           sibling_menu_items[sibling_menu_items.length-1].focus()
         }
       }
       if (event.code==='Enter'||event.code==='Space') {
         if (event.code==='Enter') {
           app_state.selection = event.target.innerText
           console.log(app_state)
         }
         toggleNextLevelMenu(event.target.parentElement.previousElementSibling)
         event.target.parentElement.previousElementSibling.focus()
       }
    })

    secondary_menu_item.addEventListener('keydown', function (event) {
      if (event.code==='Tab') {
        toggleNextLevelMenu(event.target.parentElement.previousElementSibling)
      }
    })

    secondary_menu_item.addEventListener('click', function (event) {
      app_state.selection = event.target.innerText
      console.log(app_state)
      toggleNextLevelMenu(event.target.parentElement.previousElementSibling)
    })
  })
}
