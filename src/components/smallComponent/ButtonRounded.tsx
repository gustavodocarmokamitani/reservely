import React from "react";
import { ButtonRoundedComponent } from "./_SmallComponentStyled";

import addIcon from '../../assets/add.svg'; 
import removeIcon from '../../assets/remove.svg'; 

interface ButtonRoundedProps {
  text: string;
  type: "button" | "submit" | "reset";
  addIconIs: boolean;
  removeIconIs: boolean;
}

const ButtonRounded: React.FC<ButtonRoundedProps> = ({ text, type, addIconIs, removeIconIs }) => {
  
  let icon = null;
  if (addIconIs && !removeIconIs) {
    icon = <img src={addIcon} alt="Add Icon" style={{ marginRight: "8px", verticalAlign: "middle" }} width={25} />;
  } else if (!addIconIs && removeIconIs) {
    icon = <img src={removeIcon} alt="Remove Icon" style={{ marginRight: "8px" }} />;
  }

  return (
    <ButtonRoundedComponent type={type} addIconIs={addIconIs} removeIconIs={removeIconIs}>
      <div className="d-flex align-items-center justify-content-center">
        {icon}
        {text}
      </div>
    </ButtonRoundedComponent>
  );
};

export default ButtonRounded;
