<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Evitar reenvio múltiplo do formulário
header('Cache-Control: no-cache, must-revalidate, max-age=0');
header('Expires: 0');
header('Pragma: no-cache');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $formulario = $_POST['formulario'] ?? '';
    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $telefone = $_POST['telefone'] ?? '';
    $mensagem = $_POST['mensagem'] ?? '';
    $areaInteresse = $_POST['area-interesse'] ?? '';
    $curriculo = $_FILES['curriculo'] ?? null;

    // Validação básica
    if (empty($nome) || empty($email)) {
        echo json_encode(['status' => 'error', 'message' => 'Preencha todos os campos obrigatórios.']);
        exit;
    }

<<<<<<< HEAD
    $formulario = $_POST['formulario'] ?? '';

    if (!$formulario) {
        echo json_encode(['status' => 'error', 'message' => 'Formulário não enviado.']);
        exit;
    }

    // Determina o e-mail do destinatário com base no tipo de formulário
    $para = match ($formulario) {
        'SAC' => 'sac@tudoemcarnes.com.br',
        'Contato' => 'comercial@tudoemcarnes.com.br',
        'Trabalhe Conosco' => 'rh@tudoemcarnes.com.br',
        default => null,
    };

    if (!$para) {
        echo json_encode(['status' => 'error', 'message' => 'Formulário desconhecido.']);
        exit;
    }

    error_log("Valor do campo formulario: " . $formulario);


    //criar um log para ver oque esta sendo enviado
    $log = fopen('log.txt', 'a');
    fwrite($log, "Formulário: $formulario\n");
    fwrite($log, "Nome: $nome\n");
    fwrite($log, "E-mail: $email\n");
    fwrite($log, "Telefone: $telefone\n");
    fwrite($log, "Mensagem: $mensagem\n");
    fwrite($log, "Área de Interesse: $areaInteresse\n");
    fclose($log);


    // Configuração do PHPMailer
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'mail.tudoemcarnes.com.br';
        $mail->SMTPAuth = true;
        $mail->Username = 'site@tudoemcarnes.com.br'; // Seu e-mail
        $mail->Password = 'Site2024@@'; // Sua senha
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

=======
    // Determina o e-mail do destinatário com base no tipo de formulário
    $para = match ($formulario) {
        'SAC' => 'sac@tudoemcarnes.com.br',
        'Contato' => 'comercial@tudoemcarnes.com.br',
        'Trabalhe Conosco' => 'rh@tudoemcarnes.com.br',
        default => null,
    };

    if (!$para) {
        echo json_encode(['status' => 'error', 'message' => 'Formulário desconhecido.']);
        exit;
    }

    // Configuração do PHPMailer
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'mail.tudoemcarnes.com.br';
        $mail->SMTPAuth = true;
        $mail->Username = 'site@tudoemcarnes.com.br'; // Seu e-mail
        $mail->Password = 'Site2024@@'; // Sua senha
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

>>>>>>> 429a3de233aa40e0c9c257e0fab2b34d98650869
        $mail->CharSet = 'UTF-8'; // Garante que o charset seja UTF-8
        $mail->setFrom('site@tudoemcarnes.com.br', 'Tudo em Carnes');
        $mail->addAddress($para);

        $mail->isHTML(true);
        $mail->Subject = "Formulário: $formulario";

        // Monta o corpo do e-mail com formatação HTML
        $body = "
<!DOCTYPE html>
<html lang='pt-BR'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            text-align: left;
            padding: 10px;
            border: 1px solid #ddd;
        }
        th {
            background-color: #f4f4f4;
        }
        .header {
            font-size: 18px;
            font-weight: bold;
            color: #d9534f;
        }
    </style>
</head>
<body>
    <h2 class='header'>Formulário Recebido: $formulario</h2>
    <p>Você recebeu uma nova mensagem através do formulário \"$formulario\". Aqui estão os detalhes:</p>
    <table>
        <tr>
            <th>Campo</th>
            <th>Detalhes</th>
        </tr>
        <tr>
            <td><strong>Nome</strong></td>
            <td>$nome</td>
        </tr>
        <tr>
            <td><strong>E-mail</strong></td>
            <td>$email</td>
        </tr>";

        if (!empty($telefone)) {
            $body .= "
        <tr>
            <td><strong>Telefone</strong></td>
            <td>$telefone</td>
        </tr>";
        }

        if (!empty($mensagem)) {
            $body .= "
        <tr>
            <td><strong>Mensagem</strong></td>
            <td>$mensagem</td>
        </tr>";
        }

        if ($formulario === 'Trabalhe Conosco' && !empty($areaInteresse)) {
            $body .= "
        <tr>
            <td><strong>Área de Interesse</strong></td>
            <td>$areaInteresse</td>
        </tr>";
        }

        if ($formulario === 'Trabalhe Conosco' && isset($curriculo['name'])) {
            $body .= "
        <tr>
            <td><strong>Currículo</strong></td>
            <td>Anexo enviado: {$curriculo['name']}</td>
        </tr>";
        }

        $body .= "
    </table>
    <p>Este e-mail foi gerado automaticamente pelo sistema Tudo em Carnes.</p>
</body>
</html>";

        // Anexa o currículo se for Trabalhe Conosco
        if ($formulario === 'Trabalhe Conosco' && $curriculo && $curriculo['error'] === 0) {
            $uploadDir = 'uploads/';
            $uploadFile = $uploadDir . basename($curriculo['name']);
            if (!move_uploaded_file($curriculo['tmp_name'], $uploadFile)) {
                echo json_encode(['status' => 'error', 'message' => 'Erro ao anexar o currículo.']);
                exit;
            }
            $mail->addAttachment($uploadFile);
        }

        $mail->Body = $body;
        $mail->AltBody = strip_tags($body);

        $mail->send();
        echo json_encode(['status' => 'success', 'message' => 'Mensagem enviada com sucesso!']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => "Erro ao enviar o e-mail: {$mail->ErrorInfo}"]);
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método não permitido.']);
}
