<?php
$dirty_param = 'placeholder';
if ($_GET) {
  if (isset($_GET['search'])) {
    $dirty_param = $_GET['search'];
  }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>
    XSS Demo | ARIA Pages
  </title>
  <link rel="stylesheet" href="../../css/atkinson-hyperlegible.css"/>
  <link rel="stylesheet" href="../../css/aria-pages.css"/>
  <link rel="stylesheet" href="../../css/forms.css"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
</head>
<body>
  <div class="flex-row flex-end">
    <form id="login" aria-hidden='true' action="login.php" method="POST">
      <label>username:</label><input id="username" name="username" type="text">
      <br>
      <label>password:</label><input id="password" name="password" type="password">
      <br>
      <input id="submit-login" type="submit" value="sign in">
    </form>
  </div>
  <div id="toolbar" class="flex-row flex-end">
    <button id="sign-in">sign in</button>
  </div>
  <div class="flex-row flex-center">
    <header>
      <p class="code" aria-hidden="true"><span>&lt;</span>a11y<span>&gt;</span></p>
      <span>a bell is a cup<br/>until it is struck</span>
      <h1>XSS demo</h1>
    </header>
  </div>
  <ul id="breadcrumb-list" aria-label="breadcrumb">
    <li><a class="breadcrumb-link" href="../..">ARIA Pages</a><span class="breadcrumb-link-delimiter">&raquo;</span></li>
    <li><a class="breadcrumb-link" href="..">Forms</a><span class="breadcrumb-link-delimiter">&raquo;</span></li>
    <li><span aria-current="page">XSS demo</span></li>
  </ul>
  <main id="main-content">
    <div class="flex-row flex-end">
      <h2>Search</h2>
    </div>
    <div class="flex-row flex-center">
      <form id="site-search" action="index.php" method="GET">
        <label>search</label><input value="<?php print $dirty_param ?>" id="search" name="search">
        <input id="submit-search" type="submit" value="search">
      </form>
    </div>
  </main>
  <div class="flex-row flex-center">
    <div id="pre-footer">
      <h3>
        <span id="search-result-label">search results for: </span>
        <span id="search-result-query"><?php print $dirty_param ?></span>
      </h3>
      <ul id="related-links">

      </ul>
    </div>
  </div>
  <footer></footer>
</body>
<script src="../../lib/forms/login-modal.js"></script>
</html>
