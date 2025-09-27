import styled from "styled-components";

interface ContentHeaderProps {
  align?: string;
}


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
  border-radius: 15px 0 0 15px;
  padding-right: 20px;
  overflow-x: scroll;  
`;
 
export const WrapperHomeClient = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 300px;
  margin: 0 15px 1rem 1rem; 
  position: relative;
`;

