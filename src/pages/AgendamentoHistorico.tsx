import React, { useEffect, useState } from "react";
import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import DataTable from "../view/DataTable";
import { Col, Row } from "react-bootstrap";
import Button from "../components/Button";
import { getAgendamentos } from "../services/AgendamentoServices";
import { Agendamento } from "../models/Agendamento";
import { getFuncionarioById } from "../services/FuncionarioServices";
import { getUsuarioById } from "../services/UsuarioServices";
import moment from 'moment';
import { getStatusAgendamentoById } from "../services/TipoAgendamentoServices";

function AgendamentoHistorico() {
    const [selectedServicoIds, setSelectedServicoIds] = useState<number[]>([]);
    const [update, setUpdate] = useState(false);
    const [rows, setRows] = useState<Agendamento[]>([]);

    const fetchData = async () => {
        try {
            const agendamentoData = await getAgendamentos();
    
            const mappedAgendamento = await Promise.all(agendamentoData.map(async (agendamento: Agendamento) => {
                const funcionarioData = await getFuncionarioById(agendamento.funcionarioId);
                const usuarioClienteData = await getUsuarioById(agendamento.clienteId);
                const usuarioData = await getUsuarioById(funcionarioData.usuarioId);
                const statusAgendamentoData = await getStatusAgendamentoById(agendamento.statusAgendamentoId);

                
    
                // Formata a data com moment.js
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
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };    

    useEffect(() => {
        fetchData();
    }, []);

    const handleRowSelect = (ids: number[]) => {
        console.log("IDs selecionados na tabela: ", ids);
        setSelectedServicoIds(ids);
    };

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
                    </Col>
                </Row>
                <DataTable
                    agendamento
                    rowsAgendamento={rows}
                    onRowSelect={handleRowSelect}
                    setUpdate={setUpdate}
                    fetchData={() => { }}
                />
            </ContainerPage>
        </>
    );
}

export default AgendamentoHistorico;
