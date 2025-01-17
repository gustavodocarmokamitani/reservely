import { useState, useEffect, useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import { useSnackbar } from "notistack";

import HeaderTitle from "../view/HeaderTitle";
import Button from "../components/Button";
import ProfessionalRegisterDataTable from "../view/DataTable/ProfessionalRegisterDataTable";
import AddUserEmployeeRegisterModal from "../view/Modal/AddEmployeeRegisterModal";

import {
  getUsers,
  deleteUser,
  getUserTypeIdById,
} from "../services/UserServices";
import { decodeToken } from "../services/AuthService";

import * as S from "./_Page.styles";
import { getEmployeeIdByUserId } from "../services/EmployeeServices";

interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  userTypeId: number;
}

interface Rows {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  services: number[];
}

interface DecodedToken {
  userId: string;
  userEmail: string;
  userRole: string;
}

function ProfessionalRegister() {
  const [rows, setRows] = useState<Rows[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [show, setShow] = useState(false);

  const storedToken = localStorage.getItem("authToken");
  const [decodedData, setDecodedData] = useState<DecodedToken>();

  const { enqueueSnackbar } = useSnackbar();

  const fetchData =  useCallback(async () => {
    if (storedToken) {
      const data = await decodeToken(storedToken);
      setDecodedData(data);
    }
    try {
      const usersData = await getUserTypeIdById(2);

      if (usersData === 404) {
        return;
      }

      const mappedRows: Rows[] = usersData;

      setRows(mappedRows);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }, [storedToken]);

  const handleDeleteUsers = async () => {
    if (selectedUserIds.length === 0) {
      return alert("Nenhum usuário selecionado!");
    }

    try {
      const deleteUserById = async (userId: number) => {
        try {
          const usersResponse = await getUsers();
          const user = usersResponse.find((u: User) => u.id === userId);

          if (!user) {
            enqueueSnackbar(
              `Nenhum funcionário encontrado para o usuário com ID ${userId}`,
              { variant: "error" }
            );
            return;
          }

          const getEmployeeResponse = await getEmployeeIdByUserId(user.id);
          
          if (getEmployeeResponse.length !== 0) {
            enqueueSnackbar(
              `Antes de apagar o profissional registrado, é necessário removê-lo da aba "Profissional", incluindo seus serviços e status de agendamento.`,
              { variant: "warning" }
            );
          }

          if (getEmployeeResponse.length === 0) {
            const deleteUserResponse = await deleteUser(userId);
            if (deleteUserResponse) {
              enqueueSnackbar(`Professional excluído com sucesso!`, {
                variant: "success",
              });

              setSelectedUserIds([]);
            }
          }
        } catch (error) {
          console.error(`Erro ao remover o usuário ${userId}:`, error);
          enqueueSnackbar(`Erro ao excluir o usuário ${userId}.`, {
            variant: "error",
          });
        }
      };

      await Promise.all(selectedUserIds.map(deleteUserById));

      await fetchData();
    } catch (error) {
      console.error("Erro ao remover os usuários:", error);
      enqueueSnackbar("Erro ao excluir usuários.", { variant: "error" });
    }
  };

  const handleRowSelect = (ids: number[]) => {
    setSelectedUserIds(ids);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <S.ContainerPage style={{ height: "100vh" }}>
      <Row>
        <Col md={7} style={{ padding: "0px" }}>
          <HeaderTitle
            title="Registrar Professional"
            subTitle="Área destinada para registrar profissionais."
          />
        </Col>

        <Col
          md={5}
          className="d-flex flex-row justify-content-end align-items-center"
        >
          {decodedData?.userRole === "Admin" && (
            <>
              <Button $isRemove type="button" onClick={handleDeleteUsers} />
              <Button $isAdd type="button" onClick={handleShow} />
            </>
          )}
        </Col>
      </Row>
      <ProfessionalRegisterDataTable
        rowsProfessional={rows}
        onRowSelect={handleRowSelect}
        fetchData={fetchData}
      />
      {show && (
        <AddUserEmployeeRegisterModal
          title="Adicionar profissional"
          subTitle="Preencha as informações abaixo para criar um novo profissional."
          handleClose={handleClose}
          handleShow={handleShow}
          size="large"
          fetchData={fetchData}
        />
      )}
    </S.ContainerPage>
  );
}

export default ProfessionalRegister;
