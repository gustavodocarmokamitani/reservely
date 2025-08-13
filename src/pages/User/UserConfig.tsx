import React, { useContext, useEffect, useState } from "react";
import {
  ContainerHeader,
  ContainerPage,
  ContentHeader,
  ContentHeaderImg,
  SubTitle,
  Title,
} from "../Styles/_Page.styles";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { Paragraph } from "../../components/Paragraph/Paragraph";
import { Col, Row } from "react-bootstrap";
import {
  changePassword,
  getUserById,
  updateUser,
} from "../../services/UserServices";
import { AppContext } from "../../context/AppContext";
import { DecodedToken } from "../../models/DecodedToken";
import { decodeToken } from "../../services/AuthService";
import { useSnackbar } from "notistack";
import Loading from "../../components/Loading/loading";
import { ChangePasswordRequest } from "../../models/ChangePasswordRequest";
import UserMenu from "../../components/UserMenu/UserMenu";
import { capitalizeFirstLetter } from "../../services/system/globalService";

export default function UserConfig() {
  const { enqueueSnackbar } = useSnackbar();
  const context = useContext(AppContext);

  const authToken = context?.authToken;

  const [decodedData, setDecodedData] = useState<DecodedToken | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    userTypeId: "",
    storeId: 0,
  });

  useEffect(() => {
    const fetchDecodedToken = async () => {
      if (authToken) {
        try {
          const decoded = await decodeToken(authToken);
          setDecodedData(decoded);
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
        }
      }
    };

    fetchDecodedToken();
  }, [authToken]);

  useEffect(() => {
    if (decodedData) {
      fetchData();
    }
  }, [decodedData]);

  const fetchData = async () => {
    try {
      if (decodedData?.userId) {
        const responseUser = await getUserById(Number(decodedData.userId));
        setUserData(responseUser);
        setFormData({
          name: responseUser.name,
          lastName: responseUser.lastName,
          email: responseUser.email,
          phone: responseUser.phone,
          password: "",
          newPassword: "",
          confirmPassword: "",
          userTypeId: responseUser.userTypeId || "",
          storeId: responseUser.storeId || 0,
        });
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateUser = async () => {
    setIsLoading(true);
 
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      enqueueSnackbar("Por favor, insira um endereço de e-mail válido.", {
        variant: "default",
      });
      setIsLoading(false);
      return;
    }
 
    if (
      formData.newPassword.length !== 0 ||
      formData.confirmPassword.length !== 0
    ) {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

      if (!passwordRegex.test(formData.newPassword)) {
        enqueueSnackbar(
          "A nova senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, um número e um caractere especial.",
          { variant: "default" }
        );
        setIsLoading(false);
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        enqueueSnackbar("As novas senhas não são iguais. Tente novamente.", {
          variant: "default",
        });
        setIsLoading(false);
        return;
      }

      if (formData.password.length === 0) {
        enqueueSnackbar(
          "Por favor, insira a senha atual para alterar a senha.",
          {
            variant: "default",
          }
        );
        setIsLoading(false);
        return;
      }
    }

    const updatedUser = {
      ...userData,
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: "",
    };

    await updateUser(Number(decodedData?.userId), updatedUser);

    try {
      if (formData.newPassword.length !== 0) {
        const passwordRequest: ChangePasswordRequest = {
          CurrentPassword: formData.password, 
          NewPassword: formData.newPassword, 
        };

        await changePassword(Number(decodedData?.userId), passwordRequest);
      }

      enqueueSnackbar("Dados atualizados com sucesso.", { variant: "success" });
      window.location.reload();
      setIsLoading(false);
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        if (status === 400) {
          if (
            typeof data === "string" &&
            data.includes("Current password is incorrect")
          ) {
            enqueueSnackbar("Senha atual incorreta.", { variant: "error" });
          } else {
            enqueueSnackbar("Erro ao atualizar os dados.", {
              variant: "error",
            });
          }
        }
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <ContainerPage style={{ height: "100%" }}>
        <UserMenu />
        <ContainerHeader>
          <ContentHeader align="start">
            <Title>
              Configuração do Usuário <br />
            </Title>
            <SubTitle>
              Área destinada para realizar atualização do usuário.
            </SubTitle>
          </ContentHeader>
          <ContentHeaderImg align="end">
            <Button
              onClick={() => {
                handleUpdateUser();
              }}
              $isConfirm
              type="button"
            />
          </ContentHeaderImg>
        </ContainerHeader>

        <Row className="px-5 px-sm-0">
          <Col sx={12} md={6} lg={6} xl={3} className="my-2">
            <Paragraph text="Fistname" />
            <Input
              name="name"
              onChange={handleInputChange}
              type="text"
              placeholder="Fistname"
              value={capitalizeFirstLetter(formData?.name)}
            />
          </Col>
          <Col sx={12} md={6} lg={6} xl={3} className="my-2">
            <Paragraph text="Lastname" />
            <Input
              name="lastName"
              onChange={handleInputChange}
              type="text"
              placeholder="Lastname"
              value={capitalizeFirstLetter(formData?.lastName)}
            />
          </Col>
          <Col sx={12} md={6} lg={6} xl={3} className="my-2">
            <Paragraph text="Email" />
            <Input
              name="email"
              onChange={handleInputChange}
              type="email"
              placeholder="Email"
              value={formData?.email.toLocaleLowerCase()}
            />
          </Col>
          <Col sx={12} md={6} lg={6} xl={3} className="my-2">
            <Paragraph text="Phone" />
            <Input
              name="phone"
              onChange={handleInputChange}
              phone
              type="text"
              placeholder="Phone"
              value={formData?.phone}
            />
          </Col>
        </Row>
        <Row className="px-5 px-sm-0 pt-2">
          <Col sx={12} md={6} lg={6} xl={3} className="my-2">
            <Paragraph text="Password" />
            <Input
              name="password"
              onChange={handleInputChange}
              type="password"
              placeholder="Password"
            />
          </Col>
          <Col sx={12} md={6} lg={6} xl={3} className="my-2">
            <Paragraph text="New Password" />
            <Input
              name="newPassword"
              onChange={handleInputChange}
              type="password"
              placeholder="New Password"
            />
          </Col>
          <Col sx={12} md={6} lg={6} xl={3} className="my-2">
            <Paragraph text="Confirm Password" />
            <Input
              name="confirmPassword"
              onChange={handleInputChange}
              type="password"
              placeholder="Confirm Password"
            />
          </Col>
        </Row>
      </ContainerPage>
    </>
  );
}
