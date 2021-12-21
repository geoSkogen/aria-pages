(function () {
// keyboard-control A11y script for search results 'sort by' dropdown
const search_sort_dom = {
  container:  document.querySelector('.gsc-selected-option-container'),
  selector : document.querySelector('.gsc-option-selector'),
  menu : document.querySelector('.gsc-option-menu-invisible'),
  menu_items : document.querySelectorAll('.gsc-option'),
  expanded : false,
  select_index : 0
}

search_sort_dom.expand_search_sort = function () {
  this.expanded = true
  //
  this.selector.click()
}


search_sort_dom.collapse_search_sort = function () {
  this.expanded = false
  // clicking the highlighted menu option submits the sort rule
  this.menu.querySelector('.gsc-option-menu-item-highlighted').querySelector('.gsc-option').click()
}


search_sort_dom.toggle_selection_index = function (bool) {
  if (bool) {
    // increment no farther than the last menu item array element
    this.select_index += this.select_index===this.menu_items.length-1 ? 0 : 1
  } else {
    // decrement no farther than zero
    this.select_index += this.select_index===0 ? 0 : -1
  }
}


search_sort_dom.toggle_selection = function (bool) {
  // increment or decrement depending on keypress event
  this.toggle_selection_index(bool)
  for (let i = 0; i < this.menu_items.length; i++) {
    // ensure none of the menu items is highlighted . . .
    this.menu_items[i].parentElement.className =
      this.menu_items[i].parentElement.className.replace(' gsc-option-menu-item-highlighted', '')
    // then, highlight only the selected one
    if (i===this.select_index) {
      this.menu_items[i].parentElement.className += ' gsc-option-menu-item-highlighted'
    }
  }
}


search_sort_dom.sort_menu_keypress_handler = function (event) {
  switch(event.keyCode) {
    case 13 :
      if (this.expanded) {
        this.collapse_search_sort()
      } else {
        this.expand_search_sort()
      }
      break
    case 37 :
      if (!this.expanded) {
        this.expand_search_sort()
      }
      break
    case 38 :
      if (this.expanded) {
        this.toggle_selection(false)
      }
      break
    case 39 :
      if (this.expanded) {
        this.collapse_search_sort()
      }
      break
    case 40 :
      if (this.expanded) {
        this.toggle_selection(true)
      }
      break
    default :

  }
}

search_sort_dom.container.setAttribute('tabindex','0')
search_sort_dom.container.setAttribute('aria-label','sort search results')
search_sort_dom.container.addEventListener('keydown', function (event) {
  search_sort_dom.sort_menu_keypress_handler(event)
})

})()
