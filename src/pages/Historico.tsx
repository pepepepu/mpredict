import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import {
  FiClock,
  FiTool,
  FiUser,
  FiFileText,
  FiFilter,
  FiChevronDown,
  FiCalendar,
} from "react-icons/fi";

const ViewportWrapper = styled.div`
  height: calc(100dvh - 80px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
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

const FilterWrapper = styled.div`
  position: relative;
  width: 300px;
  z-index: 50;
`;

const FilterHeader = styled.div<{ $isOpen: boolean }>`
  background-color: rgba(32, 32, 36, 0.6);
  border: 1px solid
    ${({ $isOpen }) => ($isOpen ? "#D9652B" : "rgba(242, 242, 242, 0.08)")};
  border-radius: 12px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #f2f2f2;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #d9652b;
  }
`;

const FilterLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
`;

const FilterList = styled.ul`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background-color: #202024;
  border: 1px solid rgba(242, 242, 242, 0.08);
  border-radius: 12px;
  overflow: hidden;
  list-style: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
`;

const FilterItem = styled.li<{ $active?: boolean }>`
  padding: 14px 20px;
  color: ${({ $active }) => ($active ? "#D9652B" : "#f2f2f2")};
  background-color: ${({ $active }) =>
    $active ? "rgba(217, 101, 43, 0.1)" : "transparent"};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(217, 101, 43, 0.05);
    color: #d9652b;
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

const HistoryCard = styled.div`
  background: rgba(32, 32, 36, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(242, 242, 242, 0.08);
  border-left: 4px solid #d9652b;
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 8px 24px rgba(18, 18, 20, 0.3);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(18, 18, 20, 0.5);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(242, 242, 242, 0.08);
  padding-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
`;

const MachineName = styled.h3`
  font-size: 1.25rem;
  color: #f2f2f2;
  font-weight: 600;
`;

const DateTimeBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(217, 101, 43, 0.1);
  color: #d9652b;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
`;

const CardBody = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
`;

const InfoGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const IconBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: rgba(242, 242, 242, 0.05);
  color: #a8a8b3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoLabel = styled.span`
  color: #7c7c8a;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoText = styled.p`
  color: #e1e1e6;
  font-size: 1.05rem;
  line-height: 1.5;
`;

const ObservationsBox = styled.div`
  background-color: rgba(18, 18, 20, 0.4);
  border: 1px dashed rgba(242, 242, 242, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-top: 8px;
`;

const mockHistoryData = [
  {
    id: "h1",
    machine: "Torno Mecânico #01",
    date: "24/08/2026",
    time: "14:30",
    replacedParts:
      "Rolamento do eixo principal, Óleo lubrificante (Viscosidade ISO 68)",
    technicianName: "Carlos Almeida",
    technicianId: "TEC-1042",
    observations:
      "Troca realizada após detecção de pico de temperatura (78°C). Equipamento testado e operando dentro dos limites normais.",
  },
  {
    id: "h2",
    machine: "Fresadora CNC #02",
    date: "20/08/2026",
    time: "09:15",
    replacedParts: "Correia de transmissão, Filtro de ar",
    technicianName: "Mariana Souza",
    technicianId: "TEC-2099",
    observations:
      "Checklist preventivo indicou desgaste avançado na correia. Tensão ajustada conforme manual do fabricante.",
  },
  {
    id: "h3",
    machine: "Torno Mecânico #01",
    date: "15/08/2026",
    time: "16:45",
    replacedParts: "Nenhuma peça substituída",
    technicianName: "João Vitor",
    technicianId: "TEC-3011",
    observations:
      "Limpeza completa do barramento e reaperto geral do painel elétrico. Ruídos atípicos cessaram após a manutenção.",
  },
  {
    id: "h4",
    machine: "Furadeira #03",
    date: "10/08/2026",
    time: "11:20",
    replacedParts: "Botão de parada de emergência, Fiação interna",
    technicianName: "Carlos Almeida",
    technicianId: "TEC-1042",
    observations:
      "O botão de emergência apresentava falha de contato esporádica. Substituição completa do módulo elétrico.",
  },
];

export const Historico = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Todas as Máquinas");
  const listRef = useRef<HTMLDivElement>(null);

  const machines = [
    "Todas as Máquinas",
    "Torno Mecânico #01",
    "Fresadora CNC #02",
    "Furadeira #03",
  ];

  const filteredHistory =
    selectedFilter === "Todas as Máquinas"
      ? mockHistoryData
      : mockHistoryData.filter((item) => item.machine === selectedFilter);

  useEffect(() => {
    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: "power2.out" },
      );
    }
  }, [selectedFilter]);

  return (
    <ViewportWrapper>
      <Container>
        <HeaderContainer>
          <TitleBox>
            <Title>Histórico de Manutenção</Title>
            <Subtitle>Registro cronológico de intervenções e reparos</Subtitle>
          </TitleBox>

          <FilterWrapper>
            <FilterHeader
              $isOpen={filterOpen}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <FilterLabel>
                <FiFilter size={18} color="#D9652B" />
                {selectedFilter}
              </FilterLabel>
              <FiChevronDown
                size={20}
                style={{
                  transform: filterOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </FilterHeader>
            {filterOpen && (
              <FilterList>
                {machines.map((machine) => (
                  <FilterItem
                    key={machine}
                    $active={selectedFilter === machine}
                    onClick={() => {
                      setSelectedFilter(machine);
                      setFilterOpen(false);
                    }}
                  >
                    {machine}
                  </FilterItem>
                ))}
              </FilterList>
            )}
          </FilterWrapper>
        </HeaderContainer>

        <ScrollableArea ref={listRef}>
          {filteredHistory.length > 0 ? (
            filteredHistory.map((record) => (
              <HistoryCard key={record.id}>
                <CardHeader>
                  <MachineName>{record.machine}</MachineName>
                  <DateTimeBadge>
                    <FiCalendar size={16} />
                    {record.date} às {record.time}
                  </DateTimeBadge>
                </CardHeader>

                <CardBody>
                  <InfoGroup>
                    <IconBox>
                      <FiUser />
                    </IconBox>
                    <InfoContent>
                      <InfoLabel>Técnico Responsável</InfoLabel>
                      <InfoText>
                        {record.technicianName} ({record.technicianId})
                      </InfoText>
                    </InfoContent>
                  </InfoGroup>

                  <InfoGroup>
                    <IconBox>
                      <FiTool />
                    </IconBox>
                    <InfoContent>
                      <InfoLabel>Peças Substituídas</InfoLabel>
                      <InfoText>{record.replacedParts}</InfoText>
                    </InfoContent>
                  </InfoGroup>
                </CardBody>

                <ObservationsBox>
                  <InfoGroup>
                    <IconBox
                      style={{
                        backgroundColor: "transparent",
                        width: "auto",
                        height: "auto",
                      }}
                    >
                      <FiFileText color="#D9652B" />
                    </IconBox>
                    <InfoContent>
                      <InfoLabel>Observações e Laudo Técnico</InfoLabel>
                      <InfoText style={{ color: "#A8A8B3", marginTop: "4px" }}>
                        {record.observations}
                      </InfoText>
                    </InfoContent>
                  </InfoGroup>
                </ObservationsBox>
              </HistoryCard>
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "#A8A8B3",
                marginTop: "40px",
              }}
            >
              <FiClock
                size={48}
                style={{ opacity: 0.2, marginBottom: "16px" }}
              />
              <p>Nenhum registro de manutenção encontrado para esta máquina.</p>
            </div>
          )}
        </ScrollableArea>
      </Container>
    </ViewportWrapper>
  );
};
