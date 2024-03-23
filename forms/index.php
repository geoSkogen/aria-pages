<?php

$sms_checked = '';
$sms_val = '';
$sms_2_checked = '';
$sms_2_val = '';
$sms_3_checked = '';
$sms_3_val = '';
$sms_3_bool_str = 'false';

if ($_SERVER['REQUEST_METHOD']==='GET') {

  if ($_GET['sms']==='true') {
    $sms_checked = 'checked';
  //  $sms_val = 'value="true"';
  }

  if ($_GET['sms_2']==='true') {
  //  $sms_2_val = 'value="true"';
    $sms_2_checked = 'checked';
  }

  if ($_GET['sms_3']==='true') {
  //  $sms_3_val = 'value="true"';
    $sms_3_bool_str = 'true';
  }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>
    Forms | ARIA Pages
  </title>
  <link rel="stylesheet" href="../css/atkinson-hyperlegible.css"/>
  <link rel="stylesheet" href="../css/aria-pages.css"/>
  <link rel="stylesheet" href="../css/forms.css"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
</head>
<body>
<div class="flex-row flex-center">
<div class="content-wrapper">

  <div id="login-wrapper" class="flex-row flex-end">
    <div id="login" aria-hidden="true" role="dialog" aria-modal="true">
      <form action="xss-demo/login.php" method="POST">
        <label for="username">username:</label><input id="username" name="username" type="text">
        <br>
        <label for="password">password:</label><input id="password" name="password" type="password">
        <br>
        <input id="submit-login" type="submit" value="sign in">
      </form>
    </div>
  </div>

  <div id="toolbar" class="flex-row flex-end">
    <button id="sign-in" aria-expanded="false" aria-controls="login">sign in</button>
  </div>

  <div class="flex-row flex-center">
    <header>
      <p class="code" aria-hidden="true"><span>&lt;</span>a11y<span>&gt;</span></p>
      <span>a bell is a cup<br/>until it is struck</span>
      <h1>Forms</h1>
    </header>
  </div>

  <ul id="breadcrumb-list" aria-label="breadcrumb">
    <li><a class="breadcrumb-link" href="../..">ARIA Pages</a><span class="breadcrumb-link-delimiter">&raquo;</span></li>
    <li><span aria-current="page">Form</span></li>
  </ul>

  <main id="main-content">
    <div class="flex-row flex-end">
      <h2>Search</h2>
    </div>
    <div class="flex-row flex-end">
      <form id="site-search" action="xss-demo/index.php" method="GET">
        <label for="serach">search</label><input placeholder="enter keywords" id="search" name="search">
        <input id="submit-search" type="submit" value="search">
      </form>
    </div>
    <div class="flex-row flex-center">
      <h2>Form</h2>
    </div>
    <div class="flex-row flex-center">
      <form id="aria-form" action="clickjack-demo/submit.php" method="POST">
        <div class="field-clear flex-row flex-start">
          <label for="enable-notifications">Enable notifications 1:</label>
          <input id="enable-notifications" type="checkbox" role="switch" class="switch" name="sms" <?php echo $sms_checked; ?> <?php echo $sms_val; ?> >
        </div>
        <div class="field flex-row flex-start">
          <span class="input-label" id="enable-notifications-2-label">Enable notifications 2:</span>
          <label id="enable-notifications-2-toggle-switch-label" class="toggle-switch-label" for="enable-notifications-2">
            <input id="enable-notifications-2" type="checkbox" role="switch" class="toggle-switch" aria-labelledby="enable-notifications-2-label" name="sms_2" <?php echo $sms_2_checked; ?> <?php echo $sms_2_val; ?> >
            <div id="enable-notifications-2-toggle-slider" class="toggle-slider round"></div>
          </label>
        </div>
        <div class="field flex-row flex-start">
          <span class="input-label" id="enable-notifications-3-label">Enable notifications 3:</span>
          <div id="enable-notifications-3-toggle-switch-label" class="toggle-switch-label" data-checked="<?php echo $sms_3_bool_str; ?>">
            <div id="enable-notifications-3-toggle-slider" role="switch" class="toggle-slider round ghost-toggle" tabindex="0" aria-labelledby="enable-notifications-3-label"></div>
          </div>
          <br/>
          <input id="enable-notifications-3" type="checkbox" class="ghost-toggle-switch" name="sms_3" aria-hidden="true" <?php echo $sms_3_checked; ?> <?php echo $sms_3_val; ?> >
        </div>
        <input type="submit" value="save changes">
      </form>
    </div>
  </main>

  <footer></footer>
</div>
</div>
</body>
<script src="../lib/forms/login-modal.js"></script>
<script src="../lib/forms/data-toggles.js"></script>

</html>
