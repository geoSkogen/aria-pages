(function () {

  function get_featured_image_url () {

    let img_url = ''
    const logo_path = '/themes/custom/pdxd8/psulogo_horiz-spot.svg'

    document.body.className.split(' ').forEach( (class_name) => {
      if (class_name.indexOf('page-node-type-')>-1) {

        switch(class_name.replace('page-node-type-','')) {

          case 'academic-program' :
            img_url += document.querySelector('.paragraph-short-hero') ?
              document.querySelector('.paragraph-short-hero').querySelector('picture').querySelectorAll('source')[0].srcset.split(' ')[0] : logo_path
            break
          case 'blog-article' :
            img_url += document.querySelector('.blog-article-content') ?
              document.querySelector('.blog-article-content').querySelector('picture').querySelectorAll('source')[0].srcset.split(' ')[0] : logo_path
            break
          case 'event' :
            img_url += document.querySelector('.node--type-event') ?
              document.querySelector('.node--type-event').querySelector('img').src : logo_path
            break
          case 'landing-page' :
            let img_el
            if (document.querySelector('.paragraph-large-hero')) {
             img_el = document.querySelector('.paragraph-large-hero')
            } else if (document.querySelector('.paragraph-short-hero')) {
              img_el = document.querySelector('.paragraph-short-hero')
            } else {
              img_el = null
            }
            img_url += img_el ? img_el.querySelector('picture').querySelectorAll('source')[0].srcset.split(' ')[0] : logo_path
            break
          case 'news-article' :
            img_url += document.querySelector('.news-article-content') ?
              document.querySelector('.news-article-content').querySelector('picture').querySelectorAll('source')[0].srcset.split(' ')[0] : logo_path
            break
          default :
            img_url += logo_path
        }
      }
    })
    return img_url.indexOf(window.location.origin)>-1 ? img_url : window.location.origin + img_url
  }

  function create_meta_tag(type) {
    var meta_tag = document.createElement('meta')
    switch(type) {
      case 'title' :
        meta_tag.setAttribute('og:title', document.title)
        break
      case 'image' :
        meta_tag.setAttribute('og:image', get_featured_image_url() )
        break
      default :
    }
    return meta_tag
  }

  document.head.appendChild( create_meta_tag( 'title'))
  document.head.appendChild( create_meta_tag( 'image'))

})()
