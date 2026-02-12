<?php

include_once '../init.php';
$queries = new Queries();
$userId = $_SESSION['userId'];

if($queries->Crud("SELECT * FROM books WHERE userId = ?", [$userId])){
    if($queries->Count() > 0){
        $rows = $queries->getAll();
        echo json_encode(['status' => 'success', 'data' => $rows]);
    }else{
        echo json_encode(['status' => 'error', 'message' => 'No books found']);
    }
}