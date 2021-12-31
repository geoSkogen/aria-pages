'use strict'

// first academic year's accordion row defaults to collapsed state

document.querySelector('.accordion-item').querySelector('.collapse-toggle').className+=' collapse'
document.querySelector('.accordion-item').querySelector('.collapse-toggle').setAttribute('aria-expanded','false')
document.querySelector('.accordion-item').querySelector('.show').className='collapse'
