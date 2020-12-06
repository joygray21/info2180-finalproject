<?php
require_once 'dbconnect.php';

session_start();

$filter = filter_input(INPUT_GET,"filter",FILTER_SANITIZE_STRING);

if($filter == "All"){
    
    $query = "SELECT * FROM Issues issue INNER JOIN Users user ON issue.assigned_to = user.id";



}else if($filter == "Open"){

    $query = "SELECT * FROM Issues issue INNER JOIN Users user ON issue.assigned_to = user.id where status = '$filter'";

    echo( $_SESSION["email"]);

}else if($filter == "Tickets"){
    $email = $_SESSION["email"];

    $query = "SELECT issue.title, issue.id,issue.type,issue.status, issue.assigned_to, issue.created FROM Issues issue LEFT JOIN Users user ON issue.assigned_to = user.id  WHERE user.email  = '$email'"; 

}


try {
      
    // set the PDO error mode to exception
    $stmnt = $conn->query($query);
    

    $results = $stmnt->fetchAll(PDO::FETCH_ASSOC);
    
  } catch(PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
  }





?>

<table class="table table-hover table-sm table-bordered">
  <tr>
    <th>Title</th>
    <th>Type</th>
    <th>Status</th>
    <th>Assigned To</th>
    <th>Created</th>
  </tr>
  <?php foreach ($results as $row): ?>
  <tr>
    <td><?= $row['title'] ?></td>
    <td><?= $row['type']?></td>
    <td><?= $row['status']?></td>
    <td><?=$fullname = $row['firstname'] . ' '. $row['lastname']?></td>
    <td><?=$row['created']?></td>
  </tr>
  <?php endforeach; ?>

</table>
