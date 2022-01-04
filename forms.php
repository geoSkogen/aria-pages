<?php
//
$field_names = ['first_name'=>'First Name', 'last_name'=>'Last Name', 'email'=>'Email', 'id'=>'ID'];
$err_list = [];
$post_data = [];
if (!empty($_POST)) {
  foreach( $field_names as $name => $label) {
    if (!empty($_POST[ $name ])) {
      $post_data[ $name ] = $_POST[ $name ];
    } else {
      $err_list[] = $name;
    }
  }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>
  </title>

  <link rel="stylesheet" href="css/aria-pages.css"/>

  <!--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">-->

  <!--<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
      integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
      crossorigin="anonymous"/> -->

  <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">-->

  <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>-->

  <!--<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>-->

  <!-- <script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script> -->

  /opt/cisco/anyconnect/bin/vpnui

</head>
<body>
  <div id="app">
    <h2>sumit dis form</h2>
    <form id="alert-test" method="POST" action="forms.php">
      <?php
      foreach( $field_names as $name => $label) {
        $val = !empty($post_data[ $name ]) ? $post_data[ $name ] : '';
      ?>
      <label id="<?php echo $name . '_label'; ?>"
              class="classy_label"
              for="<?php echo $name . '_input'; ?>"><?php echo $label; ?></label>
      <input id="<?php echo $name . '_input'; ?>"
             name="<?php echo $name; ?>"
             value="<?php echo $val; ?>"
             type="text"
             class="classy_input"
             />
      <br/>
      <?php
      }
      ?>

      <label for="season_input" >I am a</label>
      <select id="season_input" title="Bones Are Money" aria-description="I think you should leave now.">
        <option value="spring">spring</option>
        <option value="summer">summer</option>
        <option value="fall">winter</option>
        <option value="winter">fall</option>
      </select>
      <input type="submit" value="sumit" id="submit_button"
             style="height:1px;width:1px;opacity:0;"
      />
    </form>
    <button id="validate_button">sumit</button>
    <p id="error_field"></p>

  </div>
</body>

<script type="application/javascript">

document.querySelector('#validate_button').addEventListener('click', function (event) {
  let valid = {};
  let invalid = [];
  console.log('validator is running')

  document.querySelectorAll('.classy_input').forEach( (node) => {
    var word = new RegExp(/^\w[\w\s]+\w$/)
    console.log(node.value)
    if (word.test(node.value)) {
      valid[node.name] = node.value
    } else {
      invalid.push(node.name)
    }
  })

  if (invalid.length) {
    console.log(invalid)
    for (let i = 0; i < invalid.length; i++) {
      document.querySelector('#' + invalid[i] + '_input').placeholder = 'pukeckt'
      document.querySelector('#' + invalid[i] + '_input').className += (document.querySelector('#' + invalid[i] + '_input').className.indexOf('invalid')===-1) ? ' invalid' : ''
      document.querySelector('#' + invalid[i] + '_label').setAttribute(
        'aria-label',
        document.querySelector('#' + invalid[i] + '_label').innerHTML +
        ' cannot be empty'
      )
    }
    console.log('What the fukc')
    document.querySelector('#error_field').innerHTML = "You PooKect the Fiquer"
    document.querySelector('#error_field').setAttribute('role','alert')
    var timemout = setTimeout( function () { document.querySelector('.invalid').focus() }, 200 )
  } else {
    for (let i = 0; i < document.querySelectorAll('.classy_label').length; i++) {
      document.querySelectorAll('.classy_label')[i].removeAttribute('aria-label')
      document.querySelectorAll('.classy_label')[i].className = document.querySelectorAll('.classy_label')[i].replace(' invalid', '')
    }
    document.querySelector('#error_field').innerHTML = ""
    document.querySelector('#error_field').removeAttribute('role')
  }
})
</script>
</html>
