import React, { useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import info from "../assets/info.svg";
import edit from "../assets/edit.svg";
import Modal from "./Modal";

interface DataTableProps {
  servico?: boolean;
  profissional?: boolean;
  loja?: boolean;
  rowsServico?: Array<{ id: number; nome: string; valor: string; duracao: string; ativo: boolean }>;
  rowsProfissional?: Array<{ id: number; nome: string; sobrenome: string; telefone: string; servicos: number[] }>;
  onRowSelect?: (id: number[]) => void;
}

const DataTable: React.FC<DataTableProps> = ({ rowsServico, rowsProfissional, servico, onRowSelect }) => {
  const [showModal, setShowModal] = useState({ edit: false, info: false });
  const [selectedFuncionarioId, setSelectedFuncionarioId] = useState<number>();
  const [columnWidth, setColumnWidth] = useState(250);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => setShowModal({ edit: false, info: false });
  const handleShowModal = (type: "edit" | "info", id: number) => {
    setSelectedFuncionarioId(id);
    setShowModal({ ...showModal, [type]: true });
  };

  useEffect(() => {
    const updateColumnWidth = () => {
      if (containerRef.current) {
        const totalWidth = containerRef.current.offsetWidth;
        setColumnWidth(Math.floor(totalWidth / 4));
      }
    };

    updateColumnWidth();
    window.addEventListener("resize", updateColumnWidth);

    return () => window.removeEventListener("resize", updateColumnWidth);
  }, []);

  const handleRowClick = (ids: number[]) => onRowSelect?.(ids);

  const columns: GridColDef[] = servico
    ? [
        { field: "id", headerName: "ID", width: columnWidth },
        { field: "nome", headerName: "Nome", width: columnWidth },
        { field: "valor", headerName: "Valor", width: columnWidth },
        { field: "duracao", headerName: "Duração", width: columnWidth },
        { field: "ativo", headerName: "Ativo", type: "boolean", width: columnWidth },
      ]
    : [
        { field: "nome", headerName: "Nome", width: columnWidth },
        { field: "sobrenome", headerName: "Sobrenome", width: columnWidth },
        { field: "telefone", headerName: "Telefone", width: columnWidth },
        {
          field: "acoes",
          headerName: "Ações",
          renderCell: (params) => (
            <div style={{ display: "flex", gap: "50px", justifyContent: "start", margin: '12.5px 0px 0px 5px' }}>
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
        },
      ];

  const rows = servico ? rowsServico : rowsProfissional;

  return (
    <div ref={containerRef} style={{ marginTop: "3rem" }}>
      <Paper sx={{ height: 400, width: "100%", borderRadius: "15px", overflow: "hidden" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
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
        <Modal
          title="Informações do profissional"
          info
          subTitle="Todos os serviços que contém esse profissional."
          handleClose={handleClose}
          handleShow={() => setShowModal({ ...showModal, info: true })}
          size="pequeno"
          fetchData={() => {}}
          usuarioId={selectedFuncionarioId}
        />
      )}
    </div>
  );
};

export default DataTable;
