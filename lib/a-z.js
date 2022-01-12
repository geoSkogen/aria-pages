document.querySelectorAll('.academic-programs-filter-label').forEach( function (label) {
  let select_field = label.nextElementSibling.querySelector('.form-select')
  // for a-z page only - ensure the labels' 'for' attributes match the default selection
  if (document.querySelector('#edit-field-degree-type') &&
      document.querySelector('#edit-field-degree-type').value=='undergraduate' &&
      label.id.indexOf('prefix')==-1) {
    select_field = label.nextElementSibling.nextElementSibling.querySelector('.form-select')
  }
  label.setAttribute('for', select_field.id)
  label.style.margin = '0 0 0 0'
})
// fix for a-z page only
if (document.querySelector('#edit-field-degree-type')) {
  // ensure the 'for' attributes of these labels are in-sync with the changing inputs
  document.querySelector('#edit-field-degree-type').addEventListener('input', function (event) {
    let fragment = event.target.value == 'undergraduate' ? '-un-' : '-'
    let attributes_by_id = {
      'field-label-degree-type' : 'edit-field-degree-type'+ fragment +'target-id',
      'field-label-topic' : 'edit-field-topic-'+ event.target.value +'-target-id'
    }
    Object.keys(attributes_by_id).forEach( function (id) {
      document.querySelector('#' + id).setAttribute( 'for', attributes_by_id[id] )
    })
  })
}
