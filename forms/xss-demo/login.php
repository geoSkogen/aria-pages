<?php
if ($_SERVER['REQUEST_METHOD']==='POST') {
  if (isset($_POST['username']) && isset($_POST['password'])) {
    print('username and password found');
  }
}
?>
