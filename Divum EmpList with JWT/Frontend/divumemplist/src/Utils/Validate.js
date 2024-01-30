import  { isValidPhoneNumber } from "react-phone-number-input";

export function emailValidation(email) {

    if (email === '') return false;
    const regex_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    if (regex_pattern.test(email)) {
      return true;
    }
    return false;
}

export function nameValidation(name) {

    if (name === '') return false;
  
    for (var i = 0; i < name.length; i++) {
      var charCode = name.charCodeAt(i);
      if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
        return false;
      }
    }
  
    return true;
  
}  

export function passwordValidation(cpwd,pwd) {

    if (cpwd === '') return false;
    
    if(!(cpwd === pwd)) return false;

    return true;
  
}  

export function sdateValidation(date) {
  var today = new Date();
  let str = date.split("-");
  if (parseInt(str[0]) < today.getFullYear()) {
    return false;
  }
  else if (parseInt(str[0]) === today.getFullYear() && parseInt(str[1]) < today.getMonth() + 1) {
    return false;
  }
  else if (parseInt(str[0]) === today.getFullYear() && parseInt(str[1]) === today.getMonth() + 1 && parseInt(str[2]) < today.getDate()) {
    return false;
  }
  else {
    return true;
  }
}

export function edateValidation(edate,sdate) {
  let str1 = sdate.split("-");
  let str2 = edate.split("-");
    
  if (parseInt(str1[0]) > parseInt(str2[0])) {
    return false;
  }
  else if (parseInt(str1[0]) <= parseInt(str2[0]) && parseInt(str1[1]) > parseInt(str2[1])) {
    return false;
  }
  else if (parseInt(str1[0]) <= parseInt(str2[0]) && parseInt(str1[1]) < parseInt(str2[1])) {
    return true;
  }
  else if (parseInt(str1[0]) === parseInt(str2[0]) && parseInt(str1[1]) === parseInt(str2[1]) && parseInt(str1[2]) > parseInt(str2[2])) {
    return false;
  }
  else {
    return true;
  }
}

export function phoneValidation(mobile) {
  if (mobile=='') return false;
  const isValid = isValidPhoneNumber(mobile);
  return isValid;
}

export function addressValidation(address) {

  if (address === '') return false;

  if (address.length > 50) return false;

  var notallowedCharacters = "!$%^&*+={][}><?|";


  for (var i = 0; i < notallowedCharacters.length; i++) {
    var char = notallowedCharacters.charAt(i);


    if (address.indexOf(char) != -1) {
      return false;
    }
  }

  return true;
}

export function dateValidation(date) {
  var today = new Date();
  let str = date.split("-");
  if (parseInt(str[0]) > today.getFullYear()) {
    return false;
  }
  else if (parseInt(str[0]) == today.getFullYear() && parseInt(str[1]) > today.getMonth() + 1) {
    return false;
  }
  else if (parseInt(str[0]) == today.getFullYear() && parseInt(str[1]) == today.getMonth() + 1 && parseInt(str[2]) > today.getDate()) {
    return false;
  }
  else {
    return true;
  }
}