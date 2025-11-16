<?php
// Nastavení CORS headers pro komunikaci s frontendem
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Zpracování OPTIONS requestu (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Pouze POST requests jsou povoleny
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Pouze POST metoda je povolena']);
    exit;
}

// Získání dat z formuláře
$input = json_decode(file_get_contents('php://input'), true);

// Validace dat
if (empty($input['name']) || empty($input['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Jméno a email jsou povinné']);
    exit;
}

$name = htmlspecialchars($input['name']);
$email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars($input['phone'] ?? '');
$message = htmlspecialchars($input['message'] ?? '');

// Validace emailu
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Neplatný email']);
    exit;
}

// Nastavení emailu pro Tomáše
$to_tomas = 't.mutina@email.cz';
$subject_tomas = 'Nová zpráva z kontaktního formuláře - ' . $name;

$message_tomas = "
Ahoj Tomáši! 👋

Máš novou zprávu přes kontaktní formulář z webu:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 JMÉNO: $name
📧 EMAIL: $email
📱 TELEFON: " . ($phone ?: 'Nezadáno') . "

💬 ZPRÁVA:
" . ($message ?: 'Žádná zpráva nebyla zadána.') . "

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tip: Odpověz rychle a udělej skvělý první dojem! 😊

S pozdravem,
Tvůj webový asistent 🤖
";

// Headers pro email pro Tomáše
$headers_tomas = [
    'From: noreply@kuchar-tm.cz',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=utf-8'
];

// Nastavení emailu pro zákazníka (potvrzení)
$subject_customer = 'Děkujeme za vaši zprávu - Kuchař TM';

$message_customer = "
Vážený/á $name,

děkujeme za vaši zprávu! 🙏

Tomáš Mutina, váš odborník na Thermomix TM7, se vám ozve do 24 hodin s odpovědí plnou užitečných rad a tipů.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Vaše zpráva:
" . ($message ?: 'Žádná specifická zpráva nebyla zadána.') . "

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Mezitím si můžete prohlédnout naši galerii receptů na webu nebo nás sledovat na sociálních sítích.

Těšíme se na spolupráci! 👨‍🍳

S pozdravem,
Tomáš Mutina
Kuchař TM - Thermomix TM7 odborník
📱 +420 734 403 611
📧 t.mutina@email.cz
🌍 Moravskoslezský kraj
";

// Headers pro email pro zákazníka
$headers_customer = [
    'From: t.mutina@email.cz',
    'Reply-To: t.mutina@email.cz',
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=utf-8'
];

// Pokus o odeslání emailů
$success_tomas = mail($to_tomas, $subject_tomas, $message_tomas, implode("\r\n", $headers_tomas));
$success_customer = mail($email, $subject_customer, $message_customer, implode("\r\n", $headers_customer));

// Odpověď
if ($success_tomas && $success_customer) {
    echo json_encode([
        'success' => true, 
        'message' => 'Emaily byly úspěšně odeslány'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Chyba při odesílání emailů'
    ]);
}
?>