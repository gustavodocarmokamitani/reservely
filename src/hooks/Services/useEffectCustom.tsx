import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DecodedToken } from "../../models/DecodedToken";
import { useCallback, useEffect, useRef } from "react";

import edit from "../../assets/edit.svg";
import confirm from "../../assets/confirmCardStore.svg";
import remove from "../../assets/removeRed.svg";

export const useEffectCustom = (
  decodedData: DecodedToken | null,
  setColumnWidth: (data: number) => void,
  handleShowEditServiceModal: (status: boolean, id: number) => void
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const columnWidth = 250;

  const updateColumnWidth = useCallback(() => {
    if (containerRef.current) {
      const totalWidth = containerRef.current.offsetWidth;
      const columnsCount = decodedData?.userRole === "Admin" ? 5 : 4;
      setColumnWidth(Math.floor(totalWidth / columnsCount));
    }
  }, [decodedData, setColumnWidth]);
  
  useEffect(() => {
    updateColumnWidth();
    window.addEventListener("resize", updateColumnWidth);
  
    return () => {
      window.removeEventListener("resize", updateColumnWidth);
    };
  }, [updateColumnWidth]); 
  

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      align: "center" as const,
      headerAlign: "center" as const,
    },
    {
      field: "name",
      headerName: "Nome",
      flex: 2,
      align: "center" as const,
      headerAlign: "center" as const,
    },
    {
      field: "value",
      headerName: "Valor",
      flex: 1,
      align: "center" as const,
      headerAlign: "center" as const,
      renderCell: (params: any) => {
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(params.value);
      },
    },
    {
      field: "durationMinutes",
      headerName: "Duração",
      flex: 1,
      align: "center" as const,
      headerAlign: "center" as const,
      renderCell: (params) => {
        const minutes = params.value || 0;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return (
          <span>{`${String(hours).padStart(2, "0")}:${String(mins).padStart(
            2,
            "0"
          )}`}</span>
        );
      },
    },
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
                  onClick={() =>
                    handleShowEditServiceModal(true, params.row.id)
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
  return {columns, containerRef };
};
