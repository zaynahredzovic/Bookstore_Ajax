function Empty(input, label, errorClass) {

    const fieldName = input.value.trim();
    if (fieldName == '') {
        errorClass.innerHTML = label + ' is required';
        input.classList.add('borderRed');
        return false;
    } else {
        errorClass.innerHTML = '';
        input.classList.remove('borderRed');
        return true;
    }
}

function notInt(input, label, errorClass) {
    const reg = /^[a-zA-Z ]+$/;
    if(reg.test(input.value.trim())){
        errorClass.innerHTML = '';
        input.classList.remove('borderRed');
        return true;
    }else{
        errorClass.innerHTML = label + ' must not be integer';
        input.classList.add('borderRed');
        return false;
    }
}

function minLenght(input, label, errorClass, min ) {
    const fieldName = input.value.trim();
    if (fieldName.length < min) {
        errorClass.innerHTML = label + ' must be at least ' + min + ' characters';
        input.classList.add('borderRed');
        return false;
    }else{
        errorClass.innerHTML = '';
        input.classList.remove('borderRed');
        return true;
    }
}

function valideEmail(input, label, errorClass) {
    const reg = /^[a-zA-Z]+[0-9a-zA-z_\.]*@[a-zA-Z]+\.[a-zA-Z]+$/;
    if (reg.test(input.value.trim())) {
        errorClass.innerHTML = '';
        input.classList.remove('borderRed');
        return true;
    }else{
        errorClass.innerHTML = label + ' is not valid';
        input.classList.add('borderRed');
        return false;
    }

}

function checkEmail(input, errorClass, tableName, columnName) {
    const fieldName = input.value.trim();

    return new Promise((resolve, reject) => {
        $.ajax({
        type: 'POST',  
        url: 'ajax/checkEmail.php',
        data: {
            email: fieldName,
            tableName: tableName,
            columnName: columnName
        },
        success: (feedback) => {
            const response = JSON.parse(feedback);
                if (response.status === 'error') {
                    errorClass.innerHTML = response.message;
                    input.classList.add('borderRed');
                    reject(false);
                } else {
                    errorClass.innerHTML = '';
                    input.classList.remove('borderRed');
                    resolve(true);
                }
            }
        })
    });
}

function isNegative(input, label, errorClass) {
    const fieldName = Number(input.value.trim());
    if (fieldName < 0) {
        errorClass.innerHTML = label + ' must not be negative';
        input.classList.add('borderRed');
        return false;
    }else{
        errorClass.innerHTML = '';
        input.classList.remove('borderRed');
        return true;
    }
}