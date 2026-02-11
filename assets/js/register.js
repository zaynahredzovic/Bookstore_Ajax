const form = document.getElementById('myForm');
const nameInput = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const nameError = document.querySelector('.nameError');
const emailError = document.querySelector('.emailError');
const passwordError = document.querySelector('.passwordError');
let nameStatus = true;
let emailStatus = true;
let passwordStatus = true;

// Listen for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission

    //name validation
    if(Empty(nameInput, 'Name', nameError)){
        nameStatus = false;
        if (notInt(nameInput, 'Name', nameError)) {
            nameStatus = false; 
            if (minLenght(nameInput, 'Name', nameError, 3)) {
                nameStatus =false;
            }else{
                nameStatus = true;
            }
        }else{
            nameStatus = true;
        }
    }else{
        nameStatus = true;
    }

    //email validation
    if (Empty(email, 'Email', emailError)) {
        emailStatus = false;
        if (valideEmail(email, 'Email', emailError)) {
            emailStatus = false;
            checkEmail(email, emailError, 'users', 'email').then((status)=>{
                emailStatus = false;
                Register();
            }).catch((status)=>{
                emailStatus = true;
                console.log("Email exists");
            })
        } else {
            emailStatus = true;
        }
    } else {
        emailStatus = true;
    }

    //password validation
    if (Empty(password, 'Password', passwordError)) {
        passwordStatus = false;
        if (minLenght(password, 'Password', passwordError, 6)) {
            passwordStatus = false;
        } else {
            passwordStatus = true;
        }
    }else{
        passwordStatus = true;
    }

    function Register() {
        if(nameStatus === false && emailStatus === false && passwordStatus === false){
            
            //submit register `form
            $.ajax({
                type: 'POST',
                url: 'ajax/register.php',
                data: $(form).serialize(),
                success: (feedback) => {
                    const response = JSON.parse(feedback);
                    if (response.status === 'success') {
                        window.location = 'login.php';
                    }
                }
            })
        }
    }
})
