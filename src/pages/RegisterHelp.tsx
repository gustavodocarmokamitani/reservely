import { Col, Row } from "react-bootstrap";
import { ContainerRegister } from "./_Page.styles";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { resendConfirmationEmail } from "../services/AuthService";

const RegisterHelp = () => {
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
      <Row style={{ justifyContent: "center", paddingTop: "280px" }}>
        <Col md={6} className="text-center">
          <h2>Não conseguiu realizar o login? 🤔</h2>
          <p>
            Acredito que falte realizar a confirmação do seu e-mail. Não se
            preocupe, podemos reenviar o link de confirmação para você!
          </p>

          <Row className="text-center pt-2">
            <Col>
              <Row className="align-items-center pb-2">
                <Col md={12}>
                  <Input
                    placeholder="Email"
                    name="email"
                    type="text"
                    width="400"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </Col>
              </Row>
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
            </Col>
          </Row>
        </Col>
      </Row>
    </ContainerRegister>
  );
};

export default RegisterHelp;
