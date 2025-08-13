import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { resendConfirmationEmail } from "../../services/AuthService";
import {
  ContainerRegister,
  ContainerReSendEmail,
} from "../Styles/_Page.styles";
import { useParams } from "react-router-dom";

const RegisterReSendEmail = () => {
  const { storeCodeParams } = useParams();
  const storeCode = storeCodeParams ? storeCodeParams : ":";
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
      await resendConfirmationEmail(storeCode, email);
      setMessage("E-mail de confirmação reenviado com sucesso!");
      setError("");
    } catch (error: any) {
      setMessage("");

      if (error.response && error.response.data) {
        // Se o back-end retornou uma string
        setError(
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data.message || "Ocorreu um erro."
        );
      } else {
        setError("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerRegister>
      <ContainerReSendEmail>
        <h2>Não recebeu o e-mail de confirmação? 📧</h2>
        <p>Não se preocupe! Podemos reenviar o link para você.</p>
        <div
          className="my-3"
          style={{
            width: `${window.innerWidth < 768 ? "100%" : "20%"}`,
          }}
        >
          <Input
            placeholder="Email"
            name="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
        {message && (
          <p style={{ color: "green", marginBottom: "1rem" }}>{message}</p>
        )}

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
