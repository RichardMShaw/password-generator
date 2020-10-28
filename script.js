// Assignment Code
var generateBtn = document.querySelector("#generate");

const CHAR_TYPE = {
  LOWER: 0,
  UPPER: 1,
  NUMBER: 2,
  SPECIAL: 3,
}



function getCharCodeType(charCode) {

  if (96 < charCode && charCode < 123) {
    return CHAR_TYPE.LOWER;
  } else if (64 < charCode && charCode < 91) {
    return CHAR_TYPE.UPPER;
  } else if (47 < charCode && charCode < 58) {
    return CHAR_TYPE.NUMBER;
  } else {
    return CHAR_TYPE.SPECIAL;
  }
}

function replaceValidChar(str, chars, charBound, charType, tally) {
  let len = str.length
  let validIndexs = []
  for (var i = 0; i < len; i++) {
    validIndexs.push(i)
  }
  while (len > 0) {
    let randNum = Math.floor(Math.random() * validIndexs.length)
    let charCode = str.charCodeAt(validIndexs[randNum]);
    let charCodeType = getCharCodeType(charCode)
    if (tally[charCodeType] > 1) {
      let randChar = Math.floor(Math.random() * (charBound[charType][1] - charBound[charType][0])) + charBound[charType][0]
      console.log(chars[randChar])
      console.log(validIndexs[randNum])
      return str.substr(0, validIndexs[randNum]) + String.fromCharCode(chars[randChar]) + str.substr(validIndexs[randNum] + 1);

    } else {
      validIndexs.splice(randNum, 1);
      len--;
    }
  }
}

function generatePassword() {
  let valid = false;
  let passwordLen = 0
  while (!valid) {
    passwordLen = prompt(`Enter a password length between 8 and 128`);
    passwordLen = parseInt(passwordLen)
    if (passwordLen < 8 || passwordLen > 128 || passwordLen === NaN) {
      alert(`Invalid length. Try again.`)
    } else {
      valid = true;
    }
  }
  let lower = false;
  let upper = false;
  let number = false;
  let special = false;

  valid = false;
  while (!valid) {
    lower = confirm(`Lowercase characters?`)
    upper = confirm(`Uppercase characters?`)
    number = confirm(`Numeric characters?`)
    special = confirm(`Special characters?`)
    if (lower || upper || number || special) {
      valid = true;
    } else {
      alert(`You must select at least one type.`)
    }
  }

  let chars = []
  let charBound = [[0, 0], [0, 0], [0, 0], [0, 0]];
  if (lower) {
    for (let i = 97; i < 123; i++) {
      charBound[0][0] = chars.length;
      chars.push(i);
      charBound[0][1] = chars.length
    }
  }
  if (upper) {
    for (let i = 65; i < 91; i++) {
      charBound[1][0] = chars.length;
      chars.push(i);
      charBound[1][1] = chars.length;
    }
  }
  if (number) {
    for (let i = 48; i < 58; i++) {
      charBound[2][0] = chars.length;
      chars.push(i);
      charBound[2][1] = chars.length;
    }
  }
  if (special) {
    charBound[3][0] = chars.length;
    for (let i = 126; i > 122; i--) {
      chars.push(i);
    }
    for (let i = 96; i > 90; i--) {
      chars.push(i);
    }
    for (let i = 64; i > 57; i--) {
      chars.push(i);
    }
    for (let i = 47; i > 32; i--) {
      chars.push(i);
    }
    charBound[3][1] = chars.length;
  }
  let charsLen = chars.length;
  let validIndexs = [];
  let tally = [0, 0, 0, 0];
  let randNum = 0;
  let password = "";

  for (let i = 0; i < passwordLen; i++) {
    randNum = Math.floor(Math.random() * charsLen);
    let charType = getCharCodeType(chars[randNum]);
    tally[charType]++;
    password += String.fromCharCode(chars[randNum])
  }

  if (lower && tally[0] === 0) {
    password = replaceValidChar(password, chars, charBound, 0, tally)
  } else if (upper && tally[1] === 0) {
    password = replaceValidChar(password, chars, charBound, 1, tally)
  } else if (number && tally[2] === 0) {
    password = replaceValidChar(password, chars, charBound, 2, tally)
  } else if (special && tally[3] === 0) {
    password = replaceValidChar(password, chars, charBound, 3, tally)
  }
  return password


}
// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
