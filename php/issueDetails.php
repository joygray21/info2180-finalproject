<?php

    require_once 'dbconnect.php';

    /*
        Return 
        <section>
        <article>
        <h2> ISSUE TITLE </h2>
        <h4> issue no. </h4>

        <p> Description </p>

        <p> Issued by </p>
        <p> Last updated </p>
        </article>
        <article>
        <p> Assigned to </p>
        <p> Type </p>
        <p> Priority </p>
        <p> Status </p>

        </article>
        </section>

    */
    $issue_id = $_GET['issue_id'];

    if(!empty($conn)){
        try{
            $stmt = $conn->prepare("SELECT Issues.*, Users.firstname, Users.lastname FROM Issues JOIN Users ON Issues.id=:id and Users.id = Issues.assigned_to");
            $stmt->bindParam(':id', $issue_id);
            $stmt->execute();
            while ($row = $stmt->fetch()) {
                $stmt2 = $conn->query("SELECT firstname, lastname from Users where id = " . $row['created_by']);
                while ($row2 = $stmt2->fetch()){
                    echo "<section>";
                    echo "<article>";
                    echo "<h2>".$row['title']."</h2>";
                    echo "<h4> Issue #".$row['id']."</h4>";
                    echo "<br><p>".$row['descripton']."</p>";
                    echo "<p> Issue created on " . $row['created'] . " by " . $row2['firstname']. " " . $row2['lastname'] . "</p>";
                    echo "<p> Last updated onon " . $row['updated'] . "</p>";
                    echo "</article>";
                    echo "<article>";
                    echo "Assigned To<br>" . $row['firstname'] . " " . $row['lastname'];
                    echo "Type<br>" . $row['type'];
                    echo "Priority<br>" . $row['priority'];
                    echo "Status<br>" . $row['status'];
                    echo "</article>";
                    echo "</section>";
                }
            }
        } catch(PDOException $e) {
            $_SESSION["error"] = $e->getMessage();
        }
    
        require 'login.php';
        $conn = null;
    
    }
    
?>