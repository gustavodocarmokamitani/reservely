import styled from "styled-components";

export const TimeContainer = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25);
`;

export const LeftButton = styled.div`
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translateY(-50%);
  z-index: 1;
  background: white;
  border: 1px solid white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #f16855;
  }
`;

export const RightButton = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  z-index: 1;
  background: white;
  border: 1px solid white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export const TimeContent = styled.div`
  width: 94%;
  display: flex;
  gap: 1rem;
  overflow-x: hidden;
  margin: 0 100px;
  padding: 2rem 0rem;

  @media (max-width: 768px) {
    flex-direction: column;
    
  margin: 0 auto;
  }
`;

export const HeaderColumns = styled.div<{ selected?: boolean }>`
  min-width: 220px;
  text-align: center;
  position: relative;

  > div:first-child {
    background-color: ${({ selected }) => (selected ? "#2c2c2c" : "#f16855")};
    color: ${({ selected }) => (selected ? "white" : "inherit")};
    font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
    border-radius: 15px;
  }

  @media (max-width: 768px) {
    height: 25rem;
    overflow: auto;
    margin-bottom: 2rem;
  }
`;

export const HeaderTime = styled.div`
  background: #f16855;
  padding: 0.5rem 2.5rem;
  border-radius: 15px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    position: sticky;
  }
`;

export const TimeSlot = styled.div<{ selected?: boolean }>`
  margin-top: 4px;
  padding: 6px 10px;
  border-radius: 6px;
  background-color: ${({ selected }) => (selected ? "#f16855" : "#f0f0f0")};
  color: ${({ selected }) => (selected ? "white" : "black")};
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f7c9c3;
  }

  @media (max-width: 768px) {
    padding: 15px 0px;
  }
`;
