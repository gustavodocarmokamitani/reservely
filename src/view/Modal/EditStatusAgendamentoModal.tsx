import { useState } from "react";
import { UsuarioFuncionario } from "../../models/UsuarioFuncionario";
import { Col, Row } from "react-bootstrap";
import Button from "../../components/Button";
import * as S from "../Modal.styles";
import closeIcon from "../../assets/remove.svg";
import Selected from "../../components/Selected";
import { getAgendamentoById, updateAgendamento } from "../../services/AgendamentoServices";
import { Agendamento } from "../../models/Agendamento";
import StatusAgendamentoSelect from "../../components/Select/StatusAgendamentoSelect";
import { SelectOption } from "../../models/SelectOptions";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useSnackbar } from 'notistack';

interface EditStatusAgendamentoModalProps {
    title: string;
    subTitle?: string;
    info?: boolean;
    handleShow: () => void;
    handleClose: () => void;
    size: "pequeno" | "medio" | "grande";
    rowId?: number;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditStatusAgendamentoModal: React.FC<EditStatusAgendamentoModalProps> = ({
    handleClose,
    title,
    subTitle,
    info = false,
    size,
    rowId,
    setUpdate
}) => {
    const [statusAgendamento, setStatusAgendamento] = useState<SelectOption | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    const { setAgendamentoUpdateContext } = useContext(AppContext)!;

    const sizeMap = {
        pequeno: "650px",
        medio: "850px",
        grande: "1050px",
    };

    const handleSubmit = async () => {
        if (rowId) {
            try {
                const response = await getAgendamentoById(rowId);

                if (statusAgendamento) {

                    const mappedAgendamento: Agendamento = {
                        id: rowId,
                        clienteId: response.clienteId,
                        funcionarioId: response.funcionarioId,
                        dataAgendamento: response.dataAgendamento,
                        statusAgendamentoId: statusAgendamento?.value,
                        servicosId: response.servicosId,
                        lojaId: 1
                    }

                    setAgendamentoUpdateContext(mappedAgendamento);
                }
                setUpdate(true);
            } catch (error) {
                console.error(`Erro ao remover o agendamento ${rowId}:`, error);
            }
        }
        handleClose();
    };


    return (
        <S.Overlay>
            <div
                style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    maxWidth: sizeMap[size],
                    width: "100%",
                }}
            >
                <Row>
                    <Col md={10}>
                        <h3>{title}</h3>
                        <p>{subTitle}</p>
                    </Col>
                    <Col
                        md={2}
                        style={{ textAlign: "right", cursor: "pointer" }}
                        onClick={handleClose}
                    >
                        <img
                            src={closeIcon}
                            alt="Close Icon"
                            style={{ marginRight: "8px", verticalAlign: "middle" }}
                            width={25}
                        />
                    </Col>
                    <hr />
                </Row>
                <Col md={6} style={{ margin: "15px 0px 35px 15px" }}>
                    <StatusAgendamentoSelect setStatusAgendamento={setStatusAgendamento} value={statusAgendamento?.value} />
                </Col>
                <hr />
                <Row>
                    <Col
                        md={12}
                        className="d-flex flex-row justify-content-center align-items-center"
                    >
                        <Button $isFechar type="button" onClick={handleClose} />
                        <Button $isConfirmar type="button" onClick={handleSubmit} />
                    </Col>
                </Row>
            </div>
        </S.Overlay>
    );
};

export default EditStatusAgendamentoModal;
