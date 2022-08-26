<?php
$con = mysqli_connect("127.0.0.1","root","","pv2");
if(!$con){
    die("not connect to database" . mysqli_connect_error());
}
if(isset($_POST['importSubmit'])){
    
    $csvMimes = array('text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel', 'text/plain');
    
    if(!empty($_FILES['file']['name']) && in_array($_FILES['file']['type'], $csvMimes)){
        
        if(is_uploaded_file($_FILES['file']['tmp_name'])){
            
            $csvFile = fopen($_FILES['file']['tmp_name'], 'r');
            
            // Skip the first line
            fgetcsv($csvFile);
            
            // Parse data from CSV file line by line
            while(($line = fgetcsv($csvFile)) !== FALSE){

                // Get row data
                $college_id   = "techno123"; //use session variable here to the college id
                $sql3=mysqli_query($con,"SELECT MAX(alumini_id) as max_id from alumini");
                $row3 = mysqli_fetch_assoc($sql3);
                $alumini_id=$row3['max_id'] + 1;
                $course_id  = $line[0];
                $alumini_name = $line[1];
                $alumini_email = $line[2];
                $batch = $line[3];
                
                // Check whether member already exists in the database with the same email
                $prevQuery = "SELECT alumini_name FROM alumini WHERE alumini_email = '$alumini_email' and college_id='$college_id'";
                $prevResult = $con->query($prevQuery);
                
                if($prevResult->num_rows > 0){
                    // Update member data in the database
                    $con->query("UPDATE alumini SET alumini_name = '$alumini_name',course_id='$course_id',batch='$batch' where alumini_email'$alumini_email' and college_id='$college_id'");
                }else{
                    // Insert member data in the database
                    $con->query("INSERT INTO alumini VALUES ('$college_id','$alumini_id','$course_id','$alumini_name','$alumini_email','$batch')");
                }
            }
            // Close opened CSV file
            fclose($csvFile);
            $qstring = '?status=succ';
        }else{
            $qstring = '?status=err';
        }
    }
    else{
        $qstring = '?status=invalid_file';
    }
}
// Redirect to the listing page
header("Location: add_alumini.html".$qstring);