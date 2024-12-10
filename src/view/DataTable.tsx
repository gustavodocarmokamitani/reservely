import React, { useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import info from "../assets/info.svg";
import edit from "../assets/edit.svg";
import confirmar from "../assets/confirmarCardLoja.svg";
import remover from "../assets/removerRed.svg";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { updateUsuarioFuncionario } from "../services/FuncionarioServices";
import { useSnackbar } from 'notistack';
import { TipoServico } from "../models/TipoServico";
import EditUsuarioFuncionarioModal from "./Modal/EditUsuarioFuncionarioModal";
import InfoFuncionarioServicoModal from "./Modal/InfoFuncionarioServicoModal";
import EditServicoModal from "./Modal/EditServicoModal";
import { updateTipoServico } from "../services/TipoServicoServices";
import { UsuarioFuncionarioUpdate } from "../models/UsuarioFuncionario";
import { Agendamento } from "../models/Agendamento";
import InfoAgendamentoServicoModal from "./Modal/InfoAgendamentoServicoModal";
import EditStatusAgendamentoModal from "./Modal/EditStatusAgendamentoModal";
import { updateAgendamento } from "../services/AgendamentoServices";

interface DataTableProps {
  servico?: boolean;
  profissional?: boolean;
  agendamento?: boolean;
  loja?: boolean;
  rowsServico?: TipoServico[];
  rowsAgendamento?: Agendamento[];
  rowsProfissional?: Array<{ id: number; nome: string; sobrenome: string; telefone: string; servicos: number[] }>;
  onRowSelect?: (id: number[]) => void;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => void;
}

const DataTable: React.FC<DataTableProps> = ({
  rowsAgendamento,
  rowsServico,
  rowsProfissional,
  servico,
  agendamento,
  profissional,
  onRowSelect,
  fetchData,
}) => {
  const [showModal, setShowModal] = useState({ editStatusAgendamento: false, infoAgendamentoServico: false, edit: false, info: false, editServico: false, editAgendamento: false });
  const [selectedFuncionarioId, setSelectedFuncionarioId] = useState<number>();
  const [columnWidth, setColumnWidth] = useState(250);
  const containerRef = useRef<HTMLDivElement>(null);
  const [update, setUpdate] = useState(false);
  const handleClose = () => setShowModal({ editStatusAgendamento: false, infoAgendamentoServico: false, edit: false, info: false, editServico: false, editAgendamento: false });
  const handleShowModal = (type: "infoAgendamentoServico" | "edit" | "info" | "editServico" | "editAgendamento" | "editStatusAgendamento", id: number) => {
    setSelectedFuncionarioId(id);
    setShowModal({ ...showModal, [type]: true });
  };
  const { usuarioFuncionarioUpdateContext, servicoUpdateContext, agendamentoUpdateContext } = useContext(AppContext)!;
  const { enqueueSnackbar } = useSnackbar();

  const updateUser = async (id: number, data: UsuarioFuncionarioUpdate) => {
    try {
      // Chame a função real que faz a requisição ao servidor
      const response = await updateUsuarioFuncionario(id, data);
      setUpdate(false);

      if (response.status === 200 || response.status === 204) {
        enqueueSnackbar(`Profissional editado com sucesso!`, { variant: "success" });
      }
    } catch (error: any) {
      console.error("Erro ao editar o Usuário e Funcionario", error);

      if (error.response) {
        console.error('Status HTTP:', error.response.status);
        console.error('Resposta:', error.response.data);
      } else if (error.request) {
        console.error('Erro na requisição:', error.request);
      } else {
        console.error('Erro desconhecido:', error.message);
      }
    }
  };

  const updateStatusAgendamento = async () => {
    try {
      console.log('inicio do function', update);
      
      if (agendamentoUpdateContext !== null) {
        console.log(agendamentoUpdateContext);
        
        const response = await updateAgendamento(agendamentoUpdateContext.id, agendamentoUpdateContext);
        enqueueSnackbar(`Status do agendamento editado com sucesso!`, { variant: "success" });
      }
      setUpdate(false);
    } catch (error) {
      console.error("Erro ao editar o serviço", error);
    }
    console.log('final do function', update);
  };

  const updateServico = async (id: number, data: TipoServico) => {
    try {
      if (servicoUpdateContext !== null) {
        const updatedServico = {
          id: servicoUpdateContext.id,
          nome: servicoUpdateContext.nome,
          valor: servicoUpdateContext.valor,
          duracaoMinutos: servicoUpdateContext.duracaoMinutos,
          ativo: servicoUpdateContext.ativo,
          descricao: servicoUpdateContext.descricao,
        };

        const response = await updateTipoServico(servicoUpdateContext.id, updatedServico);
        setUpdate(false);

        if (response.status === 200 || response.status === 204) {
          enqueueSnackbar(`Serviço editado com sucesso!`, { variant: "success" });
        }
      }
    } catch (error: any) {
      console.error("Erro ao editar o serviço", error);

      if (error.response) {
        console.error('Status HTTP:', error.response.status);
        console.error('Resposta:', error.response.data);
      } else if (error.request) {
        console.error('Erro na requisição:', error.request);
      } else {
        console.error('Erro desconhecido:', error.message);
      }
    }
  };

  const request = async () => {
    if (update) {
      if (usuarioFuncionarioUpdateContext) updateUser(usuarioFuncionarioUpdateContext.id, usuarioFuncionarioUpdateContext)

      if (servicoUpdateContext) updateServico(servicoUpdateContext.id, servicoUpdateContext);

      if (agendamentoUpdateContext) updateStatusAgendamento();
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

  const columns: GridColDef[] = servico
    ? [
      { field: "id", headerName: "ID", flex: 1, align: "center", headerAlign: "center" },
      { field: "nome", headerName: "Nome", flex: 3, align: "center", headerAlign: "center" },
      { field: "valor", headerName: "Valor", flex: 1, align: "center", headerAlign: "center" },
      { field: "duracao", headerName: "Duração", flex: 1, align: "center", headerAlign: "center" },
      {
        field: "ativo", headerName: "Ativo", type: "boolean", flex: 1, align: "center", headerAlign: "center",
        renderCell: (params) => (
          params.value === true ? (
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
              src={edit}
              onClick={() => handleShowModal("editServico", params.row.id)}
              alt="Editar"
            />
          </div>
        ),
        width: columnWidth,
        align: "center",
        headerAlign: "center",
      },
    ]
    : profissional ? [
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
    ]
      : agendamento
        ? [
          { field: "clienteId", headerName: "Cliente", flex: 2, align: "center", headerAlign: "center" },
          { field: "funcionarioId", headerName: "Funcionario", flex: 2, align: "center", headerAlign: "center" },
          { field: "dataAgendamento", headerName: "Data Agendamento", flex: 1, align: "center", headerAlign: "center" },
          { field: "statusAgendamento", headerName: "Status", flex: 1, align: "center", headerAlign: "center" },
          {
            field: "acoes",
            headerName: "Ações",
            renderCell: (params) => (
              <div style={{ display: "flex", gap: "50px", justifyContent: "center", margin: '12.5px 0px 0px 5px' }}>
                <img
                  style={{ cursor: "pointer" }}
                  src={info}
                  onClick={() => handleShowModal("infoAgendamentoServico", params.row.servicosId)}
                  alt="Informações"
                />
                <img
                  style={{ cursor: "pointer" }}
                  src={edit}
                  onClick={() => handleShowModal("editStatusAgendamento", params.row.id)}
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

  if (servico) rows = rowsServico || [];
  else if (profissional) rows = rowsProfissional || [];
  else if (agendamento) {
    rows = (rowsAgendamento || []).slice().sort((a, b) => new Date(b.dataAgendamento).getTime() - new Date(a.dataAgendamento).getTime());
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
      {showModal.info && (
        <InfoFuncionarioServicoModal
          title="Informações do profissional"
          info
          subTitle="Todos os serviços que contém esse profissional."
          handleClose={handleClose}
          handleShow={() => setShowModal({ ...showModal, info: true })}
          size="pequeno"
          fetchData={() => { }}
          rowId={selectedFuncionarioId}
        />
      )}
      {showModal.infoAgendamentoServico && (
        <InfoAgendamentoServicoModal
          title="Informações do agendamento"
          info
          subTitle="Todos os serviços que contém esse agendamento."
          handleClose={handleClose}
          handleShow={() => setShowModal({ ...showModal, infoAgendamentoServico: true })}
          size="pequeno"
          fetchData={() => { }}
          rowId={selectedFuncionarioId}
        />
      )}
      {showModal.edit && (
        <EditUsuarioFuncionarioModal
          title="Editar profissional"
          subTitle="Preencha as informações abaixo para editar o profissional."
          edit
          handleClose={handleClose}
          handleShow={() => setShowModal({ ...showModal, edit: true })}
          size="grande"
          rowId={selectedFuncionarioId}
          setUpdate={setUpdate}
        />
      )}
      {showModal.editServico && (
        <EditServicoModal
          title="Editar serviço"
          subTitle="Preencha as informações abaixo para editar o serviço."
          handleClose={handleClose}
          handleShow={() => setShowModal({ ...showModal, editServico: true })}
          size="pequeno"
          rowId={selectedFuncionarioId}
          setUpdate={setUpdate}
          editServico
        />
      )}
      {showModal.editStatusAgendamento && (
        <EditStatusAgendamentoModal
          title="Editar status de agendamento"
          subTitle="Preencha as informações abaixo para editar o status."
          handleClose={handleClose}
          handleShow={() => setShowModal({ ...showModal, editServico: true })}
          size="pequeno"
          rowId={selectedFuncionarioId}
          setUpdate={setUpdate}
        />
      )}
    </div>
  );
};

export default DataTable;
