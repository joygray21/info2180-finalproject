<?php
    session_start();
    session_unset();
    session_destroy();

    echo "<p> Logout successful. </p>";
?>