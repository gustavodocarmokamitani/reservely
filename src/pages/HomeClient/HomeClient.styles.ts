import { Carousel } from "react-bootstrap";
import styled from "styled-components";

interface ContentHeaderProps {
  align?: string;
}

export const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  border-radius: 15px 0 0 15px;
  padding: 25px 75px;
  background: #f16855;
`;

export const ContentHeader = styled.div<ContentHeaderProps>`
  display: flex;
  align-items: ${(props) => props.align || "start"};
  flex-direction: column;
  width: 100%;
  border-radius: 15px 0 0 15px;
`;

export const Title = styled.div`
  font-size: 4rem;
  font-weight: bold;
  color: white;
  span {
    font-size: 1.5rem;
    color: #2c2c2c;
  }
`;

export const SubTitle = styled.div`
  font-size: 1rem;
  color: white;
  font-weight: 400;
  line-height: 2;
  margin: 25px 0;
`;

export const ContainerClient = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: row;
  width: 100%;
  height: 100%;
  border-radius: 15px 0 0 15px;
  overflow: auto;
  padding-right: 20px;
`;

export const ContainerHomeClient = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  overflow: auto;
  border-radius: 15px 0 0 15px;
  background: rgba(235, 235, 235, 0.35);
  margin-top: 3.125rem;
  
`;

export const WrapperHomeClient = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  height: 350px;
  margin: 0 15px;
`;

export const ContainerPageHomeClient = styled.div`
 max-width: 100%;
  height: 100vh;
  overflow; hidden;
  overflow-x; hidden;
  padding-left: 1.5625rem; 
`;

export const StyledCarousel = styled(Carousel)`
  .carousel-control-prev-icon {
    position: absolute;
    left: 15px;
  }
  .carousel-control-next-icon {
    position: absolute;
    right: 15px;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    background-color: rgb(121, 121, 121);
    border-radius: 5px;
  }
`;
