import React from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";

import Paper from "@mui/material/Paper";
import EditUserEmployeeModal from "../Modal/EditUserEmployeeModal";
import { Employee } from "../../models/Employee";
import { User } from "../../models/User";
import { UserEmployee } from "../../models/UserEmployee";

interface CombinedData extends Employee, User {}

interface ProfessionalDataTableProps {
  rows?: Array<{
    id: number;
    name: string;
    lastName: string;
    phone: string;
    services: number[];
  }>;
  columns: GridColDef[];
  combinedData: CombinedData | null;
  containerRef: React.RefObject<HTMLDivElement>;
  formValuesProfessional: UserEmployee;
  handleClose: () => void;
  handleInputChangeProfessional: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleSubmit: () => void;
  onRowSelect: (id: number[]) => void;
  selectedEmployeeId: number | undefined;
  setFormValuesProfessional: React.Dispatch<React.SetStateAction<UserEmployee>>;
  showModal: boolean | undefined;
}

const ProfessionalDataTable: React.FC<ProfessionalDataTableProps> = ({
  rows,
  columns,
  combinedData,
  containerRef,
  formValuesProfessional,
  handleClose,
  handleInputChangeProfessional,
  handleSubmit,
  onRowSelect,
  setFormValuesProfessional,
  showModal,
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
        />
      )}
    </div>
  );
};

export default ProfessionalDataTable;
