
// React & Hooks
import { useContext, useState, useEffect, useRef } from "react";

// Router
import { useNavigate, Link, useLocation } from "react-router-dom";

// Context
import { AppContext } from "../../context/AppContext";

// Bootstrap
import { Col, Row } from "react-bootstrap";

// Styles
import * as S from "./Sidebar.styles";

// Components
import OptionNavigation from "../../components/OptionNavigation/OptionNavigation";

// Assets
import store from "../../assets/store.svg";
import dashboard from "../../assets/dashboard.svg";
import service from "../../assets/service.svg";
import logo from "../../assets/logo.png";
import chamada from "../../assets/chamada.svg";
import calendar from "../../assets/calendar.svg";
import professionalCheck from "../../assets/professionalCheck.svg";
import professionalRegister from "../../assets/professionalRegister.svg";
import appointmentHistory from "../../assets/apppointmentHistory.svg";
import subscript from "../../assets/subscript.svg";
import exit from "../../assets/exit.svg";
import arrow from "../../assets/arrow.svg";

// Models
import { DecodedToken } from "../../models/DecodedToken";

// Services
import { decodeToken } from "../../services/AuthService";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(AppContext);

  const [sidebarCollapse, setSidebarCollapse] = useState<boolean>(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const authToken = context?.authToken;

  const [decodedData, setDecodedData] = useState<DecodedToken | null>(null);

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

  //QUANDO ADICIONAR NOVA ROTA, ADICIONAR TAMBÉM AQUI   (offsetTop + itemHeight / 2 - itemHeight + 28) / 16
  const menuOptions =
    decodedData?.userRole !== "Client"
      ? [
          { path: "/subscription", icon: subscript, text: "Assinatura" },
          { path: "/appointment", icon: chamada, text: "Agendamento" },
          {
            path: "/history-appointment",
            icon: appointmentHistory,
            text: "Histórico Agendamento",
          },
          { path: "/calendar", icon: calendar, text: "Calendário" },
          { path: "/dashboard", icon: dashboard, text: "Dashboard" },
          { path: "/service", icon: service, text: "Serviços" },
          {
            path: "/professional-register",
            icon: professionalRegister,
            text: "Registrar Profissionais",
          },
          {
            path: "/professional",
            icon: professionalCheck,
            text: "Profissionais",
          },
          { path: "/store", icon: store, text: "Loja" },
          // { path: "/payment", icon: payment, text: "Formas de Pagamentos" },
        ]
      : [
          { path: "/home-client/:", icon: professionalCheck, text: "Home" },
          // {
          //   path: "/appointment-client/:",
          //   icon: chamada,
          //   text: "Agendamento",
          // },
          // { path: "/rating", icon: calendar, text: "Avaliação" },
        ];

  useEffect(() => {
    const path = location.pathname;

    const matchedOption = menuOptions.find((option) =>
      path.startsWith(option.path)
    );

    if (matchedOption) {
      const newIndex = menuOptions.findIndex(
        (option) => option.path === matchedOption.path
      );
      setSelectedIndex(newIndex);

      const itemRef = menuItemsRef.current[newIndex];
      if (itemRef) {
        const offsetTop = itemRef.offsetTop;
        const itemHeight = itemRef.offsetHeight;
        window.innerWidth <= 768
          ? setIndicatorTop((offsetTop + itemHeight / 2 - itemHeight + 29) / 16)
          : setIndicatorTop(
              (offsetTop + itemHeight / 2 - itemHeight + 23) / 16
            );
      }
    } else {
      setSelectedIndex(-1);
      setIndicatorTop(50);
    }
  }, [location, menuOptions]);

  const logout = () => {
    localStorage.removeItem("authToken");
    if (context?.setAuthToken) context.setAuthToken(null);
    if (context?.setUserContext) context.setUserContext(null);
    if (context?.setEmployeeContext) context.setEmployeeContext(null);
    if (context?.setUserEmployeeContext) context.setUserEmployeeContext(null);

    navigate("/login");
  };

  const handleSidebarCollapse = () => {
    setSidebarCollapse(!sidebarCollapse);
  };

  return (
    <>
      <div style={{ position: "absolute", zIndex: "888" }}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: `${!sidebarCollapse ? "flex" : "none"}`,
              width: "20rem",
            }}
          >
            <S.SidebarContainer
              className="d-flex flex-column"
              style={{ height: "100vh", width: "20rem" }}
            >
              <Row
                className="pt-1 d-flex align-items-center justify-content-center"
                style={{ height: "130px" }}
              >
                <Col className="d-flex justify-content-center mt-3">
                  <img width={85} src={logo} alt="reserve.ly" />
                </Col>
              </Row>
              <Row></Row>
              <hr />
              <div className="flex-grow-1" style={{ position: "relative" }}>
                {menuOptions.map(({ path, icon, text }, index) => (
                  <S.MenuContainer
                    key={path}
                    ref={(el) => (menuItemsRef.current[index] = el)}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <Link to={path} style={{ textDecoration: "none" }}>
                      <S.StyledRow
                        isSelected={location.pathname === path}
                        className={location.pathname === path ? "selected" : ""}
                      >
                        <S.Indicator top={indicatorTop} />
                        <OptionNavigation
                          icon={
                            <img
                              src={icon}
                              alt={text}
                              style={{ width: "1.56rem" }}
                            />
                          }
                          text={text}
                        />
                      </S.StyledRow>
                    </Link>
                  </S.MenuContainer>
                ))}
                <S.MenuContainer>
                  <Row
                    className="d-flex align-items-center justify-content-center"
                    style={{ height: "100%", paddingLeft: "20px" }}
                    onClick={logout}
                  >
                    {/* <OptionNavigation
                      icon={
                        <img src={exit} alt="exit" style={{ width: "25px" }} />
                      }
                      text="Sair"
                    /> */}
                  </Row>
                </S.MenuContainer>
              </div>
            </S.SidebarContainer>
          </div>
          <div
            style={{
              position: "fixed",
              left: `${!sidebarCollapse ? "20rem" : "0"}`,
              top: "40%",
              zIndex: "9999",
            }}
          >
            <div
              onClick={handleSidebarCollapse}
              style={{
                zIndex: "9999",
                cursor: "pointer",
                background: "white",
                padding: "0",
                margin: "0",
                boxShadow: "8px 0px 7px rgba(0, 0, 0, 0.25)",
                width: "35px",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid rgb(180, 180, 180)",
                borderRadius: "0 15px 15px 0",
              }}
            >
              <img
                src={arrow}
                style={{
                  transform: `${!sidebarCollapse ? "rotate(180deg)" : ""}`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
