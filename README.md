# Webové stránky - Vášnivý kuchař s Thermomix TM7

Krásné, moderní webové stránky prezentující vašnivého kuchaře a revoluční robot Thermomix TM7. Stránky jsou navrženy tak, aby návštěvníky nadchly a motivovaly je kontaktovat vás.

## 📁 Struktura projektu

```
Web-TM7/
├── index.html          # Hlavní HTML soubor
├── styles.css          # CSS styly a responzivní design
├── script.js           # JavaScript funkcionality
├── images/             # Složka pro obrázky
└── README.md           # Tento soubor
```

## ✨ Funkce webu

### 🎨 Design
- **Moderní responzivní design** - perfektní zobrazení na všech zařízeních
- **Atraktivní barevná paleta** - červená a oranžová evokující vášeň pro vaření
- **Animace a interaktivní prvky** - pro lepší uživatelský zážitek
- **Profesionální typografie** - použití Google Fonts (Poppins)

### 📱 Responsivní design
- Mobilní navigace s hamburger menu
- Přizpůsobivé layouty pro tablety a telefony
- Touch-friendly tlačítka a formuláře

### 🔧 Interaktivní prvky
- Smooth scrolling mezi sekcemi
- Animace při scrollování (Intersection Observer)
- Kontaktní formulář s validací
- Notifikace pro uživatele
- Hover efekty na tlačítka a karty

### 📧 Kontaktní formulář
- Validace povinných polí
- Kontrola formátu telefonu a emailu
- Uživatelsky přívětivé zprávy
- Simulace odeslání zprávy

## 🚀 Spuštění webu

1. **Jednoduché spuštění**: Otevřete soubor `index.html` v jakémkoliv moderním webovém prohlížeči

2. **Pro vývoj s live serverem**:
   ```bash
   # Pokud máte VS Code s Live Server rozšířením
   # Klikněte pravým tlačítkem na index.html → "Open with Live Server"
   
   # Nebo použijte Python (pokud je nainstalován)
   python -m http.server 8000
   
   # Nebo Node.js serve
   npx serve .
   ```

## 📝 Přizpůsobení obsahu

### 🔄 Co je potřeba změnit:

1. **Kontaktní údaje** v `index.html`:
   ```html
   <!-- Aktualizujte tyto řádky -->
   <p>+420 xxx xxx xxx</p>
   <p>email@example.com</p>
   ```

2. **Přidání skutečných fotografií** do složky `images/`:
   - `chef-photo.jpg` - vaše profesionální fotografie
   - `thermomix-tm7.jpg` - fotografie Thermomixu TM7
   - `recipe1.jpg`, `recipe2.jpg`, `recipe3.jpg` - fotografie vašich receptů

3. **Aktualizace obrázků v CSS** (nahradit placeholdery):
   ```css
   /* Příklad pro hero sekci */
   .hero-image img {
       max-width: 100%;
       border-radius: 20px;
   }
   ```

### 📋 Sekce webu:

1. **Hero sekce** - Úvodní část s hlavním CTA
2. **O mně** - Představení kuchaře a jeho vášně
3. **Thermomix TM7** - Prezentace robota a jeho výhod
4. **Recepty** - Ukázky oblíbených receptů
5. **Kontakt** - Formulář a kontaktní informace

## 🎯 Cíle webu

Web je optimalizován pro **konverzi návštěvníků**:

### ✅ Motivační prvky:
- Emotivní vyprávění o vášni pro vaření
- Zdůraznění výhod Thermomixu TM7
- Urgentní výzvy k akci (CTA)
- Sociální důkaz (recepty, zkušenosti)

### 📞 Call-to-Action tlačítka:
- "Zavolejte mi" - hlavní CTA
- "Zjistit více" - sekundární CTA
- "Domluvit ukázku" - specifická akce
- "Kontaktovat" - obecný kontakt

### 🎪 Psychologické prvky:
- Urgence (proč volat právě teď)
- Benefity pro zákazníka
- Osobní přístup
- Profesionalita a důvěryhodnost

## 🔧 Technické detaily

### 💻 Použité technologie:
- **HTML5** - sémantická struktura
- **CSS3** - Grid, Flexbox, animace, CSS variables
- **Vanilla JavaScript** - bez závislostí na frameworku
- **Font Awesome** - ikony
- **Google Fonts** - typografie

### 📱 Kompatibilita:
- Všechny moderní prohlížeče
- IE11+ (s omezenými animacemi)
- iOS Safari 10+
- Android Chrome 60+

### ⚡ Performance:
- Optimalizované CSS (custom properties)
- Lazy loading efekty
- Minimální externí závislosti
- Rychlé načítání

## 🎨 Přizpůsobení designu

### 🌈 Změna barev:
V `styles.css` upravte CSS proměnné:
```css
:root {
    --primary-color: #e74c3c;      /* Hlavní barva */
    --secondary-color: #f39c12;     /* Sekundární barva */
    --dark-color: #2c3e50;          /* Tmavá barva */
    /* ... */
}
```

### 📝 Změna fontů:
1. Změňte import v `<head>` sekci HTML
2. Aktualizujte `font-family` v CSS

## 📈 SEO optimalizace

Web obsahuje:
- Sémantické HTML5 tagy
- Meta description
- Strukturované nadpisy (H1-H4)
- Alt texty pro obrázky (připraveno)
- Rychlé načítání
- Mobile-friendly design

## 🐛 Řešení problémů

### Časté problémy:
1. **Formulář nefunguje** - je potřeba backend pro skutečné odeslání emailů
2. **Animace nefungují** - zkontrolujte podporu moderních CSS funkcí
3. **Mobilní menu** - JavaScript musí být povolen

### 🔗 Připojení backendu:
Pro funkční formulář nahraďte v `script.js`:
```javascript
// Místo simulace přidejte skutečné API volání
fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData)
})
```

## 📞 Další kroky

1. **Nahraďte placeholder obrázky** skutečnými fotografiemi
2. **Aktualizujte kontaktní údaje**
3. **Připojte skutečný backend** pro formulář
4. **Nastavte Google Analytics** pro sledování návštěvnosti
5. **Optimalizujte pro vyhledávače** (přidání schema.org značek)

---

**Tip**: Pro nejlepší výsledky použijte kvalitní fotografie a pravidelně aktualizujte obsah stránek!

🍴 **Hodně úspěchu s vašim kulinářským webem!**