

function totalTopOffset(seed_node) {
  let node = seed_node
  let result = 0
  while (node.offsetParent) {
    result += node.offsetTop
    node = node.offsetParent
  }
  return result
}

function bannerTransition(banner) {
  if (window.pageYOffset > scroll_to) {
    if (!scrolled) {
      scrolled = true
      banner.style.position = 'fixed'
      banner.style.backgroundColor = 'white'
      banner.style.top = '-1.5em'
      banner.style.padding = '2em'
    }
  } else {
    if (scrolled) {
      scrolled = false
      banner.style.position = 'static'
      banner.style.backgroundColor = 'transparent'
      banner.style.top = 0
      banner.style.padding = 0
    }
  }
}


const h2 = document.querySelector('h2')
const scroll_to = totalTopOffset(h2) - 20
let scrolled = false

window.addEventListener('scroll', function () {
  bannerTransition(h2)
})
