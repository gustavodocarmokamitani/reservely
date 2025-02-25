import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import {
  ContainerLogin,
  ContentButton,
  WrapperLogin,
} from "../Styles/_Page.styles";
import { TypingText } from "../Styles/animationTyping.styles";

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = (login: boolean, register: boolean) => {
    if (login) {
      navigate("/login");
    } else if (register) {
      navigate("/register");
    }
  };

  return (
    <ContainerLogin>
      <WrapperLogin>
        <div>
          {" "}
          <TypingText numLetters={10}>reserve.ly</TypingText>
        </div>
        <ContentButton>
          <Button
            $isLogin
            type="button"
            onClick={() => handleButtonClick(true, false)}
          />
          <Button
            $isRegister
            type="button"
            onClick={() => handleButtonClick(false, true)}
          />
        </ContentButton>
      </WrapperLogin>
    </ContainerLogin>
  );
};

export default Home;
