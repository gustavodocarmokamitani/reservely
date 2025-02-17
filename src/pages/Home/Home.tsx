import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { ContainerLogin, ContentButton, WrapperLogin } from "../Styles/_Page.styles";

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
          <h1>agendai</h1>
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
