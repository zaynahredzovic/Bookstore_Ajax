<?php

class Database {

    public $conn;
    public function __construct() {
        try {
            $this->conn = new PDO('mysql:host=' . HOST . ';dbname=' . DB_NAME, USERNAME, PASSWORD);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
}