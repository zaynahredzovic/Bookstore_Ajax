<?php

include_once '../init.php';
$queries = new Queries();
$userId = $_SESSION['userId'];

if($queries->Crud('SELECT * FROM books WHERE userId = ?', [$userId])){
    $rowsCount = $queries->Count();
    if($rowsCount > 0){
        $rows = $queries->getAll();
        $sum = 0;
        foreach($rows as $row){
            $sum += $row->bookPrice;
        }
        echo json_encode(["status" => "success", "totalBooks" => $rowsCount, "totalAmount" => $sum]);
    }else {
        echo json_encode(['status'=> 'noBooks']);
    }
}
