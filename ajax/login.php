<?php
include_once '../init.php'; 
$form = new Form();
$queries = new Queries();

if(isset($_POST['email']) && isset($_POST['password'])){
    $email = $form->input('email');
    $password = $form->input('password');

    if($queries->Crud('SELECT * FROM users WHERE email = "' .$email .'";')){
        if($queries->Count() >0){
            $row = $queries->get();
            $id = $row->id;
            $hashedPassword = $row->pwd;
            if(password_verify($password, $hashedPassword)){
                $_SESSION['userId'] = $id;
                $_SESSION['loader'] = true;
                echo json_encode(['status' => 'success', 'message' => 'Login successful']);
            }else{
                echo json_encode(['status' => 'errorPassword', 'message' => 'Incorrect password']);
            }
        }else{
            echo json_encode(['status' => 'errorEmail', 'message' => 'Invalid email']);
        }
    }

    
}