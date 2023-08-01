const translator_widget_observer = new MutationObserver( function () {
  if (document.querySelector('#google_translate_element .goog-logo-link img')) {
    document.querySelector('#google_translate_element .goog-logo-link img').src = '../img/gtranslate.png'
    document.querySelector('#google_translate_element .goog-logo-link').childNodes[1].textContent = ''
    setTranslateElementTabIndices(-1)
    translator_widget_observer.disconnect()
  }
})

translator_widget_observer.observe(
  document.querySelector('#google_translate_element'),
  { childList: true, subtree: true }
)

document.querySelector('#open_translate_link').addEventListener('click', function () {
  const max_bottom_val = 0
  var bottom_prop = -13
  var interval = setInterval( function () {
    //console.log('bottom prop value is ' + bottom_prop.toString())
    document.querySelector('#google_translate_widget').style.bottom = bottom_prop.toString() + 'rem'
    bottom_prop+=0.2
    if (bottom_prop>=max_bottom_val) {
      clearInterval(interval)
      setTranslateElementTabIndices(0)
      if (document.querySelector('#google_translate_element .goog-te-combo')) {
        document.querySelector('#google_translate_element .goog-te-combo').focus()
      }
    }
  }, 5)
})

document.querySelector('#close_translate_link').addEventListener('click', function () {
  const max_bottom_val = -13
  var bottom_prop = 0
  var interval = setInterval( function () {
    //console.log('bottom prop value is ' + bottom_prop.toString())
    document.querySelector('#google_translate_widget').style.bottom = bottom_prop.toString() + 'rem'
    bottom_prop-=0.2
    if (bottom_prop<=max_bottom_val) {
      clearInterval(interval)
      setTranslateElementTabIndices(-1)
    }
  }, 5)
})


function setTranslateElementTabIndices(index) {
  let tabindex_val = index.toString()
  if (document.querySelector('#google_translate_element .goog-logo-link')) {
    document.querySelector('#google_translate_element .goog-logo-link').setAttribute('tabindex',tabindex_val)
  }
  if (document.querySelector('#google_translate_element .goog-te-combo')) {
    document.querySelector('#google_translate_element .goog-te-combo').setAttribute('tabindex',tabindex_val)
  }
  document.querySelector('#close_translate_link').setAttribute('tabindex',tabindex_val)
}
