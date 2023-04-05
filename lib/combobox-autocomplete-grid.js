'use strict'

// DATA
const autocomplete_grid_data = [
  ['Apple', 'Fruit'],
  ['Artichoke', 'Vegetable'],
  ['Asparagus', 'Vegetable'],
  ['Banana', 'Fruit'],
  ['Beets', 'Vegetable'],
  ['Bell pepper', 'Vegetable'],
  ['Broccoli', 'Vegetable'],
  ['Brussels sprout', 'Vegetable'],
  ['Cabbage', 'Vegetable'],
  ['Carrot', 'Vegetable'],
  ['Cauliflower', 'Vegetable'],
  ['Celery', 'Vegetable'],
  ['Chard', 'Vegetable'],
  ['Chicory', 'Vegetable'],
  ['Corn', 'Vegetable'],
  ['Cucumber', 'Vegetable'],
  ['Daikon', 'Vegetable'],
  ['Date', 'Fruit'],
  ['Edamame', 'Vegetable'],
  ['Eggplant', 'Vegetable'],
  ['Elderberry', 'Fruit'],
  ['Fennel', 'Vegetable'],
  ['Fig', 'Fruit'],
  ['Garlic', 'Vegetable'],
  ['Grape', 'Fruit'],
  ['Honeydew melon', 'Fruit'],
  ['Iceberg lettuce', 'Vegetable'],
  ['Jerusalem artichoke', 'Vegetable'],
  ['Kale', 'Vegetable'],
  ['Kiwi', 'Fruit'],
  ['Leek', 'Vegetable'],
  ['Lemon', 'Fruit'],
  ['Mango', 'Fruit'],
  ['Mangosteen', 'Fruit'],
  ['Melon', 'Fruit'],
  ['Mushroom', 'Fungus'],
  ['Nectarine', 'Fruit'],
  ['Okra', 'Vegetable'],
  ['Olive', 'Vegetable'],
  ['Onion', 'Vegetable'],
  ['Orange', 'Fruit'],
  ['Parsnip', 'Vegetable'],
  ['Pea', 'Vegetable'],
  ['Pear', 'Fruit'],
  ['Pineapple', 'Fruit'],
  ['Potato', 'Vegetable'],
  ['Pumpkin', 'Fruit'],
  ['Quince', 'Fruit'],
  ['Radish', 'Vegetable'],
  ['Rhubarb', 'Vegetable'],
  ['Shallot', 'Vegetable'],
  ['Spinach', 'Vegetable'],
  ['Squash', 'Vegetable'],
  ['Strawberry', 'Fruit'],
  ['Sweet potato', 'Vegetable'],
  ['Tomato', 'Fruit'],
  ['Turnip', 'Vegetable'],
  ['Ugli fruit', 'Fruit'],
  ['Victoria plum', 'Fruit'],
  ['Watercress', 'Vegetable'],
  ['Watermelon', 'Fruit'],
  ['Yam', 'Vegetable'],
  ['Zucchini', 'Vegetable'],
];

//FUNCTIONS
/**
* Populates a single combobox option row based on text input from data stream
* Adds click listener to each row
* @param String value_str
*
* @param String type_str
*/
function createGridRow(value_str,type_str) {
  let row_wrapper = document.createElement('div')
  let row_el = document.createElement('div')
  let value_cell = document.createElement('div')
  let type_cell = document.createElement('div')

  type_cell.setAttribute('role','gridcell')
  type_cell.className ='gridcell data-type'
  type_cell.appendChild( document.createTextNode(type_str))
  value_cell.setAttribute('role','gridcell')
  value_cell.className ='gridcell data-value'
  value_cell.appendChild( document.createTextNode(value_str))

  row_el.setAttribute('role','row')
  row_el.className = 'gridrow'
  row_el.appendChild(value_cell)
  row_el.appendChild(type_cell)

  row_el.addEventListener('click', function (event) {
    gridRowSelectOption(event.target)
  })

  row_wrapper.className = 'gridrow-wrapper'
  row_wrapper.appendChild(row_el)
  return row_wrapper
}

/**
* Moves visual focus between combobox elements
* @param "DOM Event" event
*/
function gridRowNavigation(event) {
  let current_row = COMBOBOX_GRID_EL.querySelector('.gridrow-focus')
  let next_row = null
  if (event.code==='ArrowUp') {
    // If the current row has a previous row, give it focus
    if (current_row && current_row.parentElement.previousElementSibling) {
      console.log('row wrapper previous:')
      console.log(current_row.parentElement.previousElementSibling)
      next_row = current_row.parentElement.previousElementSibling.querySelector('.gridrow')
    } else {
      // Otherwise, if give the last row focus
      if (COMBOBOX_GRID_EL.querySelector('.gridrow-last')) {
        next_row = COMBOBOX_GRID_EL.querySelector('.gridrow-last')
      }
    }
  } else if (event.code==='ArrowDown') {
    // If the current row has a following row, give it focus
    if (current_row && current_row.parentElement.nextElementSibling) {
      console.log('row wrapper next:')
      console.log(current_row.parentElement.nextElementSibling)
      next_row = current_row.parentElement.nextElementSibling.querySelector('.gridrow')
    } else {
      // Otherwise if there is a first row, give it focus
      if (COMBOBOX_GRID_EL.querySelector('.gridrow')) {
        next_row = COMBOBOX_GRID_EL.querySelector('.gridrow')
      }
    }
  } else if (event.code==='Enter') {
    // Selecting an option can be triggered by click/tap or 'Enter' key
    if (current_row) {
      event.preventDefault()
      event.stopPropagation()
      gridRowSelectOption(current_row)
    }
  } else {
    return
  }
  if (next_row) {
    next_row.className += ' gridrow-focus'

  }
  if (current_row) {
    current_row.className = current_row.className.replace(' gridrow-focus','')
  }
}

/**
* Populates input field with selected combobox value
* @param "DOM Element" target
*/
function gridRowSelectOption(target) {
  if (COMBOBOX_GRID_TEXT_INPUT_EL) {
    COMBOBOX_GRID_TEXT_INPUT_EL.value = target.querySelector('.data-value') ?
      target.querySelector('.data-value').innerText : ''
      COMBOBOX_GRID_TEXT_INPUT_EL.focus()
      COMBOBOX_GRID_TEXT_INPUT_EL.setAttribute('aria-expanded','false')
  }
  if (COMBOBOX_GRID_EL) {
    COMBOBOX_GRID_EL.innerHTML = ''
  }
}

/**
* Populates combobox options based on text-matching of user input
* @param "DOM Event" event
*
* @param Array data
*/
function gridRowPopulateOptions(event,data) {
  if (COMBOBOX_GRID_EL) {
    COMBOBOX_GRID_EL.innerHTML = '';
    if (event.target.value) {

      const match_pattern = new RegExp('^' + event.target.value,'i')
      const autocomplete_suggestions = []
      let gridrows = []

      event.target.setAttribute('aria-expanded','true')

      data.forEach( (data_row) => {
        if (match_pattern.test(data_row[0])) {
          autocomplete_suggestions.push(data_row)
          COMBOBOX_GRID_EL.appendChild( createGridRow(data_row[0],data_row[1]))
        }
      })
      gridrows = COMBOBOX_GRID_EL.querySelectorAll('.gridrow')
      if (gridrows.length) {
        gridrows[gridrows.length-1].className += ' gridrow-last'
      }
    }
  }
}

// CONSTANTS
const COMBOBOX_GRID_TEXT_INPUT_EL = document.querySelector('#textbox-autocomplete-grid')
const COMBOBOX_GRID_EL = document.querySelector('#combobox-autocomplete-grid')

// DOM EVENT LISTENERS
if (COMBOBOX_GRID_TEXT_INPUT_EL && COMBOBOX_GRID_EL && autocomplete_grid_data) {

  COMBOBOX_GRID_TEXT_INPUT_EL.addEventListener( 'input', function (event) {
    gridRowPopulateOptions(event,autocomplete_grid_data)
  })

  COMBOBOX_GRID_TEXT_INPUT_EL.addEventListener( 'keydown', function (event) {
    gridRowNavigation(event)
  })
}
