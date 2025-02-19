import React, { useEffect } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Employee } from "../../models/Employee";
import { User } from "../../models/User";
import { UserEmployee } from "../../models/UserEmployee";
import { Service } from "../../models/Service";
import Modal from "../Modal/Modal";
import { Col, Row } from "react-bootstrap";
import Input from "../../components/Input/Input";
import SelectableBox from "../../components/SelectableBox/SelectableBox";

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
  handleSubmitEmployeeEdit: () => void;
  handleRowSelect: (id: number[]) => void;
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
  handleSubmitEmployeeEdit,
  handleRowSelect,
  fetchLoadEditFormValues,
}) => {
  useEffect(() => {
    fetchLoadEditFormValues(
      combinedData ? [combinedData] : [],
      setFormValuesProfessional
    );
  }, [combinedData, setFormValuesProfessional]);

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
          {...{
            rows,
            columns,
          }}
          initialState={{ pagination: { paginationModel: { pageSize: 13 } } }}
          pageSizeOptions={[13, 20, 25]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelection: GridRowSelectionModel) => {
            const selectedRowIds = newSelection.map((id) => Number(id));
            if (selectedRowIds.every((id) => !isNaN(id)))
              handleRowSelect(selectedRowIds);
          }}
          sx={{ border: 0 }}
          localeText={{ noRowsLabel: "" }}
        />
      </Paper>
      {showModal && (
        <Modal
          title="Editar professional"
          subTitle="Preencha as informações abaixo para editar o professional."
          handleSubmit={handleSubmitEmployeeEdit}
          size="large"
          {...{
            handleClose,
          }}
        >
          <Row>
            <Col md={4} className="mt-3 mb-3">
              <Input
                width="300"
                type="toggle"
                placeholder="Ativo"
                name="active"
                value={formValuesProfessional.active}
                onChange={(e) =>
                  handleInputChangeProfessional(
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
            </Col>

            <Col md={8}>
              <SelectableBox
                onChange={handleServiceSelection}
                data={selectableBoxServices}
                {...{
                  setSelectedServices,
                  selectedServices,
                }}
              />
            </Col>
          </Row>
        </Modal>
      )}
    </div>
  );
};

export default ProfessionalDataTable;
