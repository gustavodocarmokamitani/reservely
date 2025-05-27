import styled from "styled-components";

interface ButtonProps {
  $isAdd?: boolean;
  $isRemove?: boolean;
  $isClosed?: boolean;
  $isConfirm?: boolean;
  $isConfigure?: boolean;
  $isBack?: boolean;
  $isLogin?: boolean;
  $isRegisterStore?: boolean;
  $isRegisterClient?: boolean;
  $isRescheduling?: boolean;
  $isAppointment?: boolean;
  $isRating?: boolean;
  $isGoogle?: boolean;
  $isResend?: boolean;
  $isSelected?: boolean;
  disabled?: boolean;
}

export const Button = styled.button<ButtonProps>`
  width: 12.5rem;
  min-width: 9.375rem;
  height: 2.812rem;
  border: transparent;
  border-radius: 50px;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.5);
  background-color: ${(props) => {
    if (props.$isAdd) return "#2B2B2B";
    if (props.$isRemove) return "#CDCDCD";
    if (props.$isClosed) return "#FF3535";
    if (props.$isConfirm) return "#1A8439";
    if (props.$isConfigure || props.$isResend) return "#2B2B2B";
    if (props.$isBack || props.$isRescheduling || props.$isRating || props.$isAppointment || props.$isSelected) return "#2c2c2c";
    if (props.$isLogin) return "#2A2A2A";
    if (props.$isRegisterStore || props.$isRegisterClient) return "#fff";
    if (props.$isGoogle) return "#fff";
    return "#FF060B";
  }};
  color: ${(props) =>
    props.$isRemove ||
    props.$isRegisterStore ||
    props.$isRegisterClient ||
    props.$isGoogle
      ? "black"
      : "white"};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  transition: transform 0.2s ease-in, box-shadow 0.3s ease-in;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.02);
    box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.6);
    border: 1.25px solid #2c2c2c;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -200%;
    width: 100%;
    height: 100%;
    background: ${(props) =>
      props.$isRegisterStore || props.$isRegisterClient
        ? `linear-gradient(
      45deg,
      transparent 0%,
      rgba(211, 211, 211, 0.4) 50%,
      transparent 100%
    )`
        : `linear-gradient(
      45deg,
      transparent 0%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 100%
    )`};
    width: 200px;

    transition: left 0.5s ease-in-out;
  }

  &:hover::after {
    left: 100%;
  }

  & span img {
    width: 1.56rem;
  }
  & span {
    font-size: 1rem;
  }
`;
