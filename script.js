const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const smallTag = formControl.querySelector("small");
  smallTag.innerText = message;
}

// Show success Outline

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check email is Valid
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// Check Required Fields Function
function checkRequired(inputArr) {
  inputArr.forEach(function (element) {
    if (element.value.trim() === "") {
      showError(element, `${getFieldName(element)} is required`);
    } else {
      showSuccess(element);
    }
  });
}

// Making the first character of the Error message capital
function getFieldName(name) {
  return name.id.charAt(0).toUpperCase() + name.id.slice(1);
}

// Check the length of the username and the password
function checkLength(value, min, max) {
  if (value.value.length < min) {
    showError(
      value,
      `${getFieldName(value)} must be more than ${min} Characters `
    );
  } else if (value.value.length > max) {
    showError(
      value,
      `${getFieldName(value)}must be less than ${max} Characters `
    );
  } else if (value.value > min && value.value < max) {
    showSuccess(value);
  }
}

// Check password check
function checkPasswordMatch(item1, item2) {
  if (item1.value !== item2.value) {
    showError(item2, "The password does not matched");
  }
}

// Event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
