import { useCallback, useEffect, useState } from "react";
import { ContainerPage } from "./_Page.styles";
import { Col, Row } from "react-bootstrap";
import { useSnackbar } from "notistack";
import * as S from "./Payment.styles";

import { PaymentMethod } from "../models/PaymentMethod";
import { Store } from "../models/Store";
import { getStoreById, updateStore } from "../services/StoreServices";
import { decodeToken } from "../services/AuthService";

import HeaderTitle from "../view/HeaderTitle";
import Button from "../components/Button";
import MetodoPaymentSelect from "../components/Select/PaymentMethodSelect";

interface DecodedToken {
  userId: string;
  userEmail: string;
  userRole: string;
}

function Payment() {
  const { enqueueSnackbar } = useSnackbar();
  const [payment, setPayment] = useState<PaymentMethod[]>([]);
  const [store, setStore] = useState<Store | null>(null);

  const storeUser = Number(localStorage.getItem("storeUser"));

  const storedToken = localStorage.getItem("authToken");
  const [decodedData, setDecodedData] = useState<DecodedToken>();

  const fetchStore = useCallback(async () => {
    try {
      if (storedToken) {
        const data = await decodeToken(storedToken);
        setDecodedData(data);
      }
      const response = await getStoreById(storeUser);
      setStore(response);

      if (response.paymentMethods && Array.isArray(response.paymentMethods)) {
        const paymentMethodInitial: PaymentMethod[] =
          response.paymentMethods.map((id: number) => ({
            id,
            name: `Metodo ${id}`,
          }));

        setPayment(paymentMethodInitial);
      } else {
        console.error("No payment methods found or invalid format.");
      }
    } catch (error) {
      console.error("Error when loading store:", error);
    }
  }, [storedToken, storeUser]);

  useEffect(() => {
    fetchStore();
  }, [fetchStore]);

  const handleSubmit = async () => {
    try {
      if (!store) {
        enqueueSnackbar("Store not loadead", { variant: "error" });
        return;
      }

      const paymentMethodIds = payment.map((metodo) => metodo.id);

      const mapped: Store = {
        ...store,
        paymentMethods: paymentMethodIds,
      };

      await updateStore(store.id, mapped);

      enqueueSnackbar("Metodos de pagamento adicionado com sucesso!", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Erro ao atualizar a store!", { variant: "success" });
    }
  };

  return (
    <ContainerPage style={{ height: "100vh" }}>
      <Row>
        <Col lg={12} xl={7} style={{ padding: "0px" }}>
          <HeaderTitle
            title="Payments"
            subTitle="Área destinada para gerenciamento de payments."
          ></HeaderTitle>
        </Col>

        <Col
          lg={12}
          xl={5}
          className="d-flex flex-row justify-content-md-center justify-content-lg-end align-items-center  mt-md-3 mt-lg-5 mt-xl-0"
          >
          {decodedData?.userRole === "Admin" && (
            <Button $isConfirm onClick={handleSubmit} type="button" />
          )}
        </Col>
      </Row>
      <S.PaymentContainer>
        <S.PaymentContent>
          <p>Tipos de payment</p>
          <MetodoPaymentSelect setPayment={setPayment} value={payment} />
        </S.PaymentContent>
      </S.PaymentContainer>
    </ContainerPage>
  );
}

export default Payment;
