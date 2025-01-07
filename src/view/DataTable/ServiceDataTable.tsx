import React, { useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowSelectionModel } from "@mui/x-data-grid";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useSnackbar } from "notistack";
import { ServiceType } from "../../models/ServiceType";
import { updateServiceType } from "../../services/ServiceTypeServices";
import Paper from "@mui/material/Paper";
import edit from "../../assets/edit.svg";
import confirm from "../../assets/confirmCardStore.svg";
import remove from "../../assets/removeRed.svg";
import EditServiceModal from "../Modal/EditServiceModal";
import { decodeToken } from "../../services/AuthService";

interface DecodedToken {
  userId: string;
  userEmail: string;
  userRole: string;
}

interface ServiceDataTableProps {
  service?: boolean;
  rowsService?: ServiceType[];
  onRowSelect?: (id: number[]) => void;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  update: boolean;
  fetchData: () => void;
}

const ServiceDataTable: React.FC<ServiceDataTableProps> = ({
  rowsService,
  service,
  onRowSelect,
  fetchData,
  update,
  setUpdate,
}) => {
  const [showModal, setShowModal] = useState({ editService: false });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();
  const [columnWidth, setColumnWidth] = useState(250);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleClose = () => setShowModal({ editService: false });
  const handleShowModal = (type: "editService", id: number) => {
    setSelectedEmployeeId(id);
    setShowModal({ ...showModal, [type]: true });
  };

  const storedToken = localStorage.getItem("authToken");
    const [decodedData, setDecodedData] = useState<DecodedToken>();

  const { serviceUpdateContext, userRoleContext } = useContext(AppContext)!;
  const { enqueueSnackbar } = useSnackbar();

  // const updateService = async (id: number, data: ServiceType) => {
  //   try {
  //     if (serviceUpdateContext) {
  //       const updatedServico = {
  //         id: serviceUpdateContext.id,
  //         name: serviceUpdateContext.name,
  //         value: serviceUpdateContext.value,
  //         durationMinutes: serviceUpdateContext.durationMinutes,
  //         active: serviceUpdateContext.active,
  //         description: serviceUpdateContext.description,
  //       };

  //       const response = await updateServiceType(
  //         serviceUpdateContext.id,
  //         updatedServico
  //       );
  //       setUpdate(false);

  //       if (response.status === 200 || response.status === 204) {
  //         enqueueSnackbar(`Serviço editado com sucesso!`, {
  //           variant: "success",
  //         });
  //       }
  //     }
  //   } catch (error: any) {
  //     console.error("Erro ao editar o serviço", error.message);

  //     if (error.response) {
  //       console.error("Status HTTP:", error.response.status);
  //       console.error("Resposta:", error.response.data);
  //     } else if (error.request) {
  //       console.error("Erro na requisição:", error.request);
  //     }
  //   }
  // };

  const fetchToken = async () => {
      if (storedToken) {
        try {
          const data = await decodeToken(storedToken);
          setDecodedData(data);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

  useEffect(() => {
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
    fetchToken();
    window.addEventListener("resize", updateColumnWidth);

    return () => window.removeEventListener("resize", updateColumnWidth);
  }, []);

  const handleRowClick = (ids: number[]) => onRowSelect?.(ids);


  const columns: GridColDef[] = service
  ? [
      {
        field: "id",
        headerName: "ID",
        flex: 1,
        align: "center" as const,  // Usando as const para garantir o tipo literal
        headerAlign: "center" as const,  // Usando as const para garantir o tipo literal
      },
      {
        field: "name",
        headerName: "Nome",
        flex: 3,
        align: "center" as const,  // Usando as const para garantir o tipo literal
        headerAlign: "center" as const,  // Usando as const para garantir o tipo literal
      },
      {
        field: "value",
        headerName: "Valor",
        flex: 1,
        align: "center" as const,  // Usando as const para garantir o tipo literal
        headerAlign: "center" as const,  // Usando as const para garantir o tipo literal
      },
      {
        field: "durationMinutes",
        headerName: "Duração",
        flex: 1,
        align: "center" as const,  // Usando as const para garantir o tipo literal
        headerAlign: "center" as const,  // Usando as const para garantir o tipo literal
      },
      {
        field: "active",
        headerName: "Ativo",
        type: "boolean",
        flex: 1,
        headerAlign: "center" as const,  // Usando as const para garantir o tipo literal
        renderCell: (params) =>
          params.value === true ? (
            <img style={{ cursor: "pointer" }} src={confirm} alt="Ativo" />
          ) : (
            <img style={{ cursor: "pointer" }} src={remove} alt="Inactive" />
          ),
      },
      ...(decodedData?.userRole === "Admin"
        ? [
            {
              field: "acoes",
              headerName: "Ações",
              renderCell: (params: GridRenderCellParams) => (
                <div
                  style={{
                    display: "flex",
                    gap: "50px",
                    justifyContent: "center",
                    margin: "12.5px 0px 0px 5px",
                  }}
                >
                  <img
                    style={{ cursor: "pointer" }}
                    src={edit}
                    onClick={() =>
                      handleShowModal("editService", params.row.id)
                    }
                    alt="Editar"
                  />
                </div>
              ),
              width: columnWidth,
              align: "center" as const,  // Usando as const para garantir o tipo literal
              headerAlign: "center" as const,  // Usando as const para garantir o tipo literal
            },
          ]
        : []),
    ]
  : [];


  let rows: any[] = [];

  if (service) rows = rowsService || [];

  return (
    <div ref={containerRef} style={{ marginTop: "3rem" }}>
      <Paper
        sx={{
          height: 800,
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
      {showModal.editService && (
        <EditServiceModal
          fetchData={fetchData}
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
    </div>
  );
};

export default ServiceDataTable;
