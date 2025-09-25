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
import { capitalizeFirstLetter } from "../../services/system/globalService";

const RegisterStore = () => {
  const { formData, setFormData, isLoading, setIsLoading } = useStateCustom();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const {
    handleRegisterStoreWithGoogle,
    handleRegisterStore,
    handleNavigationHome,
  } = useAction(setIsLoading, formData, ":");

  return (
    <>
      {isLoading && <Loading />}
      <ContainerRegister>
        <Row
          style={{
            justifyContent: "center",
            paddingTop: `${window.innerWidth < 1281 ? 50 : 100}px`,
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
                      placeholder="Nome"
                      name="name"
                      type="text"
                      value={capitalizeFirstLetter(formData.name)}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div
                    style={{
                      width: `${window.innerWidth < 768 ? "100%" : "35%"}`,
                    }}
                  >
                    <Input
                      placeholder="Sobrenome"
                      name="lastname"
                      type="text"
                      value={capitalizeFirstLetter(formData.lastname)}
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
                      value={formData.email.toLocaleLowerCase()}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div
                    style={{
                      width: `${window.innerWidth < 768 ? "100%" : "35%"}`,
                    }}
                  >
                    <Input
                      placeholder="Celular"
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
                      placeholder="Senha"
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
                      placeholder="Confirmar Senha"
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
                    placeholder="Nome da Loja"
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
                <div className="my-4">
                  <GoogleLogin
                    text="signup_with"
                    onSuccess={handleRegisterStoreWithGoogle}
                  />
                </div>
                <p className="mt-5 mb-4">
                  Você já possui uma conta? <a href="/login">Login</a>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </ContainerRegister>
    </>
  );
};

export default RegisterStore;
