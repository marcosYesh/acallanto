<?php

  $ref = $_REQUEST["ref"];
      
    require 'mailer/PHPMailerAutoload.php';
    $mail = new PHPMailer;

  if ($ref=="faleConosco") {

    // Destinatário
    //$para = "rafaelkellows@hotmail.com";
    $para = "comunicacao@clinicaacallanto.com.br";
    //$para = "wesleysimplicio@live.com";

    // Assunto do e-mail
    $subject = $_POST["subject"];

    // Campos do formulário de contato
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $mobile = $_POST["mobile"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    // Monta o corpo da mensagem com os campos

    $body  = "<html>" . "\r\n";
    $body .= "  <head>" . "\r\n";
    $body .= "    <title>Fale Conosco - Acallanto</title>" . "\r\n";
    $body .= "    <meta charset='UTF-8'>" . "\r\n";
    $body .= "  </head>" . "\r\n";
    $body .= "  <body>" . "\r\n";
    $body .= "    <p>Olá, <strong>$name</strong> enviou uma mensagem através do formulário Fale Conosco.</p>" . "\r\n";
    $body .= "    <p><strong>E-mail</strong>: $email</p>" . "\r\n";
    $body .= "    <p><strong>Telefone Fixo</strong>: $phone</p>" . "\r\n";
    $body .= "    <p><strong>Telefone Celular</strong>: $mobile</p>" . "\r\n";
    $body .= "    <p><strong>Assunto</strong>: $subject</p>" . "\r\n";
    $body .= "    <p><strong>Mensagem</strong>: $message</p>" . "\r\n"; 
    $body .= "  </body>" . "\r\n";
    $body .= "</html>";

    // Cabeçalho do e-mail
    //$header = "Content-type: text/html; charset=utf-8" . "\r\n";
    // Additional headers
    //$header .= "To: Contato para Acallanto < $para >" . "\r\n";
    //$header .= "From: $name < $email > Reply-to: $email " . "\r\n";

    //mail($para, $subject, $body, $header);

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

    $mail->Subject = 'Fale Conosco - '.$subject;
    $mail->Body    = utf8_decode($body);

    if(!$mail->send()) {
        echo $msg = "Não enviada, tente novamente ou entre em contato com o suporte.";
        //echo 'Mailer Error: '.$mail->ErrorInfo;
    } else {
      echo $msg = "Sua mensagem foi enviada com sucesso.";
    }

    //$msg = "Sua mensagem foi enviada com sucesso.";

  }else{

    // Destinatário
    $para = "rh@clinicaacallanto.com.br";
    //$para = "contato@acallanto.com.br";
    //$para = "comunicacao@clinicaacallanto.com.br";
    //$para = "wesleysimplicio@live.com";

    // Assunto do e-mail
    $subject = "Seja Acallanto";

    // Campos do formulário de contato
    $name = $_POST["name"];
    $occupation = $_POST["occupation"];
    //$email = $_POST["email"];
    $phone = $_POST["phone"];
    $mobile = $_POST["mobile"];
    $file = $_POST['file'];
    $toremove = array('[', ']','"');
    $filetreated = "uploads/".str_replace($toremove, "", $file);
    $actual_link = "http://". $_SERVER['HTTP_HOST'] . "/" . $filetreated;

    // Monta o corpo da mensagem com os campos

    $body  = "<html>" . "\r\n";
    $body .= "  <head>" . "\r\n";
    $body .= "    <title>Fale Conosco - Acallanto</title>" . "\r\n";
    $body .= "    <meta charset='UTF-8'>" . "\r\n";
    $body .= "  </head>" . "\r\n";
    $body .= "  <body>" . "\r\n";
    $body .= "    <p>Olá, <strong>$name</strong> enviou um formulário do canal Seja Acallanto.</p>" . "\r\n";
    $body .= "    <p><strong>Área de atuação</strong>: $occupation</p>" . "\r\n";
    $body .= "    <p><strong>Telefone Fixo</strong>: $phone</p>" . "\r\n";
    $body .= "    <p><strong>Telefone Celular</strong>: $mobile</p>" . "\r\n";
    $body .= "    <p><strong>Link para o currículo</strong>: <a href='$actual_link' target='_blank'>$actual_link</a></p>" . "\r\n";
    $body .= "  </body>" . "\r\n";
    $body .= "</html>";

    // Cabeçalho do e-mail
    // $header = "Content-type: text/html; charset=utf-8" . "\r\n";
    // // Additional headers
    // $header .= "To: Contato para Acallanto < $para >" . "\r\n";
    // $header .= "From: $name < no-reply@clinicaacallanto.com.br >" . "\r\n";

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

    $mail->From = 'no-reply@clinicaacallanto.com.br';
    $mail->FromName = $name;
    $mail->addAddress($para);
      
    $mail->addReplyTo('no-reply@clinicaacallanto.com.br', $name);

    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = $subject.' - '.$name;
    $mail->Body    = utf8_decode($body);

    if(!$mail->send()) {
        echo $msg = "Não enviada, tente novamente ou entre em contato com o suporte.";
        //echo 'Mailer Error: '.$mail->ErrorInfo;
    } else {
       echo $msg = "<h3>Agradecemos o seu interesse por integrar o Time Acallanto e confirmamos o recebimento do seu currículo.</h3> <br>
<h5>Havendo abertura de vagas aderentes ao seu perfil e experiência, entraremos em contato. Sorte & prosperidade!</h5>";
    }

  }

?>