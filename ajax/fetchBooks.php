<?php

include_once '../init.php';
$queries = new Queries();
$userId = $_SESSION['userId'];
$form = new Form();

if(isset($_POST['offset']) && isset($_POST['records_per_page'])){
    $offset = $form->input('offset');
    $recordPerPage = $form->input('records_per_page');

    if($queries->Crud("SELECT * FROM books WHERE userId = ? ORDER BY id DESC LIMIT ?,?", [$userId, $offset, $recordPerPage])){
    if($queries->Count() > 0){
        $rows = $queries->getAll();
        echo json_encode(['status' => 'success', 'data' => $rows]);
    }else{
        echo json_encode(['status' => 'error', 'message' => 'No books found']);
    }
}
}

