<?php

include_once "init.php";
$form = new Form();
$queries = new Queries();

if($queries->Crud("SELECT * FROM users" )){
    $rows = $queries->getAll();

    foreach($rows as $row){
        echo $row['fullName'] . "<br>";
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book Store</title>
</head>
<body>
    <form action="" method="post">
        <input type="text" name="username" placeholder="Name..."><br>
        <input type="text" name="email" placeholder="Email..."><br>
        <input type="password" name="password" placeholder="Password..."><br>
        <input type="submit" value="Submit" name="submit">

    </form>
</body>
</html>
