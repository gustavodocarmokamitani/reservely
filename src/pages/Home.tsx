import { Col, Row } from "react-bootstrap";
import { ContainerLogin, WrapperLogin } from "./_Page.styles";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleButtonClick = (login: boolean, register: boolean) => {
        if (login) {
            navigate('/login');
        } else if (register) {
            navigate('/register');
        }
    };

    return (
        <ContainerLogin>
            <WrapperLogin>
                <Row>
                    <Col md={12}>
                        <h1>agendai</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div style={{ marginBottom: "10px" }}>
                            <Button $isLogin type="button" onClick={() => handleButtonClick(true, false)} />
                        </div>
                        <Button $isRegister type="button" onClick={() => handleButtonClick(false, true)} />
                    </Col>
                </Row>
            </WrapperLogin>
        </ContainerLogin>
    );
};

export default Home;
