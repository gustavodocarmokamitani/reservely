import React, { useEffect, useState, useRef } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import moment from "moment";
import Paper from "@mui/material/Paper";
import info from "../../assets/info.svg";
import edit from "../../assets/edit.svg";
import EditStatusAppointmentModal from "../Modal/EditStatusAppointmentModal";
import InfoAppointmentServiceModal from "../Modal/InfoAppointmentServiceModal";
import { Appointment } from "../../models/Appointment";

interface AppointmentDataTableProps {
  appointment?: boolean;
  rowsAppointment?: Appointment[];
  onRowSelect?: (id: number[]) => void;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  update: boolean;
  fetchData: () => void;
}

const AppointmentDataTable: React.FC<AppointmentDataTableProps> = ({
  rowsAppointment = [],
  appointment = false,
  onRowSelect,
  fetchData,
  update,
  setUpdate
}) => {
  const [showModal, setShowModal] = useState({
    editAppointmentStatus: false,
    infoAppointmentService: false,
    editAppointment: false,
    editService: false
  });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();
  const [columnWidth, setColumnWidth] = useState(250);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
    setUpdate(false);
  }, [update]);

  useEffect(() => {
    const updateColumnWidth = () => {
      if (containerRef.current) {
        const totalWidth = containerRef.current.offsetWidth;
        setColumnWidth(Math.floor(totalWidth / 6));
      }
    };
    updateColumnWidth();
    window.addEventListener("resize", updateColumnWidth);
    return () => window.removeEventListener("resize", updateColumnWidth);
  }, []);

  const handleClose = () => setShowModal({ editAppointmentStatus: false, infoAppointmentService: false, editAppointment: false, editService: false });
  const handleShowModal = (type: "infoAppointmentService" | "editAppointment" | "editAppointmentStatus" | "editService", id: number) => {
    setSelectedEmployeeId(id);
    setShowModal({ ...showModal, [type]: true });
  };

  const handleRowClick = (ids: number[]) => onRowSelect?.(ids);

  const columns: GridColDef[] = appointment
    ? [
      { field: "clientId", headerName: "Cliente", flex: 2, align: "center", headerAlign: "center" },
      { field: "employeeId", headerName: "Funcionário", flex: 2, align: "center", headerAlign: "center" },
      {
        field: "appointmentDate",
        headerName: "Data do Agendamento",
        flex: 1,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          const formattedDate = moment(params.value).format("DD/MM/YYYY");
          return <span>{formattedDate}</span>;
        }
      },
      { field: "appointmentTime", headerName: "Horário do Agendamento", flex: 1, align: "center", headerAlign: "center" },
      { field: "appointmentStatus", headerName: "Status", flex: 1, align: "center", headerAlign: "center" },
      {
        field: "acoes",
        headerName: "Ações",
        flex: 1,
        renderCell: (params) => (
          <div style={{ display: "flex", gap: "50px", justifyContent: "center", margin: '12.5px 0px 0px 5px' }}>
            <img
              style={{ cursor: "pointer" }}
              src={info}
              onClick={() => handleShowModal("infoAppointmentService", params.row.serviceIds)}
              alt="Informações"
            />
            <img
              style={{ cursor: "pointer" }}
              src={edit}
              onClick={() => handleShowModal("editAppointmentStatus", params.row.id)}
              alt="Alterar status"
            />
          </div>
        ),
        width: columnWidth,
        align: "center",
        headerAlign: "center",
      },
    ]
    : [];

  let rows: Appointment[] = [];
  if (appointment) {
    rows = rowsAppointment.slice().sort((a, b) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime());
  }

  return (
    <div ref={containerRef} style={{ marginTop: "3rem" }}>
      <Paper sx={{ height: 800, width: "100%", borderRadius: "15px", overflow: "hidden" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 13 } } }}
          pageSizeOptions={[13, 20, 25]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelection: GridRowSelectionModel) => {
            const selectedRowIds = newSelection.map((id) => Number(id));
            if (selectedRowIds.every((id) => !isNaN(id))) handleRowClick(selectedRowIds);
          }}
          sx={{ border: 0 }}
        />
      </Paper>
      {showModal.infoAppointmentService && (
        <InfoAppointmentServiceModal
          title="Informações do appointment"
          subTitle="Todos os serviços que contém esse appointment."
          handleClose={handleClose}
          handleShow={() => setShowModal({ ...showModal, infoAppointmentService: true })}
          size="pequeno"
          fetchData={() => {}}
          rowId={selectedEmployeeId}
        />
      )}
      {showModal.editAppointmentStatus && (
        <EditStatusAppointmentModal
          title="Editar status de appointment"
          subTitle="Preencha as informações abaixo para editar o status."
          handleClose={handleClose}
          handleShow={() => setShowModal({ ...showModal, editService: true })}
          size="small"
          rowId={selectedEmployeeId}
          setUpdate={setUpdate}
        />
      )}
    </div>
  );
};

export default AppointmentDataTable;
