import React from "react";
import { Col } from "react-bootstrap";

interface OptionNavigationProps {
  icon: React.ReactNode;
  text: string;
}

const OptionNavigation: React.FC<OptionNavigationProps> = ({ icon, text }) => {
  return (
    <>
      <Col md={1} className="p-0" style={{width: "auto"}}>
        {icon}
      </Col>
      <Col>
        <h4 className="mb-0 px-3">{text}</h4>
      </Col>
    </>
  );
};

export default OptionNavigation;
