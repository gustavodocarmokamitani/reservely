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

  const handleButtonClick = (login: boolean, registerStore: boolean, registerClient: boolean) => {
    if (login) {
      navigate("/login");
    } else if (registerStore) {
      navigate("/register-store");
    } else if (registerClient) {
      navigate("/register-client");
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
            onClick={() => handleButtonClick(true, false, false)}
          />
        </ContentButton>
        <ContentButton>
          <Button
            $isRegisterStore
            type="button"
            onClick={() => handleButtonClick(false, true, false)}
          />

          <Button
            $isRegisterClient
            type="button"
            onClick={() => handleButtonClick(false, false, true)}
          />
        </ContentButton>
      </WrapperLogin>
    </ContainerLogin>
  );
};

export default Home;
