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

checkbox.addEventListener('change', function (event){
    event.preventDefault()
    if (checkbox.checked == true){
        // console.log('Checkbox on')
        password.type = 'text'
    }
    else{
        // console.log('Checkbox off')
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
    checkPasswordRequirement(checkSpecialCharacters() , req1)
    checkPasswordRequirement(checkForLowerCase() , req2)
    checkPasswordRequirement(checkForUpperCase() , req3)
    checkPasswordRequirement(checkForNumericChars() , req4)

    if (event.key === 'Enter'){
        event.preventDefault()
        submit.click()
    }
})

function checkPasswordRequirement( checkCondition , reqNumber) {
    return function() {
        const pass = password.value
        for (let i = 0; i < pass.length; i++) {
            const charCode = pass.charCodeAt(i)
            if (checkCondition(charCode)) {
                reqNumber.style.display = 'none'
                return true;
            }
        }
        reqNumber.style.display = 'block'
        return false;
    }
} 
const checkSpecialCharacters = checkPasswordRequirement(
    charCode => (charCode >= 33 && charCode <= 47) || (charCode >= 58 && charCode <= 64) || 
                (charCode >= 91 && charCode <= 96) || (charCode >= 123 && charCode <= 126),
    req1
)

const checkForLowerCase = checkPasswordRequirement(
    charCode => charCode >= 97 && charCode <= 122,
    req2
)

const checkForUpperCase = checkPasswordRequirement(
    charCode => charCode >= 65 && charCode <= 90,
    req3
)

const checkForNumericChars = checkPasswordRequirement(
    charCode => charCode >= 48 && charCode <= 57,
    req4
)

function checkDisplayStyle(reqNumber) {
    return (reqNumber.style.display === 'none')    
}

submit.addEventListener('click' , function (event){
    event.preventDefault();


    if (minError.style.display == 'none' && maxError.style.display == 'none') {
        flag2 = true;
    }
    else {
        flag2 = false;
    }

    let flag7 = checkDisplayStyle(req1); 
    let flag8 = checkDisplayStyle(req2);
    let flag9 = checkDisplayStyle(req3);
    let flag10= checkDisplayStyle(req4);

    // console.log(`flag1 : ${flag1}, flag2 : ${flag2}, flag7 : ${flag7}, flag8 : ${flag8}, flag9 : ${flag9}, flag10 : ${flag10}`);
    if ( flag1 === true && flag2 === true && flag7 === true && flag8 === true && flag9 === true && flag10 === true ) {
        alert('Registration successful');
    } 
    else {
        alert('Registration Failed\nKindly check the input conditions ')
    }
        
})
