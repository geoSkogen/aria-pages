'use strict'

// DATA

const TABLE_DATA = {
  'Judas Priest' :
  [
    ["Title","Year","Rating","Hash"],
    ["Rocka Rolla","1975","6","g54ehwb45y"],
    ["Sad Wings of Destiny","1976","10","54w5"],
    ["Sin After Sin","1977","9","42t43g21"],
    ["Stained Class","1978","8","w4g54h54yq34"],
    ["Hell Bent for Leather","1978","7","2yhwreg"],
    ["British Steel","1980","7","940q3nn40"],
    ["Point of Entry","1981","4","34i90qhg49iqh"],
    ["Screaming for Vengeance","1982","6","49w0tnvq4"]
  ]
}

// FUNCTIONS

/**
* Create an accessible table element from preformatted data
* @param Array data
*
* @param Object columnwise_atts
*
* @return Element <table>
*/
function createDataGridTable(data,columnwise_atts) {
  const table = document.createElement('table')
  let tbody = document.createElement('tbody')

  tbody.appendChild( renderTableHeader(data,columnwise_atts))
  tbody = renderTableData(data,tbody)
  table.appendChild(tbody)
  table.setAttribute('role','grid')

  if (table.querySelector('#data-grid-anchor')) {
    initTableEvents(table.querySelector('#data-grid-anchor'))
  }
  return table
}


/**
*
* @param Array data
*
* @param Object columnwise_atts
*
* @return Element <tr>
*/
function renderTableHeader(data,columnwise_atts) {
  let column_names = []
  var row_el = document.createElement('tr')
  row_el.className = 'data-grid-row'
  row_el.setAttribute('role','row')

  if (Array.isArray(data)) {
    if (Array.isArray(data[0])) {
      column_names = data[0]
    }
  }
  for (let i = 0; i < column_names.length; i++) {

    let cell_el = document.createElement('th')
    let cell_val = column_names[i]

    cell_el.className = 'data-grid-cell'
    cell_el.setAttribute('role','columnheader')
    cell_el.setAttribute('column-index',i.toString())
    cell_el.setAttribute('tabindex','-1')
    if (!i) {
      cell_el.setAttribute('tabindex','0')
      cell_el.id = 'data-grid-anchor'
    }

    if (Object.keys(columnwise_atts).indexOf(cell_val) > -1) {

      let button_span = document.createElement('span')

      Object.keys(columnwise_atts[cell_val]).forEach( (col_header_attr) => {
        cell_el.setAttribute(col_header_attr,columnwise_atts[cell_val][col_header_attr])
        button_span.className += ' ' + col_header_attr + '-data-grid-button'
      })
      button_span.appendChild( document.createTextNode( cell_val))
      button_span.setAttribute('role','button')
      button_span.addEventListener( 'click', function (event) {
        toggleTableSort(event.target,data)
      })
      cell_el.setAttribute('data-column-name',cell_val)
      cell_el.appendChild(button_span)
      row_el.appendChild(cell_el)
    } else {
      cell_el.appendChild( document.createTextNode(cell_val))
      row_el.appendChild(cell_el)
    }
  }
  return row_el
}


/**
*
* @param Array data
*
* @param Element tbody <tbody>
*
* @return Element <tbody>
*/
function renderTableData(data,tbody) {
  const rows = tbody.getElementsByTagName('TR').length ? tbody.getElementsByTagName('TR') : []
  const delete_row_ids = []
  // This loop runs twice so the rows aren't being deleted while loop is iterating them
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].getElementsByTagName('TD').length) {
      delete_row_ids.push(rows[i].id)
    }
  }
  delete_row_ids.forEach( (delete_row_id) => {
    document.getElementById(delete_row_id).remove()
  })
  if (Array.isArray(data)) {
    for (var i = 1; i < data.length; i++) {
      var row_el = document.createElement('tr')
      row_el.className = 'data-grid-row'
      row_el.id = 'data-grid-row-' + i.toString()
      row_el.setAttribute('role','row')

      if (Array.isArray(data[i])) {
        for (var ii = 0; ii < data[i].length; ii++) {
          let cell_el = document.createElement('td')
          cell_el.className = 'data-grid-cell'
          cell_el.setAttribute('role','gridcell')
          cell_el.setAttribute('column-index',ii.toString())
          cell_el.setAttribute('tabindex','-1')
          cell_el.appendChild( document.createTextNode(data[i][ii]))
          row_el.appendChild(cell_el)
        }
        tbody.appendChild(row_el)
      }
    }
  }
  return tbody
}


/**
* Traverses the data grid to assign focus
* @param Event event
*
*/
function dataGridNavigation(event) {
  let current_cell = document.querySelector('.data-grid-cell-focus')
  let next_cell = null
  switch(event.code) {
    case 'ArrowUp' :
    case 'Up' :
      if (current_cell && current_cell.parentElement.previousElementSibling) {
        next_cell = current_cell.parentElement.previousElementSibling.querySelector(
          '.data-grid-cell[column-index="' +  current_cell.getAttribute('column-index') + '"'
        )
      } else {
        let rows = event.target.parentElement.parentElement.querySelectorAll('.data-grid-row')
        let col_index_str = current_cell ? current_cell.getAttribute('column-index') : '0'
        next_cell = rows[rows.length-1].querySelector(
          '.data-grid-cell[column-index="' + col_index_str  + '"'
        )
      }
      break
    case 'ArrowDown' :
    case 'Down' :
      if (current_cell && current_cell.parentElement.nextElementSibling) {
        next_cell = current_cell.parentElement.nextElementSibling.querySelector(
          '.data-grid-cell[column-index="' +  current_cell.getAttribute('column-index') + '"'
        )
      } else {
        let first_row = event.target.parentElement.parentElement.querySelector('.data-grid-row')
        let col_index_str = current_cell ? current_cell.getAttribute('column-index') : '0'
        next_cell = first_row.querySelector(
          '.data-grid-cell[column-index="' +  col_index_str + '"'
        )
      }
      break
    case 'ArrowRight' :
    case 'Right' :
      if (current_cell && current_cell.nextElementSibling) {
        next_cell = current_cell.nextElementSibling
      } else {
        next_cell = current_cell ?
          current_cell.parentElement.querySelector('.data-grid-cell') :
          event.target.nextElementSibling
      }
      break
    case 'ArrowLeft' :
    case 'Left' :
      if (current_cell && current_cell.previousElementSibling) {
        next_cell = current_cell.previousElementSibling
      } else {
        let row_cells = current_cell ?
          current_cell.parentElement.querySelectorAll('.data-grid-cell') :
          event.target.parentElement.querySelectorAll('.data-grid-cell')
        next_cell = row_cells[row_cells.length-1]
      }
      break
    case 'Escape' :
    case 'Esc' :
      next_cell = document.getElementById('data-grid-anchor')
      next_cell.focus()
      break
    default :

  }
  if (current_cell) {
    current_cell.className = current_cell.className.replace(' data-grid-cell-focus','')
  }
  if (next_cell) {
    next_cell.className += ' data-grid-cell-focus'
  }
}


/**
* Sort the raw data by column values in order to pass it to the table generator
* @param String column_name
*
* @param Array raw_data
*
* @return Array
*/
function sortByColumnValue(column_name,ascending,raw_data) {
  var transformed_table_data = []
  var sortby_column_index = -1

  if (Array.isArray(raw_data) && Array.isArray(raw_data[0]) && raw_data[0].indexOf(column_name)>-1) {

    sortby_column_index = raw_data[0].indexOf(column_name)

    for (var i = 1; i < raw_data.length; i++) {

      var raw_row_val = raw_data[i][sortby_column_index]

      if (transformed_table_data.length) {
        var rank = 0

        for (var ii = 0; ii < transformed_table_data.length; ii++) {

          var this_sorted_row_val = transformed_table_data[ii][sortby_column_index]
          var next_sorted_row_val = transformed_table_data[ii+1] ?
            transformed_table_data[ii+1][sortby_column_index] : null

          if (next_sorted_row_val) {
            if (Number(raw_row_val)>Number(this_sorted_row_val) && Number(raw_row_val)<=Number(next_sorted_row_val)) {
              rank = ii+1
              break
            }
          } else {
            if (Number(raw_row_val)>Number(this_sorted_row_val)) {
              rank = ii+1
              break
            }
          }
        }
        transformed_table_data.splice(rank,0,raw_data[i])
      } else {
        transformed_table_data.push(raw_data[i])
      }
    }
  }
  return ascending ?
    [raw_data[0]].concat(transformed_table_data) :
    [raw_data[0]].concat(transformed_table_data.reverse())
}


/**
* @param Element event_target_element
*
* @param Array raw_table_data
*/
function toggleTableSort(event_target_element,raw_table_data) {
  let sort_states = ['ascending','descending']
  let sort_state_index = sort_states.indexOf(event.target.parentElement.getAttribute('aria-sort'))
  let sorted_data = []
  var column_attr_props = {}
  var data_column_name = event.target.parentElement.getAttribute('data-column-name')

  if (sort_state_index<0) {
    sort_state_index = 0
  }
  if (!sort_state_index) {
    sort_states.reverse()
  }

  sorted_data = sortByColumnValue(data_column_name,sort_state_index,raw_table_data)

  document.querySelectorAll('.aria-sort-data-grid-button').forEach( (aria_sort_data_grid_button) => {
    if (aria_sort_data_grid_button.parentElement.getAttribute('aria-sort') &&
      aria_sort_data_grid_button.parentElement.getAttribute('data-column-name')) {

      if (aria_sort_data_grid_button.parentElement.getAttribute('data-column-name')!=data_column_name) {

        column_attr_props[ aria_sort_data_grid_button.parentElement.getAttribute('data-column-name') ] =
          { 'aria-sort' : aria_sort_data_grid_button.parentElement.getAttribute('aria-sort') }

      } else {
        column_attr_props[ data_column_name ] =
          { 'aria-sort' :  sort_states[0] }
      }
    }
  })
  event_target_element.parentElement.setAttribute('aria-sort',sort_states[0] )
  renderTableData(sorted_data,event_target_element.parentElement.parentElement.parentElement)
}


/**
* @param Element data_grid_anchor
*/
function initTableEvents(data_grid_anchor) {
  data_grid_anchor.addEventListener('focus', function (event) {
    event.target.className += ' data-grid-cell-focus'
  })

  data_grid_anchor.addEventListener('blur', function (event) {
    event.target.className = event.target.className.replace(' data-grid-cell-focus','')
  })

  data_grid_anchor.addEventListener('keydown', function (event) {
    dataGridNavigation(event)
  })
}

// VARIABLES

let data_selection = 'Judas Priest'
let sort_attributes = {
  'Year': {'aria-sort':'ascending'},
  'Rating': {'aria-sort':'none'}
}

// PROCEDURE
document.querySelector('#data-grid-title').innerText = data_selection

document.getElementById('data-grid-app').appendChild(
  createDataGridTable(
    TABLE_DATA[ data_selection],
    sort_attributes
  )
)

// DOM EVENT LISTENERS
