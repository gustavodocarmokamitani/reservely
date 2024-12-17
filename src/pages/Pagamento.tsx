import React, { useEffect, useState } from "react";
import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import { Col, Row } from "react-bootstrap";
import Button from "../components/Button";
import * as S from "./Pagamento.styles";
import MetodoPagamentoSelect from "../components/Select/MetodoPagamentoSelect";
import { createMetodoPagamento, getMetodoPagamentoById, getMetodosPagamento } from "../services/MetodoPagamentoServices";
import { MetodoPagamento } from "../models/MetodoPagamento";
import { getLojaById, updateLoja } from "../services/LojaServices";
import { Loja } from "../models/Loja";
import { useSnackbar } from "notistack";

function Pagamento() {
  const { enqueueSnackbar } = useSnackbar();
  const [pagamento, setPagamento] = useState<MetodoPagamento[]>([]);
  const [loja, setLoja] = useState<Loja | null>(null);

  useEffect(() => {
    const fetchLoja = async () => {
      try {
        const response = await getLojaById(1);
        setLoja(response);

        if (response.metodosPagamento) {
          const metodosPagamentoInicial: MetodoPagamento[] = response.metodosPagamento.map((id: number) => ({
            id,
            nome: `Metodo ${id}`,
          }));
          setPagamento(metodosPagamentoInicial);
        }
      } catch (error) {
        console.error("Erro ao carregar a loja:", error);
        enqueueSnackbar("Erro ao carregar dados da loja!", { variant: "success" });
      } 
    };

    fetchLoja();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!loja) {

        enqueueSnackbar("Loja não foi carregada", { variant: "error" });
        return;
      }

      const metodosPagamentoIds = pagamento.map((metodo) => metodo.id);

      const mapped: Loja = {
        ...loja,
        metodosPagamento: metodosPagamentoIds,
      };

      await updateLoja(loja.id, mapped);

      enqueueSnackbar("Metodos de pagamento adicionado com sucesso!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Erro ao atualizar a loja!", { variant: "success" });
    }
  };

  return (
    <ContainerPage style={{ height: "100vh" }}>
      <Row>
        <Col md={7} style={{ padding: "0px" }}>
          <HeaderTitle title="Pagamentos" subTitle="Área destinada para gerenciamento de pagamentos."></HeaderTitle>
        </Col>

        <Col
          md={5}
          className="d-flex flex-row justify-content-end align-items-center"
        >
          <Button
            $isConfirmar
            onClick={handleSubmit}
            type="button"
          />
        </Col>
      </Row>
      <S.PagamentoContainer>
        <S.PagamentoContent>
          <p>Tipos de pagamento</p>
          <MetodoPagamentoSelect setPagamento={setPagamento} value={pagamento} />
        </S.PagamentoContent>
      </S.PagamentoContainer>
    </ContainerPage>
  );
}

export default Pagamento;
