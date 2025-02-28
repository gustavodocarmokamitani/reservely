import React from "react";
import Paper from "@mui/material/Paper";
import Modal from "../Modal/Modal";
import Select from "../../components/Select/Select";
import SelectableBox from "../../components/SelectableBox/SelectableBox";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { Col, Row } from "react-bootstrap";
import { Appointment } from "../../models/Appointment";
import { Service } from "../../models/Service";
import { SelectOption } from "../../models/SelectOptions";

interface AppointmentDataTableProps {
  rows: Appointment[];
  handleRowSelect: (id: number[]) => void;
  selectableBoxServices: Service[];
  showModalAppointmentHistoryInfo: boolean;
  showModalAppointmentHistoryStatus: boolean;
  handleClose: () => void;
  columns: GridColDef[];
  containerRef: React.RefObject<HTMLDivElement>;
  statusAppointment: SelectOption[];
  setStatusAppointment: React.Dispatch<React.SetStateAction<SelectOption[]>>;
  handleSubmitAppointmentHistoryStatus: () => void;
  options: SelectOption[];
}

const AppointmentDataTable: React.FC<AppointmentDataTableProps> = ({
  rows = [],
  handleRowSelect,
  selectableBoxServices,
  showModalAppointmentHistoryInfo,
  showModalAppointmentHistoryStatus,
  handleClose,
  columns,
  containerRef,
  statusAppointment,
  setStatusAppointment,
  handleSubmitAppointmentHistoryStatus,
  options,
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
          initialState={{
            pagination: { paginationModel: { pageSize: 13 } },
            sorting: {
              sortModel: [
                { field: "appointmentStatus", sort: "asc" },
                { field: "appointmentDate", sort: "desc" },
              ],
            },
          }}
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

      {showModalAppointmentHistoryInfo && (
        <Modal
          title="Serviços do apontamento"
          subTitle="Todos os serviços que contém esse apontamento."
          handleSubmit={handleClose}
          size="small"
          {...{ handleClose }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <SelectableBox
              data={selectableBoxServices}
              setSelectedServices={() => {}}
            />
          </div>
        </Modal>
      )}

      {showModalAppointmentHistoryStatus && (
        <Modal
          title="Alterar Status do Apontamento"
          subTitle="Gerencie o status associados a este apontamento."
          handleSubmit={handleSubmitAppointmentHistoryStatus}
          size="small"
          {...{ handleClose }}
        >
          <Row>
            <Col md={6} style={{ margin: "15px 0px 35px 15px" }}>
              <Select
                setData={setStatusAppointment}
                value={statusAppointment}
                options={options}
                placeholder="Selecione um status"
              />
            </Col>
          </Row>
          {Array.isArray(statusAppointment) &&
            statusAppointment.length > 0 &&
            statusAppointment[0].value === 3 && (
              <div
                style={{ fontSize: "12px", textAlign: "center", color: "red" }}
              >
                Após o cancelamento, este apontamento não poderá mais ser
                editado.
              </div>
            )}
        </Modal>
      )}
    </div>
  );
};

export default AppointmentDataTable;
