import React, { useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import info from "../assets/info.svg";
import edit from "../assets/edit.svg";
import confirmar from "../assets/confirmarCardLoja.svg";
import remover from "../assets/removerRed.svg";
import Modal from "./Modal";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { updateUsuarioFuncionario } from "../services/FuncionarioServices";

interface DataTableProps {
  servico?: boolean;
  profissional?: boolean;
  loja?: boolean;
  rowsServico?: Array<{ id: number; nome: string; valor: string; duracao: string; ativo: boolean }>;
  rowsProfissional?: Array<{ id: number; nome: string; sobrenome: string; telefone: string; servicos: number[] }>;
  onRowSelect?: (id: number[]) => void;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => void;
}

const DataTable: React.FC<DataTableProps> = ({ rowsServico, rowsProfissional, servico, onRowSelect, fetchData }) => {
  const [showModal, setShowModal] = useState({ edit: false, info: false });
  const [selectedFuncionarioId, setSelectedFuncionarioId] = useState<number>();
  const [columnWidth, setColumnWidth] = useState(250);
  const containerRef = useRef<HTMLDivElement>(null);
  const [post, setPost] = useState(false);
  const [update, setUpdate] = useState(false);
  const handleClose = () => setShowModal({ edit: false, info: false });
  const handleShowModal = (type: "edit" | "info", id: number) => {
    setSelectedFuncionarioId(id);
    setShowModal({ ...showModal, [type]: true });
  };

  const { usuarioFuncionarioUpdateContext } = useContext(AppContext)!;

  const request = async () => {
    if (update) {
      if (usuarioFuncionarioUpdateContext !== null) {
        
        await updateUsuarioFuncionario(usuarioFuncionarioUpdateContext.id, usuarioFuncionarioUpdateContext);
        setUpdate(false);
      } else {
        console.error("Falha na requisição");
      }
    }
  }
  
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
  
  const columns: GridColDef[] = servico
    ? [
      { field: "id", headerName: "ID", width: columnWidth, align: "center", headerAlign: "center" },
      { field: "nome", headerName: "Nome", width: columnWidth, align: "center", headerAlign: "center" },
      { field: "valor", headerName: "Valor", width: columnWidth, align: "center", headerAlign: "center" },
      { field: "duracao", headerName: "Duração", width: columnWidth, align: "center", headerAlign: "center" },
      {
        field: "ativo", headerName: "Ativo", type: "boolean", width: columnWidth, align: "center", headerAlign: "center",
        renderCell: (params) => (
          params.value === "true" ? (
            <img
              style={{ cursor: "pointer" }}
              src={confirmar}
              alt="Ativo"
            />
          ) : (
            <img
              style={{ cursor: "pointer" }}
              src="icone-inativo.svg"
              alt="Inativo"
            />
          )
        ),
      },
    ]
    : [
      { field: "nome", headerName: "Nome", width: columnWidth, align: "center", headerAlign: "center" },
      { field: "sobrenome", headerName: "Sobrenome", width: columnWidth, align: "center", headerAlign: "center" },
      { field: "telefone", headerName: "Telefone", width: columnWidth, align: "center", headerAlign: "center" },
      {
        field: "ativo", headerName: "Ativo", type: "boolean", width: columnWidth, align: "center", headerAlign: "center",
        renderCell: (params) => (
          params.value === "true" ? (
            <img
              style={{ cursor: "pointer" }}
              src={confirmar}
              alt="Ativo"
            />
          ) : (
            <img
              style={{ cursor: "pointer" }}
              src={remover}
              alt="Inativo"
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
          fetchData={() => { }}
          usuarioId={selectedFuncionarioId}
          setPost={setPost}
          setUpdate={setUpdate}
        />
      )}
      {showModal.edit && (
        <Modal
          title="Editar profissional"
          subTitle="Preencha as informações abaixo para editar o profissional."
          edit
          handleClose={handleClose}
          handleShow={() => setShowModal({ ...showModal, edit: true })}
          size="grande"
          fetchData={() => { }}
          usuarioId={selectedFuncionarioId}
          setPost={setPost}
          setUpdate={setUpdate}
        />
      )}
    </div>
  );
};

export default DataTable;
