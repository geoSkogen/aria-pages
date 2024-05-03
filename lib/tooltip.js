document.querySelectorAll('.tooltip-link').forEach( (tooltip_link) => {
  /*
  tooltip_link.addEventListener('mouseover', function (event) {
    document.getElementById(event.target.getAttribute('aria-describedby')).classList.remove('hidden')
  })

  tooltip_link.addEventListener('focus', function (event) {
    document.getElementById(event.target.getAttribute('aria-describedby')).classList.remove('hidden')
  })
  */
  tooltip_link.addEventListener('touchstart', function (event) {
    document.getElementById(event.target.getAttribute('aria-describedby')).classList.remove('hidden')
  })

  /*
  tooltip_link.addEventListener('mouseout', function (event) {
    document.getElementById(event.target.getAttribute('aria-describedby')).classList.add('hidden')
  })
  */

  tooltip_link.addEventListener('blur', function (event) {
    document.getElementById(event.target.getAttribute('aria-describedby')).classList.add('hidden')
  })

  /*
  tooltip_link.addEventListener('touchend', function (event) {
    document.getElementById(event.target.getAttribute('aria-describedby')).classList.add('hidden')
  })
  */
})

document.body.addEventListener('keydown', function (event) {
  if (event.code==='Escape') {
    document.querySelectorAll('.tooltip-link').forEach( (tooltip_link) => {
      if (document.getElementById(tooltip_link.getAttribute('aria-describedby')).className.indexOf('hidden')>=0) {
        document.getElementById(tooltip_link.getAttribute('aria-describedby')).classList.add('hidden')
      }
    })
  }
})
