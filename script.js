const generateButton = document.querySelector(".btn");
const lengthSlider = document.getElementById("slider");
const lowercaseCheckbox = document.getElementById("lowercase");
const uppercaseCheckbox = document.getElementById("uppercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const passwordText = document.querySelector(".password-display p");
const lengthNumber = document.getElementById("slider-count");
const copyIcon = document.querySelector(".copy");
const copiedText = document.querySelector(".copied-text");
const strengthText = document.querySelector(".strength-rating-text");
const strengthBars = document.querySelectorAll(".bar");

const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

function updateSlider() {
  const currentLength = lengthSlider.value;
  const minLength = 8;
  const maxLength = 25;

  const percentage = ((currentLength - minLength) / (maxLength - minLength)) * 100;

  lengthSlider.style.background = `linear-gradient(to right,
    var(--green-200) 0%,
    var(--green-200) ${percentage}%,
    var(--grey-850) ${percentage}%,
    var(--grey-850) 100%)`;

  lengthNumber.textContent = currentLength;
  updateStrength();
}

function showErrorMessage() {
  passwordText.textContent = "Please select at least one character type!";
  document.querySelector(".password-display").classList.add("error");

  setTimeout(function () {
    document.querySelector(".password-display").classList.remove("error");
  }, 3000);
}

function copyPassword() {
  const password = passwordText.textContent;

  if (password === "i3IEeUMx1rICio2kEUj" || password.includes("Please select")) {
    return;
  }

  navigator.clipboard.writeText(password).then(function () {
    copiedText.textContent = "COPIED";
    copiedText.classList.add("show");

    setTimeout(function () {
      copiedText.classList.remove("show");
    }, 2000);
  });
}

function calculateStrength() {
  const passwordLength = parseInt(lengthSlider.value);

  let characterTypes = 0;
  if (uppercaseCheckbox.checked) characterTypes++;
  if (lowercaseCheckbox.checked) characterTypes++;
  if (numbersCheckbox.checked) characterTypes++;
  if (symbolsCheckbox.checked) characterTypes++;

  if (passwordLength < 8 || characterTypes === 0) {
    return "TOO WEAK";
  } else if (passwordLength >= 8 && passwordLength <= 11) {
    if (characterTypes <= 2) return "WEAK";
    else return "MEDIUM";
  } else if (passwordLength >= 12 && passwordLength <= 15) {
    if (characterTypes <= 2) return "MEDIUM";
    else return "STRONG";
  } else {
    if (characterTypes <= 1) return "MEDIUM";
    else return "STRONG";
  }
}

function updateStrength() {
  const strength = calculateStrength();

  strengthText.textContent = strength;

  strengthBars.forEach((bar) => {
    bar.style.backgroundColor = "";
    bar.style.borderColor = "white";
  });

  strengthText.style.color = "";

  if (strength === "TOO WEAK") {
    strengthBars[0].style.backgroundColor = "var(--red-500)";
    strengthBars[0].style.borderColor = "var(--red-500)";
    strengthText.style.color = "var(--red-500)";
  } else if (strength === "WEAK") {
    for (let i = 0; i < 2; i++) {
      strengthBars[i].style.backgroundColor = "var(--orange-400)";
      strengthBars[i].style.borderColor = "var(--orange-400)";
    }
    strengthText.style.color = "var(--orange-400)";
  } else if (strength === "MEDIUM") {
    for (let i = 0; i < 3; i++) {
      strengthBars[i].style.backgroundColor = "var(--yellow-300)";
      strengthBars[i].style.borderColor = "var(--yellow-300)";
    }
    strengthText.style.color = "var(--yellow-300)";
  } else if (strength === "STRONG") {
    for (let i = 0; i < 4; i++) {
      strengthBars[i].style.backgroundColor = "var(--green-200)";
      strengthBars[i].style.borderColor = "var(--green-200)";
    }
    strengthText.style.color = "var(--green-200)";
  }
}

function createPassword() {
  const passwordLength = parseInt(lengthSlider.value);

  const useUppercase = uppercaseCheckbox.checked;
  const useLowercase = lowercaseCheckbox.checked;
  const useNumbers = numbersCheckbox.checked;
  const useSymbols = symbolsCheckbox.checked;

  if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
    showErrorMessage();
    return;
  }

  document.querySelector(".password-display").classList.remove("error");

  let allAllowedChars = "";
  if (useUppercase) allAllowedChars += uppercaseLetters;
  if (useLowercase) allAllowedChars += lowercaseLetters;
  if (useNumbers) allAllowedChars += numberChars;
  if (useSymbols) allAllowedChars += symbolChars;

  let newPassword = "";

  if (useUppercase) {
    const randomIndex = Math.floor(Math.random() * uppercaseLetters.length);
    newPassword += uppercaseLetters[randomIndex];
  }
  if (useLowercase) {
    const randomIndex = Math.floor(Math.random() * lowercaseLetters.length);
    newPassword += lowercaseLetters[randomIndex];
  }
  if (useNumbers) {
    const randomIndex = Math.floor(Math.random() * numberChars.length);
    newPassword += numberChars[randomIndex];
  }
  if (useSymbols) {
    const randomIndex = Math.floor(Math.random() * symbolChars.length);
    newPassword += symbolChars[randomIndex];
  }

  while (newPassword.length < passwordLength) {
    const randomIndex = Math.floor(Math.random() * allAllowedChars.length);
    newPassword += allAllowedChars[randomIndex];
  }

  let passwordArray = newPassword.split("");
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = passwordArray[i];
    passwordArray[i] = passwordArray[j];
    passwordArray[j] = temp;
  }
  newPassword = passwordArray.join("");

  passwordText.textContent = newPassword;
  updateStrength();
}

lengthSlider.addEventListener("input", updateSlider);
generateButton.addEventListener("click", createPassword);
copyIcon.addEventListener("click", copyPassword);

uppercaseCheckbox.addEventListener("change", updateStrength);
lowercaseCheckbox.addEventListener("change", updateStrength);
numbersCheckbox.addEventListener("change", updateStrength);
symbolsCheckbox.addEventListener("change", updateStrength);

updateSlider();
updateStrength();
