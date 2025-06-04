import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  position: absolute;
  top: 20px;
  right: 4rem;
  z-index: 887;
  padding-right: 1rem;

  @media (max-width: 900px) {
    right: -10px;
  }
`;

export const UserIcon = styled.div`
  width: 300px;
  height: 40px;
  background-color: #333;
  border-radius: 15px 0px 0px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

export const Dropdown = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? "500px" : "0")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  animation: ${({ isOpen }) => isOpen && fadeIn} 0.3s ease;
  background-color: white;
  margin-top: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #ddd;
  border-radius: 15px 0px 0px 15px;
  width: 300px;
`;

export const DropdownItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2c2c2c;
    color: white;
    font-weight: 500;
  }
`;
