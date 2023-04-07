'use strict'

// DATA

const autocomplete_list_inline_autocomplete_data = [
  "Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Guam","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Marianas Islands","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Virgin Islands","Washington","West Virginia","Wisconsin","Wyoming"
]

// FUNCTIONS

/**
* Returns
* @param String str_val
*
* @return Element <li>
*/
function inlineAutocompleteCreateListOption(str_val) {
  let li = document.createElement('li')
  li.setAttribute('role','option')
  li.className = 'listoption'
  li.id = 'inline-autocomplete-list-' + str_val
  li.appendChild( document.createTextNode(str_val))
  li.addEventListener('click', function (event) {
    inlineAutocompleteListRowSelectOption(event.target)
  })
  return li
}


/**
* Moves visual focus between combobox elements
* @param KeyboardEvent event
*/
function inlineAutocompleteListRowNavigation(event) {
  let combobox_list_el = document.getElementById(event.target.getAttribute('aria-controls'))
  let current_row = combobox_list_el.querySelector('.listoption-focus')
  let next_row = null
  switch(event.code) {
     case 'ArrowUp' :
     case 'Up' :
       // If the current row has a previous row, give it focus
       if (current_row && current_row.previousElementSibling) {
         next_row = current_row.previousElementSibling
       } else {
         if (!combobox_list_el.querySelectorAll('li').length) {
           inlineAutocompleteListRowPopulateOptions(event,autocomplete_list_inline_autocomplete_data)
         }
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
         if (!combobox_list_el.querySelectorAll('li').length) {
           inlineAutocompleteListRowPopulateOptions(event,autocomplete_list_inline_autocomplete_data)
         }
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
        inlineAutocompleteListRowSelectOption(current_row)
      }
      break
    default :
      return
  }
  if (next_row) {
    next_row.className += ' listoption-focus'
    event.target.value = next_row.innerText
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
function inlineAutocompleteListRowSelectOption(target) {
  let combobox_list_el = target.parentElement
  let combobox_list_text_field = combobox_list_el ?
    document.querySelector('#' + combobox_list_el.getAttribute('aria-labelledby')) : null
  let combobox_list_text_input_el = combobox_list_text_field ?
    document.querySelector('#' + combobox_list_text_field.getAttribute('for')) : null

  if (combobox_list_text_input_el) {
    combobox_list_text_input_el.value = target.innerText
    combobox_list_text_input_el.focus()
    inlineAutocompleteToggleAriaExpansion(combobox_list_text_input_el,false)
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
function inlineAutocompleteToggleAriaExpansion(target,expand) {
  const widget_namespace = '-autocomplete-list-inline-autocomplete'
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
* Present inline-autocomplete results within test input element
* @param InputEvent event
*
* @param String inline_autocomplete_val
*/
function inlineAutocompleteInputValue(event,inline_autocomplete_val) {

  const word_pattern = new RegExp("\\w+")
  let manual_entry = event.target.getAttribute('last-manual-entry') ?
    event.target.getAttribute('last-manual-entry') : ''
  let autocomplete = false
  if (event.data!=null && word_pattern.test(event.data)) {
    if (inline_autocomplete_val) {
      autocomplete = true
      manual_entry += event.data
      event.target.setAttribute('last-manual-entry',manual_entry)
      event.target.value = inline_autocomplete_val
      event.target.setSelectionRange(manual_entry.length,inline_autocomplete_val.length,'backward')
    }
  }
  if (!autocomplete) {
    event.target.setAttribute('last-manual-entry',event.target.value)
  }
}


/**
* Toggle list options view with button clicks
* @param MouseEvent event
*
* @param Array data
*/
function inlineAutocompleteHandleComboboxButton(event,data) {
  let combobox_list_el = document.querySelector("#" + event.target.getAttribute('aria-controls'))
  if (JSON.parse(event.target.getAttribute('aria-expanded'))) {
    combobox_list_el.innerHTML = ''
    inlineAutocompleteToggleAriaExpansion(event.target,false)
  } else {
    inlineAutocompleteListRowPopulateOptions(event,data)
  }
}


/**
* Populates combobox options based on text-matching of user input
* @param InputEvent event
*
* @param Array data
*/
function inlineAutocompleteListRowPopulateOptions(event,data) {
  let combobox_list_el = document.querySelector("#" + event.target.getAttribute('aria-controls'))
  if (combobox_list_el) {
    combobox_list_el.innerHTML = '';

    const match_pattern = event.target.value ? new RegExp('^' + event.target.value,'i') : new RegExp('.*')
    const autocomplete_suggestions = []
    let listoptions = []
    let inline_autocomplete_val = ''

    data.forEach( (datum) => {
      if (match_pattern.test(datum)) {
        autocomplete_suggestions.push(datum)
        combobox_list_el.appendChild( inlineAutocompleteCreateListOption(datum))
      }
    })
    listoptions = combobox_list_el.querySelectorAll('.listoption')

    if (listoptions.length) {
      listoptions[listoptions.length-1].className += ' listoption-last'
      inlineAutocompleteToggleAriaExpansion(event.target,true)
    }

    inline_autocomplete_val = autocomplete_suggestions[0] ? autocomplete_suggestions[0] : ''
    inlineAutocompleteInputValue(event,inline_autocomplete_val)
  }
}

// DOM EVENT LISTENERS

document.querySelectorAll('.textbox-autocomplete-list-inline-autocomplete').forEach( (textbox) => {
  textbox.addEventListener( 'input', function (event) {
    inlineAutocompleteListRowPopulateOptions(event,autocomplete_list_inline_autocomplete_data)
  })

  textbox.addEventListener( 'keydown', function (event) {
    inlineAutocompleteListRowNavigation(event)
  })
})

document.querySelectorAll('.button-autocomplete-list-inline-autocomplete').forEach( (button) => {
  button.addEventListener('click', function (event) {
    inlineAutocompleteHandleComboboxButton(event,autocomplete_list_inline_autocomplete_data)
  })
})
