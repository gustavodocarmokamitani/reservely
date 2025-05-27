import { Col, Row } from "react-bootstrap";
import { ContainerRegister, ParagraphThin } from "../Styles/_Page.styles";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import * as S from "./Register.styles";
import { useStateCustom } from "../../hooks/Register/useStateCustom";
import { useAction } from "../../hooks/Register/useAction";
import Loading from "../../components/Loading/loading";
import { TypingText } from "../Styles/animationTyping.styles";
import { GoogleLogin } from "@react-oauth/google";

const RegisterStore = () => {
  const { formData, setFormData, isLoading, setIsLoading } = useStateCustom();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const {
    handleRegisterWithGoogle,
    handleRegisterStore,
    handleNavigationHome,
  } = useAction(setIsLoading, formData);

  return (
    <>
      {isLoading && <Loading />}
      <ContainerRegister>
        <Row
          style={{
            justifyContent: "center",
            paddingTop: `${window.innerWidth < 1281 ? 50 : 180}px`,
          }}
        >
          <Col
            md={8}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <TypingText style={{ maxWidth: "480px" }} numLetters={21}>
              Junte-se a nós 🚀
            </TypingText>

            <p style={{ textAlign: "center" }}>
              Cadastre-se para gerenciar seus projetos.
            </p>
            <S.ContainerRegister>
              <S.WrapperRegisterInput>
                <S.ContentRegister>
                  <div
                    style={{
                      width: `${window.innerWidth < 768 ? "100%" : "35%"}`,
                    }}
                  >
                    <Input
                      placeholder="Firstname"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div
                    style={{
                      width: `${window.innerWidth < 768 ? "100%" : "35%"}`,
                    }}
                  >
                    <Input
                      placeholder="Lastname"
                      name="lastname"
                      type="text"
                      value={formData.lastname}
                      onChange={handleInputChange}
                    />
                  </div>
                </S.ContentRegister>
                <S.ContentRegister>
                  <div
                    style={{
                      width: `${window.innerWidth < 768 ? "100%" : "35%"}`,
                    }}
                  >
                    <Input
                      placeholder="Email"
                      name="email"
                      type="text"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div
                    style={{
                      width: `${window.innerWidth < 768 ? "100%" : "35%"}`,
                    }}
                  >
                    <Input
                      placeholder="Phone"
                      phone
                      name="phone"
                      type="text"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </S.ContentRegister>
                <S.ContentRegister>
                  <div
                    style={{
                      width: `${window.innerWidth < 768 ? "100%" : "35%"}`,
                    }}
                  >
                    <Input
                      placeholder="Password"
                      name="password"
                      type={"password"}
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div
                    style={{
                      width: `${window.innerWidth < 768 ? "100%" : "35%"}`,
                    }}
                  >
                    <Input
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      type={"password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </S.ContentRegister>
              </S.WrapperRegisterInput>
            </S.ContainerRegister>
            <S.ContainerRegister>
              <S.WrapperRegisterInput className="mt-2">
                <div
                  style={{
                    width: `${window.innerWidth < 768 ? "100%" : "35%"}`,
                  }}
                >
                  <Input
                    placeholder="Store Name"
                    name="storeName"
                    type="text"
                    value={formData.storeName}
                    onChange={handleInputChange}
                  />
                </div>
              </S.WrapperRegisterInput>
            </S.ContainerRegister>

            <Row className="text-center" style={{ padding: "15px 0 50px 0" }}>
              <Col style={{ margin: "25px 0" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <Button
                    $isRegisterStore
                    type="button"
                    onClick={handleRegisterStore}
                    disabled={isLoading}
                  />
                </div>
                <Button
                  $isBack
                  $noIcon
                  type="button"
                  onClick={handleNavigationHome}
                  disabled={isLoading}
                />
                <p className="mt-5 mb-4">
                  Already have an account? <a href="/login">Login</a>
                </p>
                {/* <ParagraphThin>Or sign up with</ParagraphThin>
                <GoogleLogin
                  onSuccess={handleRegisterWithGoogle}
                  
                /> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </ContainerRegister>
    </>
  );
};

export default RegisterStore;
