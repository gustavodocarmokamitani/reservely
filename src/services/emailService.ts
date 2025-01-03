// emailService.ts
import nodemailer, { SentMessageInfo } from 'nodemailer';

// Definir os tipos para os parâmetros da função
interface SendConfirmationEmailParams {
  userEmail: string;
  token: string;
}

// Função para configurar o transporte SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // Pode ser Gmail ou outro serviço SMTP
  auth: {
    user: process.env.EMAIL_USER!, // Seu e-mail - use variável de ambiente para segurança
    pass: process.env.EMAIL_PASS!  // Sua senha ou senha de aplicativo - use variável de ambiente
  }
});

// Função para enviar o email de confirmação
function sendConfirmationEmail({ userEmail, token }: SendConfirmationEmailParams): void {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Seu e-mail
    to: userEmail, // O e-mail do usuário
    subject: 'Confirmação de E-mail',
    text: `Olá, para confirmar seu e-mail, clique no link abaixo:\n\n
           http://seuapp.com/confirmar-email?token=${token}`
  };

  transporter.sendMail(mailOptions, (error: Error | null, info: SentMessageInfo) => {
    if (error) {
      console.log('Erro ao enviar e-mail:', error);
    } else {
      console.log('E-mail enviado:', info.response);
    }
  });
}

export {
  sendConfirmationEmail
};
