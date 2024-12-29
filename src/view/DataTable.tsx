import React, { useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { updateUserEmployee } from "../services/EmployeeServices";
import { useSnackbar } from 'notistack';
import { ServiceType } from "../models/ServiceType";
import { updateServiceType } from "../services/ServiceTypeServices";
import { UserEmployeeUpdate } from "../models/UserEmployee";
import { Appointment } from "../models/Appointment";
import { updateAppointment } from "../services/AppointmentServices";
import Paper from "@mui/material/Paper";
import info from "../assets/info.svg";
import edit from "../assets/edit.svg";
import confirm from "../assets/confirmCardStore.svg";
import remove from "../assets/removeRed.svg";
import EditUserEmployeeModal from "./Modal/EditUserEmployeeModal";
import InfoEmployeeServiceModal from "./Modal/InfoEmployeeServiceModal";
import EditServiceModal from "./Modal/EditServiceModal";
import InfoAppointmentServiceModal from "./Modal/InfoAppointmentServiceModal";
import EditStatusAppointmentModal from "./Modal/EditStatusAppointmentModal";

interface DataTableProps {
  service?: boolean;
  professional?: boolean;
  appointment?: boolean;
  loja?: boolean;
  rowsService?: ServiceType[];
  rowsAppointment?: Appointment[];
  rowsProfessional?: Array<{ id: number; name: string; lastName: string; phone: string; services: number[] }>;
  onRowSelect?: (id: number[]) => void;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  update: boolean;
  fetchData: () => void;
}

const DataTable: React.FC<DataTableProps> = ({
  rowsAppointment,
  rowsService,
  rowsProfessional,
  service,
  appointment,
  professional,
  onRowSelect,
  fetchData,
  update,
  setUpdate
}) => {
  const [showModal, setShowModal] = useState({ editAppointmentStatus: false, infoAppointmentService: false, edit: false, info: false, editService: false, editAppointment: false });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();
  const [columnWidth, setColumnWidth] = useState(250);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleClose = () => setShowModal({ editAppointmentStatus: false, infoAppointmentService: false, edit: false, info: false, editService: false, editAppointment: false });
  const handleShowModal = (type: "infoAppointmentService" | "edit" | "info" | "editService" | "editAppointment" | "editAppointmentStatus", id: number) => {
    setSelectedEmployeeId(id);
    setShowModal({ ...showModal, [type]: true });
  };
  const { userEmployeeUpdateContext, serviceUpdateContext, appointmentUpdateContext } = useContext(AppContext)!;
  const { enqueueSnackbar } = useSnackbar();

  const updateUser = async (id: number, data: UserEmployeeUpdate) => {
    try {
      console.log(data);
      const response = await updateUserEmployee(id, data);
      setUpdate(false);

      if (response.status === 200 || response.status === 204) {
        enqueueSnackbar(`Profissional editado com sucesso!`, { variant: "success" });
      }
    } catch (error: any) {
      console.error("Erro ao editar o Usuário e Funcionario", error.message);
    }
  };

  const updateAppointmentStatus = async () => {
    try {
      if (appointmentUpdateContext) {

        await updateAppointment(appointmentUpdateContext.id, appointmentUpdateContext);
        enqueueSnackbar(`Status do appointment editado com sucesso!`, { variant: "success" });
        setUpdate(false);
        fetchData();
      }
    } catch (error: any) {
      console.error("Erro ao editar o serviço", error.message);

      if (error.response) {
        console.error('Status HTTP:', error.response.status);
        console.error('Resposta:', error.response.data);
      } else if (error.request) {
        console.error('Erro na requisição:', error.request);
      }
    }
  };

  const updateService = async (id: number, data: ServiceType) => {
    try {
      if (serviceUpdateContext) {
        const updatedServico = {
          id: serviceUpdateContext.id,
          name: serviceUpdateContext.name,
          value: serviceUpdateContext.value,
          durationMinutes: serviceUpdateContext.durationMinutes,
          active: serviceUpdateContext.active,
          description: serviceUpdateContext.description,
        };

        const response = await updateServiceType(serviceUpdateContext.id, updatedServico);
        setUpdate(false);

        if (response.status === 200 || response.status === 204) {
          enqueueSnackbar(`Serviço editado com sucesso!`, { variant: "success" });
        }
      }
    } catch (error: any) {
      console.error("Erro ao editar o serviço", error.message);

      if (error.response) {
        console.error('Status HTTP:', error.response.status);
        console.error('Resposta:', error.response.data);
      } else if (error.request) {
        console.error('Erro na requisição:', error.request);
      }
    }
  };

  const request = async () => {
    try {
      if (update) {
        if (userEmployeeUpdateContext) await updateUser(userEmployeeUpdateContext.id, userEmployeeUpdateContext);
        if (serviceUpdateContext) await updateService(serviceUpdateContext.id, serviceUpdateContext);
        if (appointmentUpdateContext) await updateAppointmentStatus();
      }
    } catch (error: any) {
      console.error("Erro ao processar requisições de atualização", error.message);
    }
  };

  useEffect(() => {
    request();
    fetchData();
  }, [update]);

  useEffect(() => {
    const updateColumnWidth = () => {
      if (containerRef.current) {
        const totalWidth = containerRef.current.offsetWidth;
        setColumnWidth(Math.floor(totalWidth / 5));
      }
    };
    updateColumnWidth();
    window.addEventListener("resize", updateColumnWidth);

    return () => window.removeEventListener("resize", updateColumnWidth);
  }, []);

  const handleRowClick = (ids: number[]) => onRowSelect?.(ids);


  const columns: GridColDef[] = service
    ? [
      { field: "id", headerName: "ID", flex: 1, align: "center", headerAlign: "center" },
      { field: "name", headerName: "Nome", flex: 3, align: "center", headerAlign: "center" },
      { field: "value", headerName: "Valor", flex: 1, align: "center", headerAlign: "center" },
      { field: "durationMinutes", headerName: "Duração", flex: 1, align: "center", headerAlign: "center" },
      {
        field: "active", headerName: "Ativo", type: "boolean", flex: 1, align: "center", headerAlign: "center",
        renderCell: (params) => (
          params.value === true ? (
            <img
              style={{ cursor: "pointer" }}
              src={confirm}
              alt="Ativo"
            />
          ) : (
            <img
              style={{ cursor: "pointer" }}
              src={remove}
              alt="Inactive"
            />
          )
        ),
      },
      {
        field: "acoes",
        headerName: "Ações",
        renderCell: (params) => (
          <div style={{ display: "flex", gap: "50px", justifyContent: "center", margin: '12.5px 0px 0px 5px' }}>
            <img
              style={{ cursor: "pointer" }}
              src={edit}
              onClick={() => handleShowModal("editService", params.row.id)}
              alt="Editar"
            />
          </div>
        ),
        width: columnWidth,
        align: "center",
        headerAlign: "center",
      },
    ]
    : professional ? [
      { field: "name", headerName: "Nome", width: columnWidth, align: "center", headerAlign: "center" },
      { field: "lastName", headerName: "Sobrename", width: columnWidth, align: "center", headerAlign: "center" },
      { field: "phone", headerName: "Telefone", width: columnWidth, align: "center", headerAlign: "center" },
      {
        field: "active", headerName: "Ativo", type: "boolean", width: columnWidth, align: "center", headerAlign: "center",
        renderCell: (params) => (
          params.value === "true" ? (
            <img
              style={{ cursor: "pointer" }}
              src={confirm}
              alt="Ativo"
            />
          ) : (
            <img
              style={{ cursor: "pointer" }}
              src={remove}
              alt="Inactive"
            />
          )
        ),
      },
      {
        field: "acoes",
        headerName: "Ações",
        renderCell: (params) => (
          <div style={{ display: "flex", gap: "50px", justifyContent: "center", margin: '12.5px 0px 0px 5px' }}>
            <img
              style={{ cursor: "pointer" }}
              src={info}
              onClick={() => handleShowModal("info", params.row.id)}
              alt="Informações"
            />
            <img
              style={{ cursor: "pointer" }}
              src={edit}
              onClick={() => handleShowModal("edit", params.row.id)}
              alt="Editar"
            />
          </div>
        ),
        width: columnWidth,
        align: "center",
        headerAlign: "center",
      },
    ]
      : appointment
        ? [
          { field: "clienteId", headerName: "Cliente", flex: 2, align: "center", headerAlign: "center" },
          { field: "funcionarioId", headerName: "Funcionario", flex: 2, align: "center", headerAlign: "center" },
          { field: "appointmentDate", headerName: "Data Appointment", flex: 1, align: "center", headerAlign: "center" },
          { field: "statusAgendamento", headerName: "Status", flex: 1, align: "center", headerAlign: "center" },
          {
            field: "acoes",
            headerName: "Ações",
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

  let rows: any[] = [];

  if (service) rows = rowsService || [];
  else if (professional) rows = rowsProfessional || [];
  else if (appointment) {
    rows = (rowsAppointment || []).slice().sort((a, b) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime());
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
      {showModal.info && (
        <InfoEmployeeServiceModal
          title="Informações do professional"
          info
          subTitle="Todos os serviços que contém esse professional."
          handleClose={handleClose}
          handleShow={() => setShowModal({ ...showModal, info: true })}
          size="small"
          fetchData={() => { }}
          rowId={selectedEmployeeId}
        />
      )}
      {showModal.infoAppointmentService && (
        <InfoAppointmentServiceModal
          title="Informações do appointment"
          info
          subTitle="Todos os serviços que contém esse appointment."
          handleClose={handleClose}
          handleShow={() => setShowModal({ ...showModal, infoAppointmentService: true })}
          size="pequeno"
          fetchData={() => { }}
          rowId={selectedEmployeeId}
        />
      )}
      {showModal.edit && (
        <EditUserEmployeeModal
          title="Editar professional"
          subTitle="Preencha as informações abaixo para editar o professional."
          edit
          handleClose={handleClose}
          handleShow={() => setShowModal({ ...showModal, edit: true })}
          size="large"
          rowId={selectedEmployeeId}
          setUpdate={setUpdate}
        />
      )}
      {showModal.editService && (
        <EditServiceModal
          title="Editar serviço"
          subTitle="Preencha as informações abaixo para editar o serviço."
          handleClose={handleClose}
          handleShow={() => setShowModal({ ...showModal, editService: true })}
          size="small"
          rowId={selectedEmployeeId}
          setUpdate={setUpdate}
          editService
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

export default DataTable;
