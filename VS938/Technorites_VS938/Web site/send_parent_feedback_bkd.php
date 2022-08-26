<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
include './db_connection.php';
$con = OpenCon();
        if(!$con){
            die("not connect to database" . mysqli_connect_error());
        }    
    $insert = false;
    if(isset($_POST['submit'])){
        //if(true){
        
        $college_id = 'techno123';
          //$feed_name = 'techno1234';
          //$program = 'BachelorofTechnology';
          //$dept = 'Computer Science and Engineering'; 
        $feed_name =  $_POST['feedback_name'];
        $program =  $_POST['program_name'];
        $dept =  $_POST['dept_name'];

        $result=mysqli_query($con,"select course_id from course where course_type='$program' and specialisation='$dept'");
        $row = mysqli_fetch_assoc($result);
        $course_id=$row['course_id'];

        $batch = $_POST['batch'];
        //$batch = '2020-24';
        $gen_date=date("Y-m-d");
        $status=1;
        $time = strtotime($_POST['last_date']);
        if ($time) {
        $last_date = date('Y-m-d', $time);}
        //$last_date=date("Y-m-d");

        $sql3=mysqli_query($con,"SELECT MAX(feedback_id) as max_id from parent_feedinfo");
        $row3 = mysqli_fetch_assoc($sql3);
        $feed_id=$row3['max_id'] + 1;

        $sql = "INSERT INTO parent_feedinfo values($feed_id,'$college_id','$gen_date','$last_date','$course_id','$batch','$feed_name',$status)";
        $con->query($sql);


        $result2 = mysqli_query($con,"SELECT clg_name from college where AISHE_id='$college_id'");
        $row2 = mysqli_fetch_assoc($result2);
        //college_name
        $clg=$row2['clg_name'];

        $retval = mysqli_query($con,"SELECT student_id,student_name,parent_email from student where college_id='$college_id' AND course_id='$course_id' AND batch='$batch'");    
        if(! $retval ) {
            die('Could not get data: ' . mysqli_error($con));
        }
        //student data retrival and snding mails
        while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)) {
            $std_id=$row['student_id'];
            $name=$row['student_name'];
            $email=$row['parent_email'];
            $url="parent_dashboard.php?/".$feed_id."/".$std_id;
            
            require './autoload.php';
            $mail = new PHPMailer(true);
            try 
            {
                $mail->SMTPDebug = 1;                                       
                $mail->isSMTP();                                            
                $mail->Host       = 'smtp.gmail.com';                    
                $mail->SMTPAuth   = true;                             
                $mail->Username   = 'pratikriyavishleshan@gmail.com';                 
                $mail->Password   = 'wgnckjdjrrrffzts';                        
                $mail->SMTPSecure = 'tls';                              
                $mail->Port       = 587;  
                
                $mail->setFrom('pratikriyavishleshan@gmail.com', 'Pratikriya_Vishleshan');           
                $mail->addAddress($email,$name);
                    
                $mail->isHTML(true);  
                $headers  = 'MIME-Version: 1.0' . "\r\n";
                $headers .= 'Content-type: text/html\r\n';
                
                $message=<<<EOF
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    <style>
                        .Btn {
                    background: #44c76b;
                    background-image: -webkit-linear-gradient(top, #44c76b, #2bb850);
                    background-image: -moz-linear-gradient(top, #44c76b, #2bb850);
                    background-image: -ms-linear-gradient(top, #44c76b, #2bb850);
                    background-image: -o-linear-gradient(top, #44c76b, #2bb850);
                    background-image: linear-gradient(to bottom, #44c76b, #2bb850);
                    -webkit-border-radius: 28;
                    -moz-border-radius: 28;
                    border-radius: 28px;
                    font-family: Arial;
                    color: #ffffff;
                    font-size: 20px;
                    padding: 10px 20px 10px 20px;
                    text-decoration: none;
                }
                
                .Btn:hover {
                    background: #1fde78;
                    background-image: -webkit-linear-gradient(top, #1fde78, #55d934);
                    background-image: -moz-linear-gradient(top, #1fde78, #55d934);
                    background-image: -ms-linear-gradient(top, #1fde78, #55d934);
                    background-image: -o-linear-gradient(top, #1fde78, #55d934);
                    background-image: linear-gradient(to bottom, #1fde78, #55d934);
                    text-decoration: none;
                }
                    </style>
                </head>
                <!-- Complete Email template -->
                
                <body>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="550" bgcolor="white"
                        style="border:2px solid black">
                        <tbody>
                            <tr>
                                <td align="center">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="col-550" width="550">
                                        <tbody>
                                            <tr>
                                                <td align="center" style="background-color: #52be73;
                                                        height: 50px;">
                
                                                    <a href="#" style="text-decoration: none;">
                                                        <p style="color:white;
                                                                font-weight:bold;">
                                                            <h1 style="color: black;">Pratikriya Vishleshan</h1>
                                                        </p>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr style="height: 150px;">
                                <td align="center" style="border: none;
                                        border-bottom: 2px solid #52be73;
                                        padding-right: 20px;padding-left:20px">
                
                                    <p style="font-weight: bolder;font-size: 30px;
                                            letter-spacing: 0.025em;
                                            color:black;">
                                        Dear Parent...
                                        <br> kindly fill the parent feedback form.
                                    </p>
                                </td>
                            </tr>
                
                            <tr style="display: inline-block;">
                                <td style="height: 150px;
                                        padding: 20px;
                                        border: none;
                                        border-bottom: 2px solid #361B0E;
                                        background-color: white;">
                
                                    <h2 style="text-align: left;
                                            align-items: center;">
                                        Give your feedback for $clg
                                    </h2>
                                    <p class="data" style="text-align: justify-all;
                                            align-items: center;
                                            font-size: 15px;
                                            padding-bottom: 12px;">
                                    </p>
                                    <p>
                                        <a href=$url
                                            class="Btn">
                                            Give Feedback
                                        </a>
                                    </p>
                                </td>
                            </tr>
                            <tr style="border: none;
                            background-color: #52be73;
                            height: 40px;
                            color:white;
                            padding-bottom: 20px;
                            text-align: center;">
                
                                <td height="40px" align="center">
                                    <p style="color:white;
                    line-height: 1.5em;">
                                        Techno India NJR
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-family:'Open Sans', Arial, sans-serif;
                        font-size:11px; line-height:18px;
                        color:#999999;" valign="top" align="center">
                                    <a href="#" target="_blank" style="color:#999999;
                        text-decoration:underline;">PRIVACY STATEMENT</a>
                                    | <a href="#" target="_blank" style="color:#999999; text-decoration:underline;">TERMS OF SERVICE</a>
                                    | <a href="#" target="_blank" style="color:#999999; text-decoration:underline;">RETURNS</a><br>
                                    © 2012 GeeksforGeeks. All Rights Reserved.<br>
                                    If you do not wish to receive any further
                                    emails from us, please
                                    <a href="#" target="_blank" style="text-decoration:none;
                                        color:#999999;">unsubscribe</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </td>
                    </tr>
                    <tr>
                        <td class="em_hide" style="line-height:1px;
                                min-width:700px;
                                background-color:#ffffff;">
                            <img alt="" src="images/spacer.gif" style="max-height:1px;
                            min-height:1px;
                            display:block;
                            width:700px;
                            min-width:700px;" width="700" border="0" height="1">
                        </td>
                    </tr>
                    </tbody>
                    </table>
                </body>
                
                </html>
                
                EOF;    
                                            
                $mail->Subject = 'Feedback_Mail';
                $mail->Body    = $message;
                $mail->AltBody = 'Body in plain text for non-HTML mail clients';
                $mail->send();
                echo "<b>Mail has been sent successfully to $name parents!<br>";
            } 
                catch (Exception $e) {
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }
            
            } 
            echo "<br><strong>sucess</strong>";
            mysqli_close($con);
    }
?>

