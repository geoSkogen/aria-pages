<?php
if ($_SERVER['REQUEST_METHOD']==='POST') {
  print_r($_POST);
  if ($_POST['sms']) {
    file_put_contents(__DIR__ . "/uno.txt" ,'sms:' . $_POST['sms'] . "\r\n" . strval(time()));
  } else {
    file_put_contents(__DIR__ . "/uno.txt" ,'sms:off' . "\r\n" . strval(time()));
  }

  if ($_POST['sms_2']) {
    file_put_contents(__DIR__ . "/dos.txt" ,'sms:' . $_POST['sms_2'] . "\r\n" . strval(time()));
  } else {
    file_put_contents(__DIR__ . "/dos.txt" ,'sms:off' . "\r\n" . strval(time()));
  }

  if ($_POST['sms_3']) {
    file_put_contents(__DIR__ . "/tres.txt" ,'sms:' . $_POST['sms_3'] . "\r\n" . strval(time()));
  } else {
    file_put_contents(__DIR__ . "/tres.txt" ,'sms:off' . "\r\n" . strval(time()));
  }
}
?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
  <p>
    <a href="../index.php">go back</a>
  </p>
</body>
</html>
