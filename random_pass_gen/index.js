function generatepassword(length, includelowercase ,includenumbers , includeuppercase , includesymbols){
    const lowercase = `abcdefghijklmnopqrstuvwxyz`;
    const uppercase = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    const numbers = `0123456789`;
    const symbols = `!@#$%^&*(){}:"<>?~[]''`;


    let allowedchars = "";
    let password = "";



    allowedchars += includelowercase ? lowercase : "";
    allowedchars += includeuppercase ? uppercase : "";
    allowedchars += includenumbers ? numbers : "";
    allowedchars += includesymbols ? symbols : "";



    if(length <= 0){
        return `(password length must be more than 1)`;
    }
    if(allowedchars.length === 0){
        return `(atleast one set of password must be selected)`;
    }
    for(let i = 0; i < length ; i++){
        const randommindex = Math.floor(Math.random() * allowedchars.length);
        password += allowedchars[randommindex];

    }
    return password;
}

let length = 12;
let includelowercase = true;
let includeuppercase = true;
let includesymbols = true;
let includenumbers = true;


const password = generatepassword(length, includelowercase ,includenumbers , includeuppercase , includesymbols)

console.log(`${password}`)