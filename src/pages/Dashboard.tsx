import gsap from "gsap";
import { useEffect, useRef } from "react";
import {
  FiActivity,
  FiAlertTriangle,
  FiBell,
  FiXOctagon,
  FiCamera,
} from "react-icons/fi";
import styled from "styled-components";

const Container = styled.div`
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;

  height: 100dvh;
  max-height: 100dvh;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
`;

const HeaderTitles = styled.div`
  display: flex;
  flex-direction: column;
`;

const WelcomeText = styled.h2`
  font-size: 2rem;
  color: #f2f2f2;
  font-weight: 500;
`;

const DateText = styled.p`
  color: #a8a8b3;
  font-size: 1rem;
  margin-top: 4px;
`;

const ScannerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #d9652b;
  color: #f2f2f2;
  border: none;
  border-radius: 18px;
  padding: 16px 24px;
  font-size: 1.05rem;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(217, 101, 43, 0.2);

  &:hover {
    background-color: #bf5824;
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(217, 101, 43, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

const GlassCard = styled.div<{ $borderColor: string }>`
  background: rgba(32, 32, 36, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(242, 242, 242, 0.08);
  border-left: 4px solid ${({ $borderColor }) => $borderColor};
  border-radius: 18px;
  padding: 32px;
  display: flex;
  align-items: center;
  gap: 24px;
  box-shadow: 0 8px 32px rgba(18, 18, 20, 0.4);
`;

const IconWrapper = styled.div<{ $bgColor: string; $color: string }>`
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  color: #a8a8b3;
  font-size: 1.05rem;
  font-weight: 500;
  margin-bottom: 4px;
`;

const CardValue = styled.span`
  color: #f2f2f2;
  font-size: 2.2rem;
  font-weight: 600;
`;

const NotificationsArea = styled.div`
  background: rgba(32, 32, 36, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(242, 242, 242, 0.08);
  border-radius: 18px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #f2f2f2;
  font-size: 1.2rem;
  font-weight: 500;
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NotificationItem = styled.div<{ $isAlert?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background-color: rgba(18, 18, 20, 0.6);
  border: 1px solid rgba(242, 242, 242, 0.05);
  border-radius: 18px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(8px);
  }
`;

const NotifIndicator = styled.div<{ $isAlert?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ $isAlert }) => ($isAlert ? "#D9652B" : "#4CAF50")};
  box-shadow: 0 0 12px
    ${({ $isAlert }) =>
      $isAlert ? "rgba(217, 101, 43, 0.4)" : "rgba(76, 175, 80, 0.4)"};
`;

const NotifText = styled.p`
  color: #e1e1e6;
  font-size: 1rem;
  flex: 1;
`;

const NotifTime = styled.span`
  color: #7c7c8a;
  font-size: 0.9rem;
`;

export const Dashboard = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    if (mainRef.current) {
      tl.fromTo(
        mainRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      );
    }

    if (buttonRef.current) {
      tl.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.5",
      );
    }

    if (cardsRef.current) {
      tl.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
        "-=0.4",
      );
    }

    if (notifRef.current) {
      tl.fromTo(
        notifRef.current.children,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.2",
      );
    }
  }, []);

  return (
    <Container ref={mainRef}>
      <HeaderContainer>
        <HeaderTitles>
          <WelcomeText>Visão Geral do Sistema</WelcomeText>
          <DateText>Monitoramento em tempo real</DateText>
        </HeaderTitles>

        <ScannerButton ref={buttonRef}>
          <FiCamera size={22} />
          Escanear QR Code
        </ScannerButton>
      </HeaderContainer>

      <CardsGrid ref={cardsRef}>
        <GlassCard $borderColor="#4CAF50">
          <IconWrapper $bgColor="rgba(76, 175, 80, 0.1)" $color="#4CAF50">
            <FiActivity />
          </IconWrapper>
          <CardDetails>
            <CardTitle>Em Operação</CardTitle>
            <CardValue>28</CardValue>
          </CardDetails>
        </GlassCard>

        <GlassCard $borderColor="#D9652B">
          <IconWrapper $bgColor="rgba(217, 101, 43, 0.1)" $color="#D9652B">
            <FiAlertTriangle />
          </IconWrapper>
          <CardDetails>
            <CardTitle>Em Alerta</CardTitle>
            <CardValue>03</CardValue>
          </CardDetails>
        </GlassCard>

        <GlassCard $borderColor="#E53935">
          <IconWrapper $bgColor="rgba(229, 57, 53, 0.1)" $color="#E53935">
            <FiXOctagon />
          </IconWrapper>
          <CardDetails>
            <CardTitle>Paradas</CardTitle>
            <CardValue>01</CardValue>
          </CardDetails>
        </GlassCard>
      </CardsGrid>

      <NotificationsArea>
        <NotificationHeader>
          <FiBell size={24} color="#D9652B" />
          Notificações Recentes
        </NotificationHeader>
        <NotificationList ref={notifRef}>
          <NotificationItem $isAlert>
            <NotifIndicator $isAlert />
            <NotifText>
              Torno Mecânico T-04 atingiu limite de temperatura (78°C) no eixo
              principal.
            </NotifText>
            <NotifTime>Agora</NotifTime>
          </NotificationItem>
          <NotificationItem $isAlert>
            <NotifIndicator $isAlert />
            <NotifText>
              Nível de vibração crítico detectado na Furadeira Fresadora F-02.
            </NotifText>
            <NotifTime>Há 15 min</NotifTime>
          </NotificationItem>
          <NotificationItem>
            <NotifIndicator />
            <NotifText>
              Checklist diário concluído com sucesso pelo técnico João.
            </NotifText>
            <NotifTime>Há 2 horas</NotifTime>
          </NotificationItem>
          <NotificationItem>
            <NotifIndicator />
            <NotifText>
              Manutenção preventiva do Torno T-01 finalizada.
            </NotifText>
            <NotifTime>Ontem</NotifTime>
          </NotificationItem>
        </NotificationList>
      </NotificationsArea>
    </Container>
  );
};
