import { useState, useEffect, useCallback } from "react";

import { ContainerPage } from "../Styles/_Page.styles";
import { Col, Row } from "react-bootstrap";
import {
  getUserById,
  getUserByUseTypeStore,
} from "../../services/UserServices";
import {
  getEmployees,
  deleteEmployee,
  getEmployeesByStoreId,
  createEmployee,
} from "../../services/EmployeeServices";

import { useSnackbar } from "notistack";

import HeaderTitle from "../../view/HeaderTitle/HeaderTitle";
import Button from "../../components/Button/Button";

import ProfessionalDataTable from "../../view/DataTable/ProfessionalDataTable";

import { decodeToken } from "../../services/AuthService";
import { capitalizeFirstLetter } from "../../services/system/globalService";
import { UserEmployee } from "../../models/UserEmployee";
import { SelectOption } from "../../models/SelectOptions";
import { Employee as EmployeeModel } from "../../models/Employee";
import { Service } from "../../models/Service";
import { Option } from "../../models/Option";
import {
  getServiceTypeById,
  getServiceTypes,
} from "../../services/ServiceTypeServices";
import { User } from "../../models/User";
import { getServices } from "../../services/ServiceServices";
import Modal from "../../view/Modal/Modal";
import Select from "../../components/Select/Select";
import SelectableBox from "../../components/SelectableBox/SelectableBox";

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
  const [serviceType, setServiceType] = useState([]);

  const [employeeSelect, setEmployeeSelect] = useState<SelectOption[]>([]);
  const [options, setOptions] = useState<SelectOption[]>([]);

  const [selectableBoxServices, setSelectableBoxServices] = useState<Service[]>(
    []
  );

  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const [rows, setRows] = useState<Rows[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [show, setShow] = useState(false);
  const [post, setPost] = useState(false);
  const [employee, setEmployee] = useState<SelectOption | null>(null);

  const [formValuesProfessional, setFormValuesProfessional] =
    useState<UserEmployee>({
      id: 0,
      userId: 0,
      name: "",
      lastName: "",
      email: "",
      phone: "",
      active: "false",
      password: "",
      userTypeId: 0,
      serviceIds: [] as number[],
      storeId: 0,
    });
  const storedToken = localStorage.getItem("authToken");
  const storeUser = Number(localStorage.getItem("storeUser"));
  const [decodedData, setDecodedData] = useState<DecodedToken>();

  const { enqueueSnackbar } = useSnackbar();

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
  }, [storedToken, storeUser]);

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

  const handleSubmit = async () => {
    if (employee) {
      const responseEmployee = await getUserById(employee.value);

      const employeeData = {
        id: 0,
        userId: responseEmployee.id,
        active: "true",
        storeId: Number(storeUser),
        serviceIds: formValuesProfessional.serviceIds,
      };

      console.log(employeeData);

      handleEmployeeAdd([employeeData]);
    }

    fetchData();
    handleClose();
  };

  const handleEmployeeAdd = async (employeeData: EmployeeModel[]) => {
    try {
      const updatedEmployeeData = employeeData.map((employee) => ({
        ...employee,
        serviceIds: formValuesProfessional.serviceIds,
      }));

      const response = await createEmployee(updatedEmployeeData);
      if (response) {
        enqueueSnackbar("Profissional adicionado com sucesso.", {
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Erro ao registrar o profissional: ", error);
      enqueueSnackbar("Ocorreu um erro. Por favor, tente novamente.", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    async function fetchServices() {
      const services = await getServiceTypes();
      setServiceType(services.data);
    }
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const responseEmployee = await getUserByUseTypeStore(2, storeUser);
        const response = await getEmployeesByStoreId(storeUser);

        const filteredResponseEmployee = responseEmployee.filter(
          (emp: any) => !response.some((res: any) => res.userId === emp.id)
        );

        const formattedOptions: Option[] = filteredResponseEmployee.map(
          (employee: User) => ({
            value: employee.id,
            label:
              capitalizeFirstLetter(employee.name) +
              " " +
              capitalizeFirstLetter(employee.lastName),
            isDisabled: false,
          })
        );

        formattedOptions.unshift({
          value: 0,
          label: "Selecione...",
          isDisabled: true,
        });

        setOptions(formattedOptions);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }
    };
    fetchEmployees();
  }, [storeUser]);

  const handleServiceSelection = (serviceIds: number[]) => {
    setFormValuesProfessional((prev) => ({
      ...prev,
      serviceIds,
    }));
  };

  useEffect(() => {
    if (employeeSelect.length > 0) {
      setEmployee(employeeSelect[employeeSelect.length - 1]);
    }
  }, [employeeSelect, setEmployee]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        let fetchedServices: Service[] = [];

        const serviceData = await getServices();

        if (serviceData) {
          const filteredData = serviceData.filter(
            (servico: any) => servico.storeId === storeUser
          );

          const serviceTypePromises = filteredData.map(async (servico: any) => {
            try {
              const serviceTypeData = await getServiceTypeById(
                servico.serviceTypeId
              );

              return serviceTypeData?.data || [];
            } catch (error) {
              console.error(
                `Error when searching for the type of service for the id ${servico.serviceTypeId}:`,
                error
              );
              return [];
            }
          });

          const serviceTypeData = await Promise.all(serviceTypePromises);
          fetchedServices = [...fetchedServices, ...serviceTypeData.flat()];
        }

        const uniqueServices = Array.from(
          new Map(
            fetchedServices.map((service) => [service.id, service])
          ).values()
        );
        setSelectableBoxServices(uniqueServices);
      } catch (error) {
        console.error(
          "Error when searching for employee and service information:",
          error
        );
      }
    };

    fetchEmployee();
  }, [storeUser]);

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
          <Modal
            title="Adicionar profissional"
            subTitle="Preencha as informações abaixo para criar um novo profissional."
            handleSubmit={handleSubmit}
            handleClose={handleClose}
            size="large"
          >
            <Row>
              <Col md={4} className="mt-3 mb-3">
                <Select
                  setData={setEmployeeSelect}
                  value={employeeSelect}
                  options={options}
                  placeholder="Selecione um funcionário"
                />
              </Col>
              <Col md={8} className="px-5">
                <SelectableBox
                  onChange={handleServiceSelection}
                  data={selectableBoxServices}
                  setSelectedServices={setSelectedServices}
                  selectedServices={selectedServices}
                />
              </Col>
            </Row>
          </Modal>
        )}
      </ContainerPage>
    </>
  );
}

export default Professional;
