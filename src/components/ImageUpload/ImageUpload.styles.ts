import styled, { css } from "styled-components";

interface DropAreaProps {
  isDragging: boolean;
}

export const DropArea = styled.div<DropAreaProps>`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border: 2px dashed #9C9C9C;
  border-radius: 12px;
  background-color: #f5f5f5;
  text-align: center;
  position: relative;
  transition: background-color 0.3s, border-color 0.3s;

  ${({ isDragging }) =>
    isDragging &&
    css`
      border-color: #0056b3;
      background-color: #e6f7ff;
    `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;
