import { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import {
  FiDownload,
  FiPieChart,
  FiClock,
  FiDollarSign,
  FiBarChart2,
  FiTool,
  FiAlertTriangle,
} from "react-icons/fi";

const ViewportWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  width: 95dvw;

  height: 100dvh;
  max-height: 100dvh;

  margin: 0 auto;
  padding: 48px;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 90%;
  height: 100%;
  padding-bottom: 24px;
`;

const HeaderContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 16px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #f2f2f2;
  font-weight: 500;
`;

const Subtitle = styled.p`
  color: #a8a8b3;
  font-size: 1rem;
  margin-top: 4px;
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #d9652b;
  color: #f2f2f2;
  border: none;
  border-radius: 18px;
  padding: 14px 24px;
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
`;

const ScrollableArea = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-right: 12px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(32, 32, 36, 0.4);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d9652b;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #bf5824;
  }

  scrollbar-width: thin;
  scrollbar-color: #d9652b #0b0b0d;
`;

const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

const GlassCard = styled.div`
  background: rgba(32, 32, 36, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(242, 242, 242, 0.08);
  border-radius: 18px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 8px 32px rgba(18, 18, 20, 0.4);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconBox = styled.div<{ $color: string; $bg: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const CardTitle = styled.h3`
  color: #a8a8b3;
  font-size: 1.1rem;
  font-weight: 500;
`;

const CardValue = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  color: #f2f2f2;
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

const CardUnit = styled.span`
  font-size: 1.2rem;
  color: #7c7c8a;
  font-weight: 400;
`;

const SplitMetrics = styled.div`
  display: flex;
  gap: 24px;
  margin-top: -8px;
`;

const MetricBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MetricLabel = styled.span`
  color: #7c7c8a;
  font-size: 0.9rem;
`;

const MetricValue = styled.span<{ $color?: string }>`
  color: ${({ $color }) => $color || "#f2f2f2"};
  font-size: 1.2rem;
  font-weight: 600;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const BarRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #e1e1e6;
  font-size: 1rem;
`;

const BarTrack = styled.div`
  width: 100%;
  height: 12px;
  background-color: rgba(242, 242, 242, 0.05);
  border-radius: 6px;
  overflow: hidden;
`;

const BarFill = styled.div<{ $width: number; $color: string }>`
  width: 0%;
  height: 100%;
  background-color: ${({ $color }) => $color};
  border-radius: 6px;
`;

const chartData = [
  { label: "Torno Mecânico #01", value: 14, max: 20, color: "#D9652B" },
  { label: "Fresadora CNC #02", value: 8, max: 20, color: "#E53935" },
  { label: "Furadeira #03", value: 3, max: 20, color: "#4CAF50" },
];

export const Relatorios = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline();

    if (scrollRef.current) {
      tl.fromTo(
        scrollRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
      );
    }

    barsRef.current.forEach((bar, index) => {
      if (bar) {
        const targetWidth =
          (chartData[index].value / chartData[index].max) * 100;
        tl.to(
          bar,
          { width: `${targetWidth}%`, duration: 1, ease: "power3.out" },
          "-=0.4",
        );
      }
    });
  }, []);

  return (
    <ViewportWrapper>
      <Container>
        <HeaderContainer>
          <TitleBox>
            <Title>Relatórios Gerenciais</Title>
            <Subtitle>Painel analítico e KPIs de manutenção</Subtitle>
          </TitleBox>

          <ExportButton>
            <FiDownload size={20} />
            Exportar em PDF
          </ExportButton>
        </HeaderContainer>

        <ScrollableArea ref={scrollRef}>
          <KPIGrid>
            <GlassCard>
              <CardHeader>
                <IconBox $color="#2196F3" $bg="rgba(33, 150, 243, 0.1)">
                  <FiPieChart />
                </IconBox>
                <CardTitle>Total de Manutenções</CardTitle>
              </CardHeader>
              <CardValue>
                57 <CardUnit>intervenções</CardUnit>
              </CardValue>
              <SplitMetrics>
                <MetricBox>
                  <MetricLabel>Preventivas</MetricLabel>
                  <MetricValue $color="#4CAF50">45</MetricValue>
                </MetricBox>
                <MetricBox>
                  <MetricLabel>Corretivas</MetricLabel>
                  <MetricValue $color="#E53935">12</MetricValue>
                </MetricBox>
              </SplitMetrics>
            </GlassCard>

            <GlassCard>
              <CardHeader>
                <IconBox $color="#E53935" $bg="rgba(229, 57, 53, 0.1)">
                  <FiClock />
                </IconBox>
                <CardTitle>Tempo de Parada (Downtime)</CardTitle>
              </CardHeader>
              <CardValue>
                34 <CardUnit>horas/mês</CardUnit>
              </CardValue>
              <SplitMetrics>
                <MetricBox>
                  <MetricLabel>Média por Máquina</MetricLabel>
                  <MetricValue>11.3h</MetricValue>
                </MetricBox>
              </SplitMetrics>
            </GlassCard>

            <GlassCard>
              <CardHeader>
                <IconBox $color="#4CAF50" $bg="rgba(76, 175, 80, 0.1)">
                  <FiDollarSign />
                </IconBox>
                <CardTitle>Custos Acumulados</CardTitle>
              </CardHeader>
              <CardValue>
                <CardUnit style={{ fontSize: "1.5rem" }}>R$</CardUnit> 14.500
              </CardValue>
              <SplitMetrics>
                <MetricBox>
                  <MetricLabel>Peças de Reposição</MetricLabel>
                  <MetricValue>R$ 9.200</MetricValue>
                </MetricBox>
                <MetricBox>
                  <MetricLabel>Serviços Técnicos</MetricLabel>
                  <MetricValue>R$ 5.300</MetricValue>
                </MetricBox>
              </SplitMetrics>
            </GlassCard>
          </KPIGrid>

          <GlassCard style={{ flex: 1 }}>
            <CardHeader
              style={{
                borderBottom: "1px solid rgba(242, 242, 242, 0.08)",
                paddingBottom: "16px",
              }}
            >
              <IconBox $color="#D9652B" $bg="rgba(217, 101, 43, 0.1)">
                <FiBarChart2 />
              </IconBox>
              <TitleBox>
                <CardTitle style={{ color: "#f2f2f2", fontSize: "1.2rem" }}>
                  Falhas Mais Frequentes por Equipamento
                </CardTitle>
                <Subtitle style={{ fontSize: "0.9rem", marginTop: 0 }}>
                  Distribuição de manutenções corretivas no período
                </Subtitle>
              </TitleBox>
            </CardHeader>

            <ChartContainer>
              {chartData.map((data, index) => (
                <BarRow key={index}>
                  <BarHeader>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {data.color === "#E53935" ? (
                        <FiAlertTriangle color={data.color} />
                      ) : (
                        <FiTool color={data.color} />
                      )}
                      {data.label}
                    </div>
                    <strong>{data.value} falhas</strong>
                  </BarHeader>
                  <BarTrack>
                    <BarFill $width={0} $color={data.color} />
                  </BarTrack>
                </BarRow>
              ))}
            </ChartContainer>
          </GlassCard>
        </ScrollableArea>
      </Container>
    </ViewportWrapper>
  );
};
