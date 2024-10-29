import styled from 'styled-components';

export const ImagemContainer = styled.div`
    margin-top: 2.5rem;
`;

export const ImagemGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: start;
`;

export const CardContainer = styled.div`
  width: 340px;
  height: 290px;
  border-radius: 8px;
  padding-right: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

export const CardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  h2 {
    font-size: 1.2rem;
    margin: 0;
  }
`;

export const ImagemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 250px;
  background: #d9d9d9;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 10px;
`;
