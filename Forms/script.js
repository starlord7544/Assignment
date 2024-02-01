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
const form      = document.getElementById ('form')

let flag1 = 0
let flag2 = 0
let flag3 = 0
let flag4 = 0
let flag5 = 0
let flag6 = 0
let flagPass = 0
let flagNum = 0

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
    return true;
}

password.addEventListener('input', function (event){
    flag3 = HigherPass(checkPassChar() , req1)
    flag4 = HigherPass(checkPassLower() , req2)
    flag5 = HigherPass(checkPassUpper() , req3)
    flag6 = HigherPass(checkPassNumber() , req4)

    

    if (event.key === 'Enter'){
        event.preventDefault()
        submit.click()
    }
})

function HigherPass( checkCondition , reqNumber) {
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

const checkPassChar = HigherPass(
    charCode => (charCode >= 33 && charCode <= 47) || (charCode >= 58 && charCode <= 64) || 
                (charCode >= 91 && charCode <= 96) || (charCode >= 123 && charCode <= 126),
    req1
)

const checkPassLower = HigherPass(
    charCode => charCode >= 97 && charCode <= 122,
    req2
)

const checkPassUpper = HigherPass(
    charCode => charCode >= 65 && charCode <= 90,
    req3
)

const checkPassNumber = HigherPass(
    charCode => charCode >= 48 && charCode <= 57,
    req4
)

submit.addEventListener('click' , function (event){
    event.preventDefault()
    if (flag1 === false || flag2 === false) {
        alert('Registration Failed\nKindly check the input conditions ')
    } 

    if (flag3 === true && flag4 === true && falg5 === true && flag6 === true) {
        flagPass = true
    }

    // if (flagPass === false){
    //     alert('Registration Failed\nKindly check the input conditions 799')
    // }
    else if (flag1 === true && flag2 === true) {
        alert('Registration successful')
    }
})