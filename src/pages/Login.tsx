import { Col, Row } from "react-bootstrap";
import { ContainerLogin, WrapperVerticalLogin } from "./_Page.styles";
import Button from "../components/Button";
import Input from "../components/Input";
import loginArt from "../assets/loginArt.png"

const Login = () => {
    return (
        <ContainerLogin>
            <WrapperVerticalLogin>
                <Row>
                    <Col md={6}>

                        <Row className="text-center">
                            <Col md={12} style={{ marginBottom: "50px" }}>
                                <h1>agendaI</h1>
                            </Col>
                        </Row>

                        <Row className="d-flex justify-content-center">
                            <Col md={12} className="text-center">
                                <div style={{ marginBottom: "50px" }}>
                                    <Input placeholder="Email" width="350" name="email" type="text" />
                                    <Input placeholder="Password" width="350" name="password" type="text" />

                                    <Row className="d-flex justify-content-end">
                                        <Col md={12} className="text-end">
                                            <a href="#" className="text-muted" style={{ fontSize: ".8rem", marginRight: '3.4rem' }}>Register</a>
                                        </Col>
                                    </Row>

                                    <Row className="d-flex justify-content-end">
                                        <Col md={12} className="text-end">
                                            <a href="#" className="text-muted" style={{ fontSize: ".8rem", marginRight: '3.4rem' }}>Forgot password</a>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>

                        <Row className="d-flex justify-content-center">
                            <Button $isLogin type="button" onClick={() => { }} />
                        </Row>
                    </Col>
                    <Col md={6}>
                        <img src={loginArt} alt="" />
                    </Col>
                </Row>
            </WrapperVerticalLogin>
        </ContainerLogin>
    );
};

export default Login;
