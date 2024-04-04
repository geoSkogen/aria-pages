<?php
if ($_SERVER['REQUEST_METHOD']==='POST') {
  if (!empty($_POST['username']) && !empty($_POST['password'])) {
    print('username and password found');
  }
}
?>
