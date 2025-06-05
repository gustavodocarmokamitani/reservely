import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { requestResetPassword } from "../../services/AuthService";
import {
  ContainerRegister,
  ContainerReSendEmail,
} from "../Styles/_Page.styles";
import { Col, Row } from "react-bootstrap";
import Loading from "../../components/Loading/loading";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Por favor, insira um e-mail.");
      return;
    }
    setLoading(true);
    try {
      await requestResetPassword(email);
      setMessage("E-mail de redefinição de senha enviado com sucesso!");
      setError("");
    } catch (error) {
      setMessage("");
      setError("Erro na redefinição de senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {Loading && <Loading />}
      <ContainerRegister>
        <ContainerReSendEmail>
          <h2>Esqueceu sua senha? 🎈</h2>
          <p>Fique tranquilo! Podemos recuperá-la para você.</p>
          <Row>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="my-3" style={{ width: "100%" }}>
                <Input
                  placeholder="Email"
                  name="email"
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              {error && (
                <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
              )}
              {message && <p style={{ color: "green", marginBottom: "1rem" }}>{message}</p>}

              <Button
                $isConfirm
                type="button"
                onClick={handleResetPassword}
                disabled={loading}
              />
              <p className="mt-4 mb-4 text-center">
                Verifique sua caixa de spam ou lixo eletrônico. <br /> O e-mail
                pode ter sido enviado para lá por engano.
              </p>
            </Col>
          </Row>
        </ContainerReSendEmail>
      </ContainerRegister>
    </>
  );
};

export default ResetPassword;
