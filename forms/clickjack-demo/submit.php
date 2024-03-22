<?php
if ($_SERVER['REQUEST_METHOD']==='POST') {

  if ($_POST['sms']) {
    file_put_contents(__DIR__ . "/uno.txt" ,'sms_enabled:' . $_POST['sms']);
  } else {
    file_put_contents(__DIR__ . "/uno.txt" ,'sms_enabled:false');
  }
}
