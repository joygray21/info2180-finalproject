<?php

    session_start();
    require_once 'dbconnect.php';

    $stmt = $conn->query("SELECT firstname, lastname FROM Users ");
    $users =  $stmt->fetchAll(PDO::FETCH_ASSOC);
    $i = 2;

?>

        <h2>Create Issue</h2>
        <form>
            Title <br><input type="text" id="issue_title" name="issue_title"><br>
            Description <br><textarea rows="4" cols="60" id="description" name="description"></textarea><br>
            Assigned To <br><select id="assigned" name="assigned">
            <option value="1">-Select a User-</option>
<?php
            foreach ($users as $row):
                echo "<option value=". $i ."> ". $row['firstname'] ." " . $row['lastname']."</option>";
            endforeach;
?>
            </select><br>
            Type <br><select id="typeof" name="typeof">
                <option value="1">-select an option-</option>
                <option value="2">Bug</option>
                <option value="3">Proposal</option>
                <option value="4">Task</option>
            </select><br>
            Priority <br><select id="priority" name="priority">
                <option value="1">-select an option-</option>
                <option value="2">Minor</option>
                <option value="3">Major</option>
                <option value="4">Critical</option>
            </select><br>
            <input type="submit" value="Submit">
        </form>