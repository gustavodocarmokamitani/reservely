import { Col, Row } from "react-bootstrap";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/loading";
import Input from "../../components/Input/Input";
import { useStateCustom } from "../../hooks/Login/useStateCustom";
import { useAction } from "../../hooks/Login/useAction";
import { ContainerRegister, ParagraphThin } from "../Styles/_Page.styles";
import * as S from "./Login.styles";
import { TypingText } from "../Styles/animationTyping.styles";
import { useParams } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const { storeCodeParams } = useParams();
  const storeCode = storeCodeParams ? storeCodeParams : "";

  const { email, setEmail, password, setPassword, isLoading, setIsLoading } =
    useStateCustom();

  const { handleLoginWithGoogle, handleLogin } = useAction(
    setIsLoading,
    email,
    password,
    storeCode
  );

  return (
    <>
      {isLoading && <Loading />}
      <ContainerRegister>
        <Row
          style={{
            justifyContent: "center",
            paddingTop: `${window.innerWidth < 600 ? 100 : 130}px`,
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
              <Row className="text-center pt-2">
                <Col>
                  <p className="mb-3">
                    <a href="/reset-password">Esqueci minha senha</a>
                  </p>
                  <Button $isLogin type="submit" disabled={isLoading} />
                  <div className="my-3">
                    <GoogleLogin
                      onSuccess={handleLoginWithGoogle}
                      text="continue_with"
                    />
                  </div>
                  <p className="mt-3">
                    Não tem uma conta? <a href="/">Inscreva-se</a>
                  </p>
                  <p className="mt-2">
                    Não recebeu e-mail de confirmação ou token expirou?{" "}
                    <a href="/resend-email">Clique aqui para reenviar.</a>
                  </p>
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
