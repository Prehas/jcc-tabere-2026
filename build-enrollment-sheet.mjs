import { Workbook, SpreadsheetFile } from "@oai/artifact-tool";
import fs from "node:fs/promises";
import path from "node:path";

const outputDir = path.join("outputs", "jcc-inscrieri-tabere-2026");
const outputPath = path.join(outputDir, "JCC - Înscrieri tabere 2026.xlsx");

function colName(index) {
  let value = "";
  let current = index + 1;
  while (current > 0) {
    const remainder = (current - 1) % 26;
    value = String.fromCharCode(65 + remainder) + value;
    current = Math.floor((current - 1) / 26);
  }
  return value;
}

const headers = [
  "Data primirii",
  "Data trimiterii formularului",
  "Tabără",
  "Perioadă",
  "Contraindicații medicamentoase / alergii / regim alimentar",
  "Transport ales",
  "Persoane transport",
  "Ora estimată de sosire"
];

const instructions = [
  ["Cum se folosește"],
  ["1. Importă acest fișier în Google Drive ca Google Sheets."],
  ["2. Deschide Extensions > Apps Script și lipește codul din google-sheets-test.apps-script.js."],
  ["3. Deploy > New deployment > Web app."],
  ["4. Execute as: Me. Who has access: Anyone."],
  ["5. Copiază URL-ul /exec în constanta GOOGLE_SHEETS_WEB_APP_URL din camp-page.js."],
  [""],
  ["Ce se salvează"],
  ["Doar datele cerute: adulți, copii, contraindicații, transport, persoane transport și ora estimată de sosire."],
  ["Nu se salvează suma contribuției, status NETOPIA sau alte câmpuri administrative."]
];

const workbook = Workbook.create();
const lastColumn = colName(headers.length - 1);

await workbook.apply([
  { op: "sheet.add", name: "Înscrieri tabere 2026" },
  { op: "sheet.add", name: "Instrucțiuni" },
  {
    op: "range.values.set",
    target: { sheet: "Înscrieri tabere 2026", range: `A1:${lastColumn}1` },
    values: [headers]
  },
  {
    op: "range.values.set",
    target: { sheet: "Instrucțiuni", range: `A1:A${instructions.length}` },
    values: instructions
  },
  {
    op: "range.format.set",
    target: { sheet: "Înscrieri tabere 2026", range: `A1:${lastColumn}1` },
    props: {
      fill: "#173F2A",
      font: { bold: true, color: "#FFFFFF" },
      wrapText: true,
      horizontalAlignment: "center",
      verticalAlignment: "middle"
    }
  },
  {
    op: "range.format.set",
    target: { sheet: "Înscrieri tabere 2026", range: `A2:${lastColumn}200` },
    props: {
      fill: "#F8FAF7",
      font: { color: "#17221C" },
      wrapText: true,
      verticalAlignment: "top"
    }
  },
  {
    op: "range.format.set",
    target: { sheet: "Instrucțiuni", range: "A1:A1" },
    props: {
      fill: "#173F2A",
      font: { bold: true, color: "#FFFFFF", size: 16 },
      verticalAlignment: "middle"
    }
  },
  {
    op: "range.format.set",
    target: { sheet: "Instrucțiuni", range: `A2:A${instructions.length}` },
    props: {
      fill: "#F8FAF7",
      font: { color: "#17221C", size: 11 },
      wrapText: true,
      verticalAlignment: "top"
    }
  },
  {
    op: "table.add",
    props: {
      range: { sheet: "Înscrieri tabere 2026", range: `A1:${lastColumn}2` },
      hasHeaders: true,
      name: "InscrieriTabere2026"
    }
  }
]);

const registrationSheet = workbook.worksheets.getItem("Înscrieri tabere 2026");
registrationSheet.getRange(`A1:${lastColumn}1`).format.autofitColumns();
registrationSheet.getRange("A1:A1").format.columnWidth = 150;
registrationSheet.getRange("B1:B1").format.columnWidth = 180;
registrationSheet.getRange("C1:D1").format.columnWidth = 180;
registrationSheet.getRange("E1:E1").format.columnWidth = 280;
registrationSheet.getRange("F1:H1").format.columnWidth = 160;

const instructionSheet = workbook.worksheets.getItem("Instrucțiuni");
instructionSheet.getRange("A:A").format.columnWidth = 780;
instructionSheet.getRange(`A1:A${instructions.length}`).format.rowHeight = 32;

await workbook.inspect({
  kind: "table",
  range: `Înscrieri tabere 2026!A1:${lastColumn}1`,
  include: "values",
  tableMaxRows: 1,
  tableMaxCols: headers.length
});

await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 50 },
  summary: "formula error scan"
});

await workbook.render({ sheetName: "Înscrieri tabere 2026", range: `A1:${lastColumn}8`, scale: 1 });
await workbook.render({ sheetName: "Instrucțiuni", range: `A1:A${instructions.length}`, scale: 1 });

await fs.mkdir(outputDir, { recursive: true });
const exported = await SpreadsheetFile.exportXlsx(workbook);
await exported.save(outputPath);

console.log(outputPath);
