const pageCampId = document.body.dataset.campId;
const camp = window.CAMPS.find((item) => item.id === pageCampId);
const detailRoot = document.querySelector("#campDetail");
const GOOGLE_SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbz59C-2t4b2Ax5JNvVWW90JNUWvIL4RI8fRnuHMkQk9Q2Zpr1ERCMyBiT0UZPg-oo-29Q/exec";
let adultCounter = 1;
let childCounter = 1;
let participantCounter = 1;

function money(value) {
  return `${value.toLocaleString("ro-RO")} lei`;
}

function campEnded(campItem) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now > new Date(`${campItem.endDate}T23:59:59`);
}

function fieldId(sectionIndex, fieldIndex) {
  return `field_${sectionIndex}_${fieldIndex}`;
}

function requiredStar(required) {
  return required ? `<span class="required-star" aria-label="obligatoriu">*</span>` : "";
}

function renderField(field, sectionIndex, fieldIndex, disabled) {
  const [label, type, required, options = []] = field;
  const id = fieldId(sectionIndex, fieldIndex);
  const req = required ? "required" : "";
  const dis = disabled ? "disabled" : "";

  if (type === "textarea") {
    return `<label class="form-field wide" for="${id}"><span>${label}${requiredStar(required)}</span><textarea id="${id}" name="${id}" rows="4" ${req} ${dis}></textarea></label>`;
  }

  if (type === "radio" || type === "checkbox") {
    const inputType = type === "checkbox" && options.length <= 2 ? "checkbox" : "radio";
    return `
      <fieldset class="choice-group wide">
        <legend>${label}${requiredStar(required)}</legend>
        ${options.map((option, index) => `
          <label class="check-row">
            <input type="${inputType}" name="${id}" value="${option}" ${required && index === 0 ? "required" : ""} ${dis}>
            <span>${option}</span>
          </label>
        `).join("")}
      </fieldset>
    `;
  }

  return `<label class="form-field" for="${id}"><span>${label}${requiredStar(required)}</span><input id="${id}" name="${id}" type="${type}" ${req} ${dis}></label>`;
}

function defaultParticipantFields(kind, index) {
  if (kind === "adult") {
    return [
      ["Nume complet", "text", true],
      ["Telefon", "tel", true],
      ["Data nașterii", "date", true],
      ["Email", "email", index === 1]
    ];
  }

  return [
    ["Nume complet", "text", true],
    ["Grad de rudenie", "text", true],
    ["Data nașterii", "date", true]
  ];
}

function participantTitle(kind, index) {
  if (kind === "child") return `Copil ${index}`;
  if (kind === "adult") return `Adult ${index}`;
  return `Participant ${index}`;
}

function participantNoun(kind) {
  if (kind === "child") return "copil";
  if (kind === "adult") return "adult";
  return "participant";
}

function renderParticipantInput(field, prefix, fieldIndex, disabled) {
  const [label, type, required, options = []] = field;
  const id = `${prefix}_${fieldIndex}`;
  const req = required ? "required" : "";
  const dis = disabled ? "disabled" : "";

  if (type === "textarea") {
    return `<label class="form-field wide" for="${id}"><span>${label}${requiredStar(required)}</span><textarea id="${id}" name="${id}" rows="4" ${req} ${dis}></textarea></label>`;
  }

  if (type === "radio" || type === "checkbox") {
    const inputType = type === "checkbox" && options.length <= 2 ? "checkbox" : "radio";
    return `
      <fieldset class="choice-group wide">
        <legend>${label}${requiredStar(required)}</legend>
        ${options.map((option, optionIndex) => `
          <label class="check-row">
            <input type="${inputType}" name="${id}" value="${option}" ${required && optionIndex === 0 ? "required" : ""} ${dis}>
            <span>${option}</span>
          </label>
        `).join("")}
      </fieldset>
    `;
  }

  return `<label class="form-field" for="${id}"><span>${label}${requiredStar(required)}</span><input id="${id}" name="${id}" type="${type}" ${req} ${dis}></label>`;
}

function participantFields(kind, index, disabled, removable, fields = null) {
  const title = participantTitle(kind, index);
  const prefix = `${kind}_${index}`;
  const fieldSet = fields || defaultParticipantFields(kind, index);

  return `
    <article class="participant-card" data-participant-group="${kind}">
      <div class="participant-card-head">
        <h4>${title}</h4>
        ${removable ? `<button class="icon-text remove-participant" type="button" data-remove-participant aria-label="Elimină ${participantNoun(kind)}ul ${index}"><span aria-hidden="true">?</span><span>Elimină</span></button>` : ""}
      </div>
      ${fieldSet.map((field, fieldIndex) => renderParticipantInput(field, prefix, fieldIndex, disabled)).join("")}
    </article>
  `;
}

function childParticipantFields() {
  return [
    ["Numele complet al copilului", "text", true],
    ["Data nașterii / Date of birth", "date", true],
    ["Oraș / City", "text", true],
    ["Contraindicații medicamentoase, alergii, boli, regim alimentar", "textarea", true]
  ];
}

function participantFieldsForCamp() {
  if (camp.id === "negev") {
    return [
      ["Numele complet al copilului", "text", true],
      ["Data nașterii / Date of birth", "date", true],
      ["Oraș / City", "text", true],
      ["Copilul vorbește limba română? / Does the child speak Romanian?", "radio", true, ["Da / Yes", "Nu / No"]],
      ["Limbi vorbite / Languages the child speaks", "text", true],
      ["Contraindicații medicamentoase, alergii, boli, regim alimentar", "textarea", true]
    ];
  }

  if (camp.id === "szarvas") {
    return [
      ["Nume complet participant", "text", true],
      ["Data nașterii", "date", true],
      ["Oraș", "text", true],
      ["Comunitatea evreiască", "text", true],
      ["Instituție de învățământ din România", "text", true],
      ["Participantul vorbește limba română?", "radio", true, ["Da", "Nu"]],
      ["Informații medicale / alergii / regim alimentar", "textarea", true]
    ];
  }

  if (camp.id === "galil" || camp.id === "galil-winter") {
    return childParticipantFields();
  }

  if (camp.id === "golan") {
    return [
      ["Numele de familie și prenumele", "text", true],
      ["Data nașterii / Date of birth", "date", true],
      ["Telefon / Phone number", "tel", true],
      ["Email", "email", true],
      ["Restricții alimentare, dacă este cazul", "text", false],
      ["Sunt membru/membră în comunitatea evreilor din orașul cu numele", "text", true],
      ["Aș dori să stau în camera cu", "text", false],
      ["Dețin o mașină personală cu care aș putea asigura transportul altor persoane", "radio", true, ["Da - Yes", "Nu - No"]]
    ];
  }

  return [
    ["Nume complet participant", "text", true],
    ["Data nașterii", "date", true],
    ["Telefon", "tel", true],
    ["Email", "email", true],
    ["Sunt membru/membră în comunitatea evreilor din orașul cu acest nume", "text", true],
    ["Dietă/probleme de sănătate", "text", false]
  ];
}

function sharedSectionsForCamp() {
  if (camp.id === "negev") {
    return [
      {
        title: "Transport",
        fields: [
          ["Transport", "radio", true, ["transport din București cu grupul", "doar dus: transport din București cu grupul", "doar întors: transport către București cu grupul", "transport pe cont propriu"]]
        ]
      },
      {
        title: "Date despre părinți / susținători legali",
        fields: [
          ["Numele de familie și prenumele primului susținător legal", "text", true],
          ["Telefon / Phone number", "tel", true],
          ["Email primul susținător legal", "email", true],
          ["Al doilea susținător legal - numele de familie și prenumele", "text", false],
          ["Al doilea susținător legal - telefon", "tel", false],
          ["Al doilea susținător legal - email", "email", false]
        ]
      }
    ];
  }

  if (camp.id === "galil" || camp.id === "galil-winter") {
    return [
      {
        title: "Transport",
        fields: [
          ["Transport / Transportation", "radio", true, ["transport din București cu grupul", "transport pe cont propriu"]]
        ]
      },
      {
        title: "Date despre părinți/susținători legali",
        fields: [
          ["Nume complet al primului adult", "text", true],
          ["Telefon / Phone number", "tel", true],
          ["Email primul adult", "email", true],
          ["Al doilea adult - numele complet", "text", false],
          ["Al doilea adult - telefon", "tel", false],
          ["Al doilea adult - email", "email", false]
        ]
      }
    ];
  }

  if (camp.id === "szarvas") {
    return [
      {
        title: "Contact părinte / responsabil",
        fields: [
          ["Nume părinte / responsabil", "text", true],
          ["Telefon", "tel", true],
          ["Email", "email", true]
        ]
      }
    ];
  }

  return [];
}

function repeatableParticipantConfig() {
  if (!camp.checkout || camp.checkout.type === "family") return null;

  const childCampIds = new Set(["negev", "szarvas", "galil", "galil-winter"]);
  const kind = childCampIds.has(camp.id) || camp.category === "copii" ? "child" : "participant";

  return {
    kind,
    fields: participantFieldsForCamp(),
    sharedSections: sharedSectionsForCamp(),
    eyebrow: kind === "child" ? "Copii" : "Participanți",
    title: kind === "child" ? "Date despre copiii participanți" : "Date despre participanți",
    description: kind === "child"
      ? "Primul copil este obligatoriu. Poți adăuga și elimina copii în funcție de înscriere."
      : "Primul participant este obligatoriu. Poți adăuga și elimina participanți în funcție de înscriere.",
    addLabel: kind === "child" ? "+ Adaugă copil" : "+ Adaugă participant",
    summaryLabel: kind === "child" ? "Copii completați" : "Participanți completați"
  };
}

function renderAgreements(disabled) {
  return `
    <fieldset class="form-section agreements">
      <legend>Acorduri</legend>
      <label class="check-row required-agreement">
        <input type="checkbox" required ${disabled ? "disabled" : ""}>
        <span>Confirm că am citit condițiile generale de participare.${requiredStar(true)}</span>
      </label>
      <label class="check-row required-agreement">
        <input type="checkbox" required ${disabled ? "disabled" : ""}>
        <span>Sunt de acord cu prelucrarea datelor pentru organizarea taberei.${requiredStar(true)}</span>
      </label>
    </fieldset>
  `;
}

function renderFamilyForm(disabled) {
  adultCounter = 1;
  childCounter = 1;

  return `
    <form class="camp-form" id="campForm">
      <section class="repeat-section" aria-labelledby="adult-section-title">
        <div class="repeat-section-head">
          <div>
            <p class="eyebrow">Participanți</p>
            <h3 id="adult-section-title">Date despre adulții participanți</h3>
            <p>Primul adult este obligatoriu. Poți adăuga oricâți adulți mai participă.</p>
          </div>
        </div>
        <div class="repeat-list" id="adultList">
          ${participantFields("adult", 1, disabled, false)}
        </div>
        <button class="add-row-button" type="button" id="addAdult" ${disabled ? "disabled" : ""}>+ Adaugă adult</button>
      </section>

      <section class="repeat-section" aria-labelledby="child-section-title">
        <div class="repeat-section-head">
          <div>
            <p class="eyebrow">Copii</p>
            <h3 id="child-section-title">Date despre copiii participanți</h3>
            <p>Primul copil este obligatoriu. Poți adăuga copii suplimentari după nevoie.</p>
          </div>
        </div>
        <div class="repeat-list" id="childList">
          ${participantFields("child", 1, disabled, false)}
        </div>
        <button class="add-row-button" type="button" id="addChild" ${disabled ? "disabled" : ""}>+ Adaugă copil</button>
      </section>

      <fieldset class="form-section">
        <legend>Informații medicale și transport</legend>
        <label class="form-field wide">
          <span>Contraindicații medicamentoase, alergii, boli, altele${requiredStar(true)}</span>
          <textarea name="medical_info" rows="4" required ${disabled ? "disabled" : ""}></textarea>
        </label>
        <fieldset class="choice-group wide">
          <legend>Doresc transport cu autocarul din București${requiredStar(true)}</legend>
          ${["Nu e cazul", "Dus-întors", "Doar dus", "Doar întors"].map((option, index) => `
            <label class="check-row">
              <input type="radio" name="transport_choice" value="${option}" ${index === 0 ? "required" : ""} ${disabled ? "disabled" : ""}>
              <span>${option}</span>
            </label>
          `).join("")}
        </fieldset>
        <label class="form-field">
          <span>Ora estimată la care ajungem în tabără${requiredStar(true)}</span>
          <input name="arrival_time" type="text" required ${disabled ? "disabled" : ""}>
        </label>
      </fieldset>

      ${renderAgreements(disabled)}
    </form>
  `;
}

function renderRepeatableParticipantForm(disabled) {
  const config = repeatableParticipantConfig();
  participantCounter = 1;

  return `
    <form class="camp-form" id="campForm">
      <section class="repeat-section" aria-labelledby="participant-section-title">
        <div class="repeat-section-head">
          <div>
            <p class="eyebrow">${config.eyebrow}</p>
            <h3 id="participant-section-title">${config.title}</h3>
            <p>${config.description}</p>
          </div>
        </div>
        <div class="repeat-list" id="participantList">
          ${participantFields(config.kind, 1, disabled, false, config.fields)}
        </div>
        <button class="add-row-button" type="button" id="addParticipant" ${disabled ? "disabled" : ""}>${config.addLabel}</button>
      </section>

      ${config.sharedSections.map((section, sectionIndex) => `
        <fieldset class="form-section">
          <legend>${section.title}</legend>
          ${section.fields.map((field, fieldIndex) => renderField(field, sectionIndex, fieldIndex, disabled)).join("")}
        </fieldset>
      `).join("")}

      ${renderAgreements(disabled)}
    </form>
  `;
}

function renderForm(disabled) {
  if (camp.embeddedFormUrl) {
    return `
      <div class="embedded-form-shell">
        <iframe
          class="embedded-form-frame"
          src="${camp.embeddedFormUrl}"
          title="Formular înscriere ${camp.title}"
          loading="lazy"
          frameborder="0"
          marginheight="0"
          marginwidth="0">Loading...</iframe>
      </div>
    `;
  }

  if (camp.checkout?.type === "family") {
    return renderFamilyForm(disabled);
  }

  const repeatableConfig = repeatableParticipantConfig();
  if (repeatableConfig) {
    return renderRepeatableParticipantForm(disabled);
  }

  if (!camp.formSections.length) {
    return `
      <div class="empty-state">
        <h3>Formular indisponibil pentru această pagină</h3>
        <p>Pentru taberele încheiate sau pentru formulare externe, structura completă se poate adăuga în etapa următoare.</p>
      </div>
    `;
  }

  return `
    <form class="camp-form" id="campForm">
      ${camp.formSections.map((section, sectionIndex) => `
        <fieldset class="form-section">
          <legend>${section.title}</legend>
          ${section.fields.map((field, fieldIndex) => renderField(field, sectionIndex, fieldIndex, disabled)).join("")}
        </fieldset>
      `).join("")}
      ${renderAgreements(disabled)}
    </form>
  `;
}

function renderEmbeddedContributionCalculator(disabled) {
  const unitPrice = camp.checkout?.participantPrice || 0;
  return `
    <section class="payment-calculator embedded-contribution-calculator" aria-labelledby="embedded-contribution-title">
      <div class="calculator-top">
        <div>
          <p class="eyebrow">Calculator contribuție tabără</p>
          <h3 id="embedded-contribution-title">Achită contribuția aici</h3>
        </div>
        <strong id="embeddedContributionTotal">0 lei</strong>
      </div>
      <div class="calculator-form embedded-calculator-form">
        <div class="calculator-field calculator-camp-field">
          <span>Tabăra selectată</span>
          <div class="calculator-camp-trigger locked" style="--selected-camp-color: ${camp.color}">
            <span class="camp-color-dot" aria-hidden="true"></span>
            <span>${camp.title} - ${camp.dates}</span>
            <span class="calculator-locked-label">Blocat</span>
          </div>
        </div>
        <div class="calculator-stepper embedded-participant-stepper">
          <span>Participanți</span>
          <button type="button" data-embedded-decrement aria-label="Scade participanți" ${disabled ? "disabled" : ""}>−</button>
          <output id="embeddedParticipantQty">0</output>
          <button type="button" data-embedded-increment aria-label="Crește participanți" ${disabled ? "disabled" : ""}>+</button>
        </div>
        <div class="calculator-summary embedded-calculator-summary">
          <div><span>Contribuție / participant</span><strong>${money(unitPrice)}</strong></div>
          <div><span>Transport</span><strong>Fără transport</strong></div>
        </div>
        <button class="button primary calculator-pay-button" id="embeddedContributionButton" type="button" ${disabled ? "disabled" : ""}>Continuă la achitarea contribuției</button>
      </div>
      <div class="netopia-box embedded-netopia-box" id="embeddedNetopiaBox" hidden>
        <div class="netopia-top">NETOPIA - DEMO</div>
        <p>Comerciant: JCC București</p>
        <p>Comandă: ${camp.id.toUpperCase()}-2026</p>
        <p>Suma: <strong id="embeddedNetopiaAmount">0 lei</strong></p>
      </div>
    </section>
  `;
}

function renderCheckout(disabled) {
  const c = camp.checkout;
  if (!c) return "";

  const transportLabel = c.transport ? `Transport (${money(c.transport)} / persoană)` : "Transport (se confirmă ulterior)";
  const repeatableConfig = repeatableParticipantConfig();

  if (c.type === "family") {
    return `
      <div class="checkout-controls" data-checkout="family">
        <div class="summary-line"><span>Adulți completați</span><strong id="adultQtyText">0</strong></div>
        <div class="summary-line"><span>Copii completați</span><strong id="childQtyText">0</strong></div>
        <label>${transportLabel}<input id="transportQty" type="number" min="0" value="0" ${disabled || !c.transport ? "disabled" : ""}></label>
      </div>
    `;
  }

  if (repeatableConfig && c.type === "szarvas") {
    return `
      <div class="checkout-controls" data-checkout="szarvas">
        <div class="summary-line"><span>${repeatableConfig.summaryLabel}</span><strong id="participantQtyText">0</strong></div>
        <label>Transport București<input id="bucharestQty" type="number" min="0" value="0" ${disabled ? "disabled" : ""}></label>
        <label>Transport Timișoara<input id="timisoaraQty" type="number" min="0" value="0" ${disabled ? "disabled" : ""}></label>
      </div>
    `;
  }

  if (repeatableConfig) {
    return `
      <div class="checkout-controls" data-checkout="perPerson">
        <div class="summary-line"><span>${repeatableConfig.summaryLabel}</span><strong id="participantQtyText">0</strong></div>
        <label>${transportLabel}<input id="transportQty" type="number" min="0" value="0" ${disabled || !c.transport ? "disabled" : ""}></label>
      </div>
    `;
  }

  return "";
}

function requiredInputComplete(input, group) {
  if (input.type === "radio") {
    return Boolean(group.querySelector(`input[name="${input.name}"]:checked`));
  }

  if (input.type === "checkbox") {
    return input.checked;
  }

  return input.value.trim() !== "";
}

function countCompletedParticipants(kind) {
  return Array.from(document.querySelectorAll(`[data-participant-group="${kind}"]`)).filter((group) => {
    const requiredInputs = Array.from(group.querySelectorAll("[required]"));
    return requiredInputs.length && requiredInputs.every((input) => requiredInputComplete(input, group));
  }).length;
}

function participantKindLabel(kind) {
  if (kind === "adult") return "adult";
  if (kind === "child") return "copil";
  return "participant";
}

function getParticipantSummaryItems() {
  return Array.from(document.querySelectorAll("[data-participant-group]")).map((group, index) => {
    const kind = group.dataset.participantGroup;
    const nameInput = group.querySelector('input[type="text"]');
    const fallbackTitle = group.querySelector("h4")?.textContent?.trim() || `Persoană ${index + 1}`;
    const name = nameInput?.value.trim() || fallbackTitle;
    const complete = Array.from(group.querySelectorAll("[required]")).every((input) => requiredInputComplete(input, group));
    return { name, kind: participantKindLabel(kind), complete };
  });
}

function getCheckedChoiceText(name) {
  const checked = document.querySelector(`input[name="${name}"]:checked`);
  return checked?.closest("label")?.querySelector("span")?.textContent?.trim() || checked?.value || "";
}

function getTransportSummaryItems() {
  const items = [];
  const checkout = camp.checkout || {};
  const familyChoice = getCheckedChoiceText("transport_choice");
  const familyTransportQty = Number(document.querySelector("#transportQty")?.value || 0);

  if (familyChoice) {
    items.push({
      label: familyChoice,
      detail: familyTransportQty > 0 ? `${familyTransportQty} persoane` : "fără persoane setate"
    });
  }

  if (!familyChoice && checkout.type === "szarvas") {
    const bucharestQty = Number(document.querySelector("#bucharestQty")?.value || 0);
    const timisoaraQty = Number(document.querySelector("#timisoaraQty")?.value || 0);
    if (bucharestQty > 0) items.push({ label: "Transport București", detail: `${bucharestQty} persoane` });
    if (timisoaraQty > 0) items.push({ label: "Transport Timișoara", detail: `${timisoaraQty} persoane` });
  }

  if (!familyChoice && checkout.type !== "szarvas" && familyTransportQty > 0) {
    items.push({ label: "Transport", detail: `${familyTransportQty} persoane` });
  }

  return items;
}

function renderSummaryList(items, emptyText, formatter) {
  if (!items.length) return `<p class="checkout-summary-empty">${emptyText}</p>`;
  return `
    <ul class="checkout-summary-list">
      ${items.map(formatter).join("")}
    </ul>
  `;
}

function updateEnrollmentSummary() {
  const peopleRoot = document.querySelector("#summaryPeopleList");
  const transportRoot = document.querySelector("#summaryTransportList");
  if (!peopleRoot || !transportRoot) return;

  const people = getParticipantSummaryItems();
  const transportItems = getTransportSummaryItems();

  peopleRoot.innerHTML = renderSummaryList(
    people,
    "Completează formularul ca să apară participanții aici.",
    (person) => `
      <li class="${person.complete ? "complete" : "pending"}">
        <span>${person.name}</span>
        <small>(${person.kind})</small>
      </li>
    `
  );

  transportRoot.innerHTML = renderSummaryList(
    transportItems,
    "Transportul ales va apărea aici.",
    (item) => `
      <li>
        <span>${item.label}</span>
        <small>${item.detail}</small>
      </li>
    `
  );
}

function calculateTotal() {
  const c = camp.checkout;
  if (!c) return 0;

  if (c.type === "family") {
    const adults = countCompletedParticipants("adult");
    const children = countCompletedParticipants("child");
    const transport = Number(document.querySelector("#transportQty")?.value || 0);
    const childrenTotal = children <= 0 ? 0 : c.firstChild + Math.max(0, children - 1) * c.nextChild;
    return adults * c.adult + childrenTotal + transport * c.transport;
  }

  const repeatableConfig = repeatableParticipantConfig();
  if (repeatableConfig) {
    const participants = countCompletedParticipants(repeatableConfig.kind);

    if (c.type === "szarvas") {
      return participants * c.participantPrice
        + Number(document.querySelector("#bucharestQty")?.value || 0) * c.bucharestTransport
        + Number(document.querySelector("#timisoaraQty")?.value || 0) * c.timisoaraTransport;
    }

    return participants * c.participantPrice
      + Number(document.querySelector("#transportQty")?.value || 0) * c.transport;
  }

  return 0;
}

function updateCheckout() {
  const total = calculateTotal();
  const repeatableConfig = repeatableParticipantConfig();
  document.querySelector("#adultQtyText") && (document.querySelector("#adultQtyText").textContent = countCompletedParticipants("adult"));
  document.querySelector("#childQtyText") && (document.querySelector("#childQtyText").textContent = countCompletedParticipants("child"));
  document.querySelector("#participantQtyText") && repeatableConfig && (document.querySelector("#participantQtyText").textContent = countCompletedParticipants(repeatableConfig.kind));
  document.querySelector("#checkoutTotal") && (document.querySelector("#checkoutTotal").textContent = money(total));
  document.querySelector("#netopiaAmount") && (document.querySelector("#netopiaAmount").textContent = money(total));
  updateEnrollmentSummary();
}

function getControlLabel(control) {
  const participantTitleText = control.closest("[data-participant-group]")?.querySelector("h4")?.textContent?.trim();
  const formField = control.closest(".form-field");
  if (formField) {
    const label = formField.querySelector("span")?.textContent?.replace("*", "").trim() || control.name;
    return [participantTitleText, label].filter(Boolean).join(" - ");
  }

  const legend = control.closest("fieldset")?.querySelector("legend")?.textContent?.replace("*", "").trim();
  return [participantTitleText, legend].filter(Boolean).join(" - ") || control.name || control.id || control.type;
}

function slugifyColumn(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase()
    .slice(0, 90) || "camp";
}

function uniqueColumnName(base, usedColumns) {
  let column = base;
  let index = 2;
  while (usedColumns.has(column)) {
    column = `${base}_${index}`;
    index += 1;
  }
  usedColumns.add(column);
  return column;
}

function collectFormPayload() {
  const form = document.querySelector("#campForm");
  const fields = [];
  const usedColumns = new Set();
  if (!form) return fields;

  Array.from(form.elements).forEach((control) => {
    if (control.disabled || control.type === "button" || control.type === "submit") return;
    if (control.closest(".agreements")) return;
    if ((control.type === "radio" || control.type === "checkbox") && !control.checked) return;
    const value = control.type === "checkbox" ? "Da" : cleanText(control.value);
    if (!value) return;
    const label = getControlLabel(control);
    const key = control.name || control.id || slugifyColumn(label);

    fields.push({
      key,
      label,
      column: uniqueColumnName(slugifyColumn(label), usedColumns),
      value
    });
  });

  return fields;
}

function flattenFields(fields) {
  return fields.reduce((result, field) => {
    result[field.column] = field.value;
    return result;
  }, {});
}

function cleanText(value) {
  return String(value || "").trim();
}

function getParticipantFieldValue(card, matchers) {
  const fields = Array.from(card.querySelectorAll(".form-field"));
  const matched = fields.find((field) => {
    const label = cleanText(field.querySelector("span")?.textContent).toLowerCase();
    return matchers.some((matcher) => label.includes(matcher));
  });
  return cleanText(matched?.querySelector("input, textarea, select")?.value);
}

function collectStructuredParticipants() {
  const adults = [];
  const children = [];

  document.querySelectorAll(".participant-card").forEach((card) => {
    const group = card.dataset.participantGroup || "participant";
    const name = getParticipantFieldValue(card, ["nume complet", "numele complet", "numele de familie", "prenume"]);
    const phone = getParticipantFieldValue(card, ["telefon", "phone"]);
    const birthDate = getParticipantFieldValue(card, ["data nașterii", "date of birth"]);
    const relationship = getParticipantFieldValue(card, ["grad de rudenie", "family relationship"]);

    if (!name && !phone && !birthDate && !relationship) return;

    if (group === "child") {
      children.push({
        nume_complet: name,
        grad_rudenie: relationship,
        data_nasterii: birthDate
      });
      return;
    }

    adults.push({
      nume_complet: name,
      telefon: phone,
      data_nasterii: birthDate
    });
  });

  return { adults, children };
}

function getMedicalInfoForSheet() {
  const direct = document.querySelector('[name="medical_info"]');
  if (direct) return cleanText(direct.value);

  const field = Array.from(document.querySelectorAll(".form-field")).find((item) => {
    const label = cleanText(item.querySelector("span")?.textContent).toLowerCase();
    return label.includes("contraindica") || label.includes("alerg") || label.includes("regim alimentar");
  });
  return cleanText(field?.querySelector("textarea, input")?.value);
}

function getTransportChoiceForSheet() {
  const direct = document.querySelector('[name="transport_choice"]:checked');
  if (direct) return cleanText(direct.value);

  const transportFieldset = Array.from(document.querySelectorAll("fieldset")).find((fieldset) => {
    const legend = cleanText(fieldset.querySelector("legend")?.textContent).toLowerCase();
    return legend.includes("transport");
  });
  const checked = transportFieldset?.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked');
  return cleanText(checked?.value || checked?.closest(".check-row")?.querySelector("span")?.textContent);
}

function getArrivalTimeForSheet() {
  const direct = document.querySelector('[name="arrival_time"]');
  if (direct) return cleanText(direct.value);

  const field = Array.from(document.querySelectorAll(".form-field")).find((item) => {
    const label = cleanText(item.querySelector("span")?.textContent).toLowerCase();
    return label.includes("ora estimată") || label.includes("ora estimata") || label.includes("ajungem");
  });
  return cleanText(field?.querySelector("input")?.value);
}

function collectEnrollmentSheetPayload() {
  const participants = collectStructuredParticipants();
  const fields = collectFormPayload();
  return {
    submitted_at: new Date().toISOString(),
    camp_id: camp.id,
    camp_title: camp.title,
    camp_dates: camp.dates,
    fields,
    adults: participants.adults,
    children: participants.children,
    medical_info: getMedicalInfoForSheet(),
    transport_choice: getTransportChoiceForSheet(),
    transport_people: cleanText(document.querySelector("#transportQty")?.value),
    arrival_time: getArrivalTimeForSheet()
  };
}

function setSheetSyncStatus(message, state = "idle") {
  const status = document.querySelector("#sheetSyncStatus");
  if (!status) return;
  status.hidden = false;
  status.textContent = message;
  status.dataset.state = state;
}

async function sendEnrollmentToGoogleSheet() {
  if (!GOOGLE_SHEETS_WEB_APP_URL) {
    setSheetSyncStatus("Test Google Sheet neconfigurat. Adaugă URL-ul de Apps Script în camp-page.js.", "idle");
    return;
  }

  const payload = collectEnrollmentSheetPayload();

  setSheetSyncStatus("Trimit testul către Google Sheet...", "pending");

  try {
    await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });
    setSheetSyncStatus("Trimis către endpoint. Dacă nu apare rând nou în Sheet, redeploy Apps Script cu acces Anyone.", "success");
  } catch (error) {
    setSheetSyncStatus("Nu am putut trimite testul către Google Sheet. Verifică URL-ul Apps Script.", "error");
  }
}

function setupRepeaters(disabled) {
  if (disabled) return;

  const form = document.querySelector("#campForm");
  if (!form) return;

  document.querySelector("#addAdult")?.addEventListener("click", () => {
    adultCounter += 1;
    document.querySelector("#adultList").insertAdjacentHTML("beforeend", participantFields("adult", adultCounter, false, true));
    updateCheckout();
  });

  document.querySelector("#addChild")?.addEventListener("click", () => {
    childCounter += 1;
    document.querySelector("#childList").insertAdjacentHTML("beforeend", participantFields("child", childCounter, false, true));
    updateCheckout();
  });

  document.querySelector("#addParticipant")?.addEventListener("click", () => {
    const config = repeatableParticipantConfig();
    if (!config) return;
    participantCounter += 1;
    document.querySelector("#participantList").insertAdjacentHTML("beforeend", participantFields(config.kind, participantCounter, false, true, config.fields));
    updateCheckout();
  });

  form.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-participant]");
    if (!removeButton) return;
    removeButton.closest(".participant-card").remove();
    updateCheckout();
  });

  form.addEventListener("input", updateCheckout);
  form.addEventListener("change", updateCheckout);
}

function setupEmbeddedContributionCalculator() {
  const output = document.querySelector("#embeddedParticipantQty");
  const total = document.querySelector("#embeddedContributionTotal");
  const amount = document.querySelector("#embeddedNetopiaAmount");
  const netopia = document.querySelector("#embeddedNetopiaBox");
  const unitPrice = camp.checkout?.participantPrice || 0;
  let quantity = 0;

  const sync = () => {
    const subtotal = quantity * unitPrice;
    if (output) output.textContent = String(quantity);
    if (total) total.textContent = money(subtotal);
    if (amount) amount.textContent = money(subtotal);
  };

  document.querySelector("[data-embedded-decrement]")?.addEventListener("click", () => {
    quantity = Math.max(0, quantity - 1);
    sync();
  });

  document.querySelector("[data-embedded-increment]")?.addEventListener("click", () => {
    quantity += 1;
    sync();
  });

  document.querySelector("#embeddedContributionButton")?.addEventListener("click", () => {
    if (netopia) netopia.hidden = false;
    sync();
  });

  sync();
}

function renderSharedHeader() {
  document.body.insertAdjacentHTML("afterbegin", `
    <header class="site-header jcc-official-header">
      <a class="jcc-official-hero" href="https://www.jcc.ro/" aria-label="JCC București">
        <img src="assets/jcc-header.jpg" alt="JCC București și Shalom România">
      </a>
      <div class="jcc-official-nav-row">
        <nav class="main-nav jcc-official-nav" aria-label="Navigație principală JCC">
          <a href="https://www.jcc.ro/">Home</a>
          <a href="https://www.jcc.ro/cursuri-25-26/">Cursuri ’25-’26</a>
          <a class="current" href="index.html#top">Tabere 2026</a>
          <a href="https://www.jcc.ro/cardul-de-membru/">Cardul de membru</a>
          <a href="https://www.jcc.ro/despre-jcc/">Despre JCC</a>
          <a href="https://www.jcc.ro/parteneri/">Parteneri</a>
          <a href="https://www.jcc.ro/contact/">Contact</a>
        </nav>
        <form class="jcc-search" action="https://www.jcc.ro/" method="get" role="search">
          <label class="sr-only" for="jccSearchDetail">Caută pe JCC.ro</label>
          <input id="jccSearchDetail" name="s" type="search" aria-label="Caută pe JCC.ro">
          <button type="submit">Search</button>
        </form>
      </div>
    </header>
  `);

  document.body.insertAdjacentHTML("beforeend", `
    <nav class="mobile-app-nav" aria-label="Navigație mobilă">
      <a class="mobile-nav-item" href="index.html#top" aria-label="Acasă">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 10.8 12 3l9 7.8v9.7a1 1 0 0 1-1 1h-5.2v-6.3H9.2v6.3H4a1 1 0 0 1-1-1z"></path>
        </svg>
        <span>Home</span>
      </a>
      <a class="mobile-nav-item" href="index.html#contributie" aria-label="Contribuție">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 7.5h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z"></path>
          <path d="M17 12.7h3"></path>
          <path d="M7 7.5V6a2 2 0 0 1 2-2h7"></path>
        </svg>
        <span>Contribuție</span>
      </a>
      <a class="mobile-nav-item is-active" href="index.html#tabere" aria-label="Tabere">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 19h16L12 4z"></path>
          <path d="M12 4v15"></path>
          <path d="M8.5 19 12 11l3.5 8"></path>
        </svg>
        <span>Tabere</span>
      </a>
      <a class="mobile-nav-item" href="index.html#calendar" aria-label="Calendar 2026">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 5.8h14a1.5 1.5 0 0 1 1.5 1.5v11.2A1.5 1.5 0 0 1 19 20H5a1.5 1.5 0 0 1-1.5-1.5V7.3A1.5 1.5 0 0 1 5 5.8z"></path>
          <path d="M8 4v4"></path>
          <path d="M16 4v4"></path>
          <path d="M3.5 10h17"></path>
        </svg>
        <span>Calendar</span>
      </a>
    </nav>
  `);
}

function setupCampPage() {
  if (!detailRoot || !camp) return;
  renderSharedHeader();

  const unavailable = campEnded(camp);
  const embeddedMode = Boolean(camp.embeddedFormUrl);
  document.title = `${camp.title} | Tabere JCC 2026`;
  detailRoot.innerHTML = `
    <section class="camp-hero-detail" style="--camp-color: ${camp.color}">
      <img src="${camp.image}" alt="${camp.title}">
      <div class="camp-hero-detail-content">
        <a class="back-link" href="index.html#tabere">Înapoi la tabere</a>
        <p class="eyebrow">${camp.category} / ${camp.age}</p>
        <h1>${camp.title}</h1>
        <p>${camp.dates}</p>
        ${unavailable ? `<span class="ended-banner">Tabăra a luat sfârșit. Înscrierea nu mai este disponibilă.</span>` : ""}
      </div>
    </section>

    <section class="section detail-grid-section">
      <div class="detail-grid">
        <article class="overview-card">
          <p class="eyebrow">Overview</p>
          <h2>Pe scurt</h2>
          <dl>
            <div><dt>Grupa</dt><dd>${camp.subtitle}</dd></div>
            <div><dt>Perioada</dt><dd>${camp.dates}</dd></div>
            <div><dt>Contribuție</dt><dd>${camp.contribution}</dd></div>
            <div><dt>Transport</dt><dd>${camp.transport}</dd></div>
          </dl>
          ${camp.formNote ? `<p class="note">${camp.formNote}</p>` : ""}
        </article>

        <article class="conditions-card detail-conditions">
          <div>
            <p class="eyebrow">Obligatoriu</p>
            <h2>Condiții generale</h2>
            <p class="conditions-lead">Înscrierea devine validă după formular și achitarea contribuției. Acceptarea se face în limita locurilor disponibile.</p>
          </div>
          <div class="conditions-list">
            <p>Taberele se adresează membrilor comunităților evreiești din România.</p>
            <p>Renunțările cu mai puțin de 14 zile înainte pot limita rambursarea.</p>
            <p>Participanții confirmă că pot lua parte la activități de tabără.</p>
            <p>Participanții respectă programul stabilit de organizatori.</p>
          </div>
        </article>
      </div>
    </section>

    <section class="section camp-workflow">
      <div class="camp-workflow-grid ${embeddedMode ? "embedded-workflow-grid" : ""}">
        <article class="registration-form ${embeddedMode ? "embedded-registration-form" : ""} ${unavailable ? "form-locked" : ""}">
          <p class="eyebrow">Formular integrat</p>
          <h2>Înscriere ${camp.title}</h2>
          ${embeddedMode ? renderEmbeddedContributionCalculator(unavailable) : ""}
          ${renderForm(unavailable)}
          ${unavailable ? `
            <div class="form-lock-overlay" aria-hidden="true">
              <span class="lock-icon">&#128274;</span>
              <strong>Formular închis</strong>
              <small>Această tabără este în arhivă. Datele nu mai pot fi completate.</small>
            </div>
          ` : ""}
        </article>

        ${embeddedMode ? "" : `
        <aside class="checkout-summary-card" aria-live="polite">
          <p class="eyebrow">Sumar contribuție</p>
          <h2>Sumar înscriere</h2>
          <div class="checkout-summary-block">
            <h3>Persoane</h3>
            <div id="summaryPeopleList"></div>
          </div>
          <div class="checkout-summary-block">
            <h3>Transport</h3>
            <div id="summaryTransportList"></div>
          </div>
        </aside>

        <aside class="checkout-card">
          <p class="eyebrow">Contribuție test</p>
          <h2>Calculează contribuția</h2>
          ${renderCheckout(unavailable)}
          <div class="checkout-total">
            <span>Total</span>
            <strong id="checkoutTotal">0 lei</strong>
          </div>
          <button class="button primary" id="payButton" type="button" ${unavailable ? "disabled" : ""}>Achită contribuția cu NETOPIA</button>
          <p class="sheet-sync-status" id="sheetSyncStatus" hidden></p>
          <div class="netopia-box" id="netopiaBox" hidden>
            <div class="netopia-top">NETOPIA - DEMO</div>
            <p>Comerciant: JCC București</p>
            <p>Comandă: ${camp.id.toUpperCase()}-2026</p>
            <p>Suma: <strong id="netopiaAmount">0 lei</strong></p>
            <button class="button secondary" type="button">Simulează contribuția aprobată</button>
          </div>
        </aside>
        `}
      </div>
    </section>
  `;

  if (embeddedMode) {
    setupEmbeddedContributionCalculator();
    return;
  }

  updateCheckout();
  document.querySelectorAll(".checkout-controls input").forEach((input) => {
    input.addEventListener("input", updateCheckout);
    input.addEventListener("change", updateCheckout);
  });
  setupRepeaters(unavailable);
  document.querySelector("#payButton")?.addEventListener("click", () => {
    const form = document.querySelector("#campForm");
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    document.querySelector("#netopiaBox").hidden = false;
    updateCheckout();
    sendEnrollmentToGoogleSheet();
  });
}

setupCampPage();
