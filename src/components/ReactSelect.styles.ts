import styled from "styled-components";

export const StyledDatePicker = styled.div`
    display: flex;
    flex-direction: row;
    max-height: 300px;
    

    & div {
        overflow-y: scroll;
    } 

  & .react-datepicker {
    font-family: Arial, sans-serif;
    border: 1px solid #ccc;
    background-color: #f8f8f8;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  & .react-datepicker__header {
    background-color: #f8f8f8;
    color: white;
    border-bottom: 1px solid #ddd;
    padding: 15px 8px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  & .react-datepicker__day--selected,
  & .react-datepicker__day--keyboard-selected {
    background-color: #007bff;
    color: white;
    border-radius: 50%;
  }

  & .react-datepicker__day:hover {
    background-color: #d0e7ff;
    border-radius: 50%;
  }

  & .react-datepicker__day--outside-month {
    color: #ddd;
  }

  & .react-datepicker__month-container {
    padding: 8px;
  }

  & .react-datepicker__current-month {
    font-weight: bold;
    font-size: 1.1em;
  }
`;


export const TextList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 35px;
  text-align: center;
  border-radius: 15px;
  border: 1px solid #ccc;
  margin: 5px 0;
`