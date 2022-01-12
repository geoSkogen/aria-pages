'use strict'

(function () {

const fixed_banner = {}

fixed_banner.h2 = document.querySelector('h2')
fixed_banner.scrolled = false

fixed_banner.init = function () {
  this.scroll_to = this.totalTopOffset(this.h2) - 30
}

fixed_banner.totalTopOffset = function (seed_node) {
  let node = seed_node
  let result = 0
  while (node.offsetParent) {
    result += node.offsetTop
    node = node.offsetParent
  }
  return result
}

fixed_banner.bannerTransition = function () {
  if (window.pageYOffset > this.scroll_to) {
    if (!this.scrolled) {
      this.scrolled = true
      this.h2.style.position = 'fixed'
      this.h2.style.backgroundColor = 'white'
      this.h2.style.top = '-1.5em'
      this.h2.style.padding = '2em'
      this.h2.style.width = '100%'
      this.h2.style.left = '0'
    }
  } else {
    if (this.scrolled) {
      this.scrolled = false
      this.h2.style.position = 'static'
      this.h2.style.backgroundColor = 'transparent'
      this.h2.style.top = 0
      this.h2.style.padding = 0
    }
  }
}

fixed_banner.init()

window.addEventListener('scroll', function (event) {
  fixed_banner.bannerTransition(fixed_banner.h2)
})

})()
