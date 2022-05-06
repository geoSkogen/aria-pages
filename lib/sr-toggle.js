'use strict'

function sr_toggle () {
  if (window.innerWidth < 1024) {
    document.querySelectorAll('.ap-sidebar-mobile').forEach( (mobile_sidebar_component) => {
      mobile_sidebar_component.setAttribute('aria-hidden','false')
    })
    document.querySelectorAll('.ap-sidebar').forEach( (mobile_sidebar_component) => {
      mobile_sidebar_component.setAttribute('aria-hidden','true')
    })
  } else {
    document.querySelectorAll('.ap-sidebar-mobile').forEach( (mobile_sidebar_component) => {
      mobile_sidebar_component.setAttribute('aria-hidden','true')
    })
    document.querySelectorAll('.ap-sidebar').forEach( (mobile_sidebar_component) => {
      mobile_sidebar_component.setAttribute('aria-hidden','false')
    })
  }
}

window.addEventListener('resize',sr_toggle)
window.addEventListener('orientationchange',sr_toggle)

sr_toggle()
