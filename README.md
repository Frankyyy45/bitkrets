# Bitkrets – TDD Refactoring Project

Detta projekt är en refaktorerad version av originalprojektet **Bitkrets**, där fokus har legat på att arbeta med **Test Driven Development (TDD)**.

Projektet är en del av examinationsuppgiften i kursen och har genomförts genom att:

- Skriva tester först  
- Refaktorisera koden så att testerna blir gröna  
- Förbättra struktur, läsbarhet och ansvarsfördelning  

---

## 🎯 Mål med projektet

Syftet med projektet är att:

- Använda **TDD** för att styra utvecklingen  
- Förbättra validering av formulärdata (frontend & backend)  
- Refaktorisera controller-logik i backend  
- Skapa och testa frontend-funktioner  
- Säkerställa att alla viktiga funktioner är testade  

---

## 🧪 Test Driven Development

Arbetet har följt denna process:

1. Skriva test (rött)  
2. Skriva minimal kod för att få testet grönt  
3. Refaktorisera  
4. Upprepa  

Alla viktiga delar av applikationen har tester, t.ex.:

- Validering av formulär  
- Skapa, redigera och ta bort blogginlägg  
- Backend controllers  
- Frontend-logik  
- HTML-struktur  

---

## 🛠️ Funktioner

### Backend
- `getBlogPost`
- `getBlogPosts`
- `createBlogPost`
- `editBlogPost`
- `deleteBlogPost`
- Validering av formulärdata

### Frontend
- Skapa blogginlägg  
- Redigera blogginlägg  
- Ta bort blogginlägg  
- Formulärvalidering  
- Dynamisk rendering av blogginlägg  

---

## 📁 Projektstruktur (kort)

src/
backend/
frontend/
utils/
tests/
unit/


---

 Starta projektet

Installera beroenden:

```bash
npm install

//Osman
