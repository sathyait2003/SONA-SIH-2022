<?php
include './db_connection.php';
$con = OpenCon();
if(!$con){
    die("not connect to database" . mysqli_connect_error());
}
if(isset($_POST['importSubmit'])){
    
    $csvMimes = array('text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel', 'text/plain');
    
    if(!empty($_FILES['file']['name']) && in_array($_FILES['file']['type'], $csvMimes)){
        
        if(is_uploaded_file($_FILES['file']['tmp_name'])){
            
            $csvFile = fopen($_FILES['file']['tmp_name'], 'r');
            
            fgetcsv($csvFile);
            
            while(($line = fgetcsv($csvFile)) !== FALSE){
                
                $sql3=mysqli_query($con,"SELECT MAX(alumini_id) as max_id from employer");
                $row3 = mysqli_fetch_assoc($sql3);
                $employer_id=$row3['max_id'] + 1;
                $employer_name  = $line[0];
                $employer_des  = $line[1];
                $employer_email = $line[2];
                $college_id = "techno123";//use session variable here
                $company_name = $line[3];
                
                $prevQuery = "SELECT employer_name FROM employer WHERE employer_email = '$employer_email' AND college_id='$college_id'";
                $prevResult = $con->query($prevQuery);
                
                if($prevResult->num_rows > 0){
                    $con->query("UPDATE employer SET employer_name = '$employer_name',employer_des='$employer_des',company_name='$company_name' where employer_email='$employer_email' AND college_id='$college_id'");
                }else{
                    $con->query("INSERT INTO  VALUES (''$employer_id',','$employer_name','$employer_des','$employer_email','$college_id','$company_name')");
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

header("Location: add_employer.html".$qstring);