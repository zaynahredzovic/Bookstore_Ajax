<?php
include '../init.php';
$form = new Form();
$queries = new Queries();

if(isset($_POST['email']) && isset($_POST['tableName']) && isset($_POST['columnName'])){
    $email = $form->input('email');
    $tableName = $form->input('tableName');
    $columnName = $form->input('columnName');

    if($queries->Crud('SELECT ' . $columnName . ' FROM ' . $tableName . ' WHERE ' . $columnName . ' = "' . $email . '"')){
        if($queries->Count() > 0){
            echo json_encode(['status' => 'error', 'message' => 'Email already exists']);
        }else{
            echo json_encode(['status' => 'success', 'message' => 'Email is available']);
        }
    }
}