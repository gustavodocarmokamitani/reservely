import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { ContainerRegister, ParagraphThin } from "./_Page.styles";
import Button from "../components/Button";
import Input from "../components/Input";
import { decodeToken, loginUser } from "../services/AuthService";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { getUserByEmail } from "../services/UserServices";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const {
    setUserContext,
    setEmployeeContext,
    setUserEmployeeContext,
    setAuthToken,
    setUserRoleContext,
  } = context || {};

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const responseEmailConfirmed = await getUserByEmail(email);
      console.log(responseEmailConfirmed);
      
      if (responseEmailConfirmed.emailConfirmed == true) {
        const responseLogin = await loginUser({ email, password });

        const user = responseLogin.user;
        const employee = responseLogin.employee;
        const token = responseLogin.token;

        if (setAuthToken) setAuthToken(token);

        localStorage.setItem("authToken", token);

        if (setUserContext) setUserContext(user);
        if (setEmployeeContext) setEmployeeContext(employee);
        if (setUserEmployeeContext)
          setUserEmployeeContext({ ...user, ...employee });

        const decodedData = await decodeToken(token);
        const { userId, userEmail, userRole } = decodedData;

        if (setUserRoleContext) {
          setUserRoleContext({ userId, userEmail, userRole });
        } else {
          console.error("setUserRoleContext não está definido");
        }

        navigate("/appointment");
      } else {
        enqueueSnackbar("E-mail não verificado.", { variant: "default" });
      }
      enqueueSnackbar(`Seja bem vindo ${responseEmailConfirmed.name} ${responseEmailConfirmed.lastName}! `, { variant: "success" });
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
            <p className="pt-2">Hoje é um novo começo. A oportunidade de fazer a diferença está em suas mãos.</p>
            <p>Faça o login para começar a gerenciar seus projetos.</p>
          </div>
          <form onSubmit={handleLogin}>
            <Row className="align-items-center">
              <Col md={6}>
                <Input
                  placeholder="Email"
                  name="email"
                  type="email"
                  width="400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col md={6}>
                <Input
                  placeholder="Password"
                  name="password"
                  type="password"
                  width="400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="text-center pt-4">
              <Col>
                <Button $isLogin type="submit" disabled={loading} />
                <p className="mt-4 mb-4">
                  Don't have an account? <a href="/register">Sign up</a>
                </p>
                <ParagraphThin>Or login with</ParagraphThin>
                <Button $isGoogle type="button" />
                <ParagraphThin className="mt-4 mb-4">
                  Having difficulty logging in?{" "}
                  <a href="/help-login">Get help</a>
                </ParagraphThin>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </ContainerRegister>
  );
};

export default Login;
