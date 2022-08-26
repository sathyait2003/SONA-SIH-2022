<?php
include './db_connection.php';
$con=OpenCon();
if(!$con){
    die("not connect to database" . mysqli_connect_error());
}
$r=array(array(),array(),array(),array(),array());//multidimensional graph defined
for ($x = 1; $x <= 5; $x++)
{
    $sql=mysqli_query($con,"SELECT count(Q1) from technvxg_pratikriya_vishleshan.faculty_feedback where Q1=$x");
    $row1 = mysqli_fetch_array($sql);
    array_push($r[0],(int)$row1[0]);
}
for ($x = 1; $x <= 5; $x++)
{
    $sql=mysqli_query($con,"SELECT count(Q2) from technvxg_pratikriya_vishleshan.faculty_feedback where Q2=$x");
    $row1 = mysqli_fetch_array($sql);
    array_push($r[1],(int)$row1[0]);
}
for ($x = 1; $x <= 5; $x++)
{
    $sql=mysqli_query($con,"SELECT count(Q3) from technvxg_pratikriya_vishleshan.faculty_feedback where Q3=$x");
    $row1 = mysqli_fetch_array($sql);
    array_push($r[2],(int)$row1[0]);
}
for ($x = 1; $x <= 5; $x++)
{
    $sql=mysqli_query($con,"SELECT count(Q4) from technvxg_pratikriya_vishleshan.faculty_feedback where Q4=$x");
    $row1 = mysqli_fetch_array($sql);
    array_push($r[3],(int)$row1[0]);
}
for ($x = 1; $x <= 5; $x++)
{
    $sql=mysqli_query($con,"SELECT count(Q5) from technvxg_pratikriya_vishleshan.faculty_feedback where Q5=$x");
    $row1 = mysqli_fetch_array($sql);
    array_push($r[4],(int)$row1[0]);
}
mysqli_close($con);
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
    <script
      type="text/javascript"
      src="https://www.gstatic.com/charts/loader.js"
    ></script>
    <title>Faculty Feedback Form Result</title>

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
        /* background-color:#fff; */
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
        background-color: #fff;
        padding: 30px 25px;
        border-radius: 8px;
        box-shadow: 3px 3px 32px -17px rgba(0, 0, 0, 0.5);
      }
      .question {
        display: block;
        margin-bottom: 15px;
      }
      .last_question {
        margin-bottom: 5px;
      }
      img {
        width: 100%;
        height: auto;
      }
    </style>
  </head>

  <body>
    <h1>FACULTY FEEDBACK FORM RESULTS</h1>
    <div>
      <!-- <script>document.write(/\d{4}/.exec(Date())[0])</script> -->
      <!-- <label for="year">Year:</label>
    <input type="number" id="year" name="year" min="2022" max="2100"> -->
    </div>
    <!-- Create Form -->
    <div class="form_questions">
      <div class="form-control">
        <label class="question">
          1. The books/journals etc. prescribed/listed as reference materials
          are relevant, updated and cover the entire syllabus.
        </label>
        <div class="donutchart" id="question_1_faculty_chart"></div>
      </div>
      <div class="form-control">
        <label class="question">
          2.The courses/syllabus of the subjects taught by me increased my
          interest, knowledge, and perspective in the subject area.
        </label>
        <div class="donutchart" id="question_2_faculty_chart"></div>
      </div>
      <div class="form-control">
        <label class="question">
          3.The curriculum has given me full freedom to adopt new
          techniques/strategies of teaching such as group discussions, seminar
          presentations and learner's participation.
        </label>
        <div class="donutchart" id="question_3_faculty_chart"></div>
      </div>
      <div class="form-control">
        <label class="question">
          4. I have the freedom to adopt new techniques/strategies of testing
          assessment of students.
        </label>
        <div class="donutchart" id="question_4_faculty_chart"></div>
      </div>
      <div class="form-control">
        <label class="question">
          5.ICT facilities in the college are adequate and satisfactory.
        </label>
        <div class="donutchart" id="question_5_faculty_chart"></div>
      </div>
      <div class="form-control last_question">
        <label class="question">
          6.Faculty Room is adequate and available in the Institute.
        </label>
        <div class="donutchart" id="question_6_faculty_chart"></div>
      </div>
    </div>
  </body>
  <script>
    let feedbackValuesForFaculty =<?php echo json_encode($r); ?>;
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      let temp = 1;
      for (let i = 0; i < feedbackValuesForFaculty.length; i++) {
        //console.log(feedbackValuesForFaculty[i]);
        var data = google.visualization.arrayToDataTable([
          ["feedback", "Students per program"],
          ["Exellent", feedbackValuesForFaculty[i][4]],
          ["Good", feedbackValuesForFaculty[i][3]],
          ["Average", feedbackValuesForFaculty[i][2]],
          ["Below Average", feedbackValuesForFaculty[i][1]],
          ["Poor", feedbackValuesForFaculty[i][0]],
        ]);

        var options = {
          title: `feedback of question no. ${i + 1}`,
          pieHole: 0.4,
        };
        // var chart_div = document.getElementById(
        //   `question_${temp}_faculty_chart`
        // );
        var chart = new google.visualization.PieChart(
          document.getElementById(`question_${temp}_faculty_chart`)
        );
        temp++;
        chart.draw(data, options);
      }
    }
  </script>
</html>
