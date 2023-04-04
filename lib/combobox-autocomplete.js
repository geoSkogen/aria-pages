const autocomplete_data = [
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

function createGridRow(value_str,type_str) {
  let row_wrapper = document.createElement('div')
  let row_el = document.createElement('div')
  let value_cell = document.createElement('div')
  let type_cell = document.createElement('div')
  row_el.setAttribute('role','row')
  value_cell.setAttribute('role','gridcell')
  type_cell.setAttribute('role','gridcell')
  value_cell.appendChild( document.createTextNode(value_str))
  type_cell.appendChild( document.createTextNode(type_str))
  row_el.appendChild(value_cell)
  row_el.appendChild(type_cell)
  row_el.className = 'gridrow'
  row_wrapper.appendChild(row_el)
  row_wrapper.className = 'gridrow-wrapper'
  return row_wrapper
}

const text_input_el = document.querySelector('#textbox-autocomplete')
const combobox_el = document.querySelector('#combobox-autocomplete')

if (text_input_el && combobox_el && autocomplete_data) {
  text_input_el.addEventListener( 'input', function (event) {
    combobox_el.innerHTML = '';
    if (event.target.value) {
      const match_pattern = new RegExp('^' + event.target.value,'i')
      const autocomplete_suggestions = []
      let gridrows = []
      console.log(event.target.value)
      autocomplete_data.forEach( (data_row) => {
        if (match_pattern.test(data_row[0])) {
          autocomplete_suggestions.push(data_row)
          combobox_el.appendChild( createGridRow(data_row[0],data_row[1]))
        }
      })
      gridrows = document.querySelectorAll('.gridrow')
      gridrows[gridrows.length-1].className += ' gridrow-last'
    }
  })
}
