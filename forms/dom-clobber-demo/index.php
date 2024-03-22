<?php
/**
* The 'dirty' parameter prints a GET query on the DOM without sanitizing it.
* DEMOS
* 1) Visit the URI /aria-pages/forms/xss-demo/?search=%3Cscript%3Ealert%28%27hello%20XSS%27%29%3C%2Fscript%3E.
* 2)
*/
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
    DOM Clobber Demo | ARIA Pages
  </title>
  <link rel="stylesheet" href="../../css/atkinson-hyperlegible.css"/>
  <link rel="stylesheet" href="../../css/aria-pages.css"/>
  <link rel="stylesheet" href="../../css/forms.css"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
</head>
<body>
  <h1>DOMClobber Example</h1>
  <div id="search-bar">
    <div class="flex-row flex-center content-wrapper">
      <form id="site_search" action="index.php" method="GET">
        <label>search</label><input value="<?php print $dirty_param ?>" id="search" name="search">
        <input id="submit-search" type="submit" value="search">
      </form>
    </div>
  </div>
  <div class="flex-row flex-center">
    <div id="search-results">
      <h3>
        <span id="search-result-label">search results for: </span>
        <span id="search-result-query"><?php print $dirty_param ?></span>
      </h3>
      <ol id="indexed-search-results">

      </ol>
    </div>
  </div>
  <div class="flex-row flex-center">
    
  </div>

  <footer></footer>
</body>
<script src="../../lib/forms/domclobber.js"></script>
</html>
