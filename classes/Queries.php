<?php

class Queries extends Database{

    public $result;
    public function Crud($qry, $params = []){

        if(empty($params)){
            $this->result = $this->conn->prepare($qry);
            return $this->result->execute();
        }else{
            $this->result = $this->conn->prepare($qry);
            return $this->result->execute($params);
        }
    }

    public function Count(){
        return $this->result->rowCount();
    }

    public function get(){
        return $this->result->fetch(PDO::FETCH_OBJ);
    }

    public function getAll(){
        return $this->result->fetchAll(PDO::FETCH_OBJ);
    }

}