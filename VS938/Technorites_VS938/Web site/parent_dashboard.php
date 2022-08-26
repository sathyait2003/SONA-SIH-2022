<?php
session_start();
// $feed_id =  (int)$_POST['feedback_id'];
// $ward_id =  (int)$_POST['ward_id'];
$feed_id=123;
$ward_id="234";
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Pratikriiya Vishleshan</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="all,follow">
    <!-- Google fonts - Roboto -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700">
    <!-- Choices CSS-->
    <link rel="stylesheet" href="vendor/choices.js/public/assets/styles/choices.min.css">
    <!-- Custom Scrollbar-->
    <link rel="stylesheet" href="vendor/overlayscrollbars/css/OverlayScrollbars.min.css">
    <!-- theme stylesheet-->
    <link rel="stylesheet" href="css/style.default.css" id="theme-stylesheet">
    <!-- Custom stylesheet - for your changes-->
    <link rel="stylesheet" href="css/custom.css">
    <!-- Favicon-->
    <link rel="shortcut icon" href="img/favicon.ico">
    <!-- Tweaks for older IEs-->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script><![endif]-->
        
    <style>
        /* Styling the Body element i.e. Color,
          Font, Alignment */
        body {
          background-color: #e9ecef;
          font-family: Verdana;
          text-align: center;
        }
        h1 {
          font-family: "Inter", sans-serif;
        }
        /* Styling the Form (Color, Padding, Shadow) */
        .form_questions {
          /* background-color:#f8f9fa; */
          max-width: 800px;
          margin: 30px auto;
          margin-bottom: 1px;
          /* padding: 30px 25px; */
          /* box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.5); */
        }
        /* Styling form-control Class */
        .form-control {
          text-align: left;
          margin-bottom: 25px;
          background-color: #f8f9fa;
          padding: 30px 25px;
          border-radius: 8px;
          box-shadow: 3px 3px 32px -17px rgba(0, 0, 0, 0.5);
        }
        /* Styling form-control Label */
        .radio_ label {
          display: block;
          margin-bottom: 10px;
        }
        /* Styling form-control input,
          select, textarea */
        .form-control input,
        .form-control select,
        .form-control textarea {
          border-radius: 2px;
          font-family: inherit;
          display: block;
        }
        /* Styling form-control Radio
          button and Checkbox */
        .form-control input[type="radio"],
        .form-control input[type="checkbox"] {
          display: inline-block;
          width: auto;
        }
        .radio_ {
          padding: 15px;
        }
        .question {
          display: block;
          margin-bottom: 15px;
        }
        .submit_button {
          margin-top: 10px;
          background-color: #52be73;
          border: none;
          color: white;
          font-family: inherit;
          font-size: 20px;
          padding: 15px 25px;
          border-radius: 5px;
          box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.75);
          cursor: pointer;
        }
        .last_question {
          margin-bottom: 5px;
        }
        .expression {
          margin-bottom: 10px;
          color: #f8d210;
          text-shadow: 0px 0px 5px rgb(250, 222, 82, 0.81);
        }
        .slider {
          -webkit-appearance: none;
          width: 100%;
          height: 16px;
          background: #d3d3d3;
          outline: none;
          opacity: 0.7;
          -webkit-transition: 0.2s;
          transition: opacity 0.2s;
        }
        .slider:hover {
          opacity: 1;
        }
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 25px;
          height: 25px;
          background: #52be73;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 25px;
          height: 25px;
          background: #52be73;
          cursor: pointer;
        }
      </style>
       <script>
      var colorChoice = ["#e0301e", "#eb8c00", "#F8D210", "#5cf088", "#16e955"];
      var shodowChoice = [
        " 0px 0px 5px rgb(231, 91, 75,0.81)",
        "0px 0px 5px rgb(255, 173, 51,0.81)",
        "0px 0px 5px rgb(250, 222, 82,0.81)",
        " 0px 0px 5px rgb(162, 246, 187,0.81)",
        "0px 0px 5px rgb(92, 240, 136,0.81)",
      ];
      var textChoice = ["Poor", "Below Average", "Average", "Good", "Exellent"];
      function feedbackValue(typeId, questionId) {
        document.getElementById(`feedbackQuestion${typeId}`).innerHTML =
          textChoice[questionId - 1];
        document.getElementById(`feedbackQuestion${typeId}`).style.color =
          colorChoice[questionId - 1];
        document.getElementById(`feedbackQuestion${typeId}`).style.textShadow =
          shodowChoice[questionId - 1];
      }
    </script>

</head>

<body>
    <!-- Side Navbar -->
    <nav class="side-navbar">
        <!-- Sidebar Header    -->
        <div class="sidebar-header d-flex align-items-center justify-content-center p-3 mb-3">
            <!-- User Info-->
            <div class="sidenav-header-inner text-center"><img class="img-fluid rounded-circle avatar mb-3"
                    src="img/All_India_Council_for_Technical_Education_logo-removebg-preview.png" alt="person">
                <h2 class="h5 text-white text-uppercase mb-0">Pankaj Porwal</h2>
                <p class="text-sm mb-0 text-muted">Parent</p>
            </div>
            <!-- Small Brand information, appears on minimized sidebar--><a class="brand-small text-center"
                href="index.html">
                <p class="h1 m-0">PV</p>
            </a>
        </div>
        <!-- Sidebar Navigation Menus--><span
            class="text-uppercase text-gray-500 text-sm fw-bold letter-spacing-0 mx-lg-2 heading">Main</span>
        <ul class="list-unstyled">
            <li class="sidebar-item"><a class="sidebar-link" href="Faculty_dashboard.html">
                    <svg class="svg-icon svg-icon-sm svg-icon-heavy me-xl-2">
                        <use xlink:href="#real-estate-1"> </use>
                    </svg>Home </a></li>
            <li class="sidebar-item"><a class="sidebar-link" href="Profile">
                    <svg class="svg-icon svg-icon-sm svg-icon-heavy me-xl-2">
                        <use xlink:href="#user-1"> </use>
                    </svg>Profiel </a></li>        

    </nav>
    <div class="page">
        <!-- navbar-->
        <header class="header">
            <nav class="navbar">
                <div class="container-fluid">
                    <div class="d-flex align-items-center justify-content-between w-100">
                        <div class="d-flex align-items-center"><a
                                class="menu-btn d-flex align-items-center justify-content-center p-2 bg-gray-900"
                                id="toggle-btn" href="#">
                                <svg class="svg-icon svg-icon-sm svg-icon-heavy text-white">
                                    <use xlink:href="#menu-1"> </use>
                                </svg></a><a class="navbar-brand ms-2" href="index.html">
                                <div class="brand-text d-none d-md-inline-block text-uppercase letter-spacing-0"><span
                                        class="text-white fw-normal text-xs">Pratikriya </span><strong
                                        class="text-primary text-sm">Vishleshan</strong></div>
                            </a></div>
                        <ul class="nav-menu mb-0 list-unstyled d-flex flex-md-row align-items-md-center">

                            <!-- Log out-->
                            <li class="nav-item"><a class="nav-link text-white text-sm ps-0" href="login.html"> <span
                                        class="d-none d-sm-inline-block">Logout</span>
                                    <svg class="svg-icon svg-icon-xs svg-icon-heavy">
                                        <use xlink:href="#security-1"> </use>
                                    </svg></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

        <div id="Facultyflex" class="card-body ">
            <h1>PARENTS FEEDBACK FORM</h1>
            <form id="form" action="" method="GET">
                <div class="form_questions">
                  <div class="form-control">
                    <label class="question">
                      1. Are you happy with the progress of your ward in academics?
                    </label>
                    <div class="radio_">
                      <div class="expression" id="feedbackQuestion1">Average</div>
                      <label for="question_1"
                        ><input
                          class="slider"
                          type="range"
                          id="question_1"
                          name="question_1"
                          min="1"
                          max="5"
                          onchange="feedbackValue(1,this.value)"
                      /></label>
                    </div>
                  </div>
                  <div class="form-control">
                    <label class="question">
                      2. How do you rate the infrastructural facilities provided by the
                      institute?
                    </label>
                    <div class="radio_">
                      <div class="expression" id="feedbackQuestion2">Average</div>
                      <label for="question_2"
                        ><input
                          class="slider"
                          type="range"
                          id="question_2"
                          name="question_2"
                          min="1"
                          max="5"
                          onchange="feedbackValue(2,this.value)"
                      /></label>
                    </div>
                  </div>
                  <div class="form-control">
                    <label class="question">
                      3. Are you happy with the curricular (Add-on Courses/Seminar/Guest
                      Expert Lectures) & Extra-Curricular Activities organized by the
                      Institute?
                    </label>
                    <div class="radio_">
                      <div class="expression" id="feedbackQuestion3">Average</div>
                      <label for="question_3"
                        ><input
                          class="slider"
                          type="range"
                          id="question_3"
                          name="question_3"
                          min="1"
                          max="5"
                          onchange="feedbackValue(3,this.value)"
                      /></label>
                    </div>
                  </div>
                  <div class="form-control">
                    <label class="question">
                      4. Are you satisfied with the Administration of Institute?
                    </label>
                    <div class="radio_">
                      <div class="expression" id="feedbackQuestion4">Average</div>
                      <label for="question_4"
                        ><input
                          class="slider"
                          type="range"
                          id="question_4"
                          name="question_4"
                          min="1"
                          max="5"
                          onchange="feedbackValue(4,this.value)"
                      /></label>
                    </div>
                  </div>
                  <div class="form-control">
                    <label class="question">
                      5. Are you satisfied with the student's discipline of the Institute?
                    </label>
                    <div class="radio_">
                      <div class="expression" id="feedbackQuestion5">Average</div>
                      <label for="question_5"
                        ><input
                          class="slider"
                          type="range"
                          id="question_5"
                          name="question_5"
                          min="1"
                          max="5"
                          onchange="feedbackValue(5,this.value)"
                      /></label>
                    </div>
                  </div>
                  <div class="form-control last_question">
                    <label class="question">
                      6. Does your ward/Institute regularly inform you about his/her
                      performance?
                    </label>
                    <div class="radio_">
                      <div class="expression" id="feedbackQuestion6">Average</div>
                      <label for="question_6"
                        ><input
                          class="slider"
                          type="range"
                          id="question_6"
                          name="question_6"
                          min="1"
                          max="5"
                          onchange="feedbackValue(6,this.value)"
                      /></label>
                    </div>
                  </div>
                </div>
                <button class="submit_button" type="submit" value="submit" name="submit">Submit</button>
              </form>
        </div>
        <!-- Header Section-->
    </div>
    <!-- JavaScript files-->
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="vendor/chart.js/Chart.min.js"></script>
    <script src="vendor/just-validate/js/just-validate.min.js"></script>
    <script src="vendor/choices.js/public/assets/scripts/choices.min.js"></script>
    <script src="vendor/overlayscrollbars/js/OverlayScrollbars.min.js"></script>
    <script src="js/charts-home.js"></script>
    <!-- Main File-->
    <script src="js/front.js"></script>
    <script>
        // ------------------------------------------------------- //
        //   Inject SVG Sprite - 
        // ------------------------------------------------------ //
        function injectSvgSprite(path) {

            var ajax = new XMLHttpRequest();
            ajax.open("GET", path, true);
            ajax.send();
            ajax.onload = function (e) {
                var div = document.createElement("div");
                div.className = 'd-none';
                div.innerHTML = ajax.responseText;
                document.body.insertBefore(div, document.body.childNodes[0]);
            }
        }
        // this is set to BootstrapTemple website as you cannot 
        // inject local SVG sprite (using only 'icons/orion-svg-sprite.svg' path)
        // while using file:// protocol
        // pls don't forget to change to your domain :)
        injectSvgSprite('https://bootstraptemple.com/files/icons/orion-svg-sprite.svg');


    </script>
    <!-- FontAwesome CSS - loading as last, so it doesn't block rendering-->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
</body>

</html>

<?php
  $q = explode('/',$_SERVER['QUERY_STRING']);
  $feed_id =  (int)$q[0];
  $ward_id =  $q[1]; 
  $insert = false;
  if(isset($_POST['submit']))
  {
      $con = mysqli_connect("127.0.0.1","root","","pv2");

      if(!$con){
          die("not connect to database" . mysqli_connect_error());
      }
     //$feed_id=$SESSION["feed_id"];
      $filling_date=date("Y-m-d");
      //$ward_id=1;
      $Q1 =  (int)$_POST['question_1'];
      $Q2 =  (int)$_POST['question_2'];
      $Q3 =  (int)$_POST['question_3'];
      $Q4 =  (int)$_POST['question_4'];
      $Q5 =  (int)$_POST['question_5'];
      $Q6 =  (int)$_POST['question_6'];
      $sql= "INSERT INTO pv2.parent_feedback values('$feed_id','$filling_date','$ward_id',$Q1,$Q2,$Q3,$Q4,$Q5,$Q6)";
      $con->query($sql);
      $con->close();                      
  }
?>