import React from "react";
import { Check } from "lucide-react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import * as S from "./Landing.styles";
import { useNavigate } from "react-router-dom";
import Particles from "../../components/ReactBits/ReactBits";
import LightRays from "../../components/ReactBits/ReactBits";

const PricingFeatureList = ({ features }: { features: string[] }) => (
  <ul
    style={{
      marginTop: "2rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      paddingLeft: ".6rem",
      listStyle: "none",
    }}
  >
    {features.map((feature: string, index: number) => (
      <li
        key={index}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
          color: "#4b5563",
        }}
      >
        <Check
          style={{
            width: "1.25rem",
            height: "1.25rem",
            marginTop: "0.25rem",
            flexShrink: 0,
            color: "#22c55e",
          }}
        />
        <span>{feature}</span>
      </li>
    ))}
  </ul>
);

function Landing() {
  const breakpoint = "lg";

  // Estilo do span de preço (reutilizável)
  const priceStyle = {
    fontSize: "2.875rem",
    fontWeight: "bold",
    color: "#2c2c2c",
  };

  const navigate = useNavigate();

  return (
    <S.ContainerLanding>
      {/* Navbar Fixa e Responsiva */}
      <Navbar
        fixed="top"
        bg="white"
        data-bs-theme="light"
        expand={breakpoint}
        className="border-bottom" // Usando classe utilitária do Bootstrap
      >
        <Container fluid className="mx-lg-5 px-lg-5">
          <Navbar.Brand href="#home">
            <h1 style={{ fontWeight: "600" }}>
              reserve<span style={{ color: "#f16d55" }}>.ly</span>
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto gap-3 ">
              <Nav.Link href="#about">Sobre</Nav.Link>
              <Nav.Link href="#features">Funcionalidades</Nav.Link>
              <Nav.Link href="#pricing">Preços</Nav.Link>
              {/* <Nav.Link href="#contact">Contato</Nav.Link> */}
            </Nav>

            <S.ContainerButton className="d-flex justify-content-center justify-content-lg-end mt-2 mt-lg-0">
              <p onClick={() => navigate("/home")} className="mb-0">
                Entrar
              </p>
            </S.ContainerButton>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Seção Hero */}
      <S.Hero className="pt-5 mt-5">
        <Particles
         particleColors={['#2c2c2c', '#f16d55']}
          particleCount={100}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={50}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
        <span style={{ fontWeight: "600", fontSize: "4rem", zIndex: 1 }}>
          reserve<span style={{ color: "#f16d55" }}>.ly</span>
        </span>
        <h2 className="my-3 text-center" style={{ zIndex: 1 }}>
          Simplifique seus agendamentos
        </h2>
        <p className="text-center" style={{ zIndex: 1 }}>
          A plataforma completa para gerenciar agendamentos, equipes e clientes
          em um só lugar.
        </p>
        <S.StartButton className="mt-3" onClick={() => navigate("/home")}>
          Começar Agora
        </S.StartButton>
      </S.Hero>

      {/* Seção Sobre */}
      <S.About id="about" className="py-5">
        <span
          style={{ fontWeight: "600", fontSize: "2.25rem", margin: "1rem 0" }}
        >
          Sobre o reserve<span style={{ color: "#f16d55" }}>.ly</span>
        </span>
        <h3 className="text-center">
          Transformando a gestão de agendamentos em uma experiência{" "}
          <span style={{ fontWeight: "600" }}>simples e eficiente</span>
        </h3>
        <Row className="gy-4 mt-4 mb-5">
          <Col lg={6} md={12}>
            <h2>Nossa História</h2>
            <p className="my-3">
              O Reservely nasceu da necessidade de simplificar o complexo
              processo de agendamentos para empresas de todos os tamanhos.
              Percebemos que muitos negócios enfrentavam dificuldades com
              sistemas complicados, caros e pouco intuitivos.
            </p>
            <p>
              Desenvolvemos uma plataforma completa que une tecnologia de ponta
              com simplicidade, permitindo que empresários foquem no que
              realmente importa:{" "}
              <span style={{ fontWeight: "600" }}>crescer seus negócios</span> e
              atender melhor seus clientes.
            </p>
          </Col>
          <Col lg={6} md={12}>
            <h2>Nossa Missão</h2>
            <p className="my-3">
              <span style={{ fontWeight: "600" }}>Democratizar o acesso</span> a
              ferramentas profissionais de gestão de agendamentos, tornando-as
              acessíveis para negócios de todos os portes.
            </p>
            <p>
              Acreditamos que toda empresa merece ter{" "}
              <span style={{ fontWeight: "600" }}>controle total</span> sobre
              seus agendamentos, equipes e análises, sem complicações técnicas
              ou custos proibitivos.
            </p>
          </Col>
        </Row>

        <S.Analytics className="mb-5">
          <Row className="w-100">
            <Col lg={4} md={12}>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <S.AnalyticsValue>100%</S.AnalyticsValue>
                <p className="mt-2 text-center">
                  <span style={{ fontWeight: "600" }}>Intuitivo</span> e fácil
                  de usar
                </p>
              </div>
            </Col>
            <Col lg={4} md={12}>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <S.AnalyticsValue>Analytics</S.AnalyticsValue>
                <p className="mt-2 text-center">
                  Dashboard para análise de dados
                </p>
              </div>
            </Col>
            <Col lg={4} md={12}>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <S.AnalyticsValue style={{ fontSize: "3rem" }}>
                  &infin;
                </S.AnalyticsValue>
                <p className="mt-2 text-center">
                  Agendamentos{" "}
                  <span style={{ fontWeight: "600" }}>ilimitados</span>
                </p>
              </div>
            </Col>
          </Row>
        </S.Analytics>
      </S.About>

      {/* Seção de Funcionalidades */}
      <S.Feature id="features" className="py-5">
        <span
          style={{
            fontWeight: "600",
            fontSize: "2.25rem",
            margin: "1rem 0",
            textAlign: "center",
          }}
        >
          Tudo que você precisa para crescer
        </span>
        <h3 style={{ marginBottom: "2rem", textAlign: "center" }}>
          Ferramentas profissionais para gerenciar seu negócio de forma{" "}
          <span style={{ fontWeight: "600" }}>simples e eficiente</span>
        </h3>

        <Row className="gy-4 w-100">
          <S.Card lg={4} md={6} sm={12}>
            <div>
              {/* Ícone de Calendário */}
              <S.FeatureIcon viewBox="0 0 24 24">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M416 64C433.7 64 448 78.3 448 96L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 96C192 78.3 206.3 64 224 64C241.7 64 256 78.3 256 96L256 128L384 128L384 96C384 78.3 398.3 64 416 64zM438 225.7C427.3 217.9 412.3 220.3 404.5 231L285.1 395.2L233 343.1C223.6 333.7 208.4 333.7 199.1 343.1C189.8 352.5 189.7 367.7 199.1 377L271.1 449C276.1 454 283 456.5 289.9 456C296.8 455.5 303.3 451.9 307.4 446.2L443.3 259.2C451.1 248.5 448.7 233.5 438 225.7z" />
                </svg>{" "}
              </S.FeatureIcon>
              <span style={{ fontWeight: "500", margin: ".2rem 0 .3rem 0" }}>
                Agendamento Inteligente
              </span>
              <span style={{ fontSize: ".9rem" }}>
                Sistema completo de calendário com múltiplos horários e serviços
                simultâneos.
              </span>
            </div>
          </S.Card>
          <S.Card lg={4} md={6} sm={12}>
            <div>
              {/* Ícone de Gráfico */}
              <S.FeatureIcon viewBox="0 0 24 24">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M128 128C128 110.3 113.7 96 96 96C78.3 96 64 110.3 64 128L64 464C64 508.2 99.8 544 144 544L544 544C561.7 544 576 529.7 576 512C576 494.3 561.7 480 544 480L144 480C135.2 480 128 472.8 128 464L128 128zM534.6 214.6C547.1 202.1 547.1 181.8 534.6 169.3C522.1 156.8 501.8 156.8 489.3 169.3L384 274.7L326.6 217.4C314.1 204.9 293.8 204.9 281.3 217.4L185.3 313.4C172.8 325.9 172.8 346.2 185.3 358.7C197.8 371.2 218.1 371.2 230.6 358.7L304 285.3L361.4 342.7C373.9 355.2 394.2 355.2 406.7 342.7L534.7 214.7z" />
                </svg>{" "}
              </S.FeatureIcon>
              <span style={{ fontWeight: "500", margin: ".2rem 0 .3rem 0" }}>
                Análises Detalhadas
              </span>
              <span style={{ fontSize: ".9rem" }}>
                Dashboards completos com métricas de receita, cancelamentos e
                performance.
              </span>
            </div>
          </S.Card>
          <S.Card lg={4} md={6} sm={12}>
            <div>
              {/* Ícone de Raio/Automação */}
              <S.FeatureIcon viewBox="0 0 24 24">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z" />
                  </svg>{" "}
                </svg>{" "}
              </S.FeatureIcon>
              <span style={{ fontWeight: "500", margin: ".2rem 0 .3rem 0" }}>
                Automação Total
              </span>
              <span style={{ fontSize: ".9rem" }}>
                Notificações automáticas, lembretes e confirmações para seus
                clientes.
              </span>
            </div>
          </S.Card>
          <S.Card lg={4} md={6} sm={12}>
            <div>
              {/* Ícone de Equipe/Pessoas */}
              <S.FeatureIcon viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </S.FeatureIcon>
              <span style={{ fontWeight: "500", margin: ".2rem 0 .3rem 0" }}>
                Gestão de Equipe
              </span>
              <span style={{ fontSize: ".9rem" }}>
                Gerencie múltiplos funcionários, horários e serviços de forma
                eficiente.
              </span>
            </div>
          </S.Card>
          <S.Card lg={4} md={6} sm={12}>
            <div>
              {/* Ícone de Relógio/24h */}
              <S.FeatureIcon viewBox="0 0 24 24">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z" />
                </svg>
              </S.FeatureIcon>
              <span style={{ fontWeight: "500", margin: ".2rem 0 .3rem 0" }}>
                24/7 Disponível
              </span>
              <span style={{ fontSize: ".9rem" }}>
                Seus clientes podem agendar a qualquer hora, de qualquer lugar.
              </span>
            </div>
          </S.Card>
          <S.Card lg={4} md={6} sm={12}>
            <div>
              {/* Ícone de Cadeado/Segurança */}
              <S.FeatureIcon viewBox="0 0 24 24">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M256 160L256 224L384 224L384 160C384 124.7 355.3 96 320 96C284.7 96 256 124.7 256 160zM192 224L192 160C192 89.3 249.3 32 320 32C390.7 32 448 89.3 448 160L448 224C483.3 224 512 252.7 512 288L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 288C128 252.7 156.7 224 192 224z" />
                </svg>
              </S.FeatureIcon>
              <span style={{ fontWeight: "500", margin: ".2rem 0 .3rem 0" }}>
                Dados Seguros
              </span>
              <span style={{ fontSize: ".9rem" }}>
                Proteção completa dos dados dos seus clientes com criptografia
                avançada.
              </span>
            </div>
          </S.Card>
        </Row>
      </S.Feature>

      {/* Seção de Preços */}
      <S.Feature id="pricing" className="py-5">
        <span
          style={{
            fontWeight: "600",
            fontSize: "2.25rem",
            margin: "1rem 0",
            textAlign: "center",
          }}
        >
          Planos para todos os tamanhos
        </span>
        <h3 style={{ marginBottom: "2rem", textAlign: "center" }}>
          Escolha o plano ideal para o seu negócio e{" "}
          <span style={{ fontWeight: "600" }}>
            comece a crescer hoje mesmo!
          </span>
        </h3>

        <Row className="gy-4 w-100 justify-content-center">
          {/* Plano Essencial */}
          <Col md={10} lg={4}>
            <S.PricingCard>
              <h2>Essencial</h2>
              <p>Ideal para equipes pequenas.</p>
              <p style={{ marginTop: "3rem" }}>
                R$ <span style={priceStyle}>1,00</span> <span>/mês</span>
              </p>
              <PricingFeatureList
                features={[
                  "Até 2 funcionários",
                  "Agendamento Online ilimitado",
                  "Notificação de agendamento",
                ]}
              />
            </S.PricingCard>
          </Col>

          {/* Plano Profissional */}
          <Col md={10} lg={4}>
            <S.PricingCard>
              <h2>Profissional</h2>
              <p>Ideal para negócios em crescimento.</p>
              <p style={{ marginTop: "3rem" }}>
                R$ <span style={priceStyle}>99,90</span> <span>/mês</span>
              </p>
              <PricingFeatureList
                features={[
                  "Tudo do Essencial",
                  "Relatórios via Dashboard",
                  "Gestão de equipe ilimitada",
                ]}
              />
            </S.PricingCard>
          </Col>

          {/* Plano Enterprise */}
          <Col md={10} lg={4}>
            <S.PricingCard>
              <h2>Enterprise</h2>
              <p>Ideal para grandes operações.</p>
              <p style={{ marginTop: "3rem" }}>
                R$ <span style={priceStyle}>149,90</span> <span>/mês</span>
              </p>
              <PricingFeatureList
                features={[
                  "Tudo do Profissional",
                  "Planejamento financeiro",
                  "Marketing Digital",
                ]}
              />
            </S.PricingCard>
          </Col>
        </Row>
      </S.Feature>
      <S.Footer id="contact">
        <Container className="h-100 px-lg-5">
          {/* Seção Call-to-Action - Retirada da Seção Pricing Card*/}
          <S.FooterCTA>
            <h2>Pronto para transformar seu negócio?</h2>
            <p>
              Junte-se a centenas de empresas que já simplificaram seus
              agendamentos com o Reservely
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
              <S.StartButton onClick={() => navigate("/home")}>
                Começar &rarr;
              </S.StartButton>
              {/* <S.WhiteButton>Fale Conosco</S.WhiteButton> */}
            </div>
          </S.FooterCTA>

          {/* Seção de Links */}

          {/* Direitos Autorais */}
          <S.Copyright>
            © 2025 Reservely. Todos os direitos reservados.
          </S.Copyright>
        </Container>
      </S.Footer>
    </S.ContainerLanding>
  );
}

export default Landing;
