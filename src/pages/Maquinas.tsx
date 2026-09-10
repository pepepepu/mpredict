import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import {
  FiThermometer,
  FiActivity,
  FiCheckSquare,
  FiClock,
  FiFileText,
  FiAlertCircle,
  FiTool,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  height: 100dvh;
  max-height: 100dvh;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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

const TabsContainer = styled.div`
  display: flex;
  gap: 12px;
  border-bottom: 1px solid rgba(242, 242, 242, 0.08);
  padding-bottom: 16px;
  overflow-x: auto;
`;

const TabButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) =>
    $active ? "rgba(217, 101, 43, 0.15)" : "rgba(32, 32, 36, 0.4)"};
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(217, 101, 43, 0.4)" : "rgba(242, 242, 242, 0.08)"};
  color: ${({ $active }) => ($active ? "#D9652B" : "#A8A8B3")};
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  font-family: inherit;

  &:hover {
    background: rgba(217, 101, 43, 0.1);
    color: #f2f2f2;
  }
`;

const MachineContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 16px;
`;

const ActionButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(32, 32, 36, 0.6);
  border: 1px solid rgba(242, 242, 242, 0.08);
  color: #e1e1e6;
  padding: 12px 20px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: #d9652b;
    border-color: #d9652b;
    color: #fff;
    transform: translateY(-2px);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
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

const IndicatorTitle = styled.h3`
  color: #f2f2f2;
  font-size: 1.2rem;
  font-weight: 500;
`;

const ValueDisplay = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

const MainValue = styled.span<{ $color?: string }>`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${({ $color }) => $color || "#f2f2f2"};
  transition: color 0.3s ease;
`;

const Unit = styled.span`
  color: #a8a8b3;
  font-size: 1.2rem;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: rgba(242, 242, 242, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ $progress: number; $color: string }>`
  width: ${({ $progress }) => $progress}%;
  height: 100%;
  background-color: ${({ $color }) => $color};
  border-radius: 4px;
  transition:
    width 1s ease-in-out,
    background-color 0.3s ease;
`;

const TimelineNote = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: rgba(18, 18, 20, 0.5);
  border-radius: 8px;
  border-left: 3px solid #d9652b;
  font-size: 0.9rem;
  color: #a8a8b3;
`;

const SpecsList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SpecItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px dashed rgba(242, 242, 242, 0.08);
  font-size: 0.95rem;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const SpecLabel = styled.span`
  color: #a8a8b3;
`;

const SpecValue = styled.span`
  color: #f2f2f2;
  font-weight: 500;
`;

const initialMachines = [
  {
    id: "m1",
    name: "Torno Mecânico",
    status: "Em Operação",
    temperature: { current: 48, max: 80, peakTime: "14:32 (Pico de 65°C)" },
    vibration: { level: 2.4, limit: 5.0, peakTime: "10:15 (Pico 4.1 mm/s)" },
    specs: [
      { label: "RPM", value: "Até 2500" },
      { label: "Comprimento do Barramento", value: "1500 mm" },
      { label: "Deslocamento do Carro Transversal", value: "300 mm" },
      { label: "Diâmetro Admissível", value: "460 mm" },
      { label: "Distância entre Placa e Ponto", value: "1000 mm" },
    ],
  },
  {
    id: "m2",
    name: "Furadeira Fresadora",
    status: "Em Operação",
    temperature: { current: 55, max: 85, peakTime: "09:20 (Pico de 60°C)" },
    vibration: { level: 1.8, limit: 4.0, peakTime: "09:25 (Pico 2.5 mm/s)" },
    specs: [
      { label: "Capacidade de Furação", value: "40 mm" },
      { label: "Capacidade de Fresamento", value: "32 mm" },
      { label: "Curso do Eixo Árvore", value: "120 mm" },
      { label: "Cone do Eixo", value: "ISO 30" },
    ],
  },
  {
    id: "m3",
    name: "Fresadora Ferramenteira",
    status: "Em Alerta",
    temperature: { current: 76, max: 80, peakTime: "Agora (Pico de 76°C)" },
    vibration: { level: 4.8, limit: 5.0, peakTime: "Há 5 min (Pico 4.9 mm/s)" },
    specs: [
      { label: "Velocidade do Spindle", value: "8000 RPM" },
      { label: "Curso Eixo X", value: "800 mm" },
      { label: "Curso Eixo Y", value: "500 mm" },
      { label: "Curso Eixo Z", value: "500 mm" },
    ],
  },
];

export const Maquinas = () => {
  const [machinesData, setMachinesData] = useState(initialMachines);
  const [activeTab, setActiveTab] = useState(machinesData[0].id);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMachinesData((prevMachines) =>
        prevMachines.map((machine) => {
          let newTemp = machine.temperature.current + (Math.random() * 4 - 2);
          newTemp = Math.max(30, Math.min(85, newTemp));

          let newVib = machine.vibration.level + (Math.random() * 0.6 - 0.3);
          newVib = Math.max(0.5, Math.min(5.5, newVib));

          return {
            ...machine,
            temperature: {
              ...machine.temperature,
              current: Math.round(newTemp),
            },
            vibration: {
              ...machine.vibration,
              level: parseFloat(newVib.toFixed(1)),
            },
          };
        }),
      );
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  const selectedMachine =
    machinesData.find((m) => m.id === activeTab) || machinesData[0];

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      );
    }
  }, [activeTab]);

  const getTempColor = (temp: number) =>
    temp > 70 ? "#E53935" : temp > 50 ? "#D9652B" : "#4CAF50";

  return (
    <Container>
      <HeaderContainer>
        <div>
          <Title>Monitoramento de Máquinas</Title>
          <Subtitle>Acompanhe os indicadores vitais em tempo real</Subtitle>
        </div>
      </HeaderContainer>

      <TabsContainer>
        {machinesData.map((machine) => (
          <TabButton
            key={machine.id}
            $active={activeTab === machine.id}
            onClick={() => setActiveTab(machine.id)}
          >
            {machine.name}
          </TabButton>
        ))}
      </TabsContainer>

      <MachineContent ref={contentRef}>
        <QuickActions>
          <ActionButton
            to={`/dashboard/checklist?maquina=${selectedMachine.id}`}
          >
            <FiCheckSquare /> Fazer Checklist
          </ActionButton>
          <ActionButton
            to={`/dashboard/historico?maquina=${selectedMachine.id}`}
          >
            <FiClock /> Ver Histórico
          </ActionButton>
          <ActionButton
            to={`/dashboard/relatorios?maquina=${selectedMachine.id}`}
          >
            <FiFileText /> Gerar Relatório
          </ActionButton>
        </QuickActions>

        <Grid>
          <GlassCard>
            <CardHeader>
              <IconBox $color="#E53935" $bg="rgba(229, 57, 53, 0.1)">
                <FiThermometer />
              </IconBox>
              <IndicatorTitle>Temperatura</IndicatorTitle>
            </CardHeader>

            <ValueDisplay>
              <MainValue
                $color={getTempColor(selectedMachine.temperature.current)}
              >
                {selectedMachine.temperature.current}
              </MainValue>
              <Unit>°C</Unit>
            </ValueDisplay>

            <ProgressBarContainer>
              <ProgressBarFill
                $progress={
                  (selectedMachine.temperature.current /
                    selectedMachine.temperature.max) *
                  100
                }
                $color={getTempColor(selectedMachine.temperature.current)}
              />
            </ProgressBarContainer>

            <TimelineNote>
              <FiAlertCircle size={16} color="#D9652B" />
              Última variação atípica: {selectedMachine.temperature.peakTime}
            </TimelineNote>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <IconBox $color="#D9652B" $bg="rgba(217, 101, 43, 0.1)">
                <FiActivity />
              </IconBox>
              <IndicatorTitle>Nível de Vibração</IndicatorTitle>
            </CardHeader>

            <ValueDisplay>
              <MainValue>{selectedMachine.vibration.level}</MainValue>
              <Unit>mm/s</Unit>
            </ValueDisplay>

            <ProgressBarContainer>
              <ProgressBarFill
                $progress={
                  (selectedMachine.vibration.level /
                    selectedMachine.vibration.limit) *
                  100
                }
                $color="#D9652B"
              />
            </ProgressBarContainer>

            <TimelineNote>
              <FiClock size={16} color="#D9652B" />
              Temporizador do pico: {selectedMachine.vibration.peakTime}
            </TimelineNote>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <IconBox $color="#A8A8B3" $bg="rgba(168, 168, 179, 0.1)">
                <FiTool />
              </IconBox>
              <IndicatorTitle>Limitações da Máquina</IndicatorTitle>
            </CardHeader>

            <SpecsList>
              {selectedMachine.specs.map((spec, index) => (
                <SpecItem key={index}>
                  <SpecLabel>{spec.label}</SpecLabel>
                  <SpecValue>{spec.value}</SpecValue>
                </SpecItem>
              ))}
            </SpecsList>
          </GlassCard>
        </Grid>
      </MachineContent>
    </Container>
  );
};
