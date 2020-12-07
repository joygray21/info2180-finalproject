<?php
// Original author: Javon Ellis
// Edited by Nathaniel Bedassie
session_start();

require_once 'dbconnect.php';

$filter = filter_input(INPUT_GET,"filter",FILTER_SANITIZE_STRING);

if($filter == "All"){
    
    $query = "SELECT * FROM Issues issue INNER JOIN Users user ON issue.assigned_to = user.id";



}else if($filter == "Open"){

    $query = "SELECT * FROM Issues issue INNER JOIN Users user ON issue.assigned_to = user.id where status = '$filter'";

    echo( $_SESSION["email"]);

}else if($filter == "Tickets"){
    $email = $_SESSION["email"];

    $query = "SELECT issue.title, issue.id,issue.type,issue.status, issue.assigned_to, issue.created FROM Issues issue LEFT JOIN Users user ON issue.assigned_to = user.id  WHERE user.email  = '$email'"; 

} else {
  $query = "SELECT * FROM Issues issue INNER JOIN Users user ON issue.assigned_to = user.id";
}

try {
      
    // set the PDO error mode to exception
    $stmnt = $conn->query($query);
    

    $results = $stmnt->fetchAll(PDO::FETCH_ASSOC);
    
  } catch(PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
  }





?>
<h2>Issues<button id="new-issue-btn">Create New Issue</button></h2><br>
<h4>Filter By: <button id="byAll">ALL</button><button id="byOpen">OPEN</button><button id="byTickets">TICKETS</button></h4><br>

    <table>
    <tr class="heading">
        <td class="large-space headings"><b>Title</b></td>
        <td class="same-space headings"><b>Type</b></td>
        <td class="same-space headings"><b>Status</b></th>
        <td class="same-space headings"><b>Assigned To</b></td>
        <td class="same-space headings"><b>Created</b></td>
    </tr>

    <?php foreach ($results as $row): ?>
    <tr id="sample">
        <div><td id='<?= $row['id']?>' class="iss-title"><b>#<?= $row['id']?> </b><span><?= $row['title'] ?></span></td></div>
        <div><td class="iss-type"><?= $row['type']?></td></div>
        <div><td class="iss-stat"><div><?= $row['status']?></div></td></div>
        <div><td class="iss-assigned"><?=$fullname = $row['firstname'] . ' '. $row['lastname']?></td></div>
        <div><td class="iss-created"><?=$row['created']?></td></div>
    </tr>
    <?php endforeach; ?>
    </table>
