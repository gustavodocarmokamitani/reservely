import styled from "styled-components";

export const StyledDatePicker = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: row;
  max-height: 500px;
  margin-bottom: 50px;

  & .react-datepicker__day {
    height: 1.875rem;
    width: 1.875rem;
    text-align: center;
    line-height: 1.8625rem;

    @media (max-width: 1200px) {
      width: 1.275rem;
    }
  }

  & .react-datepicker__day--today {
    background-color: transparent !important;
    color: black !important;
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
    width: 21.7rem;
    font-size: 1.125rem;

    @media (max-width: 1200px) {
      width: 18.7rem;
    }
  }

  & .react-datepicker__day-name {
    margin: 0.625rem 0.6rem;
    font-size: 0.9rem;

    @media (max-width: 1200px) {
      margin: 0.325rem 0.35rem;
    }
  }

  & .react-datepicker__header {
    background-color: #f8f8f8;
    color: white;
    border-bottom: 1px solid #ddd;
    border-top-left-radius: 0.3125rem;
    border-top-right-radius: 0.3125rem;
    width: 21.3rem;
    text-transform: uppercase;

    @media (max-width: 1200px) {
      width: 18.3rem;
    }
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
