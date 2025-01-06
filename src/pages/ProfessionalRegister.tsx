import React, { useState, useEffect } from "react";
import { ContainerPage } from "./_Page.styles";
import { Col, Row } from "react-bootstrap";
import { getUsers, deleteUser, getUserTypeIdById } from "../services/UserServices";
import {
  getEmployees,
  deleteEmployee,
  createEmployeeUser,
  updateUserEmployee,
} from "../services/EmployeeServices";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useSnackbar } from "notistack";
import HeaderTitle from "../view/HeaderTitle";
import Button from "../components/Button";
import AddUserEmployeeModal from "../view/Modal/AddUserEmployeeModal";
import ProfessionalDataTable from "../view/DataTable/ProfessionalDataTable";
import {
  checkEmail,
  registerProfessional,
  registerUser,
} from "../services/AuthService";
import ProfessionalRegisterDataTable from "../view/DataTable/ProfessionalRegisterDataTable";

interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  userTypeId: number;
}
 

interface Row {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  services: number[];
}

function ProfessionalRegister() {
  const [users, setUsers] = useState<User[]>([]); 
  const [rows, setRows] = useState<Row[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [show, setShow] = useState(false);
  const [post, setPost] = useState(false);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const {
    setUserEmployeeContext,
    postEmployeeRegister,
    setPostEmployeeRegister,
    userRoleContext,
    userEmployeeContext,
  } = useContext(AppContext)!;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    try {
      const usersData = await getUserTypeIdById(2);

      if(usersData === 404) {
        return
      }

      const mappedRows: Row[] = usersData
        
      setUsers(usersData);
      setRows(mappedRows);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const handleDeleteUsers = async () => {
    if (selectedUserIds.length > 0) {
      try {
        await Promise.all(
          selectedUserIds.map(async (userId) => {
            try {
              const usersResponse = await getUsers();
              const users = usersResponse.find((u: User) => u.id === userId);
  
              console.log(users);
  
              if (users !== null) {
                const usersId = users.id;
                console.log(users);
  
                await deleteUser(usersId); // Exclusão do usuário
                enqueueSnackbar(`Professional excluído com sucesso!`, {
                  variant: "success",
                });
              } else {
                enqueueSnackbar(
                  `Nenhum funcionário encontrado para o usuário com ID ${userId}`,
                  { variant: "error" }
                );
              }
            } catch (error) {
              console.error(`Erro ao remover o usuário ${userId}:`, error);
              enqueueSnackbar(`Erro ao excluir o usuário ${userId}.`, {
                variant: "error",
              });
            }
          })
        );
        
        await fetchData(); 
        setSelectedUserIds([]); 
      } catch (error) {
        console.error("Erro ao remover os usuários:", error);
      }
    } else {
      alert("Nenhum usuário selecionado!");
    }
  };  

  const handleRowSelect = (ids: number[]) => {
    setSelectedUserIds(ids);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ContainerPage style={{ height: "100vh" }}>
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
            {userRoleContext?.userRole === "Admin" && (
              <>
                <Button $isRemove type="button" onClick={handleDeleteUsers} />
                <Button $isAdd type="button" onClick={handleShow} />
              </>
            )}
          </Col>
        </Row>
        <ProfessionalRegisterDataTable
          professional
          rowsProfessional={rows}
          onRowSelect={handleRowSelect}
          setUpdate={setUpdate}
          update={update}
          fetchData={fetchData}
        />
        {show && (
          <AddUserEmployeeModal
            title="Adicionar profissional"
            subTitle="Preencha as informações abaixo para criar um novo profissional."
            professionalRegister
            handleClose={handleClose}
            handleShow={handleShow}
            size="large"
            fetchData={fetchData}
            setPost={setPost}
            post={post}
          />
        )}
      </ContainerPage>
    </>
  );
}

export default ProfessionalRegister;
