import React from "react";

import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

import { ServiceType } from "../../models/ServiceType";

import { SelectOption } from "../../models/SelectOptions";
import { Service } from "../../models/Service";
import Modal from "../Modal/Modal";
import Input from "../../components/Input/Input";
import { Col, Row } from "react-bootstrap";
import Select from "../../components/Select/Select";

interface DecodedToken {
  userId: string;
  userEmail: string;
  userRole: string;
}

interface ServiceDataTableProps {
  service?: boolean;
  rows?: ServiceType[];
  handleRowSelect: (id: number[]) => void;
  fetchData: () => void;
  options: SelectOption[];
  setOptions: React.Dispatch<React.SetStateAction<SelectOption[]>>;
  durationMinutes: SelectOption[];
  setDurationMinutes: React.Dispatch<React.SetStateAction<SelectOption[]>>;
  handleShowEditServiceModal: (status: boolean, serviceId: number) => void;
  serviceType: Service | null;
  setServiceType: React.Dispatch<React.SetStateAction<Service | null>>;
  handleSubmitEditService: () => void;
  showEditModal: boolean;
  handleClose: () => void;
  formValuesService: Service;
  setFormValuesService: React.Dispatch<React.SetStateAction<Service>>;
  handleInputChangeService: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  columns: GridColDef[];
}

const ServiceDataTable: React.FC<ServiceDataTableProps> = ({
  rows,
  service,
  handleRowSelect,
  fetchData,
  options,
  setOptions,
  durationMinutes,
  setDurationMinutes,
  handleShowEditServiceModal,
  serviceType,
  setServiceType,
  handleSubmitEditService,
  showEditModal,
  handleClose,
  formValuesService,
  setFormValuesService,
  handleInputChangeService,
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
        />
      </Paper>
      {showEditModal && (
        <Modal
          title="Editar serviço"
          subTitle="Preencha as informações abaixo para editar o serviço."
          handleSubmit={handleSubmitEditService}
          size="small"
          {...{
            handleClose,
          }}
        >
          <Row>
            <Col
              md={6}
              className="mt-3 mb-3 d-flex justify-content-center align-items-center"
            >
              <Input
                width="300"
                type="text"
                placeholder="Nome"
                name="name"
                value={formValuesService.name}
                onChange={(e) =>
                  handleInputChangeService(
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
            </Col>
            <Col
              md={6}
              className="mt-3 mb-3 d-flex justify-content-center align-items-center"
            >
              <Input
                width="300"
                type="text"
                placeholder="Valor"
                name="value"
                value={formValuesService.value}
                onChange={(e) =>
                  handleInputChangeService(
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
            </Col>
          </Row>
          <Row>
            <Col
              md={6}
              className="mt-3 mb-3 d-flex justify-content-center align-items-center"
            >
              <Select
                setData={setDurationMinutes}
                value={durationMinutes[0]}
                options={options}
                placeholder="Selecione a duração"
              />
            </Col>
            <Col
              md={6}
              className="mt-3 mb-3 d-flex justify-content-center align-items-center"
            >
              <Input
                width="300"
                type="toggle"
                name="active"
                value={formValuesService.active}
                onChange={(e) =>
                  handleInputChangeService(
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
            </Col>
          </Row>
          <Row>
            <Col
              md={12}
              className="mt-3 mb-3 d-flex justify-content-center align-items-center"
            >
              <Input
                width="600"
                type="text"
                placeholder="Descrição"
                name="description"
                value={formValuesService.description}
                onChange={(e) =>
                  handleInputChangeService(
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

export default ServiceDataTable;
