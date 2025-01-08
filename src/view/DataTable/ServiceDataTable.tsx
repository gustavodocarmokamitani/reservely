// React & Hooks
import React, { useEffect, useRef, useState } from "react";

// MUI Components
import { DataGrid, GridColDef, GridRenderCellParams, GridRowSelectionModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

// Modelos
import { ServiceType } from "../../models/ServiceType";

// Assets
import edit from "../../assets/edit.svg";
import confirm from "../../assets/confirmCardStore.svg";
import remove from "../../assets/removeRed.svg";

// Componentes
import EditServiceModal from "../Modal/EditServiceModal";

// Serviços
import { decodeToken } from "../../services/AuthService";

// Interfaces
interface DecodedToken {
  userId: string;
  userEmail: string;
  userRole: string;
}

interface ServiceDataTableProps {
  service?: boolean;
  rowsService?: ServiceType[];
  onRowSelect?: (id: number[]) => void;
  fetchData: () => void;
}

const ServiceDataTable: React.FC<ServiceDataTableProps> = ({
  rowsService,
  service,
  onRowSelect,
  fetchData, 
}) => {
  // Estado para controle de modal e dados do serviço
  const [showModal, setShowModal] = useState({ editService: false });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();
  const [columnWidth, setColumnWidth] = useState(250);
  const containerRef = useRef<HTMLDivElement>(null);
  const [update, setUpdate] = useState(false);

  // Funções para abrir e fechar o modal de edição
  const handleClose = () => setShowModal({ editService: false });
  const handleShowModal = (type: "editService", id: number) => {
    setSelectedEmployeeId(id);
    setShowModal({ ...showModal, [type]: true });
  };

  // Decodificando o token armazenado
  const storedToken = localStorage.getItem("authToken");
  const [decodedData, setDecodedData] = useState<DecodedToken>();

  // Função para obter os dados do token
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
        const columnsCount = decodedData?.userRole === "Admin" ? 6 : 5;
        setColumnWidth(Math.floor(totalWidth / columnsCount));
      }
    };
    updateColumnWidth();
    fetchToken();
    window.addEventListener("resize", updateColumnWidth);

    return () => window.removeEventListener("resize", updateColumnWidth);
  }, []);

  // Função para gerenciar a seleção das linhas
  const handleRowClick = (ids: number[]) => onRowSelect?.(ids);

  // Definição das colunas da tabela
  const columns: GridColDef[] = service
    ? [
        { field: "id", headerName: "ID", flex: 1, align: "center" as const, headerAlign: "center" as const },
        { field: "name", headerName: "Nome", flex: 2, align: "center" as const, headerAlign: "center" as const },
        { field: "value", headerName: "Valor", flex: 1, align: "center" as const, headerAlign: "center" as const },
        { field: "durationMinutes", headerName: "Duração", flex: 1, align: "center" as const, headerAlign: "center" as const },
        {
          field: "active",
          headerName: "Ativo",
          type: "boolean",
          flex: 1,
          headerAlign: "center" as const,
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
                flex: 1,
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
                      onClick={() => handleShowModal("editService", params.row.id)}
                      alt="Editar"
                    />
                  </div>
                ),
                width: columnWidth,
                align: "center" as const,
                headerAlign: "center" as const,
              },
            ]
          : []),
      ]
    : [];

  // Definir as linhas a serem exibidas na tabela
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
            if (selectedRowIds.every((id) => !isNaN(id))) handleRowClick(selectedRowIds);
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
