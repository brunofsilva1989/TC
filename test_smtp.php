use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'mail.tudoemcarnes.com.br';
    $mail->SMTPAuth = true;
    $mail->Username = 'site@tudoemcarnes.com.br';
    $mail->Password = 'Site2024@@';
    $mail->SMTPSecure = 'ssl'; // ou 'tls'
    $mail->Port = 465; // Porta SSL (ou 587 para TLS)

    $mail->setFrom('site@tudoemcarnes.com.br', 'Contato - Tudo em Carnes');
    $mail->addAddress('destinatario@tudoemcarnes.com.br');

    $mail->isHTML(true);
    $mail->Subject = 'Teste de envio de e-mail';
    $mail->Body    = '<b>Este é um teste usando PHPMailer</b>';

    $mail->send();
    echo 'Mensagem enviada com sucesso!';
} catch (Exception $e) {
    echo "Erro ao enviar e-mail: {$mail->ErrorInfo}";
}
