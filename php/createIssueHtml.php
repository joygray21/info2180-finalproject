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
                echo "<option value=". $row['firstname'] ." " . $row['lastname'] ."> ". $row['firstname'] ." " . $row['lastname']."</option>";
            endforeach;
?>
            </select><br>
            Type <br><select id="typeof" name="typeof">
                <option value="select an option">-select an option-</option>
                <option value="Bug">Bug</option>
                <option value="Proposal">Proposal</option>
                <option value="Task">Task</option>
            </select><br>
            Priority <br><select id="priority" name="priority">
                <option value="select an option">-select an option-</option>
                <option value="Minor">Minor</option>
                <option value="Major">Major</option>
                <option value="Critical">Critical</option>
            </select><br>
            <input id = "create-issue-btn" type="submit" value="Submit">
        </form>