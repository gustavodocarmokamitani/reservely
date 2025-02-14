import React from "react";
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
} from "@mui/x-data-grid";

import Paper from "@mui/material/Paper";
import EditUserEmployeeModal from "../Modal/EditUserEmployeeModal";
import { UserEmployee } from "../../models/UserEmployee";
import { Employee } from "../../models/Employee";
import { User } from "../../models/User";

interface CombinedData extends Employee, User {}

interface ProfessionalDataTableProps {
  rows?: Array<{
    id: number;
    name: string;
    lastName: string;
    phone: string;
    services: number[];
  }>;
  onRowSelect: (id: number[]) => void;
  fetchData: () => void;
  selectedEmployeeId: number | undefined;
  columns: GridColDef[]
  containerRef: React.RefObject<HTMLDivElement>;
  showModal: boolean | undefined;
  handleClose: () => void;
  setFormValuesProfessional: React.Dispatch<React.SetStateAction<UserEmployee>>;
  formValuesProfessional: UserEmployee;
  handleInputChangeProfessional: (event: React.ChangeEvent<HTMLInputElement>) => void;
  combinedData: CombinedData | null;
  handleSubmit: () => void;
}

const ProfessionalDataTable: React.FC<ProfessionalDataTableProps> = ({
  rows,
  onRowSelect,
  fetchData,
  selectedEmployeeId,
  columns,
  containerRef,
  showModal,
  handleClose,
  setFormValuesProfessional,
  formValuesProfessional,
  handleInputChangeProfessional,
  combinedData,
  handleSubmit,
  
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
          edit
          handleClose={handleClose}
          size="large"
          setFormValuesProfessional={setFormValuesProfessional}
          formValuesProfessional={formValuesProfessional}
          handleInputChangeProfessional={handleInputChangeProfessional} 
          combinedData={combinedData}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ProfessionalDataTable;
