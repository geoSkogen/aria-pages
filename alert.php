<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>
  </title>

  <link rel="stylesheet" href="aria-pages.css"/>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <!--<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
      integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
      crossorigin="anonymous"/> -->

  <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">-->

  <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>-->

  <!--<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>-->

  <!-- <script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script> -->


</head>
<body>
  <div id="app">
    <h1>Test Page</h1>
    <div class="flex-row flex-center">
      <p>This is some content</p>
    </div>
    <header>
      <div class="flex-row flex-center">
        <video id="myvideo" src="simple.mp4" muted="true" loop="true" controls autoplay="true">
        </video>
      </div>
    </header>
    <div class="flex-row flex-center">
      <div class="relshell">
        <p id="relhead">Abso-lutely</p>
      </div>
    </div>
    <nav>
      <h2>
        List A Links
      </h2>
      <div class="flex-row flex-center">
        <ul>
          <li>animal</li>
          <li>vegetable</li>
          <li>mineral</li>
        </ul>
      </div>
    </nav>
  </div>
</body>
<script type="application/javascript">
  var delay = setTimeout( function () {
    var period
    const banner = document.createElement('header')
    const h2 = document.createElement('h2')
    h2.appendChild( document.createTextNode('this is a test of the alert system') )
    banner.appendChild(h2)
    banner.id = 'alert-banner'
    banner.style.display = 'block'
    document.body.insertBefore(banner, document.querySelector('#app'))
    period = setTimeout( function () {
      banner.style.display = 'none'
    }, 10000)

  }, 5000)
</script>
</html>
