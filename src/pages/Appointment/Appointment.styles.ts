import styled from 'styled-components';

interface ContentHeaderProps {
  align?: string;
}

export const AppointmentContainer= styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;    
`

export const AppointmentContent = styled.div`
    margin: 0 0.93rem 0 0.93rem;
    margin-top: 20px;   
`

export const AppointmentClientContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 2.5rem;
`;

export const AppointmentClientContent= styled.div`
  display: flex;
  justify-content: center;
  aling-items: center;
  gap: 10px;
`;

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
