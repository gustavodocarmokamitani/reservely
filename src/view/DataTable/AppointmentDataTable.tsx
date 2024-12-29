import React, { useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useSnackbar } from 'notistack';
import { Appointment } from "../../models/Appointment";
import { updateAppointment } from "../../services/AppointmentServices";
import Paper from "@mui/material/Paper";
import info from "../../assets/info.svg";
import edit from "../../assets/edit.svg";
import EditStatusAppointmentModal from "../Modal/EditStatusAppointmentModal";
import InfoAppointmentServiceModal from "../Modal/InfoAppointmentServiceModal";

interface AppointmentDataTableProps {
    appointment?: boolean;
    rowsAppointment?: Appointment[];
    onRowSelect?: (id: number[]) => void;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    update: boolean;
    fetchData: () => void;
}

const AppointmentDataTable: React.FC<AppointmentDataTableProps> = ({
    rowsAppointment,
    appointment,
    onRowSelect,
    fetchData,
    update,
    setUpdate
}) => {
    const [showModal, setShowModal] = useState({ editAppointmentStatus: false, infoAppointmentService: false, editAppointment: false, editService: false });
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();
    const [columnWidth, setColumnWidth] = useState(250);
    const containerRef = useRef<HTMLDivElement>(null);
    const handleClose = () => setShowModal({ editAppointmentStatus: false, infoAppointmentService: false, editAppointment: false, editService: false });
    const handleShowModal = (type: "infoAppointmentService" | "editAppointment" | "editAppointmentStatus" | "editService", id: number) => {
        setSelectedEmployeeId(id);
        setShowModal({ ...showModal, [type]: true });
    };
    const { appointmentUpdateContext } = useContext(AppContext)!;
    const { enqueueSnackbar } = useSnackbar();


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

    const request = async () => {
        try {
            if (update) {
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

    const columns: GridColDef[] = appointment
        ? [
            { field: "clientId", headerName: "Cliente", flex: 2, align: "center", headerAlign: "center" },
            { field: "employeeId", headerName: "Funcionário", flex: 2, align: "center", headerAlign: "center" },
            { field: "appointmentDate", headerName: "Data Agendamento", flex: 1, align: "center", headerAlign: "center" },
            { field: "appointmentStatus", headerName: "Status", flex: 1, align: "center", headerAlign: "center" },
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

    if (appointment) {
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
