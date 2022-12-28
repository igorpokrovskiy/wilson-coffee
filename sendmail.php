<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host       = 'smtp.yandex.ru'; 
$mail->SMTPAuth   = true;  
$mail->Username   = 'wilson-alert';
$mail->Password   = 'wilson1122E'; 
$mail->SMTPSecure = 'ssl';
$mail->Port       = 465;

$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language');
$mail->IsHTML(true);

$mail->setFrom('wilson-alert@yandex.ru', 'Заявка Wilson Coffee');
$mail->addAddress('wilsoncoffeefr@mail.ru');
$mail->Subject = 'Новая заявка Wilson Coffee';
$body    = '<b>У вас новая заявка</b>';

if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['tel']))){
    $body.='<p><strong>Телефон:</strong> '.$_POST['tel'].'</p>';
}
if(trim(!empty($_POST['email']))){
    $body.='<p><strong>Имя:</strong> '.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['city']))){
    $body.='<p><strong>Город:</strong> '.$_POST['city'].'</p>';
}

$mail->Body = $body;

if (!$mail->send()){
    $message = 'Ошибка';
} else {
    $message = 'Благодарим за заявку, мы скоро свяжемся с Вами';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>