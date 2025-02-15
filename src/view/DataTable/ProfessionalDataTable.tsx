import React from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import EditUserEmployeeModal from "../Modal/EditUserEmployeeModal";
import { Employee } from "../../models/Employee";
import { User } from "../../models/User";
import { UserEmployee } from "../../models/UserEmployee";
import { Service } from "../../models/Service";

interface CombinedData extends Employee, User {}

interface ProfessionalDataTableProps {
  rows?: Array<{
    id: number;
    name: string;
    lastName: string;
    phone: string;
    services: number[];
  }>;
  combinedData: CombinedData | null;
  containerRef: React.RefObject<HTMLDivElement>;
  columns: GridColDef[];
  showModal: boolean | undefined;
  formValuesProfessional: UserEmployee;
  setFormValuesProfessional: React.Dispatch<React.SetStateAction<UserEmployee>>;
  selectedServices: number[];
  setSelectedServices: React.Dispatch<React.SetStateAction<number[]>>;
  selectableBoxServices: Service[];
  handleServiceSelection: (serviceIds: number[]) => void;
  handleClose: () => void;
  handleInputChangeProfessional: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleSubmit: () => void;
  onRowSelect: (id: number[]) => void;
  fetchLoadEditFormValues: (
    employeeSelected: CombinedData[],
    setFormValuesProfessional: React.Dispatch<
      React.SetStateAction<UserEmployee>
    >
  ) => void;
}

const ProfessionalDataTable: React.FC<ProfessionalDataTableProps> = ({
  rows,
  combinedData,
  containerRef,
  columns,
  showModal,
  formValuesProfessional,
  setFormValuesProfessional,
  selectedServices,
  setSelectedServices,
  selectableBoxServices,
  handleServiceSelection,
  handleClose,
  handleInputChangeProfessional,
  handleSubmit,
  onRowSelect,
  fetchLoadEditFormValues,
}) => {
  const handleRowClick = (ids: number[]) => onRowSelect?.(ids);

  return (
    <div ref={containerRef} style={{ marginTop: "3rem" }}>
      <Paper
        sx={{
          height: 700,
          width: "100%",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 13 } } }}
          pageSizeOptions={[13, 20, 25]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelection: GridRowSelectionModel) => {
            const selectedRowIds = newSelection.map((id) => Number(id));
            if (selectedRowIds.every((id) => !isNaN(id)))
              handleRowClick(selectedRowIds);
          }}
          sx={{ border: 0 }}
        />
      </Paper>
      {showModal && (
        <EditUserEmployeeModal
          title="Editar professional"
          subTitle="Preencha as informações abaixo para editar o professional."
          handleClose={handleClose}
          size="large"
          setFormValuesProfessional={setFormValuesProfessional}
          formValuesProfessional={formValuesProfessional}
          handleInputChangeProfessional={handleInputChangeProfessional}
          combinedData={combinedData}
          handleSubmit={handleSubmit}
          selectableBoxServices={selectableBoxServices}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          fetchLoadEditFormValues={fetchLoadEditFormValues}
          handleServiceSelection={handleServiceSelection}
        />
      )}
    </div>
  );
};

export default ProfessionalDataTable;
