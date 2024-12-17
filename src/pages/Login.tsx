import { Col, Row } from "react-bootstrap";
import { ContainerLogin, WrapperLogin } from "./_Page.styles";
import  Button  from "../components/Button";


const Login = () => {

    return (
        <ContainerLogin>
            <WrapperLogin>
                <Row>
                    <Col md={12}>
                        <h1>agendAI</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <input type="text" />
                    </Col>
                    <Col md={12}>
                    <Button $isLogin type="button" onClick={() => {}} />
                    <Button $isRegistrar type="button" onClick={() => {}} />
                    </Col>
                </Row>
            </WrapperLogin>
        </ContainerLogin>
    );
};

export default Login;
