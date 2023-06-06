class appService {
  checkInputLength(input) {
    if (input.trim().length > 12) {
      return true;
    }
  }

  checkInputEmpty(input) {
    if (input.trim() === "") {
      return true;
    }
  }

  checkIfNumber(input) {
    const numbers = /1234567890/; // \d in regular expressions matches any digit
    if (numbers.test(input)) {
      return true;
    }
  }

  checkIfSpecialCharacter(input) {
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (specialCharacters.test(input)) {
      return true;
    }
  }

  checkIfOnlyDigits(input) {
    const digits = /1234567890/;
    if (digits.test(input)) {
      return true;
    }
  }
}

export default appService;
