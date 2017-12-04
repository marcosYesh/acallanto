<?php
  

require 'mailer/PHPMailerAutoload.php';

$mail = new PHPMailer;


  // Destinatário
  //$para = "rafaelkellows@hotmail.com";
  $para = "wesleysimplicio@live.com";

  // Assunto do e-mail
  $subject = $_POST['subject'];

  // Campos do formulário de contato
  // $name = $_POST['name'];
  // $email = $_POST['email'];
  // $phone = $_POST['phone'];
  // $mobile = $_POST['mobile'];
  // $subject = $_POST['subject'];
  // $message = $_POST['message'];

  $name = $_POST['Nome'];
  $email = $_POST['Email'];
  $empresa = $_POST['Empresa'];
  $mobile = $_POST['mobile'];
  $subject = $_POST['subject'];
  $message = $_POST['Mensagem'];

  // Monta o corpo da mensagem com os campos
  $body = "Nome: $name <br>E-mail: $email <br>";
  $body .= "Empresa: $empresa <br>Mensagem: $message";

  // // Cabeçalho do e-mail
  // $header = "From: $name <$para> Reply-to: $email ";
  // $header .= "Content-Type: text/html; charset=iso-8859-1 ";

  // mail($para, $subject, $body, $header);

  // $msg = "Sua mensagem foi enviada com sucesso.";
//$mail->SMTPDebug = 3; 

  $mail->isSMTP();                                      // Set mailer to use SMTP
  $mail->Host = 'mail.simpleti.com.br';  // Specify main and backup SMTP servers
  $mail->SMTPAuth = true;                               // Enable SMTP authentication
  $mail->Username = 'contato@simpleti.com.br';                 // SMTP username
  $mail->Password = 'wesley24035132';                        // SMTP password
  $mail->SMTPSecure = 'ssl'; //'ssl';  tls                      // Enable TLS encryption, `ssl` also accepted
  $mail->Port = 465;  //587 465

  $mail->From = $email;
  $mail->FromName = $name;
  $mail->addAddress($para);
  
  $mail->addReplyTo($email, $name);

  $mail->isHTML(true);                                  // Set email format to HTML

  $mail->Subject = 'SITE CONTATO - '.$subject;
  $mail->Body    = utf8_decode($body);

  if(!$mail->send()) {
      echo $msg = "Não enviada, tente novamente ou entre em contato com o suporte.";
      //echo 'Mailer Error: ' . $mail->ErrorInfo;
  } else {
    echo $msg = "Sua mensagem foi enviada com sucesso.";
  }

  // Mostra a mensagem acima e redireciona para index.html
  //echo "<script>location.href='index.html'; alert('ajdsah');</script>";

?>