const SPREADSHEET_ID = "1UTA9sS67oEXgUJ802xF2oQZNKxphQBPwOXMJgTcrcAg";
const GENERAL_SHEET_NAME = "Înscrieri tabere 2026";

const CAMP_SHEETS = {
  "mishpahot": "Mishpahot",
  "negev": "Negev",
  "szarvas": "Szarvas",
  "hermon": "Hermon",
  "galil": "Galil",
  "golan": "Golan",
  "hermon-special": "Hermon Special",
  "tubishvat": "Tu BiShvat",
  "galil-winter": "Galil Winter",
  "test-camp": "Test Camp"
};

const BASE_HEADERS = [
  "Data primirii",
  "Data trimiterii formularului",
  "Tabără",
  "Perioadă"
];

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const generalSheet = getOrCreateSheet_(spreadsheet, GENERAL_SHEET_NAME);
    const campSheet = getOrCreateSheet_(spreadsheet, getCampSheetName_(payload));

    appendPayloadToSheet_(generalSheet, payload);
    appendPayloadToSheet_(campSheet, payload);

    return json_({
      ok: true,
      general_sheet: GENERAL_SHEET_NAME,
      camp_sheet: campSheet.getName()
    });
  } catch (error) {
    return json_({
      ok: false,
      error: String(error && error.message ? error.message : error)
    });
  }
}

function doGet() {
  return json_({
    ok: true,
    spreadsheet_id: SPREADSHEET_ID,
    message: "Endpoint înscrieri tabere 2026 activ"
  });
}

function getCampSheetName_(payload) {
  const id = String(payload.camp_id || "").trim();
  return CAMP_SHEETS[id] || sanitizeSheetName_(payload.camp_title || "Tabără");
}

function getOrCreateSheet_(spreadsheet, sheetName) {
  const safeName = sanitizeSheetName_(sheetName);
  let sheet = spreadsheet.getSheetByName(safeName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(safeName);
  }

  if (sheet.getLastRow() === 0) {
    ensureColumnCapacity_(sheet, BASE_HEADERS.length);
    sheet.getRange(1, 1, 1, BASE_HEADERS.length).setValues([BASE_HEADERS]);
  }

  return sheet;
}

function appendPayloadToSheet_(sheet, payload) {
  const fieldHeaders = buildFieldHeaders_(payload);
  const requiredHeaders = BASE_HEADERS.concat(fieldHeaders);
  const headers = ensureHeaders_(sheet, requiredHeaders);
  const rowObject = buildRowObject_(payload);
  const row = headers.map((header) => rowObject[header] || "");

  sheet.appendRow(row);
  formatSheet_(sheet);
}

function buildFieldHeaders_(payload) {
  const used = {};
  return (payload.fields || [])
    .filter((field) => isRelevantField_(field))
    .map((field) => uniqueHeader_(clean_(field.label || field.key || "Câmp"), used));
}

function isRelevantField_(field) {
  const label = clean_(field && field.label);
  const value = clean_(field && field.value);
  if (!label || !value) return false;

  const normalized = normalize_(label);
  if (normalized.includes("acorduri")) return false;
  if (normalized.includes("confirm ca am citit")) return false;
  if (normalized.includes("prelucrarea datelor")) return false;
  if (normalized.includes("conditiile generale")) return false;
  if (normalized.includes("sunt de acord")) return false;

  return true;
}

function ensureHeaders_(sheet, requiredHeaders) {
  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  const lastRow = Math.max(sheet.getLastRow(), 1);
  const existingHeaders = sheet.getRange(1, 1, 1, lastColumn).getValues()[0].filter(String);
  const headers = existingHeaders.length ? existingHeaders.slice() : BASE_HEADERS.slice();

  requiredHeaders.forEach((header) => {
    if (headers.indexOf(header) === -1) headers.push(header);
  });

  ensureColumnCapacity_(sheet, headers.length);
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  if (headers.length < lastColumn && lastRow > 0) {
    sheet.getRange(1, headers.length + 1, lastRow, lastColumn - headers.length).clearContent();
  }

  return headers;
}

function buildRowObject_(payload) {
  const row = {
    "Data primirii": new Date(),
    "Data trimiterii formularului": payload.submitted_at || "",
    "Tabără": payload.camp_title || "",
    "Perioadă": payload.camp_dates || ""
  };

  const used = {};
  (payload.fields || []).filter(isRelevantField_).forEach((field) => {
    const header = uniqueHeader_(clean_(field.label || field.key || "Câmp"), used);
    row[header] = clean_(field.value);
  });

  return row;
}

function uniqueHeader_(header, used) {
  const base = header || "Câmp";
  used[base] = (used[base] || 0) + 1;
  return used[base] === 1 ? base : `${base} ${used[base]}`;
}

function ensureColumnCapacity_(sheet, requiredColumns) {
  const maxColumns = sheet.getMaxColumns();
  if (requiredColumns > maxColumns) {
    sheet.insertColumnsAfter(maxColumns, requiredColumns - maxColumns);
  }
}

function formatSheet_(sheet) {
  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  const headerRange = sheet.getRange(1, 1, 1, lastColumn);

  headerRange
    .setBackground("#173f2a")
    .setFontColor("#ffffff")
    .setFontWeight("bold")
    .setWrap(true)
    .setVerticalAlignment("middle");

  sheet.setFrozenRows(1);

  for (let column = 1; column <= lastColumn; column += 1) {
    sheet.setColumnWidth(column, column <= 4 ? 180 : 230);
  }
}

function sanitizeSheetName_(value) {
  return clean_(value)
    .replace(/[\\/?*\[\]:]/g, "-")
    .slice(0, 90) || "Tabără";
}

function normalize_(value) {
  return clean_(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function clean_(value) {
  return String(value || "").replace(/\*/g, "").trim();
}

function json_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
