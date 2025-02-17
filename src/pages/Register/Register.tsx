import { Col, Row } from "react-bootstrap";
import { ContainerRegister } from "../Styles/_Page.styles";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import * as S from "./Register.styles";
import { useStateCustom } from "../../hooks/Register/useStateCustom";
import { useAction } from "../../hooks/Register/useAction";
import Loading from "../../components/Loading/loading";
import { TypingText } from "../Styles/animationTyping.styles";

const Register = () => {
  const { formData, setFormData, isLoading, setIsLoading } = useStateCustom();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { handleRegister } = useAction(setIsLoading, formData);

  return (
    <>
      {isLoading && <Loading />}
      <ContainerRegister>
        <Row style={{ justifyContent: "center", paddingTop: "180px" }}>
          <Col
            md={6}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <TypingText style={{ maxWidth: "480px" }} numLetters={21}>
              Junte-se a nós hoje 🚀
            </TypingText>

            <p style={{ textAlign: "center" }}>
              Cadastre-se para gerenciar seus projetos.
            </p>
            <S.ContainerRegister>
              <S.WrapperRegisterInput>
                <Input
                  placeholder="Firstname"
                  name="name"
                  type="text"
                  width="350"
                  value={formData.name}
                  onChange={handleInputChange}
                />

                <Input
                  placeholder="Lastname"
                  name="lastname"
                  type="text"
                  width="350"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />

                <Input
                  placeholder="Email"
                  name="email"
                  type="text"
                  width="350"
                  value={formData.email}
                  onChange={handleInputChange}
                />

                <Input
                  placeholder="Phone"
                  phone
                  name="phone"
                  type="text"
                  width="350"
                  value={formData.phone}
                  onChange={handleInputChange}
                />

                <Input
                  placeholder="Password"
                  name="password"
                  type={"password"}
                  width="350"
                  value={formData.password}
                  onChange={handleInputChange}
                />

                <Input
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type={"password"}
                  width="350"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </S.WrapperRegisterInput>
            </S.ContainerRegister>
            <S.ContainerRegister>
              <S.WrapperRegisterInput>
                <Input
                  placeholder="Store Name"
                  name="storeName"
                  type="text"
                  width="350"
                  value={formData.storeName}
                  onChange={handleInputChange}
                />
              </S.WrapperRegisterInput>
            </S.ContainerRegister>

            <Row className="text-center" style={{ padding: "15px 0 50px 0" }}>
              <Col>
                <Button
                  $isRegister
                  type="button"
                  onClick={handleRegister}
                  disabled={isLoading}
                />
                {/* <p className="mt-4 mb-4">
                Already have an account? <a href="/login">Login</a>
              </p>
              <ParagraphThin>Or sign up with</ParagraphThin>
              <Button $isGoogle type="button" /> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </ContainerRegister>
    </>
  );
};

export default Register;
