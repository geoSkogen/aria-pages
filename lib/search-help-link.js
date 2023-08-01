function toggle_display(event) {
  let toggle_state = JSON.parse(event.target.getAttribute('toggle'))
  let target_el = document.querySelector('#' + event.target.getAttribute('target'))
  if (toggle_state) {
    target_el.style.display = 'none'
  } else {
    target_el.style.display = 'block'
  }
  event.target.setAttribute('toggle', (!toggle_state).toString() )
}

function build_hidden_list(text_arr,id_str) {
  const ul = document.createElement('ul')
  text_arr.forEach( (item) => {
    let text_node = document.createTextNode(item)
    let list_item = document.createElement('li')
    list_item.appendChild(text_node)
    ul.appendChild(list_item)
    ul.style.display = 'none'
    ul.id = id_str
  })
  return ul
}

function init_help_link(link_el, inner_text, click_callback, target_el_id) {

  function build_help_icon() {
    let icon = document.createElement('i')
    icon.className = 'fa fa-question-circle'
    icon.appendChild( document.createTextNode(' ') )
    return icon
  }

  link_el.innerText = ''
  link_el.removeAttribute('href')
  link_el.appendChild( build_help_icon() )
  link_el.appendChild( document.createTextNode(inner_text) )
  link_el.setAttribute('target',target_el_id)
  link_el.setAttribute('toggle','false')
  link_el.addEventListener('click', click_callback )
  return link_el
}

const search_help_strings = [
   'Search looks for exact, case-insensitive keywords; keywords shorter than a minimum length are ignored.',
   'Use upper-case OR to get more results. Example: cat OR dog (content contains either "cat" or "dog").',
   'You can use upper-case AND to require all words, but this is the same as the default behavior. Example: cat AND dog (same as cat dog, content must contain both "cat" and "dog").',
   'Use quotes to search for a phrase. Example: "the cat eats mice".',
   'You can precede keywords by - to exclude them; you must still have at least one "positive" keyword. Example: cat -dog (content must contain cat and cannot contain dog).'
  ]

const search_help_link = init_help_link( document.querySelector('#edit-help-link'), ' Search help', toggle_display, 'search-help-info' )

document.querySelector('#search-form').parentElement.appendChild( build_hidden_list( search_help_strings,'search-help-info' ) )
