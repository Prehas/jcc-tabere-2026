const camps = [
  {
    id: "mishpahot",
    title: "Mishpahot Camp",
    subtitle: "pentru familii cu copii",
    dates: "7-12 iulie 2026",
    startDate: "2026-07-07",
    endDate: "2026-07-12",
    age: "familii",
    category: "familii",
    season: "vara",
    image: "assets/camp-family.png",
    color: "#2f7a45",
    page: "mishpahot.html",
    contribution: "600 lei/adult, 350 lei/primul copil, 300 lei/al doilea copil sau copii sub 3 ani",
    transport: "Info în curând",
    checkout: { type: "family", adult: 600, firstChild: 350, nextChild: 300, transport: 0 },
    formSections: [
      { title: "Date despre adulții participanți", fields: [
        ["Numele de familie și prenumele primului adult", "text", true],
        ["Telefon / Phone number", "tel", true],
        ["Email", "email", true],
        ["Data nașterii / Date of birth", "date", true],
        ["Sunt membru/membră în comunitatea evreilor din orașul", "text", true],
        ["Preferință cazare / Accommodation preference", "text", false]
      ]},
      { title: "Date despre al doilea adult participant", fields: [
        ["Numele complet / Full name", "text", false],
        ["Telefon / Phone number", "tel", false],
        ["Data nașterii / Date of birth", "date", false]
      ]},
      { title: "Date despre copiii participanți", fields: [
        ["Primul copil - numele complet / Full name", "text", true],
        ["Primul copil - grad de rudenie / Family relationship", "text", true],
        ["Primul copil - data nașterii / Date of birth", "date", true],
        ["Al doilea copil - numele complet / Full name", "text", false],
        ["Al doilea copil - grad de rudenie / Family relationship", "text", false],
        ["Al doilea copil - data nașterii / Date of birth", "date", false],
        ["Al treilea copil - numele complet / Full name", "text", false],
        ["Al treilea copil - grad de rudenie / Family relationship", "text", false],
        ["Al treilea copil - data nașterii / Date of birth", "date", false],
        ["Al patrulea copil - numele complet / Full name", "text", false],
        ["Al patrulea copil - grad de rudenie / Family relationship", "text", false],
        ["Al patrulea copil - data nașterii / Date of birth", "date", false]
      ]},
      { title: "Informații medicale și transport", fields: [
        ["Contraindicații medicamentoase, alergii, boli, altele", "textarea", true],
        ["Doresc transport cu autocarul din București", "radio", true, ["Nu e cazul", "Dus-întors", "Doar dus", "Doar întors"]],
        ["Doresc transport pentru atâtea persoane", "number", false],
        ["Ora estimată la care ajungem în tabără", "text", true]
      ]}
    ]
  },
  {
    id: "negev",
    title: "Negev Camp",
    subtitle: "6-12 ani",
    dates: "14-19 iulie 2026",
    startDate: "2026-07-14",
    endDate: "2026-07-19",
    age: "6-12 ani",
    category: "copii",
    season: "vara",
    image: "assets/camp-kids.png",
    color: "#58a9c7",
    page: "negev.html",
    contribution: "700 lei/copil",
    transport: "Detalii în curând",
    checkout: { type: "perPerson", participantLabel: "copii", participantPrice: 700, transport: 0 },
    formSections: [
      { title: "Transport si limbi vorbite", fields: [
        ["Transport", "radio", true, ["transport din București cu grupul", "doar dus: transport din București cu grupul", "doar întors: transport către București cu grupul", "transport pe cont propriu"]],
        ["Copilul vorbește limba română? / Does the child speak Romanian?", "radio", true, ["Da / Yes", "Nu / No"]],
        ["Limbi vorbite / Languages the child speaks", "text", true]
      ]},
      { title: "Date despre copil", fields: [
        ["Numele complet al copilului", "text", true],
        ["Data nașterii / Date of birth", "date", true],
        ["Oras / City", "text", true],
        ["Contraindicații medicamentoase, alergii, boli, regim alimentar", "textarea", true]
      ]},
      { title: "Date despre părinți / susținători legali", fields: [
        ["Numele de familie și prenumele primului susținător legal", "text", true],
        ["Telefon / Phone number", "tel", true],
        ["Email primul susținător legal", "email", true],
        ["Al doilea susținător legal - numele de familie și prenumele", "text", false],
        ["Al doilea susținător legal - telefon", "tel", false],
        ["Al doilea susținător legal - email", "email", false]
      ]}
    ]
  },
  {
    id: "szarvas",
    title: "Tabăra Internațională de la Szarvas",
    subtitle: "6-18 ani",
    dates: "26 iulie - 6 august 2026",
    startDate: "2026-07-26",
    endDate: "2026-08-06",
    age: "6-18 ani",
    category: "copii",
    season: "vara",
    image: "assets/camp-kids.png",
    color: "#745aa8",
    page: "szarvas.html",
    externalUrl: "https://szarvas.camp/en",
    contribution: "1.000 lei/participant",
    transport: "430 lei București dus-întors, 215 lei Timișoara dus-întors",
    checkout: { type: "szarvas", participantPrice: 1000, bucharestTransport: 430, timisoaraTransport: 215 },
    formSections: [
      { title: "Date participant", fields: [
        ["Nume complet participant", "text", true],
        ["Data nașterii", "date", true],
        ["Oras", "text", true],
        ["Comunitatea evreiască", "text", true],
        ["Instituție de învățământ din România", "text", true],
        ["Participantul vorbește limba română?", "radio", true, ["Da", "Nu"]]
      ]},
      { title: "Contact și sănătate", fields: [
        ["Nume părinte / responsabil", "text", true],
        ["Telefon", "tel", true],
        ["Email", "email", true],
        ["Informații medicale / alergii / regim alimentar", "textarea", true]
      ]}
    ],
    formNote: "Pe site-ul actual, Szarvas trimite catre platforma externa reg.szarvas.camp, nu catre Google Forms. Campurile de aici sunt model pentru integrarea finala."
  },
  {
    id: "hermon",
    title: "Hermon Camp",
    subtitle: "55-70 ani",
    dates: "28 iulie - 2 august 2026",
    startDate: "2026-07-28",
    endDate: "2026-08-02",
    age: "55-70 ani",
    category: "adulți",
    season: "vara",
    image: "assets/camp-adults.png",
    color: "#e3a92c",
    page: "hermon.html",
    contribution: "700 lei/participant",
    transport: "Detalii în curând",
    checkout: { type: "perPerson", participantLabel: "participanți", participantPrice: 700, transport: 0 },
    formSections: [
      { title: "Date despre participant", fields: [
        ["Nume complet participant", "text", true],
        ["Data nașterii", "date", true],
        ["Telefon", "tel", true],
        ["Email participant", "email", true],
        ["Sunt membru/membră în comunitatea evreilor din orașul cu acest nume", "text", true],
        ["Dietă/probleme de sănătate", "text", false]
      ]},
      { title: "Partener/a, in cazul in care doreste participarea", fields: [
        ["Nume complet partener/partenera", "text", false],
        ["Data nașterii", "date", false],
        ["Telefon", "tel", false],
        ["Email partener/partenera", "email", false],
        ["Comunitatea evreiască a partenerului/partenerei", "text", false],
        ["Dietă/probleme de sănătate", "text", false],
        ["Sugestii pentru programul taberei / destinatii / contributii personale", "textarea", false]
      ]}
    ]
  },
  {
    id: "galil",
    title: "Galil Camp",
    subtitle: "12-18 ani",
    dates: "11-16 august 2026",
    startDate: "2026-08-11",
    endDate: "2026-08-16",
    age: "12-18 ani",
    category: "tineri",
    season: "vara",
    image: "assets/camp-teens.png",
    color: "#e37455",
    page: "galil.html",
    contribution: "700 lei/participant",
    transport: "Detalii în curând",
    checkout: { type: "perPerson", participantLabel: "participanți", participantPrice: 700, transport: 0 },
    formSections: [
      { title: "Transport", fields: [
        ["Transport / Transportation", "radio", true, ["transport din București cu grupul", "transport pe cont propriu"]]
      ]},
      { title: "Date despre copil", fields: [
        ["Numele complet al copilului", "text", true],
        ["Data nașterii / Date of birth", "date", true],
        ["Oras / City", "text", true],
        ["Contraindicații medicamentoase, alergii, boli, regim alimentar", "textarea", true]
      ]},
      { title: "Date despre părinți/susținători legali", fields: [
        ["Nume complet al primului adult", "text", true],
        ["Telefon / Phone number", "tel", true],
        ["Email primul adult", "email", true],
        ["Al doilea adult - numele complet", "text", false],
        ["Al doilea adult - telefon", "tel", false],
        ["Al doilea adult - email", "email", false]
      ]}
    ]
  },
  {
    id: "golan",
    title: "Golan Camp",
    subtitle: "18-35 ani",
    dates: "26-30 august 2026",
    startDate: "2026-08-26",
    endDate: "2026-08-30",
    age: "18-35 ani",
    category: "tineri",
    season: "vara",
    image: "assets/camp-teens.png",
    color: "#2f7a45",
    page: "golan.html",
    contribution: "600 lei/participant",
    transport: "Detalii în curând",
    checkout: { type: "perPerson", participantLabel: "participanți", participantPrice: 600, transport: 0 },
    formSections: [
      { title: "Date participant", fields: [
        ["Numele de familie și prenumele", "text", true],
        ["Data nașterii / Date of birth", "date", true],
        ["Telefon / Phone number", "tel", true],
        ["Email", "email", true],
        ["Restrictii alimentare, daca este cazul", "text", false],
        ["Sunt membru/membră în comunitatea evreilor din orașul cu numele", "text", true],
        ["As dori sa stau in camera cu", "text", false],
        ["Dețin o mașină personală cu care aș putea asigura transportul altor persoane", "checkbox", true, ["Da - Yes", "Nu - No"]]
      ]}
    ]
  },
  {
    id: "hermon-special",
    title: "Hermon Special",
    subtitle: "30-55 ani",
    dates: "2-6 septembrie 2026",
    startDate: "2026-09-02",
    endDate: "2026-09-06",
    age: "30-55 ani",
    category: "adulți",
    season: "vara",
    image: "assets/camp-adults.png",
    color: "#123f2a",
    page: "hermon-special.html",
    contribution: "600 lei/participant",
    transport: "Detalii în curând",
    checkout: { type: "perPerson", participantLabel: "participanți", participantPrice: 600, transport: 0 },
    formSections: [
      { title: "Date despre participant", fields: [
        ["Nume complet participant", "text", true],
        ["Data nașterii", "date", true],
        ["Telefon", "tel", true],
        ["Email participant", "email", true],
        ["Sunt membru/membră în comunitatea evreilor din orașul cu acest nume", "text", true],
        ["Dietă/probleme de sănătate", "text", false]
      ]},
      { title: "Partener/a, in cazul in care doreste participarea", fields: [
        ["Nume complet partener/partenera", "text", false],
        ["Data nașterii", "date", false],
        ["Telefon", "tel", false],
        ["Email partener/partenera", "email", false],
        ["Comunitatea evreiască a partenerului/partenerei", "text", false],
        ["Dietă/probleme de sănătate", "text", false],
        ["Sugestii pentru programul taberei / destinatii / contributii personale", "textarea", false]
      ]}
    ]
  },
  {
    id: "tubishvat",
    title: "Tabăra de Tu BiShvat",
    subtitle: "pentru familii cu copii",
    dates: "19-22 februarie 2026",
    startDate: "2026-02-19",
    endDate: "2026-02-22",
    age: "familii",
    category: "familii",
    season: "iarna",
    image: "assets/camp-family.png",
    color: "#58a9c7",
    page: "tu-bishvat.html",
    contribution: "450 lei/părinte, 250 lei/primul copil, 200 lei de la al doilea copil si copii pana la 3 ani",
    transport: "175 lei/persoană",
    checkout: { type: "family", adult: 450, firstChild: 250, nextChild: 200, transport: 175 },
    formSections: []
  },
  {
    id: "galil-winter",
    title: "Galil Winter Camp",
    subtitle: "12-18 ani",
    dates: "16-19 februarie 2026",
    startDate: "2026-02-16",
    endDate: "2026-02-19",
    age: "12-18 ani",
    category: "tineri",
    season: "iarna",
    image: "assets/camp-teens.png",
    color: "#745aa8",
    page: "galil-winter.html",
    contribution: "420 lei/copil",
    transport: "175 lei/persoană",
    checkout: { type: "perPerson", participantLabel: "copii", participantPrice: 420, transport: 175 },
    formSections: []
  },
  {
    id: "test-camp",
    title: "Test Camp",
    subtitle: "formular embed test",
    dates: "14-16 octombrie 2026",
    startDate: "2026-10-14",
    endDate: "2026-10-16",
    age: "test participanți",
    category: "tineri",
    season: "vara",
    image: "assets/camp-family.png",
    color: "#9abd22",
    page: "test-camp.html",
    contribution: "100 lei/participant (test)",
    transport: "fără transport (test)",
    statusLabel: "Test formular embed",
    checkout: { type: "perPerson", participantLabel: "participanți", participantPrice: 100, transport: 0 },
    embeddedFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdZ2g4Y8UckB457SHH9cGvJzrqxru-byB56PGBFFVH8dbuCyw/viewform?embedded=true",
    formSections: [],
    formNote: "Această pagină este doar pentru testarea formularului Google Forms embeduit."
  }
];

window.CAMPS = camps;

const today = new Date();
today.setHours(0, 0, 0, 0);
const monthNames = [
  "Ianuarie",
  "Februarie",
  "Martie",
  "Aprilie",
  "Mai",
  "Iunie",
  "Iulie",
  "August",
  "Septembrie",
  "Octombrie",
  "Noiembrie",
  "Decembrie"
];
const weekDays = ["L", "M", "M", "J", "V", "S", "D"];
let activeCalendarMonth = 6;
let highlightedCampId = null;
let highlightTimer = null;

function isCampPast(camp) {
  const end = new Date(`${camp.endDate}T23:59:59`);
  return today > end;
}

function categoryLabel(category) {
  const labels = {
    familii: "familii",
    copii: "copii",
    tineri: "tineri",
    adulți: "adulți"
  };
  return labels[category] || category;
}

function renderCards(filter = "all", season = "all") {
  const campGrid = document.querySelector("#campGrid");
  if (!campGrid) return;

  const visibleCamps = camps.filter((camp) => {
    const categoryMatch = filter === "all" || camp.category === filter;
    const seasonMatch = season === "all" || camp.season === season;
    return categoryMatch && seasonMatch;
  });

  campGrid.innerHTML = visibleCamps.map((camp) => {
    const unavailable = isCampPast(camp);
    const href = camp.externalUrl || camp.page;
    const externalAttrs = camp.externalUrl ? `target="_self"` : "";
    return `
      <a class="camp-card ${unavailable ? "unavailable" : ""}" href="${href}" ${externalAttrs} style="--camp-color: ${camp.color}">
        <div class="camp-image">
          <img src="${camp.image}" alt="${camp.title} - ${camp.subtitle}">
          <span class="camp-label">${unavailable ? "Tabăra a luat sfârșit" : categoryLabel(camp.category)}</span>
        </div>
        <div class="camp-body">
          <h3>${camp.title}</h3>
          <div class="camp-meta">
            <span>${camp.subtitle}</span>
            <span>${camp.dates}</span>
            ${camp.statusLabel ? `<span>${camp.statusLabel}</span>` : ""}
          </div>
          <div class="detail-list">
            <div>
              <strong>Vârstă</strong>
              <p>${camp.age}</p>
            </div>
            <div>
              <strong>Status</strong>
              <p>${unavailable ? "Indisponibilă automat, perioada s-a încheiat." : "Disponibilă pentru înscriere."}</p>
            </div>
          </div>
          <div class="camp-actions">
            <span class="button primary">${unavailable ? "Vezi arhiva" : "Vezi tabăra"}</span>
          </div>
        </div>
      </a>
    `;
  }).join("");
}

function calculatorQuantityConfig(campItem) {
  const checkout = campItem.checkout;
  if (!checkout) return [];

  if (checkout.type === "family") {
    return [
      { key: "adults", label: "Adulți", value: 0 },
      { key: "children", label: "Copii", value: 0 }
    ];
  }

  if (checkout.type === "szarvas" || checkout.participantLabel === "copii" || campItem.category === "copii") {
    return [{ key: "children", label: "Copii", value: 0 }];
  }

  return [{ key: "participants", label: "Participanți", value: 0 }];
}

function calculatorNumber(value) {
  return Math.max(0, Number(value || 0));
}

function calculatorMoney(value) {
  return `${Math.round(value).toLocaleString("ro-RO")} lei`;
}

function getSelectedCalculatorCamp() {
  const select = document.querySelector("#calculatorCamp");
  return camps.find((campItem) => campItem.id === select?.value) || camps.find((campItem) => !isCampPast(campItem)) || camps[0];
}

function renderCalculatorQuantities(campItem) {
  const container = document.querySelector("#calculatorQuantities");
  if (!container) return;

  container.innerHTML = calculatorQuantityConfig(campItem).map((item) => `
    <div class="calculator-stepper" data-calculator-stepper="${item.key}">
      <span>${item.label}</span>
      <button type="button" data-calculator-decrement="${item.key}" aria-label="Scade ${item.label.toLowerCase()}">−</button>
      <output id="calculator-${item.key}" data-calculator-qty="${item.key}">${item.value}</output>
      <button type="button" data-calculator-increment="${item.key}" aria-label="Crește ${item.label.toLowerCase()}">+</button>
    </div>
  `).join("");
}

function getCalculatorQuantity(key) {
  return calculatorNumber(document.querySelector(`[data-calculator-qty="${key}"]`)?.textContent);
}

function setCalculatorQuantity(key, value) {
  const output = document.querySelector(`[data-calculator-qty="${key}"]`);
  if (!output) return;
  output.textContent = Math.max(0, value);
  updatePaymentCalculator();
}

function highlightTransportMode() {
  const field = document.querySelector("#calculatorTransportMode")?.closest(".calculator-field");
  if (!field) return;

  field.classList.remove("needs-attention");
  void field.offsetWidth;
  field.classList.add("needs-attention");
  window.setTimeout(() => field.classList.remove("needs-attention"), 900);
}

function isTransportDisabled() {
  return (document.querySelector("#calculatorTransportMode")?.value || "none") === "none";
}

function transportModeLabel(mode) {
  if (mode === "dus") return "Doar dus";
  if (mode === "intors") return "Doar întors";
  if (mode === "dus-intors") return "Dus-întors";
  return "Fără transport";
}

function updateTransportTrigger() {
  const input = document.querySelector("#calculatorTransportMode");
  const text = document.querySelector("#calculatorTransportButtonText");
  if (!input || !text) return;
  text.textContent = transportModeLabel(input.value);
}

function getCalculatorTransportUnit(campItem) {
  const mode = document.querySelector("#calculatorTransportMode")?.value || "none";
  if (mode === "none") return 0;

  const checkout = campItem.checkout || {};
  let roundTripPrice = checkout.transport || 0;

  if (checkout.type === "szarvas") {
    roundTripPrice = checkout.bucharestTransport;
  }

  if (!roundTripPrice) return 0;
  return mode === "dus-intors" ? roundTripPrice : Math.ceil(roundTripPrice / 2);
}

function calculateCampSubtotal(campItem) {
  const checkout = campItem.checkout;
  if (!checkout) return 0;

  if (checkout.type === "family") {
    const adults = getCalculatorQuantity("adults");
    const children = getCalculatorQuantity("children");
    const childrenTotal = children <= 0 ? 0 : checkout.firstChild + Math.max(0, children - 1) * checkout.nextChild;
    return adults * checkout.adult + childrenTotal;
  }

  const participants = getCalculatorQuantity("children") || getCalculatorQuantity("participants");
  return participants * (checkout.participantPrice || 0);
}

function updatePaymentCalculator() {
  const campItem = getSelectedCalculatorCamp();
  if (!campItem) return;
  const transportDisabled = isTransportDisabled();
  const transportStepper = document.querySelector('[data-calculator-stepper="transport"]');

  if (transportStepper) {
    transportStepper.classList.toggle("disabled", transportDisabled);
    transportStepper.querySelectorAll("button").forEach((button) => {
      button.setAttribute("aria-disabled", String(transportDisabled));
    });
  }

  if (transportDisabled && getCalculatorQuantity("transport") !== 0) {
    document.querySelector('[data-calculator-qty="transport"]').textContent = "0";
  }

  const campSubtotal = calculateCampSubtotal(campItem);
  const transportQty = getCalculatorQuantity("transport");
  const transportSubtotal = transportQty * getCalculatorTransportUnit(campItem);
  const total = campSubtotal + transportSubtotal;

  document.querySelector("#calculatorCampSubtotal").textContent = calculatorMoney(campSubtotal);
  document.querySelector("#calculatorTransportSubtotal").textContent = calculatorMoney(transportSubtotal);
  document.querySelector("#calculatorTotal").textContent = calculatorMoney(total);

  const payLink = document.querySelector("#calculatorPayLink");
  if (payLink) {
    payLink.href = campItem.externalUrl || campItem.page;
  }
}

function closeCalculatorCampMenu() {
  const picker = document.querySelector("#calculatorCampPicker");
  const button = document.querySelector("#calculatorCampButton");
  if (!picker || !button) return;
  picker.classList.remove("open");
  button.setAttribute("aria-expanded", "false");
}

function updateCalculatorCampTrigger(campItem) {
  const picker = document.querySelector("#calculatorCampPicker");
  const text = document.querySelector("#calculatorCampButtonText");
  if (!picker || !text || !campItem) return;

  picker.style.setProperty("--selected-camp-color", campItem.color);
  text.textContent = `${campItem.title} - ${campItem.dates}`;
}

function selectCalculatorCamp(campId) {
  const input = document.querySelector("#calculatorCamp");
  const campItem = camps.find((item) => item.id === campId);
  if (!input || !campItem) return;

  input.value = campId;
  updateCalculatorCampTrigger(campItem);
  renderCalculatorQuantities(campItem);
  setCalculatorQuantity("transport", 0);
  document.querySelector("#calculatorTransportMode").value = "none";
  updateTransportTrigger();
  updatePaymentCalculator();
}

function setupPaymentCalculator() {
  const calculator = document.querySelector("#paymentCalculator");
  const campInput = document.querySelector("#calculatorCamp");
  const campButton = document.querySelector("#calculatorCampButton");
  const campList = document.querySelector("#calculatorCampList");
  const campPicker = document.querySelector("#calculatorCampPicker");
  const transportPicker = document.querySelector("#calculatorTransportPicker");
  const transportButton = document.querySelector("#calculatorTransportButton");
  const transportInput = document.querySelector("#calculatorTransportMode");
  if (!calculator || !campInput || !campButton || !campList || !campPicker) return;

  const payableCamps = camps.filter((campItem) => campItem.checkout && !isCampPast(campItem));
  const sourceCamps = payableCamps.length ? payableCamps : camps.filter((campItem) => campItem.checkout);

  campList.innerHTML = sourceCamps.map((campItem) => `
    <button class="calculator-camp-option" type="button" role="option" data-calculator-camp="${campItem.id}" style="--camp-color: ${campItem.color}">
      <span class="camp-color-dot" aria-hidden="true"></span>
      <span>
        <strong>${campItem.title}</strong>
        <small>${campItem.dates}</small>
      </span>
    </button>
  `).join("");

  campInput.value = sourceCamps[0]?.id || "";
  updateCalculatorCampTrigger(getSelectedCalculatorCamp());
  renderCalculatorQuantities(getSelectedCalculatorCamp());
  updateTransportTrigger();
  updatePaymentCalculator();

  campButton.addEventListener("click", () => {
    const isOpen = campPicker.classList.toggle("open");
    campButton.setAttribute("aria-expanded", String(isOpen));
  });

  transportButton?.addEventListener("click", () => {
    const isOpen = transportPicker.classList.toggle("open");
    transportButton.setAttribute("aria-expanded", String(isOpen));
  });

  calculator.addEventListener("click", (event) => {
    const campOption = event.target.closest("[data-calculator-camp]");
    const transportOption = event.target.closest("[data-calculator-transport]");
    const decrement = event.target.closest("[data-calculator-decrement]");
    const increment = event.target.closest("[data-calculator-increment]");

    if (campOption) {
      selectCalculatorCamp(campOption.dataset.calculatorCamp);
      closeCalculatorCampMenu();
    }

    if (transportOption && transportInput) {
      transportInput.value = transportOption.dataset.calculatorTransport;
      updateTransportTrigger();
      transportPicker?.classList.remove("open");
      transportButton?.setAttribute("aria-expanded", "false");
      updatePaymentCalculator();
    }

    if (decrement) {
      const key = decrement.dataset.calculatorDecrement;
      if (key === "transport" && isTransportDisabled()) {
        highlightTransportMode();
        return;
      }
      setCalculatorQuantity(key, getCalculatorQuantity(key) - 1);
    }

    if (increment) {
      const key = increment.dataset.calculatorIncrement;
      if (key === "transport" && isTransportDisabled()) {
        highlightTransportMode();
        return;
      }
      setCalculatorQuantity(key, getCalculatorQuantity(key) + 1);
    }
  });

  calculator.addEventListener("input", updatePaymentCalculator);
  calculator.addEventListener("change", updatePaymentCalculator);
  document.addEventListener("click", (event) => {
    if (!campPicker.contains(event.target)) closeCalculatorCampMenu();
    if (transportPicker && !transportPicker.contains(event.target)) {
      transportPicker.classList.remove("open");
      transportButton?.setAttribute("aria-expanded", "false");
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCalculatorCampMenu();
      transportPicker?.classList.remove("open");
      transportButton?.setAttribute("aria-expanded", "false");
    }
  });
}

function setupLandingFilters() {
  if (!document.querySelector("#campGrid")) return;

  document.querySelectorAll(".filter-chip").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-chip").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderCards(button.dataset.filter, document.querySelector("#quickSeason").value);
    });
  });

  document.querySelector("#quickFilterButton").addEventListener("click", () => {
    const category = document.querySelector("#quickCategory").value;
    const season = document.querySelector("#quickSeason").value;
    document.querySelectorAll(".filter-chip").forEach((item) => {
      item.classList.toggle("active", item.dataset.filter === category);
    });
    renderCards(category, season);
    document.querySelector("#tabere").scrollIntoView({ behavior: "smooth" });
  });

  renderCards();
  setupCalendarSlider();
  setupPaymentCalculator();
}

setupLandingFilters();

function dateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isDateInCamp(date, camp) {
  const key = dateKey(date);
  return key >= camp.startDate && key <= camp.endDate;
}

function getInitialCalendarMonth() {
  const currentYear = today.getFullYear();
  const currentMonth = currentYear === 2026 ? today.getMonth() : 0;
  const upcoming = camps
    .map((camp) => ({ camp, start: new Date(`${camp.startDate}T00:00:00`) }))
    .filter(({ start }) => start >= today)
    .sort((a, b) => a.start - b.start)[0];

  if (upcoming) {
    return upcoming.start.getMonth();
  }

  const futureOrCurrentCampThisYear = camps
    .map((camp) => new Date(`${camp.startDate}T00:00:00`).getMonth())
    .filter((month) => month >= currentMonth)
    .sort((a, b) => a - b)[0];

  return futureOrCurrentCampThisYear ?? 6;
}

function setupCalendarSlider() {
  const calendar = document.querySelector("#singleCalendar");
  const legend = document.querySelector("#calendarLegend");
  if (!calendar || !legend) return;

  legend.innerHTML = camps.map((camp) => `
    <button class="legend-chip" type="button" data-calendar-camp="${camp.id}" style="--camp-color: ${camp.color}">
      <span class="legend-dot" aria-hidden="true"></span>
      <span class="legend-label">${camp.title}</span>
      <span class="legend-clear" aria-hidden="true">&times;</span>
    </button>
  `).join("");

  activeCalendarMonth = getInitialCalendarMonth();
  renderMiniCalendar();
  renderSingleCalendar();

  document.querySelector("#prevMonth").addEventListener("click", () => {
    activeCalendarMonth = Math.max(0, activeCalendarMonth - 1);
    highlightedCampId = null;
    updateLegendSelection();
    renderSingleCalendar();
  });

  document.querySelector("#nextMonth").addEventListener("click", () => {
    activeCalendarMonth = Math.min(11, activeCalendarMonth + 1);
    highlightedCampId = null;
    updateLegendSelection();
    renderSingleCalendar();
  });

  legend.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-calendar-camp]");
    if (!chip) return;
    if (highlightedCampId === chip.dataset.calendarCamp) {
      highlightedCampId = null;
      updateLegendSelection();
      renderSingleCalendar();
      return;
    }
    focusCalendarCamp(chip.dataset.calendarCamp);
    scrollToCalendarTopOnPhone();
  });

  document.querySelectorAll(".calendar-mode button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".calendar-mode button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });

  let touchStartX = null;
  calendar.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });
  calendar.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 45) {
      activeCalendarMonth = delta < 0
        ? Math.min(11, activeCalendarMonth + 1)
        : Math.max(0, activeCalendarMonth - 1);
      highlightedCampId = null;
      updateLegendSelection();
      renderSingleCalendar();
    }
    touchStartX = null;
  }, { passive: true });
}

function scrollToCalendarTopOnPhone() {
  if (!window.matchMedia("(max-width: 680px)").matches) return;

  const target = document.querySelector("#calendar-title") || document.querySelector("#calendar");
  if (!target) return;

  requestAnimationFrame(() => {
    const header = document.querySelector(".site-header");
    const headerHeight = header?.getBoundingClientRect().height || 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 14;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  });
}

function renderMiniCalendar() {
  const mini = document.querySelector("#miniCalendar");
  if (!mini) return;

  mini.innerHTML = monthNames.map((month, index) => {
    const hasCamp = camps.some((camp) => new Date(`${camp.startDate}T00:00:00`).getMonth() === index);
    return `
      <button class="${hasCamp ? "has-camp" : ""} ${index === activeCalendarMonth ? "active" : ""}" type="button" data-mini-month="${index}">
        ${month.slice(0, 3)}
      </button>
    `;
  }).join("");

  mini.querySelectorAll("[data-mini-month]").forEach((button) => {
    button.addEventListener("click", () => {
      activeCalendarMonth = Number(button.dataset.miniMonth);
      highlightedCampId = null;
      updateLegendSelection();
      renderMiniCalendar();
      renderSingleCalendar();
    });
  });
}

function updateLegendSelection() {
  document.querySelectorAll("[data-calendar-camp]").forEach((chip) => {
    const isActive = chip.dataset.calendarCamp === highlightedCampId;
    chip.classList.toggle("active", isActive);
    chip.setAttribute("aria-pressed", String(isActive));
  });
}

function focusCalendarCamp(campId) {
  const camp = camps.find((item) => item.id === campId);
  if (!camp) return;

  activeCalendarMonth = new Date(`${camp.startDate}T00:00:00`).getMonth();
  highlightedCampId = campId;
  clearTimeout(highlightTimer);
  updateLegendSelection();
  renderMiniCalendar();
  renderSingleCalendar();
}

function renderSingleCalendar() {
  const calendar = document.querySelector("#singleCalendar");
  const title = document.querySelector("#calendarMonthTitle");
  const prev = document.querySelector("#prevMonth");
  const next = document.querySelector("#nextMonth");
  if (!calendar || !title) return;

  title.textContent = `${monthNames[activeCalendarMonth]} 2026`;
  renderMiniCalendar();
  if (prev) prev.disabled = activeCalendarMonth === 0;
  if (next) next.disabled = activeCalendarMonth === 11;

  const firstDay = new Date(2026, activeCalendarMonth, 1);
  const daysInMonth = new Date(2026, activeCalendarMonth + 1, 0).getDate();
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const blanks = Array.from({ length: mondayOffset }, () => `<div class="calendar-day large empty"></div>`).join("");
  const days = Array.from({ length: daysInMonth }, (_, dayIndex) => {
    const dayNumber = dayIndex + 1;
    const date = new Date(2026, activeCalendarMonth, dayNumber);
    const activeCamps = camps.filter((camp) => isDateInCamp(date, camp));
    const hasHighlightedCamp = highlightedCampId && activeCamps.some((camp) => camp.id === highlightedCampId);
    const events = activeCamps.map((camp) => `
      <a class="event-pill ${highlightedCampId && highlightedCampId !== camp.id ? "calendar-muted" : ""} ${highlightedCampId === camp.id ? "calendar-highlight" : ""}" href="${camp.externalUrl || camp.page}" aria-label="${camp.title}, ${camp.dates}" title="${camp.title}, ${camp.dates}" style="--camp-color: ${camp.color}"></a>
    `).join("");
    return `
      <div class="calendar-day large ${activeCamps.length ? "has-event" : ""} ${highlightedCampId && activeCamps.length && !hasHighlightedCamp ? "calendar-muted-day" : ""} ${hasHighlightedCamp ? "highlighted-day" : ""}">
        <span>${dayNumber}</span>
        <div class="event-bars">${events}</div>
      </div>
    `;
  }).join("");
  const visibleCells = mondayOffset + daysInMonth;
  const trailingBlankCount = Math.max(0, 42 - visibleCells);
  const trailingBlanks = Array.from({ length: trailingBlankCount }, () => `<div class="calendar-day large empty"></div>`).join("");

  calendar.classList.remove("calendar-animate");
  void calendar.offsetWidth;
  calendar.classList.add("calendar-animate");

  calendar.innerHTML = `
    <div class="weekdays large">${weekDays.map((day) => `<span>${day}</span>`).join("")}</div>
    <div class="month-grid large">${blanks}${days}${trailingBlanks}</div>
  `;
}
