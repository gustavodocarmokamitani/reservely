import React from "react";
import { Col, Row } from "react-bootstrap";

interface OptionNavigationProps {
  icon: React.ReactNode;
  text: string;
}

const OptionNavigation: React.FC<OptionNavigationProps> = ({ icon, text }) => {
  return (
    <>
      <Col md={1} className="p-0">
        {icon}
      </Col>
      <Col>
        <h3 className="mb-0 px-3">{text}</h3>
      </Col>
    </>
  );
};

export default OptionNavigation;
