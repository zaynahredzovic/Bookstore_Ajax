<?php
include_once "config.php";

spl_autoload_register(function ($className) {
    include_once "classes/" . $className . ".php";
});

$Database = new Database();