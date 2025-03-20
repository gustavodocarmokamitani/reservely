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

const RegisterClient = () => {
  const { formData, setFormData, isLoading, setIsLoading } = useStateCustom();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const {
    handleRegisterWithGoogle,
    handleRegisterClient,
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
              Cadastre-se para realizar agendamentos.
            </p>
            <S.ContainerRegister>
              <S.WrapperRegisterInput>
                <S.ContentRegister>
                  <Input
                    placeholder="Firstname"
                    name="name"
                    type="text"
                    width="400"
                    value={formData.name}
                    onChange={handleInputChange}
                  />

                  <Input
                    placeholder="Lastname"
                    name="lastname"
                    type="text"
                    width="400"
                    value={formData.lastname}
                    onChange={handleInputChange}
                  />
                </S.ContentRegister>
                <S.ContentRegister>
                  <Input
                    placeholder="Email"
                    name="email"
                    type="text"
                    width="400"
                    value={formData.email}
                    onChange={handleInputChange}
                  />

                  <Input
                    placeholder="Phone"
                    phone
                    name="phone"
                    type="text"
                    width="400"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </S.ContentRegister>
                <Input
                  placeholder="Password"
                  name="password"
                  type={"password"}
                  width="400"
                  value={formData.password}
                  onChange={handleInputChange}
                />

                <Input
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type={"password"}
                  width="400"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </S.WrapperRegisterInput>
            </S.ContainerRegister>

            <Row className="text-center" style={{ padding: "15px 0 50px 0" }}>
              <Col style={{ margin: "25px 0" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <Button
                    $isBack
                    $noIcon
                    type="button"
                    onClick={handleNavigationHome}
                    disabled={isLoading}
                  />
                </div>
                <Button
                  $isRegisterClient
                  type="button"
                  onClick={handleRegisterClient}
                  disabled={isLoading}
                />
                <p className="mt-5 mb-4">
                  Already have an account? <a href="/login">Login</a>
                </p>
                {/* <ParagraphThin>Or sign up with</ParagraphThin>
                <GoogleLogin
                  onSuccess={handleRegisterWithGoogle}
                  onError={() =>
                    console.log("Erro ao fazer login com o Google")
                  }
                /> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </ContainerRegister>
    </>
  );
};

export default RegisterClient;
