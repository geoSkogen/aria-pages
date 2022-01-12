
const tickbox = document.createElement('input')
const label = document.createElement('label')
const wrapper = document.createElement('div')
var excludes = (window.location.href.indexOf('-library.pdx') > -1) ? true : false
var label_text = excludes ?
  'include library in search results ' : 'exclude library from search results'
tickbox.type = 'checkbox'
label.appendChild( document.createTextNode( label_text))
wrapper.appendChild(label)
wrapper.appendChild(tickbox)

tickbox.addEventListener( 'input', function (event) {
  let url = excludes ? window.location.href.replace('%20-library.pdx','') :
    window.location.href + '%20-library.pdx'

  window.location = url
})

document.querySelector('.search-form').appendChild( wrapper)
