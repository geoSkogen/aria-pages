document.querySelectorAll('.tooltip-link').forEach( (tooltip_link) => {
  tooltip_link.addEventListener('mouseover', function (event) {
    document.getElementById(event.target.getAttribute('aria-describedby')).classList.remove('hidden')
  })

  tooltip_link.addEventListener('focus', function (event) {
    document.getElementById(event.target.getAttribute('aria-describedby')).classList.remove('hidden')
  })

  tooltip_link.addEventListener('mouseout', function (event) {
    document.getElementById(event.target.getAttribute('aria-describedby')).classList.add('hidden')
  })

  tooltip_link.addEventListener('blur', function (event) {
    document.getElementById(event.target.getAttribute('aria-describedby')).classList.add('hidden')
  })
})
