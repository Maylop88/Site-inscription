// ============================================================================
// CONFIGURATION : Remplacez l'URL ci-dessous par votre URL Google Apps Script
// complète (elle doit commencer par https://script.google.com/macros/s/
// et se terminer par /exec).
// ============================================================================
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwmv9pS8mlLKSTpXp22nACxlG-ZW54fwuAwN15S7sT8YBepmbHBT8mfvFmV44xzc-FRyg/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const submitBtn = document.getElementById("submitBtn");
  const feedbackBox = document.getElementById("feedbackBox");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Vérification que l'URL a bien été configurée
    if (!SCRIPT_URL.startsWith("https://script.google.com/macros/s/") || !SCRIPT_URL.endsWith("/exec")) {
      showFeedback(
        "error",
        "Configuration incomplète : ouvrez le fichier js/inscription.js et collez votre URL complète Google Apps Script se terminant par /exec."
      );
      return;
    }

    const payload = {
      teamName: document.getElementById("teamName").value.trim(),
      captainName: document.getElementById("captainName").value.trim(),
      partnerName: document.getElementById("partnerName").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim(),
      level: document.getElementById("level").value,
      loanBalls: document.getElementById("loanBalls").checked ? "Oui" : "Non"
    };

    // État de chargement du bouton
    submitBtn.disabled = true;
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = "<span>Enregistrement en cours...</span>";
    feedbackBox.classList.add("hidden");

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      showFeedback(
        "success",
        `✅ Inscription confirmée pour la doublette « ${payload.teamName} » ! Rendez-vous le mercredi 13 janvier 2027 à la Halle des Courlis (20 € à régler sur place).`
      );
      form.reset();
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      showFeedback(
        "error",
        "❌ Une erreur réseau est survenue lors de l'envoi. Vérifiez votre connexion internet et réessayez."
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    }
  });

  function showFeedback(type, message) {
    feedbackBox.classList.remove(
      "hidden",
      "bg-emerald-50",
      "text-emerald-900",
      "border",
      "border-emerald-200",
      "bg-rose-50",
      "text-rose-900",
      "border-rose-200"
    );

    if (type === "success") {
      feedbackBox.classList.add("bg-emerald-50", "text-emerald-900", "border", "border-emerald-200");
    } else {
      feedbackBox.classList.add("bg-rose-50", "text-rose-900", "border", "border-rose-200");
    }

    feedbackBox.textContent = message;
  }
});
