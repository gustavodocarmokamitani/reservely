import React, { useEffect, useRef, useState } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

import { decodeToken } from "../../services/AuthService";

import edit from "../../assets/edit.svg";
import confirm from "../../assets/confirmCardStore.svg";
import remove from "../../assets/removeRed.svg";

import EditEmployeeRegisterModal from "../Modal/EditEmployeeRegisterModal";

interface DecodedToken {
  userId: string;
  userEmail: string;
  userRole: string;
}

interface ProfessionalRegisterDataTableProps {
  appointment?: boolean;
  loja?: boolean;
  rowsProfessional?: Array<{
    id: number;
    name: string;
    lastName: string;
    phone: string;
    services: number[];
  }>;
  onRowSelect?: (id: number[]) => void;
  fetchData: () => void;
}

const ProfessionalRegisterDataTable: React.FC<
  ProfessionalRegisterDataTableProps
> = ({ rowsProfessional, onRowSelect, fetchData }) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();
  const [columnWidth, setColumnWidth] = useState(250);
  const containerRef = useRef<HTMLDivElement>(null);

  const rows = rowsProfessional ?? [];

  const handleClose = () => setSelectedEmployeeId(undefined);

  const handleShowModal = (id: number) => {
    setSelectedEmployeeId(id);
  };

  const storedToken = localStorage.getItem("authToken");
  const [decodedData, setDecodedData] = useState<DecodedToken>();

  useEffect(() => {
    const updateColumnWidth = () => {
      if (containerRef.current) {
        const totalWidth = containerRef.current.offsetWidth;
        const columnsCount = decodedData?.userRole === "Admin" ? 5 : 4;
        setColumnWidth(Math.floor(totalWidth / columnsCount));
      }
    };
  
    const fetchToken = async () => {
      if (storedToken && !decodedData) {   
        try {
          const data = await decodeToken(storedToken);
          setDecodedData(data);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };
  
    fetchToken();  
    updateColumnWidth();
    window.addEventListener("resize", updateColumnWidth);
    return () => window.removeEventListener("resize", updateColumnWidth);
  }, [storedToken, decodedData?.userRole, decodedData]);  
  

  const handleRowClick = (ids: number[]) => onRowSelect?.(ids);

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Nome Completo",
      width: columnWidth,
      align: "center" as const,
      flex: 3,
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
      flex: 1,
      align: "center" as const,
      headerAlign: "center" as const,
    },
    {
      field: "emailConfirmed",
      headerName: "Email Confirmado",
      type: "boolean",
      flex: 2,
      width: columnWidth,
      align: "center" as const,
      headerAlign: "center" as const,
      renderCell: (params: GridRenderCellParams) =>
        params.value === true ? (
          <img style={{ cursor: "pointer" }} src={confirm} alt="Ativo" />
        ) : (
          <img style={{ cursor: "pointer" }} src={remove} alt="Inativo" />
        ),
    },
    ...(decodedData?.userRole === "Admin"
      ? [
          {
            field: "acoes",
            headerName: "Ações",
            flex: 1,
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
                  onClick={() => handleShowModal(params.row.id)}
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
  ];

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
      {selectedEmployeeId && (
        <EditEmployeeRegisterModal
          title="Editar profissional"
          subTitle="Preencha as informações abaixo para editar o profissional."
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
