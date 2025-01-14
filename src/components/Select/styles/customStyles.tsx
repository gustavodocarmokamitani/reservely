const customStyles = {
  control: (provided: any) => ({
    ...provided,
    minWidth: "350px",
    minHeight: "40px",
    padding: "5px 25px",
    fontSize: "14px",
    border: "1px solid rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",
    boxShadow: "4px 4px 15px 0px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
    "&:hover": {
      borderColor: "#888",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 5,
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 5,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#007bff" : "#fff",
    color: state.isSelected ? "#fff" : "#333",
    "&:hover": {
      backgroundColor: "#e0e0e0",
      color: "#333",
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    borderRadius: "15px",
    padding: "0 5px",
    backgroundColor: "#616060",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#fff",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "#fff",
    "&:hover": {
      borderRadius: "15px",
      backgroundColor: "#616060",
      color: "#fff",
    },
  }),
};

export default customStyles;
