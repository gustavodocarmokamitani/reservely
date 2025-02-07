import { useState, useEffect, useContext, useCallback } from "react";

import { ContainerPage } from "./_Page.styles";
import { Col, Row } from "react-bootstrap";
import { getUserByUseTypeStore, getUsers } from "../services/UserServices";
import {
  getEmployees,
  deleteEmployee,
  createEmployeeUser,
  getEmployeesByStoreId,
} from "../services/EmployeeServices";

import { AppContext } from "../context/AppContext";

import { useSnackbar } from "notistack";

import HeaderTitle from "../view/HeaderTitle";
import Button from "../components/Button";

import AddUserEmployeeModal from "../view/Modal/AddUserEmployeeModal";
import ProfessionalDataTable from "../view/DataTable/ProfessionalDataTable";

import { decodeToken } from "../services/AuthService";
import { capitalizeFirstLetter } from "../services/system/globalService";

interface Employee {
  id: number;
  userId: number;
  active: string;
  serviceIds: number[];
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

function Professional() {
  const [rows, setRows] = useState<Rows[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [show, setShow] = useState(false);
  const [post, setPost] = useState(false);

  const storedToken = localStorage.getItem("authToken");
  const [decodedData, setDecodedData] = useState<DecodedToken>();
  const storeUser = Number(localStorage.getItem("storeUser"));
  
  const { enqueueSnackbar } = useSnackbar();

  const { setUserEmployeeContext, userEmployeeContext } =
    useContext(AppContext)!;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = useCallback(async () => {
    if (storedToken) {
      const data = await decodeToken(storedToken);
      setDecodedData(data);
    }

    try {
      const usersData = await getUserByUseTypeStore(2, storeUser);
      const employeesData = await getEmployeesByStoreId(storeUser);            
      console.log();
      
      const mappedRows: Rows[] = employeesData
        .map((employee: Employee) => {
          const user = usersData.find((u: any) => u.id === employee.userId);

          if (user) {
            return {
              id: user.id,
              name: capitalizeFirstLetter(user.name),
              lastName: capitalizeFirstLetter(user.lastName),
              phone: user.phone,
              email: user.email,
              active: employee.active,
              services: employee.serviceIds || [],
              storeId: user.storeId,
            };
          }
          return null;
        })
        .filter(Boolean) as Rows[];

      setRows(mappedRows);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }, [storedToken]);

  
  useEffect(() => {
    fetchData();
    setPost(false);
  }, [fetchData, post]);

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
          <Col lg={12} xl={7} style={{ padding: "0px" }}>
            <HeaderTitle
              title="Professional"
              subTitle="Área destinada para gerenciamento de profissionais registrados."
            />
          </Col>

          <Col
          lg={12}
            xl={5}            
            className="d-flex flex-row justify-content-md-center justify-content-lg-end align-items-center  mt-md-3 mt-lg-5 mt-xl-0"
            >
            {decodedData?.userRole === "Admin" && (
              <>
                <Button $isRemove type="button" onClick={handleDeleteUsers} />
                <Button $isAdd type="button" onClick={handleShow} />
              </>
            )}
          </Col>
        </Row>
        <ProfessionalDataTable
          professional
          rowsProfessional={rows}
          onRowSelect={handleRowSelect}
          fetchData={fetchData}
        />
        {show && (
          <AddUserEmployeeModal
            title="Adicionar profissional"
            subTitle="Preencha as informações abaixo para criar um novo profissional."
            handleClose={handleClose}
            handleShow={handleShow}
            size="large"
            fetchData={fetchData}
          />
        )}
      </ContainerPage>
    </>
  );
}

export default Professional;
