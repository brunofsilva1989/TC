<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Captura os dados enviados via POST
    $formulario = $_POST['formulario'] ?? '';
    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $mensagem = $_POST['mensagem'] ?? '';
    $telefone = $_POST['telefone'] ?? '';
    $areaInteresse = $_POST['area-interesse'] ?? '';
    $curriculo = $_FILES['curriculo'] ?? null;

    // Validação básica
    if (empty($nome) || empty($email) || empty($mensagem)) {
        echo json_encode(['status' => 'error', 'message' => 'Por favor, preencha todos os campos obrigatórios.']);
        exit;
    }

    // Define o e-mail do destinatário com base no formulário
    switch ($formulario) {
        case 'Trabalhe Conosco':
            $para = "rh@tudoemcarnes.com.br";
            break;
        case 'SAC':
            $para = "sac@tudoemcarnes.com.br";
            break;
        case 'Contato':
            $para = "contato@tudoemcarnes.com.br";
            break;
        default:
            echo json_encode(['status' => 'error', 'message' => 'Formulário desconhecido.']);
            exit;
    }

    // Configuração do e-mail
    $assunto = "Formulário: $formulario";
    $headers = "From: $email";

    // Monta o corpo do e-mail
    $body = "Nome: $nome\nE-mail: $email\nMensagem: $mensagem";
    if ($telefone) {
        $body .= "\nTelefone: $telefone";
    }
    if ($areaInteresse) {
        $body .= "\nÁrea de Interesse: $areaInteresse";
    }

    // Anexa o currículo se for Trabalhe Conosco
    if ($curriculo && $curriculo['error'] === 0) {
        $uploadDir = 'uploads/';
        $uploadFile = $uploadDir . basename($curriculo['name']);
        if (move_uploaded_file($curriculo['tmp_name'], $uploadFile)) {
            $body .= "\nCurrículo anexado: $uploadFile";
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Erro ao enviar o currículo.']);
            exit;
        }
    }

    // Envia o e-mail
    if (mail($para, $assunto, $body, $headers)) {
        echo json_encode(['status' => 'success', 'message' => 'Mensagem enviada com sucesso!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erro ao enviar o e-mail.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método não permitido.']);
}
