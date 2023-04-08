'use strict'

// DATA

const table_data = {
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
  const tbody = document.createElement('tbody')

  table.className = 'data-grid-table'
  if (Array.isArray(data)) {
    for (var i = 0; i < data.length; i++) {

      var row_el = document.createElement('tr')
      var el_selector = i ? 'td' : 'th'
      var row_data = data[i]

      row_el.className = 'data-grid-row'

      if (Array.isArray(row_data)) {
        for (var ii = 0; ii < row_data.length; ii++) {

          let cell_el = document.createElement(el_selector)
          let cell_val = row_data[ii]
          let append_cell_text_node = true

          cell_el.className = 'data-grid-cell'
          cell_el.setAttribute('column-index',ii.toString())
          cell_el.setAttribute('tabindex','-1')

          if (i===0) {

            let col_header = data[0][ii]

            if (ii===0) {
              cell_el.setAttribute('tabindex','0')
              cell_el.id = 'data-grid-anchor'
            }
            if (Object.keys(columnwise_atts).indexOf(col_header) > -1) {
              Object.keys(columnwise_atts[col_header]).forEach( (col_header_attr) => {
                cell_el.setAttribute(col_header_attr,columnwise_atts[col_header][col_header_attr])
              })
              let button_span = document.createElement('span')
              button_span.appendChild( document.createTextNode( cell_val))
              button_span.setAttribute('role','button')
              cell_el.appendChild(button_span)
              append_cell_text_node = false
            }
          }
          if (append_cell_text_node) {
            cell_el.appendChild( document.createTextNode(cell_val))
          }
          row_el.appendChild(cell_el)
        }
        tbody.appendChild(row_el)
      }
    }
    table.appendChild(tbody)
  }
  return table
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
    default :

  }
  if (current_cell) {
    current_cell.className = current_cell.className.replace(' data-grid-cell-focus','')
  }
  if (next_cell) {
    next_cell.className += ' data-grid-cell-focus'
  }
}


// VARIABLES

let data_selection = 'Judas Priest'

// PROCEDURE

document.querySelector('#data-grid-app').appendChild(
  createDataGridTable(
    table_data[ data_selection],
    {
      'Year': {'aria-sort':'none'},
      'Rating': {'aria-sort':'none'}
    }
  )
)

document.querySelector('#data-grid-title').innerText = data_selection

document.querySelector('#data-grid-anchor').addEventListener('focus', function (event) {
  event.target.className += ' data-grid-cell-focus'
})

document.querySelector('#data-grid-anchor').addEventListener('blur', function (event) {
  event.target.className = event.target.className.replace(' data-grid-cell-focus','')
})

document.querySelector('#data-grid-anchor').addEventListener('keydown', function (event) {
  dataGridNavigation(event)
})

// DOM EVENT LISTENERS
