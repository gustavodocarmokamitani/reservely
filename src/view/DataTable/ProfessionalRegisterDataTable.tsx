import React from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { UserEmployee } from "../../models/UserEmployee";
import Modal from "../Modal/Modal";
import { Col, Row } from "react-bootstrap";
import Input from "../../components/Input/Input";
import { capitalizeFirstLetter } from "../../services/system/globalService";

interface ProfessionalRegisterDataTableProps {
  columns: GridColDef[];
  showEditModal: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  rows?: Array<{
    id: number;
    name: string;
    lastName: string;
    phone: string;
    services: number[];
  }>;
  formValuesProfessionalRegister: UserEmployee;
  handleClose: () => void;
  handleRowSelect: (id: number[]) => void;
  handleSubmitEditProfessionalRegister: () => void;
  handleInputChangeProfessionalRegister: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const ProfessionalRegisterDataTable: React.FC<
  ProfessionalRegisterDataTableProps
> = ({
  rows,
  handleRowSelect,
  formValuesProfessionalRegister,
  handleInputChangeProfessionalRegister,
  handleSubmitEditProfessionalRegister,
  showEditModal,
  handleClose,
  containerRef,
  columns,
}) => {
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
              handleRowSelect(selectedRowIds);
          }}
          sx={{ border: 0 }}
          localeText={{ noRowsLabel: "" }}
        />
      </Paper>

      {showEditModal && (
        <Modal
          title="Editar profissional"
          subTitle="Preencha as informações abaixo para editar o profissional."
          handleSubmit={handleSubmitEditProfessionalRegister}
          handleClose={handleClose}
          size="large"
        >
          <Row>
            <Col md={4} className="mt-3 mb-3">
              <Input                
                type="text"
                placeholder="Nome"
                name="name"
                value={capitalizeFirstLetter(
                  formValuesProfessionalRegister.name
                )}
                onChange={(e) =>
                  handleInputChangeProfessionalRegister(
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
            </Col>
            <Col md={4} className="mt-3 mb-3">
              <Input                
                type="text"
                placeholder="Sobrename"
                name="lastName"
                value={capitalizeFirstLetter(
                  formValuesProfessionalRegister.lastName
                )}
                onChange={(e) =>
                  handleInputChangeProfessionalRegister(
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
            </Col>
            <Col md={4} className="mt-3 mb-3">
              <Input                
                type="text"
                placeholder="Telefone"
                name="phone"
                value={capitalizeFirstLetter(
                  formValuesProfessionalRegister.phone
                )}
                onChange={(e) =>
                  handleInputChangeProfessionalRegister(
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
            </Col>
          </Row>
        </Modal>
      )}
    </div>
  );
};

export default ProfessionalRegisterDataTable;
