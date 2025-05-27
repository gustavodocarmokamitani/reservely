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
    color: #f16855 !important;
    font-weight: normal;
  }

  & .react-datepicker__day--selected {
    color: white !important;
    background: #2c2c2c !important;
    border-radius: 0.4rem;
  }

  & .react-datepicker__day--keyboard-selected {
    background: transparent !important;
    border: 1px solid #2c2c2c;
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
    margin: 0.5313rem;
  }

  & .react-datepicker__month-container {
    padding: 0.1563rem;
  }

  & .react-datepicker__current-month {
    font-weight: bold;
    font-size: 1.2rem !important;
  }

  & .react-datepicker__navigation {
    margin: 0.6rem 0.6rem 0rem 0.6rem;
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
