<?php
include './db_connection.php';
$con = OpenCon();
if(!$con){
    die("not connect to database" . mysqli_connect_error());
}
else
echo "connected";
if(isset($_POST['importSubmit'])){
    
    $csvMimes = array('text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel', 'text/plain');
    
    if(!empty($_FILES['file']['name']) && in_array($_FILES['file']['type'], $csvMimes)){
        
        if(is_uploaded_file($_FILES['file']['tmp_name'])){
            
            $csvFile = fopen($_FILES['file']['tmp_name'], 'r');
            
            fgetcsv($csvFile);

            while(($line = fgetcsv($csvFile)) !== FALSE){

                $role = "faculty";
                $college_id = "C-25195";//use session variable here
                $faculty_name  = $line[0];
                $faculty_id=$line[1];
                $DOB = $line[2];
                $email = $line[3];
                $phone_no = $line[4];
                $course_id = $line[5];
                
                $prevQuery = "SELECT email FROM technvxg_pratikriya_vishleshan.faculty WHERE faculty_id = '$faculty_id' and college_id='$college_id'";
                $prevResult = $con->query($prevQuery);
                print_r($prevResult);
                
                if($prevResult->num_rows > 0){
                    $con->query("UPDATE technvxg_pratikriya_vishleshan.faculty SET faculty_name = '$faculty_name',DOB='$DOB',email='$email',course_id='$course_id',role='$role' where faculty_id='$faculty_id' and college_id='$college_id'");
                    $con->query("UPDATE technvxg_pratikriya_vishleshan.login_cred password='$phone_no' where username='$email' and role='$role' and college_id='$college_id'");
                }else{
                    $con->query("INSERT INTO technvxg_pratikriya_vishleshan.faculty VALUES ('$faculty_name','$faculty_id','$college_id','$DOB','$email','$course_id','$role')");
                    $con->query("INSERT INTO technvxg_pratikriya_vishleshan.login_cred VALUES ('$role','$college_id','$email','$phone_no')");
                }
            }
            fclose($csvFile);
            $qstring = '?status=succ';
        }else{
            $qstring = '?status=err';
        }
    }else{
        $qstring = '?status=invalid_file';
    }
    mysqli_close($con);
}

header("Location: add_faculty.html".$qstring);