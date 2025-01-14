import styled from "styled-components";

export const StyledDatePicker = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 500px;

  & .react-datepicker__day--today {
    background-color: none !important;
    color: none !important;
    font-weight: normal;
  }

  & .react-datepicker__day--today.react-datepicker__day--selected {
    background-color: #007bff !important;
    color: white !important;
    font-weight: bold;
  }

  & .react-datepicker {
    font-family: Arial, sans-serif;
    border: 1px solid #ccc;
    background-color: #f8f8f8;
    border-radius: 15px;
    padding-top: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 350px;
    height: 350px;
    font-size: 18px;
  }

  & .react-datepicker__header {
    background-color: #f8f8f8;
    color: white;
    border-bottom: 1px solid #ddd;
    margin-left: 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 325px;
  }

  & .react-datepicker__day--selected,
  & .react-datepicker__day--keyboard-selected {
    background-color: #007bff;
    color: white;
    border-radius: 50%;
    
    width: 26px;
    height: 26px;
  }

  & .react-datepicker__day:hover {
    background-color: #d0e7ff;
    border-radius: 50%;
  }

  & .react-datepicker__day {
    margin: 10px;
  }

  & .react-datepicker__day--outside-month {
    color: #ddd;
  }

  & .react-datepicker__month-container {
    padding: 2.5px;
  }

  & .react-datepicker__current-month {
    font-weight: bold;
    font-size: 1.1em;
    width: ;
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
`;
