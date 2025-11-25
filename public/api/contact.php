<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Obtener datos del formulario
$data = json_decode(file_get_contents('php://input'), true);

// Validar datos
$name = isset($data['name']) ? trim($data['name']) : '';
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$message = isset($data['message']) ? trim($data['message']) : '';

// Validaciones
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Por favor completa todos los campos requeridos']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Correo electrónico inválido']);
    exit;
}

// Configuración del correo
$to = 'nodo@devpscol.com';
$subject = 'Nuevo mensaje de contacto - Nodo';

// Crear el cuerpo del correo en HTML
$htmlMessage = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%); color: white; padding: 20px; text-align: center; }
        .content { background: #f9fafb; padding: 20px; margin-top: 20px; border-radius: 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #7C3AED; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Nuevo Mensaje de Contacto</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Nombre:</div>
                <div>" . htmlspecialchars($name) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Teléfono:</div>
                <div>" . htmlspecialchars($phone ?: 'No proporcionado') . "</div>
            </div>
            <div class='field'>
                <div class='label'>Correo Electrónico:</div>
                <div>" . htmlspecialchars($email) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Mensaje:</div>
                <div>" . nl2br(htmlspecialchars($message)) . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>Este mensaje fue enviado desde el formulario de contacto de nodo.devpscol.com</p>
        </div>
    </div>
</body>
</html>
";

// Headers del correo
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: Formulario Nodo <nodo@devpscol.com>" . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

// Enviar correo
if (mail($to, $subject, $htmlMessage, $headers)) {
    echo json_encode([
        'success' => true,
        'message' => '¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al enviar el mensaje. Por favor intenta nuevamente.'
    ]);
}
?>
