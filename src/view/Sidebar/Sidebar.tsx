import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { Col, Row } from "react-bootstrap";
import * as S from "./Sidebar.styles";
import OptionNavigation from "../../components/OptionNavigation/OptionNavigation";
import store from "../../assets/store.svg";
import dashboard from "../../assets/dashboard.svg";
import service from "../../assets/service.svg";
import logo from "../../assets/logo.png";
import chamada from "../../assets/chamada.svg";
import calendar from "../../assets/calendar.svg";
import professionalCheck from "../../assets/professionalCheck.svg";
import professionalRegister from "../../assets/professionalRegister.svg";
import appointmentHistory from "../../assets/apppointmentHistory.svg";
import exit from "../../assets/exit.svg";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(AppContext);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => { 
    const path = location.pathname;
    const menuPaths = [
      "/appointment",
      "/appointment-history",
      "/calendar",
      "/dashboard",
      "/service",
      "/professional-register",
      "/professional",
      "/store",      
      // "/payment",
      "/store-configure"  
    ];

    const newIndex = path === "/store-configure" ? menuPaths.indexOf("/store") : menuPaths.indexOf(path);
 
    setSelectedIndex(newIndex >= 0 ? newIndex : 0); 
 
    const itemRef = menuItemsRef.current[selectedIndex];
    if (itemRef) {
      const offsetTop = itemRef.offsetTop;
      const itemHeight = itemRef.offsetHeight;
      setIndicatorTop(
        window.innerWidth < 1468
          ? (offsetTop + itemHeight / 2 - itemHeight + 22) / 12
          : (offsetTop + itemHeight / 2 - itemHeight + 22) / 16
      );
      
    }
  }, [location, selectedIndex]); 

  const logout = () => {
    localStorage.removeItem("authToken");
    if (context?.setAuthToken) context.setAuthToken(null);
    if (context?.setUserContext) context.setUserContext(null);
    if (context?.setEmployeeContext) context.setEmployeeContext(null);
    if (context?.setUserEmployeeContext) context.setUserEmployeeContext(null);

    navigate("/login");
  };

  return (
    <S.SidebarContainer className="d-flex flex-column" style={{ height: "100vh" }}>
      <Row className="pt-1 d-flex align-items-center justify-content-center" style={{ height: "130px" }}>
        <Col className="d-flex justify-content-center">
          <img src={logo} alt="AgendaI" />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h2 style={{ paddingLeft: "20px" }}>Acesso rápido</h2>
        </Col>
      </Row>

      <div className="flex-grow-1" style={{ position: "relative" }}>
        {[
          { path: "/appointment", icon: chamada, text: "Agendamento" },
          { path: "/appointment-history", icon: appointmentHistory, text: "Histórico Agendamento" },
          { path: "/calendar", icon: calendar, text: "Calendário" },
          { path: "/dashboard", icon: dashboard, text: "Dashboard" },
          { path: "/service", icon: service, text: "Serviços" },
          { path: "/professional-register", icon: professionalRegister, text: "Registrar Profissionais" },
          { path: "/professional", icon: professionalCheck, text: "Profissionais" },
          { path: "/store", icon: store, text: "Loja" },
          // { path: "/payment", icon: payment, text: "Formas de Pagamentos" },
        ].map(({ path, icon, text }, index) => (
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
                  icon={<img src={icon} alt={text} style={{ width: "1.56rem" }} />}
                  text={text}
                />
              </S.StyledRow>
            </Link>
          </S.MenuContainer>
        ))}
      </div>

      <S.MenuContainer style={{ borderTop: "1px solid gray" }}>
        <Row
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100%", paddingLeft: "20px" }}
          onClick={logout}
        >
          <OptionNavigation
            icon={<img src={exit} alt="exit" style={{ width: "25px" }} />}
            text="Sair"
          />
        </Row>
      </S.MenuContainer>
    </S.SidebarContainer>
  );
};

export default Navigation;
