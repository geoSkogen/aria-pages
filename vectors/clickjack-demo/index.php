<?php

if ($_SERVER['REQUEST_METHOD']==='GET') {
  if (!empty($_GET['location'])) {
    $dirty_locale = $_GET['location'];
  }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>
    Clickjack Demo | ARIA Pages
  </title>
  <link rel="stylesheet" href="../../css/atkinson-hyperlegible.css"/>
  <link rel="stylesheet" href="../../css/aria-pages.css"/>
  <link rel="stylesheet" href="../../css/forms.css"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
  <style>
    h1 {
      text-align: center;
      margin-top: 1rem;
    }

    div#decoy_a {
      z-index: 1;
      width: 100%;
    }

    div#decoy_b {
      z-index: 1;
      width: 100%;
    }
  </style>
</head>
<body>
  <?php if ($dirty_locale) :?>
    <a id="local-outlets-link" href="deals.php?location=<?php echo $dirty_locale; ?>"><span>see deals at local <?php echo $dirty_locale; ?> outlet stores</span></a>
  <?php endif;?>
  <h1>Clickjacking Example</h1>
  <div id="decoy_a">
    <div class="flex-row flex-center">
      <h2>You've Earned Rewards</h2>
    </div>
    <div class="flex-row flex-center">
      <form method="GET" action="index.html">
        <div class="decoy-form-row">
          <p id="claim-label">$500 in cash rewards:</p>
          <input type="submit" aria-describedby='claim-label' value="Claim Rewards">
        </div>
      </form>
    </div>
  </div>
  <!--<iframe id="target_a" src="http://localhost/aria-pages/forms/index.php?sms_2=true"></iframe>-->

  <div id="decoy_b">
    <div class="flex-row flex-center">
      <h2>The Haiku App</h2>
    </div>
    <div class="flex-row flex-center">
      <!--<form method="GET" action="index.html">-->
        <div class="decoy-form-row">
          <p id="download-label">Version 2 for Ubuntu:</p>
          <a class="download" href="haiku.sh" download aria-describedby="download-label">Download</a>
        </div>
      <!--</form>-->
    </div>
  </div>
  <!--<iframe id="target_b" src="http://localhost/aria-pages/forms/clickjack-demo/download.html"></iframe>-->
  <footer></footer>
</body>
<!--<script src="../../lib/forms/clickjacker.js"></script>-->
</html>
