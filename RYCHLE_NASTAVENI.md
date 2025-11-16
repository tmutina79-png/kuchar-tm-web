# 🚀 RYCHLÉ NASTAVENÍ EmailJS - Krok za krokem

## 📝 Co potřebujete udělat:

### 1. Registrace na EmailJS (2 minuty)
1. Jděte na: **https://www.emailjs.com/**
2. Klikněte **"Sign Up"** 
3. Zaregistrujte se emailem nebo Google účtem

### 2. Připojení Gmail (1 minuta)
1. V dashboardu klikněte **"Email Services"** 
2. **"Add New Service"** → vyberte **Gmail**
3. Přihlaste se k vašemu Gmail účtu
4. **Zkopírujte Service ID** (například: `service_abc123`)

### 3. Vytvoření template pro Tomáše (2 minuty)
1. **"Email Templates"** → **"Create New Template"**
2. **Template Name:** `Kontakt z webu`

**Předmět:**
```
Nová zpráva od {{from_name}} - Kuchař TM
```

**Obsah:**
```
Ahoj Tomáši! 👋

Nová zpráva z webu:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 JMÉNO: {{from_name}}
📧 EMAIL: {{from_email}}
📱 TELEFON: {{phone}}

💬 ZPRÁVA:
{{message}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Odpověz rychle! 😊
```

3. **To Email:** `t.mutina@email.cz`
4. **From Email:** váš Gmail
5. **Zkopírujte Template ID** (například: `template_xyz789`)

### 4. Template pro zákazníky (2 minuty)
1. **"Create New Template"** 
2. **Template Name:** `Potvrzeni`

**Předmět:**
```
Děkujeme za zprávu - Kuchař TM
```

**Obsah:**
```
Vážený/á {{to_name}},

děkujeme za vaši zprávu! 🙏

Tomáš se vám ozve do 24 hodin.

Vaše zpráva:
{{customer_message}}

S pozdravem,
Tomáš Mutina - Kuchař TM
📱 +420 734 403 611
📧 t.mutina@email.cz
```

3. **To Email:** `{{to_email}}`
4. **From Email:** `t.mutina@email.cz` 
5. **Zkopírujte Template ID** (například: `template_confirm123`)

### 5. Public Key (30 sekund)
1. **"Account"** → najděte **"Public Key"**
2. **Zkopírujte** (například: `mZb2yQCtMTq4tEqNB`)

### 6. Aktualizace kódu (30 sekund)
V souboru `script.js` na řádcích 3-6 nahraďte:

```javascript
const PUBLIC_KEY = "VÁŠ_PUBLIC_KEY";     // z kroku 5
const SERVICE_ID = "VÁŠ_SERVICE_ID";     // z kroku 2  
const TEMPLATE_ID = "VÁŠ_TEMPLATE_ID";   // z kroku 3
const CONFIRMATION_TEMPLATE_ID = "VÁŠ_CONFIRMATION_ID"; // z kroku 4
```

## ✅ HOTOVO!

Formulář nyní pošle skutečné emaily:
- **Tomáš** dostane každou zprávu na `t.mutina@email.cz`
- **Zákazníci** dostanou potvrzovací email
- **Zdarma** do 200 emailů/měsíc

## 🔧 Test
1. Vyplňte formulář na webu
2. Zkontrolujte emaily (včetně spamu)
3. Otevřete konzoli prohlížeče (F12) pro logy

---

**Celý proces trvá asi 8 minut. Poté budou chodit skutečné emaily! 📧✨**