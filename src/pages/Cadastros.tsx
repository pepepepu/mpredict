import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import {
  FiSave,
  FiServer,
  FiTag,
  FiMapPin,
  FiThermometer,
  FiActivity,
  FiDroplet,
  FiChevronDown,
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
  gap: 24px;
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

const GlassForm = styled.form`
  background: rgba(32, 32, 36, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(242, 242, 242, 0.08);
  border-radius: 18px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  box-shadow: 0 8px 32px rgba(18, 18, 20, 0.4);
  flex: 1;
  overflow-y: auto;

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

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SectionTitle = styled.h3`
  color: #f2f2f2;
  font-size: 1.2rem;
  font-weight: 500;
  border-bottom: 1px solid rgba(242, 242, 242, 0.08);
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormGroup = styled.div<{ $isSelectOpen?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  z-index: ${({ $isSelectOpen }) => ($isSelectOpen ? 10 : 1)};
`;

const Label = styled.label`
  color: #e1e1e6;
  font-size: 1.05rem;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 16px;
  color: #7c7c8a;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  width: 100%;
  background-color: rgba(18, 18, 20, 0.6);
  border: 1px solid rgba(242, 242, 242, 0.08);
  border-radius: 12px;
  padding: 16px 16px 16px 48px;
  color: #f2f2f2;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #d9652b;
    background-color: rgba(18, 18, 20, 0.9);
  }

  &::placeholder {
    color: #7c7c8a;
  }
`;

const LimitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
`;

const CustomSelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const CustomSelectHeader = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  background-color: rgba(18, 18, 20, 0.6);
  border: 1px solid
    ${({ $isOpen }) => ($isOpen ? "#D9652B" : "rgba(242, 242, 242, 0.08)")};
  border-radius: 12px;
  padding: 16px;
  padding-left: 48px;
  color: #f2f2f2;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #d9652b;
  }
`;

const CustomSelectList = styled.ul`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background-color: #202024;
  border: 1px solid rgba(242, 242, 242, 0.08);
  border-radius: 12px;
  overflow: hidden;
  z-index: 1000;
  list-style: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
`;

const CustomSelectItem = styled.li`
  padding: 16px;
  color: #f2f2f2;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(217, 101, 43, 0.1);
    color: #d9652b;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: #d9652b;
  color: #f2f2f2;
  border: none;
  border-radius: 28px;
  padding: 15px 30px;
  font-size: 1rem;
  font-weight: 500;
  width: fit-content;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s ease;
  margin-top: 16px;
  flex-shrink: 0;
  align-self: flex-end;

  &:hover {
    background-color: #bf5824;
    transform: translateY(-2px);
  }
`;

const tiposEquipamento = [
  "Torno Mecânico",
  "Fresadora CNC",
  "Furadeira de Bancada",
  "Compressor de Ar",
  "Outro",
];

export const Cadastros = () => {
  const [formData, setFormData] = useState({
    nome: "",
    idAtivo: "",
    tipo: "",
    localizacao: "",
    limiteTemperatura: "",
    limiteVibracao: "",
    limiteLubrificacao: "",
  });

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    if (containerRef.current) {
      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      );
    }

    if (formRef.current) {
      tl.fromTo(
        formRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
        "-=0.2",
      );
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectType = (tipo: string) => {
    setFormData({ ...formData, tipo });
    setIsSelectOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <ViewportWrapper>
      <Container ref={containerRef}>
        <HeaderContainer>
          <TitleBox>
            <Title>Cadastro de Máquinas</Title>
            <Subtitle>Adicione novos equipamentos ao monitoramento</Subtitle>
          </TitleBox>
        </HeaderContainer>

        <GlassForm ref={formRef} onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>
              <FiServer /> Informações Gerais
            </SectionTitle>

            <FormGroup>
              <Label>Nome do Equipamento</Label>
              <InputWrapper>
                <IconWrapper>
                  <FiServer size={20} />
                </IconWrapper>
                <StyledInput
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Ex: Torno Mecânico T-05"
                  required
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label>ID do Ativo</Label>
              <InputWrapper>
                <IconWrapper>
                  <FiTag size={20} />
                </IconWrapper>
                <StyledInput
                  type="text"
                  name="idAtivo"
                  value={formData.idAtivo}
                  onChange={handleChange}
                  placeholder="Ex: EQ-2026-001"
                  required
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup $isSelectOpen={isSelectOpen}>
              <Label>Tipo de Equipamento</Label>
              <CustomSelectContainer>
                <IconWrapper
                  style={{
                    zIndex: 2,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <FiServer size={20} />
                </IconWrapper>
                <CustomSelectHeader
                  $isOpen={isSelectOpen}
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                >
                  <span
                    style={{ color: formData.tipo ? "#F2F2F2" : "#7C7C8A" }}
                  >
                    {formData.tipo || "Selecione o tipo"}
                  </span>
                  <FiChevronDown
                    size={20}
                    style={{
                      transform: isSelectOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </CustomSelectHeader>
                {isSelectOpen && (
                  <CustomSelectList>
                    {tiposEquipamento.map((tipo) => (
                      <CustomSelectItem
                        key={tipo}
                        onClick={() => handleSelectType(tipo)}
                      >
                        {tipo}
                      </CustomSelectItem>
                    ))}
                  </CustomSelectList>
                )}
              </CustomSelectContainer>
            </FormGroup>

            <FormGroup>
              <Label>Localização na Fábrica</Label>
              <InputWrapper>
                <IconWrapper>
                  <FiMapPin size={20} />
                </IconWrapper>
                <StyledInput
                  type="text"
                  name="localizacao"
                  value={formData.localizacao}
                  onChange={handleChange}
                  placeholder="Ex: Setor de Usinagem - Galpão 2"
                  required
                />
              </InputWrapper>
            </FormGroup>
          </FormSection>

          <FormSection>
            <SectionTitle>
              <FiActivity /> Configuração de Limites de Alerta
            </SectionTitle>

            <LimitsGrid>
              <FormGroup>
                <Label>Temperatura Máx. (°C)</Label>
                <InputWrapper>
                  <IconWrapper>
                    <FiThermometer size={20} />
                  </IconWrapper>
                  <StyledInput
                    type="number"
                    name="limiteTemperatura"
                    value={formData.limiteTemperatura}
                    onChange={handleChange}
                    placeholder="Ex: 80"
                    required
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup>
                <Label>Vibração Máx. (mm/s)</Label>
                <InputWrapper>
                  <IconWrapper>
                    <FiActivity size={20} />
                  </IconWrapper>
                  <StyledInput
                    type="number"
                    step="0.1"
                    name="limiteVibracao"
                    value={formData.limiteVibracao}
                    onChange={handleChange}
                    placeholder="Ex: 5.0"
                    required
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup>
                <Label>Nível Crítico de Óleo (%)</Label>
                <InputWrapper>
                  <IconWrapper>
                    <FiDroplet size={20} />
                  </IconWrapper>
                  <StyledInput
                    type="number"
                    name="limiteLubrificacao"
                    value={formData.limiteLubrificacao}
                    onChange={handleChange}
                    placeholder="Ex: 20"
                    required
                  />
                </InputWrapper>
              </FormGroup>
            </LimitsGrid>
          </FormSection>

          <SubmitButton type="submit">
            <FiSave size={22} />
            Cadastrar Equipamento
          </SubmitButton>
        </GlassForm>
      </Container>
    </ViewportWrapper>
  );
};
