
const article_wrappers = document.querySelectorAll('.events_horizontal__item')

article_wrappers.forEach( (wrapper_node) => {
  let relshell = document.createElement('div')
  let tooltip = document.createElement('div')
  let link_node = wrapper_node.querySelector('.upcoming_event_horizontal__add_calendar').querySelector('a')

  let title_fragment = wrapper_node.querySelector('h3').innerText.split(':')[0]
  let tooltip_text = document.createTextNode('ADD ' + title_fragment + ' TO MY CALENDAR ')

  relshell.style.position =  'relative'
  tooltip.style.position = 'absolute'
  tooltip.style.zIndex = '800'
  tooltip.style.opacity = '0'
  tooltip.style.backgroundColor = '#6d8d23'
  tooltip.style.color = 'white'
  tooltip.style.fontWeight = '800'
  tooltip.className = 'add_to_calendar_tooltip'
  tooltip.style.padding = '1em'
  tooltip.style.top = '-1em'
  tooltip.style.width = '200px'

  relshell.appendChild(tooltip)
  tooltip.appendChild(tooltip_text)

  link_node.insertBefore(relshell,link_node.querySelector('.placeholder'))

  link_node.addEventListener('focus', function (event) {

    fadeElement(wrapper_node.querySelector('.add_to_calendar_tooltip'),true, 0, 0.85)
    fadeElement(link_node.querySelector('.placeholder'), false, 0.33, 1)
  })

  link_node.addEventListener('blur', function (event) {

    fadeElement(wrapper_node.querySelector('.add_to_calendar_tooltip'),false, 0, 0.85)
    fadeElement(link_node.querySelector('.placeholder'), true, 0.33, 1)
  })
})

function fadeElement(dom_node, appear, floor, ceiling) {
  var opac_val, increment
  var transition = {}
  if (appear) {
   opac_val = floor
   increment = 0.025
   transition = setInterval( function () {
     opac_val += increment
     dom_node.style.opacity = opac_val
     if (opac_val >= ceiling) {
       clearInterval(transition)
     }
   }, 25)
  } else {
    opac_val = ceiling
    increment = -0.025
    transition = setInterval( function () {
      opac_val += increment
      dom_node.style.opacity = opac_val
      if (opac_val <= floor) {
        clearInterval(transition)
      }
    }, 25)
  }
}
