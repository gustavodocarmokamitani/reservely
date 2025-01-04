import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ContainerRegister, ParagraphThin } from "./_Page.styles";
import Button from "../components/Button";
import Input from "../components/Input";
import cadastroPng from "../assets/cadastro.png";
import { RegisterData } from "../models/RegisterData";
import { registerUser } from "../services/AuthService";
import { useSnackbar } from 'notistack';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      enqueueSnackbar("As senhas não coincidem.", { variant: "warning" });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      enqueueSnackbar("Por favor, insira um endereço de e-mail válido.", { variant: "warning" });
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      enqueueSnackbar("A senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, um número e um caractere especial.", { variant: "warning" });
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await registerUser({
        name: formData.name,
        lastName: formData.lastname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        userName: formData.email,
        userTypeId: 1,
      });

      if (response) {
        window.location.href = "/confirm-email";
      }
    } catch (error) {
      enqueueSnackbar("Ocorreu um erro. Por favor, tente novamente.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerRegister>
      <Row style={{ justifyContent: "center", paddingTop: "180px" }}>
        <Col md={6}>
          <h2>Join Us Today 🚀</h2>
          <p>Sign up to begin managing your projects.</p>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <Row className="align-items-center">
            <Col md={6}>
              <Input
                placeholder="Firstname"
                name="name"
                type="text"
                width="400"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={6}>
              <Input
                placeholder="Lastname"
                name="lastname"
                type="text"
                width="400"
                value={formData.lastname}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6}>
              <Input
                placeholder="Email"
                name="email"
                type="text"
                width="400"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={6}>
              <Input
                placeholder="Phone"
                name="phone"
                type="text"
                width="400"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6}>
              <Input
                placeholder="Password"
                name="password"
                type="password"
                width="400"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={6}>
              <Input
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                width="400"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </Col>
          </Row>

          <Row className="text-center pt-4">
            <Col>
              <Button
                $isRegister
                type="button"
                onClick={handleRegister}
                disabled={loading}
              />
              <p className="mt-4 mb-4">
                Already have an account? <a href="/login">Login</a>
              </p>
              <ParagraphThin>Or sign up with</ParagraphThin>
              <Button $isGoogle type="button" />
            </Col>
          </Row>
        </Col>
      </Row>
    </ContainerRegister>
  );
};

export default Register;
