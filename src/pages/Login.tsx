import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { ContainerRegister, ParagraphThin } from "./_Page.styles";
import Button from "../components/Button";
import Input from "../components/Input";
import { loginUser } from "../services/AuthService";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom"; // Importando useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const context = useContext(AppContext);
  const navigate = useNavigate(); // Hook para navegação

  // Verifique se o contexto está carregado
  useEffect(() => {
    if (!context) {
      return; // Apenas retorna caso o contexto ainda não esteja disponível
    }

    // Quando o contexto estiver disponível, use-o normalmente
    const { authToken } = context;
    if (authToken) {
      console.log("Token no contexto:", authToken);
    }
  }, [context]); // Esse useEffect só será chamado quando o contexto mudar

  const { setUserContext, setEmployeeContext, setUserEmployeeContext, setAuthToken } = context || {};

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const response = await loginUser({ email, password });
      console.log("Login bem-sucedido", response);
  
      const user = response.user;
      const employee = response.employee;
      const token = response.token;
  
      console.log("Token recebido:", token);
  
      // Salvar o token no contexto
      if (setAuthToken) setAuthToken(token);
  
      // Salvar o token no localStorage para persistência
      localStorage.setItem('authToken', token);
  
      // Salvar o usuário e o funcionário no contexto
      if (setUserContext) setUserContext(user);
      if (setEmployeeContext) setEmployeeContext(employee);
      if (setUserEmployeeContext) setUserEmployeeContext({ ...user, ...employee });
  
      // Redireciona para a página de appointment
      navigate("/appointment"); // Redirecionamento após login bem-sucedido

    } catch (err) {
      console.error("Erro ao tentar fazer login:", err);
      setError("E-mail ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  };

  // Carregamento condicional até que o contexto esteja disponível
  if (!context) {
    return <div>Loading...</div>;
  }

  return (
    <ContainerRegister>
      <Row style={{ justifyContent: "center", paddingTop: "180px" }}>
        <Col md={6}>
          <h2>Welcome Back 👋</h2>
          <p>Today is a new day. It's your day. You shape it.</p>
          <p>Sign in to start managing your projects.</p>
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
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            <Row className="text-center pt-4">
              <Col>
                <Button $isLogin type="submit" disabled={loading} />
                <p className="mt-4 mb-4">
                  Don't have an account? <a href="/register">Sign up</a>
                </p>
                <ParagraphThin>Or login with</ParagraphThin>
                <Button $isGoogle type="button" />
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </ContainerRegister>
  );
};

export default Login;
