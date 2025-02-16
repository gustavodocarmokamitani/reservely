import { useEffect, useRef, useCallback } from "react";
import { SelectOption } from "../../models/SelectOptions";
import { DecodedToken } from "../../models/DecodedToken";
import {
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";

import edit from "../../assets/edit.svg";
import confirm from "../../assets/confirmCardStore.svg";
import remove from "../../assets/removeRed.svg";

interface Rows {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  services: number[];
  active: boolean;
  storeId: number;
}

export const useEffectCustom = (
  setColumnWidth: (data: number) => void,
  decodedData: DecodedToken | null,
  handleShowEditProfessionalModal: (status: boolean, id: number) => void,
) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const columnWidth = 250;

  const updateColumnWidth = useCallback(() => {
    if (containerRef.current) {
      const totalWidth = containerRef.current.offsetWidth;
      const columnsCount = decodedData?.userRole === "Admin" ? 5 : 4;
      setColumnWidth(Math.floor(totalWidth / columnsCount));
    }
  }, [decodedData?.userRole, setColumnWidth]);

  useEffect(() => {
    updateColumnWidth();
    window.addEventListener("resize", updateColumnWidth);

    return () => {
      window.removeEventListener("resize", updateColumnWidth);
    };
  }, [updateColumnWidth]);

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
                  onClick={() =>
                    handleShowEditProfessionalModal(true, params.row.id)
                  }
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

  return { containerRef, columns };
};
