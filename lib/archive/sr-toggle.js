'use strict'

function sr_toggle () {
  if (window.innerWidth <= 1048 && window.innerWidth >= 720) {
    document.querySelector('#college-dept-wrapper-aux').setAttribute('aria-hidden','false')
    document.querySelector('#college-dept-wrapper').setAttribute('aria-hidden','true')
  } else {
    document.querySelector('#college-dept-wrapper-aux').setAttribute('aria-hidden','true')
    document.querySelector('#college-dept-wrapper').setAttribute('aria-hidden','false')
  }
}

window.addEventListener('resize',sr_toggle)
window.addEventListener('orientationchange',sr_toggle)

sr_toggle()
