<?php

require_once 'dbconnect.php';





$email = filter_input(INPUT_GET,"email",FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_GET,"password",FILTER_SANITIZE_STRING);



$checkstmt = $conn->query("SELECT count(*) from Users where email = '$email' ");

$checkresults =  $checkstmt->fetchAll(PDO::FETCH_ASSOC);


foreach ($checkresults as $row):
    if($row['count(*)'] == '0'){
        echo("There is no user with that email"); 

    }elseif($row['count(*)'] > 0){
       

    //query to find user by email
    $stmt = $conn->query("SELECT * FROM Users where email = '$email' ");

    $results =  $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($results as $row):
       
        //verify hash vs password
        if (password_verify($password, $row['password'])) {
            echo 'Password is valid!';

            // Start the session
            session_start();

            $_SESSION["firstname"] = $row['firstname'];
            $_SESSION["lastname"] = $row['firstname'];
            $_SESSION["email"] = $row['firstname'];

        } else {
            echo 'Invalid password.';
        }
    endforeach;

    }
    
endforeach;



?>


