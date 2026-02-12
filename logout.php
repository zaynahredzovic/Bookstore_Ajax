<?php

include_once 'startSession.php';
session_destroy();
header('Location: login.php');