<?php

include_once '../init.php';
$queries = new Queries();
$userId = $_SESSION['userId'];

if($queries->Crud("SELECT * FROM books WHERE userId = ?", [$userId])){
    $rows = $queries->Count();

    echo json_encode(['status' => 'success', 'rows' => $rows]);
}
