<?php

include_once '../init.php';
$form = new Form();
$queries = new Queries();

if(isset($_POST['bookName']) && isset($_POST['authorName']) && isset($_POST['bookPrice'])){
    
    $bookName = $form->input('bookName');
    $authorName = $form->input('authorName');
    $bookPrice = $form->input('bookPrice');
    $userId = $_SESSION['userId'];

    if($queries->Crud('INSERT INTO books (bookName, authorName, bookPrice, userId) VALUES (?,?,?,?)', [$bookName, $authorName, $bookPrice, $userId])){
        
    echo json_encode(['status' => 'success', 'message' => 'Book added successfully']);
    }else{
        echo json_encode(['status' => 'error', 'message' => 'Failed to add book']);
    }

}