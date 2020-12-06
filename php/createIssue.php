<?php
    require_once 'dbconnect.php';

    $issue_title = $_POST['issue_title'];
    $issue_description = $_POST['issue_description'];
    $assigned_to = $_POST['assigned'];
    $issue_type = $_POST['type'];
    $issue_priority = $_POST['priority'];
    $created_by = $_SESSION['firstname'] . " " . $_SESSION['lastname'];

    /*  December 5, 2020
        Insert new issue into Issues table.
        Timezone = Jamaica;
    */
    try{
        $stmt = $conn->prepare("INSERT INTO `Issues` (`title`, `description`, `type`, `priority`, `status`, `assigned_to`, `created_by`, `created`, `updated`) VALUES (:title, :description, :type, :priority, :status, :assigned_to, :created_by, :created, :updated)");
        $stmt->bindParam(':title', $issue_title);
        $stmt->bindParam(':description', $issue_description);
        $stmt->bindParam(':type', $issue_type);
        $stmt->bindParam(':priority', $issue_priority);
        $stmt->bindParam(':status', "OPEN");
        $stmt->bindParam(':assigned_to', $assigned_to);
        $stmt->bindParam(':created_by', "Test User");
        date_default_timezone_set('Jamaica');
        $stmt->bindParam(':created', date('Y-m-d h:i:s', time()));
        $stmt->bindParam(':updated', date('Y-m-d h:i:s', time()));
        $stmt->execute();
    } catch(PDOException $e) {
        $_SESSION["error"] = $e->getMessage();
    }

    require 'login.php';
    $conn = null;
?>