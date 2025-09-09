const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const generateBtn = document.getElementById("generateBtn");
const togglePassword = document.getElementById("togglePassword");

const checks = {
  length: document.getElementById("length"),
  uppercase: document.getElementById("uppercase"),
  lowercase: document.getElementById("lowercase"),
  number: document.getElementById("number"),
  special: document.getElementById("special"),
};

// Update strength meter
passwordInput.addEventListener("input", updateStrength);

function updateStrength() {
  const password = passwordInput.value;
  let strength = 0;

  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };

  for (let rule in rules) {
    if (rules[rule]) {
      checks[rule].classList.remove("invalid");
      checks[rule].classList.add("valid");
      checks[rule].textContent = "✔️ " + checks[rule].textContent.slice(2);
      strength++;
    } else {
      checks[rule].classList.remove("valid");
      checks[rule].classList.add("invalid");
      checks[rule].textContent = "❌ " + checks[rule].textContent.slice(2);
    }
  }

  const percent = (strength / 5) * 100;
  strengthBar.style.width = percent + "%";
  strengthBar.style.backgroundColor = getColor(strength);

  const levels = ["None", "Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
  strengthText.textContent = levels[strength];
}

function getColor(score) {
  switch (score) {
    case 1: return "red";
    case 2: return "orange";
    case 3: return "gold";
    case 4: return "blue";
    case 5: return "green";
    default: return "transparent";
  }
}

// Toggle show/hide password
togglePassword.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
});

// Generate password
generateBtn.addEventListener("click", () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  passwordInput.value = password;
  updateStrength();
});
