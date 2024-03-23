<?php
if ($_SERVER['REQUEST_METHOD']==='POST') {
  print_r($_POST);
  if ($_POST['sms']) {
    file_put_contents(__DIR__ . "/uno.txt" ,'sms_enabled:' . $_POST['sms']);
  } else {
    file_put_contents(__DIR__ . "/uno.txt" ,'sms_enabled:false');
  }

  if ($_POST['sms_2']) {
    file_put_contents(__DIR__ . "/dos.txt" ,'sms_enabled:' . $_POST['sms_2']);
  } else {
    file_put_contents(__DIR__ . "/dos.txt" ,'sms_enabled:false');
  }

  if ($_POST['sms_3']) {
    file_put_contents(__DIR__ . "/tres.txt" ,'sms_enabled:' . $_POST['sms_3']);
  } else {
    file_put_contents(__DIR__ . "/tres.txt" ,'sms_enabled:false');
  }
}
?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
  <a href="../index.php">go back</a>
</body>
</html>
