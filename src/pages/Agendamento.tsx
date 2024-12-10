// Agendamento.tsx
import React, { useState } from "react";
import { ContainerPage } from './_Page.styles';
import { Col, Row } from 'react-bootstrap';
import HeaderTitle from '../view/HeaderTitle';
import Button from '../components/Button';
import * as S from './Agendamento.styles';
import FuncionarioSelect from '../components/Select/FuncionarioSelect';
import ClienteSelect from '../components/Select/ClienteSelect';
import ServicoSelect from '../components/Select/ServicoSelect';
import HorarioSelect from '../components/Select/HorarioSelect';
import DataAgendamentoSelect from "../components/Select/DataAgendamentoSelect";
import { createAgendamento } from "../services/AgendamentoServices";
import { SelectOption } from "../models/SelectOptions";
import { getFuncionarioIdByUsuarioId } from "../services/FuncionarioServices";
import { useSnackbar } from 'notistack';

export function Agendamento() {
    // Agendamento.tsx
    const [funcionario, setFuncionario] = useState<SelectOption | null>(null);
    const [cliente, setCliente] = useState<SelectOption | null>(null);
    const [servico, setServico] = useState<SelectOption[] | null>([]);
    const [horario, setHorario] = useState<SelectOption | null>(null);
    const [dataAgendamento, setDataAgendamento] = useState<Date | null>(null);
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async () => {
        try {
            if (!funcionario?.value) {
                enqueueSnackbar("Por favor, selecione um funcionário.", { variant: "warning" });
                return;
            }
            
            if (!cliente?.value) {
                enqueueSnackbar("Por favor, selecione um cliente.", { variant: "warning" });
                return;
            }
    
            if (!servico || servico.length === 0 || servico[0].value === 0) {
                enqueueSnackbar("Por favor, selecione pelo menos um serviço.", { variant: "warning" });
                return;
            }
    
            if (!horario?.value) {
                enqueueSnackbar("Por favor, selecione um horário.", { variant: "warning" });
                return;
            }
    
            if (!dataAgendamento) {
                enqueueSnackbar("Por favor, selecione uma data para o agendamento.", { variant: "warning" });
                return;
            }
    
            const horarioStr = horario?.value?.toString();
            if (!horarioStr) {
                enqueueSnackbar("Horário inválido.", { variant: "warning" });
                return;
            }
    
            const [horarioHoras, horarioMinutos] = horarioStr.split(":");
    
            const agendamentoData = new Date(dataAgendamento);
            agendamentoData.setHours(parseInt(horarioHoras), parseInt(horarioMinutos));
    
            const funcionarioId = await getFuncionarioIdByUsuarioId(funcionario.value);
    
            const mapped = {
                id: 0,
                clienteId: cliente.value,
                funcionarioId: funcionarioId.id,
                dataAgendamento: agendamentoData,
                statusAgendamentoId: 1,
                servicosId: servico.map((item) => item.value),
            };
    
            await createAgendamento([mapped]);
            setFuncionario({ value: 0, label: "Nenhum" });
            setCliente({ value: 0, label: "Nenhum" });
            setServico([{ value: 0, label: "Nenhum" }]);
            setHorario({ value: 0, label: "Nenhum" });
            setDataAgendamento(null);
            enqueueSnackbar("Agendamento criado com sucesso!", { variant: "success" });
        } catch (error) {
            console.error("Erro ao criar agendamento", error);
            enqueueSnackbar("Erro ao criar agendamento!", { variant: "error" });
        }
    };    

    return (
        <ContainerPage style={{ height: "100vh" }}>
            <Row>
                <Col md={7} style={{ padding: "0px" }}>
                    <HeaderTitle title="Agendamento" subTitle="Área destinada para realizar os agendamentos." />
                </Col>

                <Col md={5} className="d-flex flex-row justify-content-end align-items-center">
                    <Button onClick={handleSubmit} $isConfirmar type="button" />
                </Col>
            </Row>

            <S.AgendamentoContainer>
                <S.AgendamentoContent>
                    <p>Funcionário</p>
                    <FuncionarioSelect value={funcionario?.value} setFuncionario={setFuncionario} />
                </S.AgendamentoContent>

                <S.AgendamentoContent>
                    <p>Cliente</p>
                    <ClienteSelect value={cliente?.value} setCliente={setCliente} />
                </S.AgendamentoContent>

                <S.AgendamentoContent>
                    <p>Serviço</p>
                    <ServicoSelect
                        value={servico?.map(s => s.value) || undefined}
                        setServico={setServico}
                    />
                </S.AgendamentoContent>

                <S.AgendamentoContent>
                    <p>Horário</p>
                    <HorarioSelect value={horario?.value} setHorario={setHorario} />
                </S.AgendamentoContent>
            </S.AgendamentoContainer>

            <S.AgendamentoContainer>

                <S.AgendamentoContent>
                    <DataAgendamentoSelect setDataAgendamento={setDataAgendamento} />
                </S.AgendamentoContent>

            </S.AgendamentoContainer>
        </ContainerPage>
    );
}

export default Agendamento;
