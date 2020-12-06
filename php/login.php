<?php

require_once 'dbconnect.php';





/* $country = filter_input(INPUT_GET,"country",FILTER_SANITIZE_STRING);
$context = filter_input(INPUT_GET,"context",FILTER_SANITIZE_STRING); */



$stmt = $conn->query("SELECT * FROM Users");


$results =  $stmt->fetchAll(PDO::FETCH_ASSOC);



//$stmtCity =  $conn->query("SELECT city.name, city.district,city.population FROM cities city LEFT JOIN countries country ON city.country_code = country.code  WHERE country.name LIKE '%$country%'");



//$results = ($context == 'country') ? $stmt->fetchAll(PDO::FETCH_ASSOC) : $stmtCity->fetchAll(PDO::FETCH_ASSOC);

?>

<table class="table table-hover table-sm table-bordered">
  <tr>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Password</th>
    <th>email</th>
    <th>date joined</th>
  </tr>
  <?php foreach ($results as $row): ?>
  <tr>
    <td><?= $row['firstname']?></td>
    <td><?= $row['lastname']?></td>
    <td><?= $row['email']?></td>
    <td><?= $row['password']?></td>
    <td><?=$row['date_joined']?></td>
  </tr>
  <?php endforeach; ?>
</table>

