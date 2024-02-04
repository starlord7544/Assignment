const number    = document.getElementById ('number')
const submit    = document.getElementById('button')
const message   = document.getElementsByClassName('message')
const minError  = document.getElementById('one')
const maxError  = document.getElementById('two')
const charError = document.getElementById('three')
const password  = document.getElementById ('password')
const req1      = document.getElementById ('req1')
const req2      = document.getElementById ('req2')
const req3      = document.getElementById ('req3')
const req4      = document.getElementById ('req4')
const checkbox  = document.getElementById ('checkbox')

let flag1 = false
let flag2 = false
let flagPass = false
let flag7 = false
let flag8 = false
let flag9 = false
let flag10 = false


checkbox.addEventListener('change', function (event){
    event.preventDefault()
    if (checkbox.checked == true){
        password.type = 'text'
    }
    else{
        password.type = 'password'
    }
})

number.addEventListener('input', function (event){
    flag1 = checkNumber()
    if (flag1 == true){
        flag2 = checkLength()
    }
    if (event.key === 'Enter'){
        event.preventDefault()
        submit.click()
    }    
})

function checkLength() {
    const len = number.value.length
    if (len < 3 && len > 0){
        
        minError.style.display = "block"
        maxError.style.display = "none"
        charError.style.display = "none"
        return false
    }
    else if (len > 10) {
        maxError.style.display = "block"
        minError.style.display = "none"
        charError.style.display = "none"
        return false
    }
    else {
        maxError.style.display = "none"
        minError.style.display = "none"
        charError.style.display = "none"
        return true
    }
}
function checkNumber() {
    const num = number.value;
    for (let i = 0; i < num.length; i++) {
        const charCode = num.charCodeAt(i);
        if (charCode < 48 || charCode > 57) {
            charError.style.display = "block";
            maxError.style.display = "none";
            minError.style.display = "none";
            return false;
        }
    }
    charError.style.display = "none";
    return true;
}

password.addEventListener('input', function (event){
    const passVal = password.value
    flagPass = checkPasswordRequirement(passVal)
    if (event.key === 'Enter'){
        event.preventDefault()
        submit.click()
    }
})

function checkPasswordRequirement(passVal) {
    flag7 = checkSpecialCharacters(passVal)
    flag8 = checkForLowerCase(passVal)
    flag9 = checkForUpperCase(passVal)
    flag10 = checkForNumericChars(passVal)

    if (flag7 === true && flag8 === true && flag9 === true && flag10 === true){
        return true
    }
    else {
        return false
    }
} 

function checkSpecialCharacters(password) {
    for (let i = 0; i < password.length; i++) {
        const charCode = password.charCodeAt(i);
        if ((charCode >= 33 && charCode <= 47) || (charCode >= 58 && charCode <= 64) || 
            (charCode >= 91 && charCode <= 96) || (charCode >= 123 && charCode <= 126)) {
                req1.style.display = 'none'
                return true;
        }
    }
    req1.style.display = 'block'
    return false;
}


function checkForLowerCase(password) {
    for (let i = 0; i < password.length; i++) {
        const charCode = password.charCodeAt(i);
        if (charCode >= 97 && charCode <= 122) {
            req2.style.display = 'none'
            return true;
        }
    }
    req2.style.display = 'block'
    return false;
}

function checkForUpperCase(password) {
    for (let i = 0; i < password.length; i++) {
        const charCode = password.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            req3.style.display = 'none'
            return true;
        }
    }
    req3.style.display = 'block'
    return false;
}

function checkForNumericChars(password) {
    for (let i = 0; i < password.length; i++) {
        const charCode = password.charCodeAt(i);
        if (charCode >= 48 && charCode <= 57) {
            req4.style.display = 'none'
            return true;
        }
    }
    req4.style.display = 'block'
    return false;
}

submit.addEventListener('click' , function (event){
    event.preventDefault();

    if (minError.style.display == 'none' && maxError.style.display == 'none') {
        flag2 = true;
    }
    else {
        flag2 = false;
    }

    if ( flag1 === true && flag2 === true && flagPass === true) {
        alert('Registration successful');
    } 
    else {
        alert('Registration Failed\nKindly check the input conditions ')
    }
        
})
