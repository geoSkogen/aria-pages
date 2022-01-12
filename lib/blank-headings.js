const headings = []

const blank = []

const empty = []

for (let i = 0; i < 7; i++) {

  if (!i) {
    headings.push( document.querySelectorAll('header') )
  } else {
    headings.push( document.querySelectorAll( 'h' + i.toString() ) )
  }

  headings[headings.length-1].forEach( (h) => {

    if (!h.innerText && !h.textContent ||
      /^(\&nbsp\;)+$/.test( h.innerText) ||
      /^(\&nbsp\;)+$/.test( h.textContent) )  {

        blank.push(h)
    }

    if (!h.innerHTML ||
      /^(\&nbsp\;)+$/.test( h.innerHTML)) {

        empty.push(h)
    }
  })
}

if (blank.length) {
  console.log('')
  console.log('____blank headings____')
  console.log(blank)
  console.log('')
}

if (empty.length) {
  console.log('')
  console.log('____empty headings____')
  console.log(empty)
  console.log('')
}
