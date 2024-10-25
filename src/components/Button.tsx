import React from "react";
import addIcon from '../assets/add.svg'; 
import removeIcon from '../assets/remove.svg'; 
import { Button } from "./Button.styles";

interface ButtonProps {
  text: string;
  type: "button" | "submit" | "reset";
  addIconIs: boolean;
  removeIconIs: boolean;
  onClick?: () => void;
}

const Btn: React.FC<ButtonProps> = ({ text, type, addIconIs, removeIconIs, onClick }) => {
  
  let icon = null;
  if (addIconIs && !removeIconIs) {
    icon = <img src={addIcon} alt="Add Icon" style={{ marginRight: "8px", verticalAlign: "middle" }} width={25} />;
  } else if (!addIconIs && removeIconIs) {
    icon = <img src={removeIcon} alt="Remove Icon" style={{ marginRight: "8px" }} />;
  }

  return (
    <Button type={type} addIconIs={addIconIs} removeIconIs={removeIconIs} style={{margin: "0 1rem"}} onClick={onClick}>
      <div className="d-flex align-items-center justify-content-center">
        {icon}
        {text}
      </div>
    </Button>
  );
};

export default Btn;
