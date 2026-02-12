<?php
include_once 'startSession.php';

if(!isset($_SESSION['userId'])){
    header('Location: login.php');
    exit();
}

?> 

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Dashboard</title>
	<!-- Link CSS file -->
	<?php include_once 'components/cssLinks.php'; ?>
</head>
<body>

<?php
    if(isset($_SESSION['loader']) && $_SESSION['loader'] === true){
        echo '<div class="loader-section">
                <div class="loader">
                    <div class="load">
                        <span class="element"></span>
                    </div> 
                </div>
            </div>';
        unset($_SESSION['loader']);
    }
?>

    <?php include 'components/model.php'; ?>

    <?php include 'components/nav.php'; ?>
	<!-- Close nav -->

	<div class="container">
	<div class="row mt-40">
		<div class="col-9">
        <?php include 'components/table.php'; ?>
</div>
<!-- Close col-9 -->
<div class="col-3">
	<?php include 'components/countSection.php'; ?>
</div>
<!-- Close col-3 -->
</div>
<!-- Close row -->
</div>
<!-- Close container  -->
	<script src="assets/js/app.js"></script>
    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/validations.js"></script>
    <script src="assets/js/hideMsg.js"></script>
    <script src="assets/js/book.js"></script>
</body>
</html>