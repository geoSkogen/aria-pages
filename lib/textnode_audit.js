
function textnode_audit(seed_el) {

   function is_legal_element(el) {
     const illegal = ['IFRAME','SCRIPT','NOSCRIPT','STYLE','LINK','IMG','VIDEO','']
     return  (illegal.indexOf(el.nodeName)==-1 &&
         illegal.indexOf(el.tagName)==-1) ?
         true : false
   }

   function is_empty_textnode(node) {
     const char_patt = new RegExp(/^(\s*(\\[rnt]{1}\s*)+\s*)$/)
     const blank_patt = new RegExp(/^\s+$/)
     let result = true
     if (!char_patt.test(node.textContent) && !blank_patt.test(node.textContent)) {
       result = false
     }
     return result
   }

   const text_nodes = []
   const text_els = []
   const text_strs = []

   var ancestor_el = seed_el

   el_drilldown(ancestor_el)

   function el_drilldown(current_el) {

     if (is_legal_element(current_el)) {
       console.log('legal element found')
       if (current_el.childNodes.length) {
         console.log('legal parent has child nodes')
         current_el.childNodes.forEach( (node) => {
           //
           if (is_legal_element(node)) {
             console.log('legal child element found')
             if (node.nodeType==3) {
               if (is_empty_textnode(node)) {
                 console.log('empty text node found')
                 console.log(node)
               } else {
                 text_nodes.push(node)
                 text_els.push(node.parentElement)
                 text_strs.push(node.textContent)
                 console.log('text node found')
                 console.log(node)
                 console.log('parent element is:')
                 console.log(node.parentElement)
               }
             } else {
               console.log('element found--drilldown')
               console.log(node)
               el_drilldown(node)
             }
           } else {
             console.log('illegal child element')
             console.log(node)
           }
         })

       } else {
         console.log('legal element has no child nodes')
         console.log(current_el)
         if (current_el.nodeType==3) {
           if (is_empty_textnode(current_el)) {
             console.log('empty text node found')
             console.log(current_el)
           } else {
             text_nodes.push(current_el)
             text_els.push(current_el.parentElement)
             text_strs.push(current_el.textContent)
             console.log('text node found')
             console.log(current_el)
             console.log('parent element is:')
             console.log(current_el.parentElement)
           }
         } else {
           console.log('maximum drilldown depth for')
           console.log(current_el)
         }
       }
     } else {
       console.log('illegal parent element found')
       console.log(current_el)
     }
     //
   }

   return {
     text_nodes : text_nodes,
     text_els : text_els,
     text_strs : text_strs
  }
}


function strip_textnodes(els, textnodes) {
  for (let i = 0; i < els.length; i++) {
    els[i].removeChild(textnodes[i])
  }
}

const dom_obj = textnode_audit(document.body)
strip_textnodes(dom_obj.text_els, dom_obj.text_nodes)
console.log(dom_obj.text_strs)
