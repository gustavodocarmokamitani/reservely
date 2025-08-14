import { Col, Row } from "react-bootstrap";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/loading";
import Input from "../../components/Input/Input";
import { useStateCustom } from "../../hooks/Login/useStateCustom";
import { useAction } from "../../hooks/Login/useAction";
import { ContainerRegister } from "../Styles/_Page.styles";
import * as S from "./Login.styles";
import { TypingText } from "../Styles/animationTyping.styles";
import { useParams } from "react-router-dom";

const Login = () => {
  const { storeCodeParams } = useParams();
  const storeCode = storeCodeParams ? storeCodeParams : "";

  const { email, setEmail, password, setPassword, isLoading, setIsLoading } =
    useStateCustom();

  const { handleLogin } = useAction(setIsLoading, email, password, storeCode);

  return (
    <>
      {isLoading && <Loading />}
      <ContainerRegister>
        <Row
          style={{
            justifyContent: "center",
            paddingTop: `${window.innerWidth < 600 ? 100 : 180}px`,
          }}
        >
          <Col
            md={6}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div className="text-center">
              <TypingText numLetters={26}>Bem vindo 👋</TypingText>
            </div>
            <div className="text-center">
              <p className="pt-2">
                Hoje é um novo começo. <br /> A oportunidade de fazer a
                diferença está em suas mãos.
              </p>
              <p>Faça o login para começar a gerenciar seus projetos.</p>
            </div>
          </Col>
        </Row>
        <S.ContainerLogin>
          <S.WrapperLoginInput>
            <S.FormContainer onSubmit={handleLogin}>
              <Input
                placeholder="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div style={{ width: "100%" }}>
                <Input
                  placeholder="Senha"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Row className="text-center pt-4">
                <Col>
                  <p className="mb-4">
                    <a href="/reset-password">Esqueci minha senha</a>
                  </p>
                  <Button $isLogin type="submit" disabled={isLoading} />
                  <p className="mt-5">
                    Não tem uma conta? <a href="/">Inscreva-se</a>
                  </p>
                      <p className="mt-2">
                    Não recebeu e-mail de confirmação ou token expirou? <a href="/resend-email">Clique aqui para reenviar o e-mail.</a>
                  </p>

                  {/* <ParagraphThin>Or login with</ParagraphThin>
                <Button $isGoogle type="button" />
                <ParagraphThin className="mt-4 mb-4">
                  Having difficulty logging in?{" "}
                  <a href="/help-login">Get help</a>
                </ParagraphThin> */}
                </Col>
              </Row>
            </S.FormContainer>
          </S.WrapperLoginInput>
        </S.ContainerLogin>
      </ContainerRegister>
    </>
  );
};

export default Login;
