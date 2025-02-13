import { Col, Row } from "react-bootstrap";
import { ContainerRegister } from "../Styles/_Page.styles";
import Button from "../../components/Button/Button";

const RegisterConfirmEmail = () => {
  const redirectToLoginPage = () => {
    window.location.href = "/login";
  };

  return (
    <ContainerRegister>
      <Row style={{ justifyContent: "center", paddingTop: "280px" }}>
        <Col md={6} className="text-center">
          <h2>Bem-vindo(a) à nossa plataforma! 🚀</h2>
          <p>Quase lá! Para começar, confirme seu e-mail e ative sua conta.</p>

          <Row className="text-center pt-2">
            <Col>
              <Button $isConfirm type="button" onClick={redirectToLoginPage} />
              <p className="mt-4 mb-2">
                Não recebeu o e-mail?{" "}
                <a href="/resend-email">
                  Clique aqui para reenviar o link de confirmação
                </a>
              </p>
              <p className="mt-2 mb-4">
                Após confirmar, você poderá fazer o login em sua conta.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </ContainerRegister>
  );
};

export default RegisterConfirmEmail;
