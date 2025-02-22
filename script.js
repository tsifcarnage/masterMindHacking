let password;
let attempts;
let historyList = document.getElementById("history-list");
//Fonction pour générer un nouveau mot de passe
function generatePassword() {
  password = Array.from({ length: 4 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  console.log("Mot de passe secret (dev only) : " + password); // DEBUG
  attempts = 10;
  document.getElementById("remaining").innerText = attempts;
}

// Initialisation du jeu
generatePassword();

function checkPassword() {
  let guess = document.getElementById("guess").value;
  let feedback = document.getElementById("feedback");
  let remaining = document.getElementById("remaining");
  let submitBtn = document.getElementById("submit-btn");
  let termaBank = document.getElementById("termaBank");
  let termaMdp = document.getElementById("termaMdp");
  if (guess.length !== 4 || isNaN(guess)) {
    feedback.innerHTML =
      "<p style='color:red;'>⚠️ Entrez un code de 4 chiffres !</p>";
    return;
  }

  // Ajouter l'essai à l'historique
  let listItem = document.createElement("li");
  listItem.textContent = `🗝️ ${guess}`;
  historyList.appendChild(listItem);

  if (guess === password) {
    feedback.innerHTML =
      "<p style='color:lime;'>✅ ACCÈS AUTORISÉ ! COFFRE DÉVERROUILLÉ ! 💰</p>";
    termaBank.innerHTML = "Accès au coffre de la banque sécurisé 🔓";
    termaMdp.style.display = "none";
    document.getElementById("guess").disabled = true;
    submitBtn.disabled = true;
    return;
  }

  let correct = 0;
  let misplaced = 0;

  let passArray = password.split("");
  let guessArray = guess.split("");

  // Vérifier les chiffres bien placés
  for (let i = 0; i < 4; i++) {
    if (guessArray[i] === passArray[i]) {
      correct++;
      passArray[i] = null;
      guessArray[i] = "X";
    }
  }

  // Vérifier les chiffres corrects mais mal placés
  for (let i = 0; i < 4; i++) {
    let index = passArray.indexOf(guessArray[i]);
    if (index !== -1) {
      misplaced++;
      passArray[index] = null;
    }
  }

  attempts--;
  remaining.innerText = attempts;

  if (attempts === 0) {
    feedback.innerHTML =
      "<p style='color:red;'>⛔ SYSTÈME VERROUILLÉ ! ALERTE ACTIVÉE ! 🚨</p>";
    document.getElementById("guess").disabled = true;
    submitBtn.disabled = true;
    document.getElementById("retry-btn").style.display = "block"; // Afficher le bouton "Nouvelle tentative"
    return;
  }

  feedback.innerHTML = `🟢 Chiffres bien placés : ${correct}<br>🟡 Chiffres corrects mais mal placés : ${misplaced}`;
}

// Réinitialiser le jeu
function resetGame() {
  generatePassword();
  document.getElementById("guess").value = "";
  document.getElementById("guess").disabled = false;
  document.getElementById("submit-btn").disabled = false;
  document.getElementById("feedback").innerHTML = "";
  document.getElementById("retry-btn").style.display = "none"; // Cacher le bouton de reset
  historyList.innerHTML = "";
}
