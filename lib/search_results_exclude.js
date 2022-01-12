const checkbox = document.createElement('input')
const label = document.createElement('label')
const wrapper = document.createElement('div')

const domain = 'library'

const host = domain + '.pdx.edu'
var excludes = (window.location.href.indexOf('-' + host) > -1) ? true : false
var label_text = excludes ?
  'include ' + domain + ' in search results' : 'exclude ' + domain + ' from search results'
var query_suffix = '%20-' + host

checkbox.type = 'checkbox'
checkbox.style.margin = '0 0.5em'
label.appendChild( document.createTextNode( label_text))
wrapper.style.textAlign = 'right'
wrapper.appendChild(label)
wrapper.appendChild(checkbox)

checkbox.addEventListener( 'input', function (event) {
  let url = excludes ? window.location.href.replace(query_suffix,'') :
    window.location.href + query_suffix

  window.location = url
})

document.querySelector('.search-form').appendChild( wrapper)
document.querySelector('.search-form').querySelector('.form-search').value =
 document.querySelector('.search-form').querySelector('.form-search').value.replace(query_suffix.replace('%20',''), '')
