import React, { useEffect, useState } from "react";
import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import DataTable from "../view/DataTable";
import { Col, Row } from "react-bootstrap";
import Button from "../components/Button";
import { deleteAgendamento, getAgendamentos } from "../services/AgendamentoServices";
import { Agendamento } from "../models/Agendamento";
import { getFuncionarioById } from "../services/FuncionarioServices";
import { getUsuarioById } from "../services/UsuarioServices";
import moment from 'moment';
import { getStatusAgendamentoById } from "../services/StatusAgendamentoServices";

import { useSnackbar } from 'notistack';

function AgendamentoHistorico() {
    const [selectedAgendamentoIds, setSelectedAgendamentoIds] = useState<number[]>([]);
    const [update, setUpdate] = useState(false);
    const [rows, setRows] = useState<Agendamento[]>([]);

    const { enqueueSnackbar } = useSnackbar();

    const fetchData = async () => {
        try {
            const agendamentoData = await getAgendamentos();

            const mappedAgendamento = await Promise.all(agendamentoData.map(async (agendamento: Agendamento) => {
                const funcionarioData = await getFuncionarioById(agendamento.funcionarioId);
                const usuarioClienteData = await getUsuarioById(agendamento.clienteId);
                const usuarioData = await getUsuarioById(funcionarioData.usuarioId);
                const statusAgendamentoData = await getStatusAgendamentoById(agendamento.statusAgendamentoId);

                const dataFormatada = moment(agendamento.dataAgendamento).format('DD/MM/YYYY');

                return {
                    id: agendamento.id,
                    funcionarioId: usuarioData.nome,
                    clienteId: usuarioClienteData.nome,
                    dataAgendamento: dataFormatada,
                    servicosId: agendamento.servicosId,
                    statusAgendamento: statusAgendamentoData.nome,
                };
            }));
            
            setRows(mappedAgendamento);
            setUpdate(false);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    const handleRowSelect = (ids: number[]) => {
        setSelectedAgendamentoIds(ids);
    };
    
    const handleDeleteAgendamento = async () => {
        try {
            await Promise.all(selectedAgendamentoIds.map(async (agendamentoId) => {
                try {
                    const agendamentoResponse = await getAgendamentos(); 
                    const agendamento = agendamentoResponse.find((a: Agendamento) => a.id === agendamentoId);
                    
                    if (agendamento) { 
                        await deleteAgendamento(agendamento.id); 
                        enqueueSnackbar(`Agendamento excluido com sucesso!`, { variant: "success" });
                    } else {
                        enqueueSnackbar(`Nenhum funcionário encontrado para o usuário com ID ${agendamentoId}`, { variant: "error" });
                    }
                } catch (error) {
                    console.error(`Erro ao remover o agendamento ${agendamentoId}:`, error);
                }
            }))
            fetchData();
            setSelectedAgendamentoIds([]); 
        } catch (error) {
            console.error("Erro ao remover os agendamento:", error);
        }
    }
    
    return (
        <>
            <ContainerPage style={{ height: "100vh" }}>
                <Row>
                    <Col md={7} style={{ padding: "0px" }}>
                        <HeaderTitle
                            title="Histórico Agendamentos"
                            subTitle="Área destinada para gerenciamento do histórico de agendamentos."
                        />
                    </Col>

                    <Col
                        md={5}
                        className="d-flex flex-row justify-content-end align-items-center"
                    >
                        <Button onClick={handleDeleteAgendamento} $isRemover type="button" />
                    </Col>
                </Row>
                <DataTable
                    agendamento
                    rowsAgendamento={rows}
                    onRowSelect={handleRowSelect}
                    setUpdate={setUpdate}
                    fetchData={fetchData}
                />
            </ContainerPage>
        </>
    );
}

export default AgendamentoHistorico;
