// ============================================================================
// CODE À COLLER DANS GOOGLE SHEETS > EXTENSIONS > APPS SCRIPT
// ============================================================================
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Inscriptions")
                || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    var raw = (e && e.postData && e.postData.contents) ? e.postData.contents : "{}";
    var data = JSON.parse(raw);

    // Trouve la première ligne vide en colonne B (pour écrire dès la ligne 2
    // même si les menus déroulants en colonne I vont jusqu'à la ligne 100)
    var lastRow = sheet.getRange("B1:B").getValues().filter(String).length + 1;

    sheet.getRange(lastRow, 1, 1, 9).setValues([[
      new Date().toLocaleString("fr-FR"),
      data.teamName || "",
      data.captainName || "",
      data.phone || "",
      data.email || "",
      data.partnerName || "",
      data.level || "",
      data.loanBalls || "Non",
      "Non"
    ]]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("API d'inscription opérationnelle !");
}
