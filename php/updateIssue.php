<?php
    require_once 'dbconnect.php';

    $update_issue = $_POST["update_issue"];
    $issue_id = $_POST["issue_id"];

    try{
        $stmt = $conn->prepare("UPDATE Issues SET status = ? where id = ?");

        if(!empty($update_issue)){
            if($update_issue == "CLOSED" || $update_issue == "Closed" || $update_issue == "closed"){
                $stmt->execute(array('CLOSED', $issue_id));
            } elseif($update_issue == "IN PROGRESS" || $update_issue == "In Progress" || $update_issue == "in progress"){
                $stmt->execute(array('IN PROGRESS', $issue_id));
            } else{
                $stmt->execute(array('OPEN', $issue_id));
            }
        }
    } catch(PDOException $e){
        $_SESSION["error"] = $e->getMessage();
    }
    $conn = null;
    require 'login.php';
?>