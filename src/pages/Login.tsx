import React from "react";
import { Col, Row } from "react-bootstrap";
import { ContainerRegister, ParagraphThin } from "./_Page.styles";
import Button from "../components/Button";
import Input from "../components/Input";
import cadastroPng from "../assets/cadastro.png";

const Login = () => {
  return (
    <ContainerRegister>
      <Row style={{ justifyContent: "center", paddingTop: "180px" }}>
        <Col md={6}>
          <h2>Welcome Back 👋</h2>
          <p>Today is a new day. It's your day. You shape it.</p>
          <p>Sign in to start managing your projects.</p>
          <Row className="align-items-center">
            <Col md={6}>
              <Input placeholder="Email" name="name" type="text" width="400" />
            </Col>
            <Col md={6}>
              <Input
                placeholder="Password"
                name="password"
                type="text"
                width="400"
              />
            </Col>
          </Row>
          <Row className="text-center pt-4">
            <Col>
              <Button $isLogin type="button" />
              <p className="mt-4 mb-4">
                Don't have an account? <a href="/register">Sign up</a>
              </p>
              <ParagraphThin>Or login with</ParagraphThin>
              <Button $isGoogle type="button" />
            </Col>
          </Row>
        </Col>
      </Row>
    </ContainerRegister>
  );
};

export default Login;
