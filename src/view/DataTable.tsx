import React, { useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import info from "../assets/info.svg";
import Modal from "./Modal";

interface DataTableProps {
  type: "servico" | "profissional",
  rowsServico?: Array<{
    id: number;
    nome: string;
    valor: string;
    duracao: string;
    ativo: boolean;
  }>;

  rowsProfissional?: Array<{
    id: number;
    nome: string;
    sobrenome: string;
    telefone: string;
    servico: boolean;
  }>;
}

const DataTable: React.FC<DataTableProps> = ({ rowsServico, rowsProfissional, type }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [columnWidth, setColumnWidth] = useState(250);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumnWidth = () => {
      if (containerRef.current) {
        const totalWidth = containerRef.current.offsetWidth;
        const numberOfColumns = 5;
        const newColumnWidth = Math.floor(totalWidth / numberOfColumns);
        setColumnWidth(newColumnWidth);
      }
    };

    updateColumnWidth();

    window.addEventListener("resize", updateColumnWidth);

    return () => {
      window.removeEventListener("resize", updateColumnWidth);
    };
  }, []);

  const handleOpenModal = (id: number) => {
    handleShow();
  };

  const columns: GridColDef[] = type === "servico"
    ? [
      { field: "id", headerName: "ID", width: columnWidth },
      { field: "nome", headerName: "Nome", width: columnWidth },
      { field: "valor", headerName: "Valor", width: columnWidth },
      { field: "duracao", headerName: "Duração", width: columnWidth },
      { field: "ativo", headerName: "Ativo", type: "boolean", width: columnWidth },
    ]
    : [
      { field: "id", headerName: "ID", width: columnWidth },
      { field: "nome", headerName: "Nome", width: columnWidth },
      { field: "sobrenome", headerName: "Sobrenome", width: columnWidth },
      { field: "telefone", headerName: "Telefone", width: columnWidth },
      {
        field: "servicos",
        headerName: "Serviços",
        type: "boolean",
        width: columnWidth,
        renderCell: (params) => (
          <img style={{cursor: "pointer"}} src={info} onClick={() => handleOpenModal(params.row.id)} />
        ),
      },
    ];

  const rows = type === "servico" ? rowsServico : rowsProfissional;

  return (
    <div ref={containerRef} style={{ marginTop: "3rem" }}>
      <Paper
        sx={{
          height: 400,
          width: "100%",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
      {show && (
        <Modal
          title="Informações do profissional"
          type="info"
          subTitle="Todos os serviço que contém esse profissional."
          handleClose={handleClose}
          handleShow={handleShow}
          size="pequeno"
        />
      )}
    </div>
  );
};

export default DataTable;
