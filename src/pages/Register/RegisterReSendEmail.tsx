import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { resendConfirmationEmail } from "../../services/AuthService";
import { ContainerRegister, ContainerReSendEmail } from "../Styles/_Page.styles";

const RegisterReSendEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleResendEmail = async () => {
    if (!email) {
      setError("Por favor, insira um e-mail.");
      return;
    }
    setLoading(true);
    try {
      await resendConfirmationEmail(email);
      setMessage("E-mail de confirmação reenviado com sucesso!");
      setError("");
    } catch (error) {
      setMessage("");
      setError("Erro ao reenviar o e-mail.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerRegister>
      <ContainerReSendEmail>
        <h2>Não recebeu o e-mail de confirmação? 📧</h2>
        <p>Não se preocupe! Podemos reenviar o link para você.</p>
        <div className="my-3">
          <Input
            placeholder="Email"
            name="email"
            type="text"            
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}

        <Button
          $isResend
          type="button"
          onClick={handleResendEmail}
          disabled={loading}
        />
        <p className="mt-4 mb-4">
          Já confirmou seu e-mail? Agora, você pode{" "}
          <a href="/login">ir para o login</a> e acessar sua conta.
        </p>
      </ContainerReSendEmail>
    </ContainerRegister>
  );
};

export default RegisterReSendEmail;