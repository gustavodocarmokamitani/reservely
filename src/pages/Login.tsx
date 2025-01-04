import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { ContainerRegister, ParagraphThin } from "./_Page.styles";
import Button from "../components/Button";
import Input from "../components/Input";
import { loginUser } from "../services/AuthService";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom"; 
import { useSnackbar } from "notistack";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const context = useContext(AppContext);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!context) {
      return; 
    }

    const { authToken } = context;
    if (authToken) {
      console.log("Token no contexto:", authToken);
    }
  }, [context]); 

  const { setUserContext, setEmployeeContext, setUserEmployeeContext, setAuthToken } = context || {};

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await loginUser({ email, password });
      console.log("Login bem-sucedido", response);
  
      const user = response.user;
      const employee = response.employee;
      const token = response.token;
  
      console.log("Token recebido:", token);
  
      if (setAuthToken) setAuthToken(token);
  
      localStorage.setItem('authToken', token);
  
      if (setUserContext) setUserContext(user);
      if (setEmployeeContext) setEmployeeContext(employee);
      if (setUserEmployeeContext) setUserEmployeeContext({ ...user, ...employee });
      
      navigate("/appointment"); 
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
