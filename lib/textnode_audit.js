function textnode_audit(ancestor_el) {
   const text_nodes = []
   const text_els = []

   el_drilldown( ancestor_el )

   function el_drilldown(current_el) {

     if (current_el.childNodes) {
       console.log('has nodes')
       current_el.childNodes.forEach( (node) => {
         if (node.nodeType==3) {
           text_nodes.push( node )
           text_els.push( current_el )
           console.log('text node child')
         } else {
           current_el = node
           console.log('tag child')
           el_drilldown(current_el)
         }
         console.log(node)
       })
     } else if (current_el.nodeType==3) {
       text_nodes.push( current_el )
       text_els.push(ancestor_el)
       console.log('text node')
     }
   }

   return {
     text_nodes : text_nodes,
     text_els : text_els
   }
}
