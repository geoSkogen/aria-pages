'use strict'

// DATA

const autocomplete_list_data = [
  "Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Guam","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Marianas Islands","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Virgin Islands","Washington","West Virginia","Wisconsin","Wyoming"
]

// FUNCTIONS

/**
* Returns
* @param String str_val
*
* @return Element <li>
*
*/
function createListOption(str_val) {
  let li = document.createElement('li')
  li.setAttribute('role','option')
  li.className = 'listoption'
  li.id = 'list-val-' + str_val
  li.appendChild( document.createTextNode(str_val))
  li.addEventListener('click', function (event) {
    listRowSelectOption(event.target)
  })
  return li
}


/**
* Moves visual focus between combobox elements
* @param KeyboardEvent event
*/
function listRowNavigation(event) {
  let combobox_list_el = document.querySelector("#" + event.target.getAttribute('aria-controls'))
  let current_row = combobox_list_el.querySelector('.listoption-focus')
  let next_row = null
  switch(event.code) {
     case 'ArrowUp' :
     case 'Up' :
       // If the current row has a previous row, give it focus
       if (current_row && current_row.previousElementSibling) {
         next_row = current_row.previousElementSibling
       } else {
         // Otherwise, if give the last row focus
         if (combobox_list_el.querySelector('.listoption-last')) {
           next_row = combobox_list_el.querySelector('.listoption-last')
         }
       }
       break
     case 'ArrowDown' :
     case 'Down' :
       // If the current row has a following row, give it focus
       if (current_row && current_row.nextElementSibling) {
         next_row = current_row.nextElementSibling
       } else {
         // Otherwise if there is a first row, give it focus
         if (combobox_list_el.querySelector('.listoption')) {
           next_row = combobox_list_el.querySelector('.listoption')
         }
       }
       break
    case 'Enter' :
      // Selecting an option can be triggered by click/tap or 'Enter' key
      if (current_row) {
        event.preventDefault()
        event.stopPropagation()
        listRowSelectOption(current_row)
      }
      break
    default :
      return
  }
  if (next_row) {
    next_row.className += ' listoption-focus'
    event.target.setAttribute('aria-activedescendant',next_row.id)
  }
  if (current_row) {
    current_row.className = current_row.className.replace(' listoption-focus','')
  }
}


/**
* Populates input field with selected combobox value
* @param Element target
*/
function listRowSelectOption(target) {
  let combobox_list_el = target.parentElement
  let combobox_list_text_field = combobox_list_el ?
    document.querySelector('#' + combobox_list_el.getAttribute('aria-labelledby')) : null
  let combobox_list_text_input_el = combobox_list_text_field ?
    document.querySelector('#' + combobox_list_text_field.getAttribute('for')) : null

  if (combobox_list_text_input_el) {
    combobox_list_text_input_el.value = target.innerText
    combobox_list_text_input_el.focus()
    toggleAriaExpansion(combobox_list_text_input_el,false)
  }
  if (combobox_list_el) {
    combobox_list_el.innerHTML = ''
  }
}


/**
* Ensure both control elements maintain the same expanded state
* @param Element target
*
* @param Boolean expand
*/
function toggleAriaExpansion(target,expand) {
  const widget_namespace = '-autocomplete-list'
  let alternate_expand_el = null
  let alternate_reference_el = null
  switch(target.className.replace(widget_namespace,'')) {
    case 'button' :
      alternate_reference_el = document.querySelector('#' + target.getAttribute('aria-labelledby'))
      alternate_expand_el = alternate_reference_el ?
        document.querySelector('#' + alternate_reference_el.getAttribute('for')) : null
      break
    case 'textbox' :
      alternate_expand_el = target.parentElement.querySelector('.button' + widget_namespace)
      break
    default :
  }
  target.setAttribute('aria-expanded',JSON.stringify(expand))
  if (alternate_expand_el) {
    alternate_expand_el.setAttribute('aria-expanded',JSON.stringify(expand))
  }
}

/**
* Populates combobox options based on text-matching of user input
* @param InputEvent event
*
* @param Array data
*
* @param Boolean list_all
*
*/
function listRowPopulateOptions(event,data,list_all) {
  let combobox_list_el = document.querySelector("#" + event.target.getAttribute('aria-controls'))
  if (combobox_list_el) {
    combobox_list_el.innerHTML = '';

    if (event.target.value || (list_all && !JSON.parse(event.target.getAttribute('aria-expanded')) )) {

      const match_pattern = new RegExp('^' + event.target.value,'i')
      const autocomplete_suggestions = []
      let listoptions = []

      data.forEach( (datum) => {
        let match_test = list_all ? true : match_pattern.test(datum)
        if (match_test) {
          autocomplete_suggestions.push(datum)
          combobox_list_el.appendChild( createListOption(datum))
        }
      })
      listoptions = combobox_list_el.querySelectorAll('.listoption')
      if (listoptions.length) {
        toggleAriaExpansion(event.target,true)
        listoptions[listoptions.length-1].className += ' listoption-last'
      }
    } else {
      toggleAriaExpansion(event.target,false)
    }
  }
}

// DOM EVENT LISTENERS

document.querySelectorAll('.textbox-autocomplete-list').forEach( (textbox) => {
  textbox.addEventListener( 'input', function (event) {
    listRowPopulateOptions(event,autocomplete_list_data,false)
  })

  textbox.addEventListener( 'keydown', function (event) {
    listRowNavigation(event)
  })
})

document.querySelectorAll('.button-autocomplete-list').forEach( (button) => {
  button.addEventListener('click', function (event) {
    listRowPopulateOptions(event,autocomplete_list_data,true)
  })
})
