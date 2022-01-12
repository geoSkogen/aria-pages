/*

// copy-paste this script into the javascript console on the affected page
// empty links will report their href, id, and class (if they exist) in the conosle
// links with no href or an href with no value will report their inner text, id, and class (if they exist) in the conosle
// DOM elements of empty links can be accessed in the console via the anchors_no_text array
// DOM elements of empty links can be accessed in the console via the anchors_no_href array
// call show_passed() to manually inspect the rest of the a tags for quality control

*/

const links = document.querySelectorAll('a')
const anchors_no_href = []
const anchors_no_text = []
const passed = []

links.forEach( (link) => {
  let valid = true

  if (!link.innerText && !link.textContent ||
    /^(\&nbsp\;)+$/.test( link.innerText) ||
    /^(\&nbsp\;)+$/.test( link.textContent) ) {

    valid = false

    if (link.getAttribute('aria-label')) {
      valid = true
    }

    if (link.getAttribute('aria-labelledby')) {
      valid = true
    }

    if (link.querySelector('img') && link.querySelector('img').getAttribute('alt') ) {
      valid = true
    }

    if (!valid) {
      anchors_no_text.push(link)
    }
  }

  if (!link.href ) {
    anchors_no_href.push(link)
    valid = false
  }

  if (link.href='' ) {
    anchors_no_href.push(link)
    valid = false
  }


  if (valid) {
    passed.push(link)
  }
})


if (anchors_no_href.length) {
  anchors_no_href.forEach( (link) => {
    console.log('PLACEHOLDER')
    console.log('text: ' + link.innerText)
    console.log('.' + link.className)
    console.log('#' + link.id)
    console.log('')
  })
}

if (anchors_no_text.length) {
  anchors_no_text.forEach( (link) => {
    console.log('NO TEXT')
    console.log('href: ' + link.href)
    console.log('.' + link.className)
    console.log('#' + link.id)
    console.log('')
  })
}


function show_passed() {
  passed.forEach( (link) => {
    let string = link.innerText ? link.innerText : link.textContent
    console.log('PASSED')
    console.log(string)
    console.log(link.href)
    console.log('.' + link.className)
    console.log('#' + link.id)
    console.log('')
  })
}
