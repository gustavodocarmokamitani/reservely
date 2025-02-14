import { useState, useEffect, useCallback, useRef } from "react";

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
  getEmployeeIdByUserId,
  updateEmployee,
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

import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";


import edit from "../../assets/edit.svg";
import confirm from "../../assets/confirmCardStore.svg";
import remove from "../../assets/removeRed.svg";


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

interface CombinedData extends Employee, User { }

function Professional() {
  const [combinedData, setCombinedData] = useState<CombinedData | null>(null);


  const [showModal, setShowModal] = useState<boolean>();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();
  const [columnWidth, setColumnWidth] = useState(250);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleShowModal = (status: boolean, id: number) => {
    setSelectedEmployeeId(id);
    setShowModal(status);
  };


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

  const handleClose = () => {
    setShow(false);
    setShowModal(false);
  }
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

  const handleSubmitEmployeeAdd = async () => {
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



  const fetchToken = useCallback(async () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      try {
        const data = await decodeToken(storedToken);
        setDecodedData(data);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const updateColumnWidth = () => {
      if (containerRef.current) {
        const totalWidth = containerRef.current.offsetWidth;
        const columnsCount = decodedData?.userRole === "Admin" ? 5 : 4;
        setColumnWidth(Math.floor(totalWidth / columnsCount));
      }
    };

    fetchToken();
    updateColumnWidth();
    window.addEventListener("resize", updateColumnWidth);

    return () => window.removeEventListener("resize", updateColumnWidth);
  }, [fetchToken, decodedData?.userRole]);


  const handleRowClick = (ids: number[]) => handleRowSelect?.(ids);

  const columns: GridColDef[] = rows
    ? [
      {
        field: "fullName",
        headerName: "Nome Completo",
        width: columnWidth,
        flex: 3,
        align: "center" as const,
        headerAlign: "center" as const,
        renderCell: (params) => `${params.row.name} ${params.row.lastName}`,
      },
      {
        field: "email",
        headerName: "Email",
        width: columnWidth,
        flex: 3,
        align: "center" as const,
        headerAlign: "center" as const,
      },
      {
        field: "phone",
        headerName: "Telefone",
        width: columnWidth,
        flex: 2,
        align: "center" as const,
        headerAlign: "center" as const,
      },
      {
        field: "active",
        headerName: "Ativo",
        type: "boolean",
        width: columnWidth,
        flex: 1,
        align: "center" as const,
        headerAlign: "center" as const,
        renderCell: (params: GridRenderCellParams) =>
          params.value === "true" ? (
            <img style={{ cursor: "pointer" }} src={confirm} alt="Ativo" />
          ) : (
            <img style={{ cursor: "pointer" }} src={remove} alt="Inativo" />
          ),
      },

      ...(decodedData?.userRole === "Admin"
        ? [
          {
            field: "acoes",
            flex: 1,
            headerName: "Ações",
            renderCell: (params: GridCellParams) => (
              <div
                style={{
                  display: "flex",
                  gap: "50px",
                  justifyContent: "center",
                  margin: "12.5px 0px 0px 5px",
                }}
              >
                <img
                  style={{ cursor: "pointer" }}
                  src={edit}
                  onClick={() => handleShowModal(true, params.row.id)}
                  alt="Editar"
                />
              </div>
            ),
            width: columnWidth,
            align: "center" as const,
            headerAlign: "center" as const,
          },
        ]
        : []),
    ]
    : [];

  useEffect(() => {
    if (edit) {
      const fetchEmployee = async () => {
        try {
          const resEmployee = await getEmployeeIdByUserId(selectedEmployeeId!);

          let employeeData = Array.isArray(resEmployee)
            ? resEmployee
            : [resEmployee];

          const mappedEmployee = employeeData.map((employee: UserEmployee) => ({
            id: employee.id,
            userId: employee.userId,
            name: employee.name,
            lastName: employee.lastName,
            email: employee.email,
            phone: employee.phone,
            password: employee.password,
            active: employee.active,
            userTypeId: employee.userTypeId,
            serviceIds: employee.serviceIds || [],
            storeId: employee.storeId,
          }));

          if (mappedEmployee.length > 0) {
            const resUser = await getUserById(mappedEmployee[0].userId);

            let userData = Array.isArray(resUser) ? resUser : [resUser];

            const mappedUser = userData.map((user: User) => ({
              id: user.id,
              name: user.name,
              lastName: user.lastName,
              email: user.email,
              phone: user.phone,
              password: user.password,
              userTypeId: user.userTypeId,
              storeId: storeUser,
            }));

            const combined = {
              ...mappedEmployee[0],
              ...mappedUser[0],
            };
            setCombinedData(combined);
          }
        } catch (error) {
          console.error("Error when fetching service type", error);
        }
      };
      fetchEmployee();
    }
  }, [edit, selectedEmployeeId, storeUser]);

  const handleSubmitEmployeeEdit = async () => {
    if (edit) {

      const response = await getEmployeeIdByUserId(formValuesProfessional.id);

      if (response) {
        const { id, userId, active, serviceIds } = response;

        const updatedEmployee = {
          id,
          userId,
          active: formValuesProfessional.active || active,
          serviceIds: formValuesProfessional.serviceIds || serviceIds,
          storeId: storeUser,
        };
        
        const updateEmployeeResponse = await updateEmployee(
          updatedEmployee.id,
          updatedEmployee
        );
        if (updateEmployeeResponse) {
          fetchData();
          enqueueSnackbar("Professional criado com sucesso!", {
            variant: "success",
          });
        }
      }
    }
    handleClose();
  };

  const handleInputChangeProfissional = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, type, checked, value } = event.target;
    setFormValuesProfessional((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "true" : "false") : value,
    }));
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
          rows={rows}
          onRowSelect={handleRowSelect}
          fetchData={fetchData}
          selectedEmployeeId={selectedEmployeeId}
          columns={columns}
          containerRef={containerRef}
          showModal={showModal}
          handleClose={handleClose}
          setFormValuesProfessional={setFormValuesProfessional}
          formValuesProfessional={formValuesProfessional}
          handleInputChangeProfessional={handleInputChangeProfissional} 
          combinedData={combinedData}
          handleSubmit={handleSubmitEmployeeEdit}
        />
        {show && (
          <Modal
            title="Adicionar profissional"
            subTitle="Preencha as informações abaixo para criar um novo profissional."
            handleSubmit={handleSubmitEmployeeAdd}
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
