import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { Col, Row } from "react-bootstrap";
import { confirmResetPassword } from "../../services/AuthService";
import { ContainerRegister } from "../../pages/Register/Register.styles";
import { ContainerReSendEmail } from "../../pages/Styles/_Page.styles";
import Loading from "../../components/Loading/loading";

const ResetChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const validatePassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setError("As senhas não são iguais. Tente novamente.");
      return false;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "A senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, um número e um caractere especial."
      );
      return false;
    }

    return true;
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    setError("");
    setMessage("");

    if (!userId || !token) {
      setError("Parâmetros inválidos na URL.");
      return;
    }

    if (!validatePassword(newPassword, confirmPassword)) {
      return;
    }

    try {
      await confirmResetPassword(userId, token, newPassword);
      setMessage("Senha alterada com sucesso!");
      setError("");

      navigate("/login");
    } catch (error) {
      setError("Erro na alteração de senha.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <ContainerRegister>
        <ContainerReSendEmail>
          <h2>Hora de trocar sua senha! 🔑</h2>
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Sem estresse! <br />
            Vamos ajudar você a recuperar o acesso rapidinho.
          </p>
          <Row>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="my-3" style={{ width: "80%" }}>
                <Row className="px-5 px-sm-0 pt-2">
                  <Col xs={12} md={12} className="my-2 mx-3">
                    <Input
                      name="newPassword"
                      type="password"
                      placeholder="Nova senha"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Col>
                  <Col xs={12} md={12} className="my-2 mx-3">
                    <Input
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirme a senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Col>
                </Row>
              </div>
              {error && (
                <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
              )}
              {message && (
                <p style={{ color: "green", marginBottom: "1rem" }}>
                  {message}
                </p>
              )}
              <Button
                $isConfirm
                type="button"
                onClick={handleResetPassword}
                disabled={isLoading}
              />
            </Col>
          </Row>
        </ContainerReSendEmail>
      </ContainerRegister>
    </>
  );
};

export default ResetChangePassword;
