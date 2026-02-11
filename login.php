<?php
include_once 'startSession.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Create user account</title>
	<!-- Link CSS file -->
	<?php 
    include 'components/cssLinks.php';
    ?>

</head>
<body>
	
	<div class="account-split">

		<div class="messageSection">

		</div>
		<!-- Close messageSection -->
		<div class="formSection">
		<div class="formSectionParent">
        <div class="formSectionContainer">
			<?php if(isset($_SESSION['acountCreated'])): ?>
				<div class="alert success">
					<div class="alert-icon"><div class="alertIcon">&check;</div></div>
					<p> <strong>Success!</strong> <?php echo $_SESSION['acountCreated']; ?></p>
				</div>
				<?php unset($_SESSION['acountCreated']); ?>
			<?php endif; ?>
				<!-- Include login form -->
				<?php 
                include 'components/loginForm.php';
                ?>
			</div>
			<!-- Close form-group -->
		</div>
		<!-- Close formSectionContainer -->
		</div>
		<!-- Close formSectionParent -->
		</div>
		<!-- Close formSection -->

	</div>
	<!-- Close account-split -->

	<script src="assets/js/hideMsg.js"></script>
	<script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/validations.js"></script>
	<script src="assets/js/login.js"></script>
	
</body>
</html>