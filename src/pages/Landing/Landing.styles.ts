import styled from "styled-components";
import Col from "react-bootstrap/Col";

// Cor primária para fácil alteração
const PRIMARY_COLOR = "#f16d55";
const SECONDARY_COLOR = "#2c2c2c";
const BACKGROUND_COLOR = "#f5f5f5ff";

export const ContainerLanding = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden; // Evita rolagem horizontal indesejada
  background-color: white;
`;

export const ContainerButton = styled.div`
  // Estilo minimalista para o botão "Entrar" na Navbar
  & p {
    padding: 0.5rem 1rem;
    border: 1px solid #2c2c2c;
    border-radius: 8px;
    color: ${PRIMARY_COLOR};
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #2c2c2c;
      color: white !important;
    }
  }

  // Ajuste para dispositivos móveis (Navbar desdobrada)
  @media (max-width: 991.98px) {
    width: 100%;
    margin-top: 1rem;
    & p {
      width: fit-content;
    }
  }
`;

export const Hero = styled.div`
  width: 100%;
  min-height: 88vh; /* Altura mínima para melhor adaptação */
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  /* Estilo para a tag 'p' dentro do Hero */
  & p {
    max-width: 700px;
    color: #6c757d;
  }

  /* Estilo para o h2 */
  & h2 {
    font-size: 2.5rem;
    font-weight: 500;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

export const StartButton = styled.span`
  padding: 1rem 2rem;
  background-color: #2c2c2c;
  color: white;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(73, 73, 73, 0.4);
  transition: background-color 0.2s;
  z-index: 1;
  &:hover {
    background-color: #d85c49; // Tonalidade mais escura
  }
`;

const SectionBase = styled.div`
  width: 100%;
  /* Usando Container do Bootstrap na função para delimitar a largura */
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const About = styled(SectionBase)`
  max-width: 1200px; /* Largura máxima para centralizar o conteúdo */
  margin: 0 auto;
  padding: 5rem 10rem; /* Padding para telas pequenas */

  @media (max-width: 768px) {
    padding: 2rem 2rem;
  }

  & h3 {
    text-align: center;
    font-size: 1.75rem;
    font-weight: 400;
    margin-bottom: 2rem;
    max-width: 600px;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  & h2 {
    color: ${PRIMARY_COLOR};
    font-weight: 600;
  }
`;

export const Analytics = styled.div`
  width: 100%;
  background-color: ${BACKGROUND_COLOR};
  margin-top: 3rem;
  border: 1px solid #eee;
  border-radius: 15px;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);

  // Ajuste para garantir que a Row funcione bem dentro
  & .row {
    margin: 0;
  }
`;

export const AnalyticsValue = styled.span`
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 1;
  color: ${PRIMARY_COLOR};
  margin: 0.5rem 0;
`;

export const Feature = styled(SectionBase)`
  background-color: white;
  border-radius: 15px;
  padding: 5rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 87vh;

  & h3 {
    max-width: 800px;
    font-weight: 400;
    font-size: 1.75rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

export const FeatureIcon = styled.svg`
  color: white;
  background-color: #f0f0f0ff;
  padding: 0.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
`;

export const Card = styled(Col)`
  & div {
    display: flex;
    flex-direction: column;
    height: 100%; /* Permite que o cartão se ajuste ao conteúdo */
    min-height: 200px;
    padding: 1.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: white;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
    }

    & span:nth-child(2) {
      font-size: 1.1rem;
    }
  }
`;

export const PricingCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  border: 1px solid #ccc;
  min-height: 420px;
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin: 1rem 0;
  text-align: center;
  transition: box-shadow 0.3s, border-color 0.3s;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    border-color: ${PRIMARY_COLOR};
  }

  & h2 {
    font-weight: 700;
    color: ${PRIMARY_COLOR};
  }

  & > p:nth-child(2) {
    color: #6c757d;
  }

  & ul {
    flex-grow: 1; /* Permite que a lista empurre o botão para baixo */
  }
`;

export const PricingButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1.5rem;
  border: 2px solid "transparent";
  border-radius: 8px;
  background-color: white;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #d85c49;
    color: white;
  }
`;

export const Footer = styled.footer`
  width: 100%;
  background-color: white;
  padding-bottom: 1rem;
`;

export const WhiteButton = styled.button`
  padding: 1rem 2rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  background-color: #2c2c2c;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  min-width: 200px;

  &:hover {
    background-color: #575757ff !important;
  }
`;

export const FooterCTA = styled.div`
  background-color: #ffffffff; // Uma cor ligeiramente mais clara/escura do que o footer para contraste
  padding: 4rem 1rem;
  text-align: center;
  margin-top: 2rem; // Ajuste para garantir que a borda com a seção anterior não apareça
  border-radius: 10px 10px 0 0;

  & h2 {
    font-size: 2rem;
    font-weight: 600;
    color: red;
    margin-bottom: 0.5rem;
  }
  & p {
    color: #ccc;
    max-width: 600px;
    margin: 0 auto;
  }
`;

export const LinkTitle = styled.h4`
  font-weight: 600;
  color: red;
  margin-bottom: 1.5rem;
  font-size: 1.15rem;
`;

export const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  & a {
    color: #000000ff;
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.2s;

    &:hover {
      color: #868686ff;
    }
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  & a {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #555;
    color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 1.1rem;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${PRIMARY_COLOR};
    }
  }
`;

export const Copyright = styled.div`
  width: 100%;
  text-align: center;
  padding: 1.5rem 0 0.5rem 0;
  color: #888;
  font-size: 0.85rem;
  border-top: 1px solid #f7f7f7ff; // Borda sutil de separação
  margin-top: 2rem;
`;
