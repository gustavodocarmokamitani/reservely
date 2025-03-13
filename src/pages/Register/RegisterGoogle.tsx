import { Col, Row } from "react-bootstrap";
import { ContainerRegister } from "../Styles/_Page.styles";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import * as S from "./Register.styles";
import { useStateCustom } from "../../hooks/Register/useStateCustom";
import { useAction } from "../../hooks/Register/useAction";
import Loading from "../../components/Loading/loading";
import { TypingText } from "../Styles/animationTyping.styles";

const RegisterGoogle = () => {
  const { formData, setFormData, isLoading, setIsLoading } = useStateCustom();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { handleRegisterStore } = useAction(setIsLoading, formData);

  return (
    <>
      {isLoading && <Loading />}
      <ContainerRegister>
        <Row style={{ justifyContent: "center", paddingTop: "280px" }}>
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
              Finalize o cadastro preenchendo o nome da loja.
            </p>           
            <S.ContainerRegister>
              <S.WrapperRegisterInput className="mt-2">
                <Input
                  placeholder="Store Name"
                  name="storeName"
                  type="text"
                  width="450"
                  value={formData.storeName}
                  onChange={handleInputChange}
                />
              </S.WrapperRegisterInput>
            </S.ContainerRegister>

            <Row className="text-center" style={{ padding: "15px 0 50px 0" }}>
              <Col>
                <Button
                  $isRegisterStore
                  type="button"
                  onClick={handleRegisterStore}
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

export default RegisterGoogle;
