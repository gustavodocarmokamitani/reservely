import React, { useState, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { ContainerRegister } from "./_Page.styles";
import Button from "../components/Button";
import Input from "../components/Input";
import { decodeToken, loginUser } from "../services/AuthService";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { getUserByEmail } from "../services/UserServices";
import * as S from "./Login.styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const { setAuthToken } = context || {};

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loggedUser = await getUserByEmail(email);

      if (loggedUser.emailConfirmed === true) {
        const responseLogin = await loginUser({ email, password });
        const token = responseLogin.token;

        if (setAuthToken) setAuthToken(token);

        await decodeToken(token);

        localStorage.setItem("storeUser", loggedUser.storeId);

        localStorage.setItem("authToken", token);

        enqueueSnackbar(
          `Seja bem vindo ${loggedUser.name} ${loggedUser.lastName}! `,
          { variant: "success" }
        );
        navigate("/appointment");
      } else {
        enqueueSnackbar("E-mail não verificado.", { variant: "default" });
      }
    } catch (err) {
      console.error("Erro ao tentar fazer login:", err);

      enqueueSnackbar("E-mail ou senha incorretos.", { variant: "default" });
    } finally {
      setLoading(false);
    }
  };

  if (!context) {
    return <div>Loading...</div>;
  }

  return (
    <ContainerRegister>
      <Row style={{ justifyContent: "center", paddingTop: "180px" }}>
        <Col md={6}>
          <div className="text-center">
            <h2>Bem vindo de volta 👋</h2>
            <p className="pt-2">
              Hoje é um novo começo. A oportunidade de fazer a diferença está em
              suas mãos.
            </p>
            <p>Faça o login para começar a gerenciar seus projetos.</p>
          </div>
        </Col>
      </Row>
      <S.ContainerLogin>
        <S.WrapperLoginInput>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Email"
              name="email"
              type="email"
              width="350"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Password"
              name="password"
              type="password"
              width="350"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Row className="text-center pt-4">
              <Col>
                <Button $isLogin type="submit" disabled={loading} />
                <p className="mt-4 mb-4">
                  Don't have an account? <a href="/register">Sign up</a>
                </p>
                {/* <ParagraphThin>Or login with</ParagraphThin>
                <Button $isGoogle type="button" />
                <ParagraphThin className="mt-4 mb-4">
                  Having difficulty logging in?{" "}
                  <a href="/help-login">Get help</a>
                </ParagraphThin> */}
              </Col>
            </Row>
          </form>
        </S.WrapperLoginInput>
      </S.ContainerLogin>
    </ContainerRegister>
  );
};

export default Login;
