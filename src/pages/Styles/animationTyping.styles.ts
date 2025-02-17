import styled, { keyframes, css  } from "styled-components";

const typing = keyframes`
  from {
    width: 0%;
    padding: 5px 0px 5px 0px;
  }
  to {
    width: 100%;
    padding: 5px 10px 5px 0px;
  }
`;

const blinkCaret = keyframes`
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: #2c2c2c;
  }
`;

export const TypingText = styled.h1<{ numLetters: number }>`
  overflow: hidden;
  padding: 5px 10px 5px 0px;
  margin-bottom: 15px !important;
  border-right: 0.15em solid #2c2c2c;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.15em;
  ${({ numLetters }) => css`
    animation: ${typing} 1.5s steps(${numLetters}, end), ${blinkCaret} 0.75s step-end infinite;
  `}
`