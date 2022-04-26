const EmailValidation = (enteredEmail) => {
  if (!enteredEmail.includes('@') || !enteredEmail.includes('.com')) {
    return false;
  }
  return true;
};

module.exports = EmailValidation;