<?php

include '../init.php';
$form = new Form();
$queries = new Queries();

if(isset($_POST['fullName']) && isset($_POST['email']) && isset($_POST['password'])){
    $fullName = $form->input('fullName');
    $email = $form->input('email'); 
    $password = $form->input('password');
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    if($queries->Crud("INSERT INTO users (fullName, email, pwd) VALUES ('$fullName', '$email', '$passwordHash')")){
        echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
        $_SESSION['acountCreated'] = "Account created successfully! Please login.";
    }else{
        echo json_encode(['status' => 'error', 'message' => 'Failed to register user']);
    }
    
}