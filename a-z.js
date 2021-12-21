document.querySelectorAll('.academic-programs-filter-label').forEach( function (label) {
  label.setAttribute('for', label.nextElementSibling.querySelector('.form-select').id)
})


document.querySelector('#edit-field-degree-type').addEventListener('input', function (event) {
  let fragment = event.target.value == 'undergraduate' ? '-un-' : '-'
  let attributes_by_id = {
    'field-label-degree-description' : 'edit-field-degree-type'+ fragment +'target-id',
    'field-label-degree-topic' : 'edit-field-topic-'+ event.target.value +'-target-id'
  }
  Object.keys(attributes_by_id).forEach( function (id) {
    document.querySelector('#' + id).setAttribute( 'for', attributes_by_id[id] )
  })
})
