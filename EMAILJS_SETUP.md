# 📧 Návod na nastavení EmailJS pro kontaktní formulář

## ⚠️ DŮLEŽITÉ: Aktuálně běží simulace

Formulář momentálně **simuluje** odeslání emailů a zobrazuje data v konzoli prohlížeče. 
Pro skutečné emaily následujte tento návod:

## 🚀 Krok za krokem nastavení

### 1. Registrace na EmailJS
1. Jděte na: **https://www.emailjs.com/**
2. Klikněte na **"Sign Up"**
3. Zaregistrujte se pomocí emailu nebo Google účtu

### 2. Vytvoření Email Service
1. Po přihlášení klikněte na **"Email Services"**
2. Klikněte **"Add New Service"**
3. Vyberte **Gmail** (nebo jiný email provider)
4. Přihlaste se ke svému Gmail účtu
5. **Zkopírujte Service ID** (např. `service_abc123`)

### 3. Vytvoření Email Templates

#### Template 1: Pro Tomáše (příjem zpráv)
1. Klikněte na **"Email Templates"**
2. **"Create New Template"**
3. **Template Name:** `Nova zprava z webu`
4. **Template Content:**

```
Předmět: Nová zpráva od {{from_name}} - Kuchař TM

Ahoj Tomáši! 👋

Máš novou zprávu přes kontaktní formulář z webu:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 JMÉNO: {{from_name}}
📧 EMAIL: {{from_email}}  
📱 TELEFON: {{phone}}

💬 ZPRÁVA:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tip: Odpověz rychle a udělej skvělý první dojem! 😊

S pozdravem,
Tvůj webový asistent 🤖
```

5. **To Email:** `t.mutina@email.cz`
6. **From Email:** váš Gmail (který jste připojili)
7. **Zkopírujte Template ID** (např. `template_xyz789`)

#### Template 2: Potvrzení pro zákazníky
1. **"Create New Template"**
2. **Template Name:** `Potvrzeni pro zakaznika`
3. **Template Content:**

```
Předmět: Děkujeme za vaši zprávu - Kuchař TM

Vážený/á {{to_name}},

děkujeme za vaši zprávu! 🙏

Tomáš Mutina, váš odborník na Thermomix TM7, se vám ozve do 24 hodin s odpovědí plnou užitečných rad a tipů.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Vaše zpráva:
{{customer_message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Mezitím si můžete prohlédnout naši galerii receptů na webu.

Těšíme se na spolupráci! 👨‍🍳

S pozdravem,
Tomáš Mutina
Kuchař TM - Thermomix TM7 odborník
📱 +420 734 403 611
📧 t.mutina@email.cz
🌍 Moravskoslezský kraj
```

4. **To Email:** `{{to_email}}`
5. **From Email:** `t.mutina@email.cz`
6. **Zkopírujte Template ID** (např. `template_confirm456`)

### 4. Získání Public Key
1. V EmailJS dashboardu klikněte na **"Account"**
2. Najděte **"Public Key"**
3. **Zkopírujte Public Key** (např. `abc123def456`)

### 5. Aktualizace kódu
V souboru `script.js` nahraďte:

```javascript
// Řádek 3:
emailjs.init("abc123def456"); // Váš Public Key

// Řádek 216:
emailjs.send(
    'service_abc123',    // Váš Service ID
    'template_xyz789',   // Template ID pro Tomáše
    templateParams
)

// Řádek 231:
return emailjs.send(
    'service_abc123',           // Stejný Service ID
    'template_confirm456',      // Template ID pro potvrzení
    customerParams
);
```

## ✅ Test funkčnosti

1. **Otevřete webovou stránku**
2. **Vyplňte kontaktní formulář**
3. **Klikněte "Odeslat zprávu"**
4. **Zkontrolujte:**
   - Tomáš dostane email s detaily zprávy
   - Zákazník dostane potvrzovací email
   - Zobrazí se zelená notifikace

## 🔧 Řešení problémů

### Problém: "EmailJS is not defined"
**Řešení:** Zkontrolujte, že je správně načten EmailJS script v HTML

### Problém: "Service not found"
**Řešenie:** Zkontrolujte Service ID v EmailJS dashboardu

### Problém: "Template not found"  
**Řešení:** Zkontrolujte Template ID a ujistěte se, že template je publikován

### Problém: Emaily nepřicházejí
**Řešení:** 
- Zkontrolujte spam/junk složku
- Ověřte email adresy v templates
- Zkontrolujte log v EmailJS dashboardu

## 💡 Výhody EmailJS

✅ **Žádný backend potřeba** - vše běží z frontendu
✅ **Zdarma do 200 emailů/měsíc**  
✅ **Jednoduché nastavení**
✅ **Podpora různých email providerů**
✅ **Automatické potvrzovací emaily**

## 📊 Limits zdarma

- **200 emailů/měsíc zdarma**
- Pro více emailů: placené plány od $15/měsíc
- Detaily na: https://www.emailjs.com/pricing/

---

**Po dokončení nastavení budou emaily automaticky chodit na `t.mutina@email.cz` a zákazníci dostanou potvrzovací zprávy!** 🎉