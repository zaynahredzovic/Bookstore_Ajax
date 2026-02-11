const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.querySelector('.emailError');
const passwordError = document.querySelector('.passwordError');
let emailStatus = true;
let passwordStatus = true;

loginForm.addEventListener('submit', (e) =>{

    e.preventDefault();

    //email validation
    if (Empty(emailInput, "Email", emailError)) {
        emailStatus = false;
    } else {
        emailStatus = true;
    }

    //password validation
    if (Empty(passwordInput, "Password", passwordError)) {
        passwordStatus = false;
    } else {
        passwordStatus = true;
    }

    //submit login form if no errors
    if(emailStatus === false && passwordStatus === false){
        $.ajax({
            type: "POST",
            url: "ajax/login.php",
            data: $(loginForm).serialize(),
            success: (feedback) => {
                const response = JSON.parse(feedback);
                if(response.status === "success"){
                    window.location = "dashboard.php";
                }else if(response.status === "errorEmail"){
                    emailError.innerHTML = response.message;
                    emailInput.classList.add("borderRed");
                    passwordError.classList.remove("borderRed");
                }else if(response.status === "errorPassword"){
                    passwordError.innerHTML = response.message;
                    passwordInput.classList.add("borderRed");
                    emailError.classList.remove("borderRed");
                }
            }
        })
    }
})