<?php

require_once 'dbconnect.php';


//$stmt = $conn->query("SELECT * FROM Users");


//$results =  $stmt->fetchAll(PDO::FETCH_ASSOC);

$firstname = filter_input(INPUT_POST,"firstname",FILTER_SANITIZE_STRING);
$lastname = filter_input(INPUT_POST,"lastname",FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST,"email",FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST,"password",FILTER_SANITIZE_STRING);

//hash password
$hash = password_hash($password,PASSWORD_BCRYPT);

//query to insert new user
$query = "insert into Users(firstname,lastname,email,password) values('$firstname','$lastname','$email','$hash')";


//query to check if user exist
$stmt = $conn->query("SELECT count(*) from Users where email = '$email' ");

$results =  $stmt->fetchAll(PDO::FETCH_ASSOC);


//check if user already exist 
foreach ($results as $row):
    
    //check if users email already exist
    if($row['count(*)'] == '0'){

        //run query and catch any errors
    try {
      
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
    
        // use exec() because no results are returned
        $conn->exec($query);
        echo "New record created successfully";
      } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
      }
    }elseif($row['count(*)'] > 0){
        echo('A user with that email already exist');

    }
       
endforeach;




  
  
?>