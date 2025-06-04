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
import { formatToBRL } from "../../services/system/globalService";

interface ServiceDataTableProps {
  rows?: ServiceType[];
  handleRowSelect: (id: number[]) => void;
  options: SelectOption[];
  durationMinutes: SelectOption[];
  setDurationMinutes: React.Dispatch<React.SetStateAction<SelectOption[]>>;
  handleSubmitEditService: () => void;
  showEditModal: boolean;
  handleClose: () => void;
  formValuesService: Service;
  handleInputChangeService: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  columns: GridColDef[];
}

const ServiceDataTable: React.FC<ServiceDataTableProps> = ({
  rows,
  handleRowSelect,
  options,
  durationMinutes,
  setDurationMinutes,
  handleSubmitEditService,
  showEditModal,
  handleClose,
  formValuesService,
  handleInputChangeService,
  containerRef,
  columns,
}) => {
  
console.log(formValuesService.value);
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
                type="text"
                placeholder="Valor"
                name="value"
                value={
                  formValuesService.value
                    ? formatToBRL(formValuesService.value)
                    : formatToBRL("0")
                }
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
              <div style={{ width: "100%" }}>
                <Select
                  setData={setDurationMinutes}
                  value={durationMinutes[0]}
                  options={options}
                  placeholder="Selecione a duração"
                />
              </div>
            </Col>
            <Col
              md={6}
              className="mt-3 mb-3 d-flex justify-content-center align-items-center"
            >
              <Input
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
