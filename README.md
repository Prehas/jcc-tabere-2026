# Tabere JCC 2026 - landing page HTML5

Acesta este un model static pentru sectiunea de tabere JCC Bucuresti. Contine:

- landing page responsive;
- hero image generat pentru atmosfera de Jewish summer camp;
- calendar interactiv inclus direct in hero, langa textul principal;
- galerie cu carduri colorate pentru fiecare tabara extrasa din pagina `http://www.jcc.ro/tabere-2026`;
- imagini distincte pentru grupe de varsta: familii, copii, tineri, adulti;
- carduri indisponibile automat dupa data de final a taberei;
- pagini HTML pentru fiecare tabara, cu overview, conditii, formular si checkout;
- formulare integrate pe site, bazate pe campurile extrase din Google Forms acolo unde exista;
- pentru taberele de familie: adulti si copii dinamici cu butoane "Adauga adult" / "Adauga copil";
- campuri obligatorii marcate cu steluta rosie si validate inainte de checkout;
- checkout simulat de tip Netopia pentru testarea fluxului de plata.

## Fisiere

- `index.html` - structura paginii;
- `styles.css` - design responsive;
- `app.js` - datele taberelor, filtrele de landing page, datele formularelor si regulile de checkout.
- `camp-page.js` - randarea paginilor individuale de tabara, formularul integrat si checkout-ul Netopia test.
- `assets/` - imaginile folosite in landing page.
- `mishpahot.html`, `negev.html`, `szarvas.html`, `hermon.html`, `galil.html`, `golan.html`, `hermon-special.html`, `tu-bishvat.html`, `galil-winter.html` - paginile individuale ale taberelor.

## Etapa urmatoare

Paginile individuale sunt generate din acelasi set de date. Cand sunt disponibile detalii noi pentru fiecare tabara, fiecare pagina poate primi:

- descriere extinsa;
- program pe zile;
- galerie foto;
- echipa / coordonatori;
- intrebari frecvente.

Nota: Szarvas foloseste pe site-ul actual platforma externa `reg.szarvas.camp`, nu Google Forms. Formularul integrat pentru Szarvas este model pana la confirmarea campurilor exacte.

## Integrare reala recomandata

Pentru productie, formularul nu trebuie sa ramana doar in browser. Fluxul recomandat:

1. Utilizatorul completeaza formularul.
2. Backend-ul salveaza inscrierea intr-o baza de date securizata.
3. Backend-ul creeaza o sesiune de plata pentru tabara si suma aleasa.
4. Procesatorul de plata confirma tranzactia prin webhook.
5. Sistemul marcheaza inscrierea ca platita si trimite e-mail de confirmare.

## Date sensibile si GDPR

Formularul strange date personale si date medicale. Pentru lansare reala sunt necesare:

- politica de confidentialitate clara;
- consimtamant explicit pentru date medicale si foto/video;
- acces limitat pentru echipa JCC;
- criptare la transport prin HTTPS;
- reguli de stergere/retentie a datelor dupa tabara.

## Procesator de plata

Pagina actuala foloseste linkuri MPY. Pentru un sistem complet se poate pastra MPY daca ofera:

- linkuri dinamice sau sume predefinite pe tabara;
- identificator de comanda;
- webhook / notificare server-to-server;
- export plati si status tranzactii.

Daca se doreste checkout complet integrat, se pot analiza alternativ Netopia, EuPlatesc, Stripe sau procesatorul deja aprobat de organizatie.
