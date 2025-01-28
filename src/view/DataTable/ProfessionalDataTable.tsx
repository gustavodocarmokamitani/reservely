import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";

import Paper from "@mui/material/Paper";

import edit from "../../assets/edit.svg";
import confirm from "../../assets/confirmCardStore.svg";
import remove from "../../assets/removeRed.svg";

import EditUserEmployeeModal from "../Modal/EditUserEmployeeModal";

import { decodeToken } from "../../services/AuthService";

interface DecodedToken {
  userId: string;
  userEmail: string;
  userRole: string;
}

interface ProfessionalDataTableProps {
  professional?: boolean;
  rowsProfessional?: Array<{
    id: number;
    name: string;
    lastName: string;
    phone: string;
    services: number[];
  }>;
  onRowSelect: (id: number[]) => void;
  fetchData: () => void;
}

const ProfessionalDataTable: React.FC<ProfessionalDataTableProps> = ({
  rowsProfessional,
  professional,
  onRowSelect,
  fetchData
}) => {
  const [showModal, setShowModal] = useState({ edit: false, info: false });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();
  const [columnWidth, setColumnWidth] = useState(250);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleClose = () => setShowModal({ edit: false, info: false });
  const handleShowModal = (type: "edit" | "info", id: number) => {
    setSelectedEmployeeId(id);
    setShowModal({ ...showModal, [type]: true });
  };
  
  const [decodedData, setDecodedData] = useState<DecodedToken>();

  const fetchToken = useCallback(async () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      try {
        const data = await decodeToken(storedToken);
        setDecodedData(data);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const updateColumnWidth = () => {
      if (containerRef.current) {
        const totalWidth = containerRef.current.offsetWidth;
        const columnsCount = decodedData?.userRole === "Admin" ? 5 : 4;
        setColumnWidth(Math.floor(totalWidth / columnsCount));
      }
    };

    fetchToken();
    updateColumnWidth();
    window.addEventListener("resize", updateColumnWidth);

    return () => window.removeEventListener("resize", updateColumnWidth);
  }, [fetchToken, decodedData?.userRole]);


  const handleRowClick = (ids: number[]) => onRowSelect?.(ids);

  const columns: GridColDef[] = professional
    ? [
      {
        field: "fullName",
        headerName: "Nome Completo",
        width: columnWidth,
        flex: 3,
        align: "center" as const,
        headerAlign: "center" as const,
        renderCell: (params) => `${params.row.name} ${params.row.lastName}`,
      },
      {
        field: "email",
        headerName: "Email",
        width: columnWidth,
        flex: 3,
        align: "center" as const,
        headerAlign: "center" as const,
      },
      {
        field: "phone",
        headerName: "Telefone",
        width: columnWidth,
        flex: 2,
        align: "center" as const,
        headerAlign: "center" as const,
      },
      {
        field: "active",
        headerName: "Ativo",
        type: "boolean",
        width: columnWidth,
        flex: 1,
        align: "center" as const,
        headerAlign: "center" as const,
        renderCell: (params: GridRenderCellParams) =>
          params.value === "true" ? (
            <img style={{ cursor: "pointer" }} src={confirm} alt="Ativo" />
          ) : (
            <img style={{ cursor: "pointer" }} src={remove} alt="Inativo" />
          ),
      },

      ...(decodedData?.userRole === "Admin"
        ? [
          {
            field: "acoes",
            flex: 1,
            headerName: "Ações",
            renderCell: (params: GridCellParams) => (
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
                  onClick={() => handleShowModal("edit", params.row.id)}
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

  let rows: any[] = [];

  if (professional) rows = rowsProfessional || [];

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
              handleRowClick(selectedRowIds);
          }}
          sx={{ border: 0 }}
        />
      </Paper>
      {showModal.edit && (
        <EditUserEmployeeModal
          title="Editar professional"
          subTitle="Preencha as informações abaixo para editar o professional."
          edit
          handleClose={handleClose}
          size="large"
          rowId={selectedEmployeeId}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default ProfessionalDataTable;
