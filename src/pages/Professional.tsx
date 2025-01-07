import React, { useState, useEffect } from "react";
import { ContainerPage } from "./_Page.styles";
import { Col, Row } from "react-bootstrap";
import { getUsers, deleteUser } from "../services/UserServices";
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
  decodeToken,
  registerProfessional,
  registerUser,
} from "../services/AuthService";

interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  userTypeId: number;
}

interface Employee {
  id: number;
  userId: number;
  active: string;
  serviceIds: number[];
}

interface Row {
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

function Professional() {
  const [users, setUsers] = useState<User[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [show, setShow] = useState(false);
  const [post, setPost] = useState(false);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const storedToken = localStorage.getItem("authToken");
  const [decodedData, setDecodedData] = useState<DecodedToken>();

  const { enqueueSnackbar } = useSnackbar();

  const { setUserEmployeeContext, userEmployeeContext, userRoleContext } =
    useContext(AppContext)!;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    if (storedToken) {
      const data = await decodeToken(storedToken);
      setDecodedData(data);
    }
    
    try {
      const usersData = await getUsers();
      const employeesData = await getEmployees();

      const mappedRows: Row[] = employeesData
        .map((employee: Employee) => {
          const user = usersData.find((u: any) => u.id === employee.userId);

          if (user) {
            return {
              id: user.id,
              name: user.name,
              lastName: user.lastName,
              phone: user.phone,
              email: user.email,
              active: employee.active,
              services: employee.serviceIds || [],
            };
          }
          return null;
        })
        .filter(Boolean) as Row[];

      setUsers(usersData);
      setEmployees(employeesData);
      setRows(mappedRows);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const handleCreateEmployeeUser = async () => {
    try {
      if (post) {
        if (
          !userEmployeeContext?.name ||
          !userEmployeeContext.lastName ||
          !userEmployeeContext.phone
        ) {
          setPost(false);
          enqueueSnackbar(
            "Por favor, preencha todos os dados obrigatórios antes de continuar.",
            { variant: "error" }
          );
          return;
        }

        await createEmployeeUser(userEmployeeContext);

        enqueueSnackbar("Professional criado com sucesso!", {
          variant: "success",
        });
        setUserEmployeeContext(null);
        setPost(false);
      }
    } catch (error) {
      console.error("Erro durante o request:", error);
      enqueueSnackbar("Erro inesperado! Verifique os dados.", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    handleCreateEmployeeUser();
    fetchData();
    setPost(false);
  }, [post]);
  
  const handleDeleteUsers = async () => {
    if (selectedUserIds.length > 0) {
      try {
        await Promise.all(
          selectedUserIds.map(async (userId) => {
            try {
              const employeeResponse = await getEmployees();
              const employee = employeeResponse.find(
                (f: Employee) => f.userId === userId
              );

              if (employee) {
                const employeeId = employee.id;

                await deleteEmployee(employeeId);
                enqueueSnackbar(`Professional excluido com sucesso!`, {
                  variant: "success",
                });
              } else {
                enqueueSnackbar(
                  `Nenhum funcionário encontrado para o usuário com ID ${userId}`,
                  { variant: "error" }
                );
              }
              await deleteEmployee(userId);
            } catch (error) {
              console.error(`Erro ao remover o usuário ${userId}:`, error);
            }
          })
        );
        fetchData();
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

  return (
    <>
      <ContainerPage style={{ height: "100vh" }}>
        <Row>
          <Col md={7} style={{ padding: "0px" }}>
            <HeaderTitle
              title="Professional"
              subTitle="Área destinada para gerenciamento de profissionais registrados."
            />
          </Col>

          <Col
            md={5}
            className="d-flex flex-row justify-content-end align-items-center"
          >
            {decodedData?.userRole === "Admin" && (
              <>
                <Button $isRemove type="button" onClick={handleDeleteUsers} />
                <Button
                  $isAdd
                  type="button"
                  onClick={handleShow}
                  disabled={loading}
                />
              </>
            )}
          </Col>
        </Row>
        <ProfessionalDataTable
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
            professional
            handleClose={handleClose}
            handleShow={handleShow}
            size="large"
            fetchData={fetchData}
            setPost={setPost}
          />
        )}
      </ContainerPage>
    </>
  );
}

export default Professional;
