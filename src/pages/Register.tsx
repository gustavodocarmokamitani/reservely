import { Col, Row } from "react-bootstrap";
import { ContainerLogin, WrapperVerticalLogin } from "./_Page.styles";
import Button from "../components/Button";
import Input from "../components/Input";

const Register = () => {
    return (
        <ContainerLogin>
            <WrapperVerticalLogin>
                <Row className="text-center">
                    <Col md={12}  style={{ marginBottom: "50px"}}>
                        <h1>agendaI</h1>
                        <p>Create an account to continue!</p>
                    </Col>
                </Row>

                <Row className="d-flex justify-content-center">
                    <Col md={12} className="text-center">
                        <div style={{ marginBottom: "50px"}}>
                            <Input placeholder="Firstname" width="350" name="name" type="text" />
                            <Input placeholder="Lastname" width="350" name="lastname" type="text" />
                            <Input placeholder="Email" width="350" name="email" type="text" />
                            <Input placeholder="Phone" width="350" name="phone" type="text" />
                            <Input placeholder="Password" width="350" name="password" type="text" />
                            <Input placeholder="Confirm Password" width="350" name="confirmPassword" type="text" />
                        </div>
                    </Col>
                </Row>

                <Row className="d-flex justify-content-center">
                    <Button $isRegister type="button" onClick={() => { }} />
                </Row>
            </WrapperVerticalLogin>
        </ContainerLogin>
    );
};

export default Register;
