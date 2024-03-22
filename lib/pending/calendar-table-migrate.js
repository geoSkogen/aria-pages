'use strict'

const table = document.querySelector('table.fc-list-table tbody')
const list = document.createElement('ul')

var inner_list = document.createElement('ul')
var inner_li = null
var dom_el = null
var dom_el_child = null
var list_heading = null;

inner_list.className = 'fc-inner-list'
list.className = 'fc-list-list'

if (table.children) {
  for (var i = 0; i < table.children.length; i++) {

    if (table.children[i].classList.contains('fc-list-heading')) {
      dom_el = copy_element_attributes(table.children[i],'h4')
    } else {
      dom_el = copy_element_attributes(table.children[i],'li')
    }

    if (table.children[i].children) {

      for (let ii = 0; ii < table.children[i].children.length; ii++) {
        dom_el_child = copy_element_attributes(table.children[i].children[ii],'span')
        dom_el_child.innerHTML = table.children[i].children[ii].innerHTML
        dom_el.appendChild(dom_el_child)
      }
    }

    inner_li = document.createElement('li')
    inner_li.className = 'fc-list-list-item'

    if (table.children[i].classList.contains('fc-list-heading')) {
      inner_li.appendChild(dom_el)
      list.appendChild(inner_li)
    } else {
      inner_list.appendChild(dom_el)
    }

    if (table.children[i+1] && table.children[i+1].classList.contains('fc-list-heading') || !table.children[i+1] ) {
      inner_list = document.createElement('ul')
      inner_list.className = 'fc-inner-list'
      inner_li.appendChild(inner_list)
      list.appendChild(inner_li)
    }
  }
}

if (document.querySelector('.fc-view')) {
  document.querySelector('.fc-view').appendChild(list)
}

function copy_element_attributes(dom_el, return_type) {
  const new_el = document.createElement(return_type)
  if (dom_el && dom_el.hasAttributes()) {
    for (let ii = 0; ii < dom_el.attributes.length; ii++) {
      new_el.setAttribute(
        dom_el.attributes[ii].name,
        dom_el.attributes[ii].value
      )
    }
  }
  return new_el
}
