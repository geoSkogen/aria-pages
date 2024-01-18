const form = document.querySelector('#academic-programs-search-block-form')
const select_containers = []
var textnodes = []
const aria_labels = [ 'Degree Type' , 'Degree Level', 'Field of Interest', 'Learning Format' ]
var i = 0

form.childNodes.forEach( (this_node) => {

  if (this_node.nodeType==3 && this_node.textContent.replace('\n','') != '' &&
    // select text nodes which do not consist entirely of whitespace or linebreaks
      !/^(\s+\s+|\n)$/.test( this_node.textContent.replace('\n','') )
    ) {
    textnodes.push(this_node.textContent.replace('\n','').trim())
    this_node.textContent = ''

  } else if (this_node.nodeType==1 && this_node.querySelector('select')) {

    select_containers.push( this_node )

  }
  i++
})

textnodes = [textnodes[0], aria_labels[1], textnodes[1], textnodes[2]]

for (let i = 0; i < select_containers.length; i++) {
  //
  const label = document.createElement('label')

  label.setAttribute('for', select_containers[i].querySelector('select').id )

  select_containers[i].querySelector('select').setAttribute('aria-description', aria_labels[i])
  select_containers[i].querySelector('select').removeAttribute('aria-label')
  select_containers[i].querySelector('select').removeAttribute('title')
  select_containers[i].querySelector('select').querySelector('option').removeAttribute('selected')

  if (i==1) { label.className = 'visually-hidden'}

  label.appendChild( document.createTextNode( textnodes[i] ))
  form.insertBefore( label, select_containers[i] )
}
