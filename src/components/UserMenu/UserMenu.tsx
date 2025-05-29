import React, { useEffect, useState } from "react";
import * as S from "./UserMenu.styles";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { decodeToken } from "../../services/AuthService";
import { DecodedToken } from "../../models/DecodedToken";
import { getUserById } from "../../services/UserServices";
import { User } from "../../models/User";
import settings from "../../assets/settings.svg";
import exit from "../../assets/exit.svg";

const UserMenu = () => {
  const [decodedData, setDecodedData] = useState<DecodedToken | null>(null);
  const [user, setUser] = useState<User>();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const context = useContext(AppContext);

  const authToken = context?.authToken;

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

  const fetchData = async () => {
    try {
      if (decodedData?.userId) {
        const responseUser = await getUserById(Number(decodedData.userId));
        setUser(responseUser);
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  useEffect(() => {
    if (decodedData) {
      fetchData();
    }
  }, [decodedData]);

  const logout = () => {
    localStorage.removeItem("authToken");
    if (context?.setAuthToken) context.setAuthToken(null);
    if (context?.setUserContext) context.setUserContext(null);
    if (context?.setEmployeeContext) context.setEmployeeContext(null);
    if (context?.setUserEmployeeContext) context.setUserEmployeeContext(null);
    navigate("/login");
  };

  return (
    <S.Container>
      <S.UserIcon onClick={() => setIsOpen(!isOpen)}>
        Configurações | Logout
        <img style={{ marginLeft: "1rem" }} src={settings} alt="Config" />
      </S.UserIcon>

      {isOpen && (
        <S.Dropdown isOpen={isOpen}>
          <S.DropdownItem onClick={() => {navigate("/user-config"); setIsOpen(false);}}>
            Área Usuário
          </S.DropdownItem>
          <S.DropdownItem onClick={logout}>
            Logout
            <img
              style={{ margin: "0 0 0.1rem 1rem" }}
              src={exit}
              alt="Config"
            />
          </S.DropdownItem>
        </S.Dropdown>
      )}
    </S.Container>
  );
};

export default UserMenu;
