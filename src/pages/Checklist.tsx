import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import {
  FiCheck,
  FiWifiOff,
  FiSave,
  FiPenTool,
  FiTrash2,
  FiAlertCircle,
  FiChevronDown,
  FiType,
} from "react-icons/fi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 90%;
  height: 100dvh;
  max-height: 100dvh;
  margin: 0 auto;
  padding: 48px;
  overflow: hidden;
`;

const HeaderContainer = styled.div`
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

const OfflineBadge = styled.div<{ $isOffline: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background-color: ${({ $isOffline }) =>
    $isOffline ? "rgba(217, 101, 43, 0.1)" : "rgba(76, 175, 80, 0.1)"};
  border: 1px solid
    ${({ $isOffline }) =>
      $isOffline ? "rgba(217, 101, 43, 0.4)" : "rgba(76, 175, 80, 0.4)"};
  color: ${({ $isOffline }) => ($isOffline ? "#D9652B" : "#4CAF50")};
  border-radius: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
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
  min-height: 0;
  overflow-y: auto;
  overflow-x: visible;

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

const ChecklistGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: rgba(18, 18, 20, 0.3);
  padding: 24px;
  border-radius: 18px;
  border: 1px solid rgba(242, 242, 242, 0.05);
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  padding: 12px;
  border-radius: 12px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(217, 101, 43, 0.05);
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  width: 28px;
  height: 28px;
  background-color: ${({ checked }) =>
    checked ? "#D9652B" : "rgba(18, 18, 20, 0.8)"};
  border: 2px solid
    ${({ checked }) => (checked ? "#D9652B" : "rgba(242, 242, 242, 0.2)")};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;

  svg {
    visibility: ${({ checked }) => (checked ? "visible" : "hidden")};
    color: #fff;
  }
`;

const CheckboxText = styled.span<{ checked: boolean }>`
  color: ${({ checked }) => (checked ? "#F2F2F2" : "#A8A8B3")};
  font-size: 1.05rem;
  transition: color 0.2s ease;
`;

const SignatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SignatureHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SignatureOptions = styled.div`
  display: flex;
  background-color: rgba(18, 18, 20, 0.6);
  border-radius: 8px;
  padding: 4px;
  gap: 4px;
`;

const OptionButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: ${({ $active }) =>
    $active ? "rgba(217, 101, 43, 0.2)" : "transparent"};
  color: ${({ $active }) => ($active ? "#D9652B" : "#A8A8B3")};
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ $active }) => ($active ? "#D9652B" : "#F2F2F2")};
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #a8a8b3;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #e53935;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 200px;
  background-color: rgba(18, 18, 20, 0.8);
  border: 1px dashed rgba(242, 242, 242, 0.2);
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;

  &:hover {
    border-color: rgba(217, 101, 43, 0.4);
  }
`;

const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
  cursor: crosshair;
`;

const TypedSignatureInput = styled.input`
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  color: #d9652b;
  font-size: 3rem;
  font-family: "Brush Script MT", "Caveat", "Dancing Script", cursive;
  text-align: center;
  outline: none;
  padding: 24px;

  &::placeholder {
    color: rgba(168, 168, 179, 0.3);
    font-family: inherit;
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
  border-radius: 18px;
  padding: 20px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s ease;
  margin-top: 16px;
  flex-shrink: 0;

  &:hover {
    background-color: #bf5824;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: rgba(217, 101, 43, 0.5);
    cursor: not-allowed;
    transform: translateY(0);
  }
`;

const checklistItems = [
  { id: "c1", label: "Limpeza e lubrificação do barramento" },
  { id: "c2", label: "Verificação da tensão das correias" },
  { id: "c3", label: "Inspeção do sistema e painel elétrico" },
  { id: "c4", label: "Teste do botão de parada de emergência" },
  { id: "c5", label: "Verificação de ruídos e vibrações atípicas" },
];

const maquinasDisponiveis = [
  "Torno Mecânico #01",
  "Fresadora CNC #02",
  "Furadeira #03",
];

export const Checklist = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [signatureMode, setSignatureMode] = useState<"draw" | "type">("draw");
  const [typedSignature, setTypedSignature] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

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
        { opacity: 0 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
        "-=0.2",
      );
    }
  }, []);

  useEffect(() => {
    if (signatureMode === "draw") {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * 2;
        canvas.height = rect.height * 2;
        const context = canvas.getContext("2d");
        if (context) {
          context.scale(2, 2);
          context.lineCap = "round";
          context.strokeStyle = "#D9652B";
          context.lineWidth = 3;
          contextRef.current = context;
        }
      }
    }
  }, [signatureMode]);

  const handleCheckboxChange = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const startDrawing = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
    setHasSignature(true);
  };

  const draw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    e.preventDefault();
    if (!isDrawing || !contextRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      setHasSignature(false);
    }
    setTypedSignature("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSelectMachine = (machine: string) => {
    setSelectedMachine(machine);
    setIsSelectOpen(false);
  };

  const allChecked = checklistItems.every((item) => checkedItems[item.id]);

  const isSignatureValid =
    signatureMode === "draw" ? hasSignature : typedSignature.trim().length > 0;

  return (
    <Container ref={containerRef}>
      <HeaderContainer>
        <TitleBox>
          <Title>Inspeção Preventiva</Title>
          <Subtitle>Preencha o checklist diário do equipamento</Subtitle>
        </TitleBox>
        <OfflineBadge
          $isOffline={isOffline}
          onClick={() => setIsOffline(!isOffline)}
        >
          {isOffline ? (
            <>
              <FiWifiOff size={20} /> Modo Offline Ativo
            </>
          ) : (
            <>
              <FiCheck size={20} /> Sincronizado
            </>
          )}
        </OfflineBadge>
      </HeaderContainer>

      <GlassForm ref={formRef} onSubmit={handleSubmit}>
        <FormGroup $isSelectOpen={isSelectOpen}>
          <Label>Selecione a Máquina</Label>
          <CustomSelectContainer>
            <CustomSelectHeader
              $isOpen={isSelectOpen}
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              <span style={{ color: selectedMachine ? "#F2F2F2" : "#7C7C8A" }}>
                {selectedMachine || "Escolha um equipamento..."}
              </span>
              <FiChevronDown
                size={20}
                style={{
                  transform: isSelectOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </CustomSelectHeader>
            {isSelectOpen && (
              <CustomSelectList>
                {maquinasDisponiveis.map((maquina) => (
                  <CustomSelectItem
                    key={maquina}
                    onClick={() => handleSelectMachine(maquina)}
                  >
                    {maquina}
                  </CustomSelectItem>
                ))}
              </CustomSelectList>
            )}
          </CustomSelectContainer>
        </FormGroup>

        <FormGroup>
          <Label>Itens Obrigatoriamente Verificados</Label>
          <ChecklistGrid>
            {checklistItems.map((item) => (
              <CheckboxLabel key={item.id}>
                <HiddenCheckbox
                  checked={!!checkedItems[item.id]}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                <StyledCheckbox checked={!!checkedItems[item.id]}>
                  <FiCheck size={18} />
                </StyledCheckbox>
                <CheckboxText checked={!!checkedItems[item.id]}>
                  {item.label}
                </CheckboxText>
              </CheckboxLabel>
            ))}
          </ChecklistGrid>
        </FormGroup>

        <SignatureContainer>
          <SignatureHeader>
            <Label
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <FiPenTool /> Assinatura Digital do Técnico
            </Label>
            <SignatureOptions>
              <OptionButton
                type="button"
                $active={signatureMode === "draw"}
                onClick={() => setSignatureMode("draw")}
              >
                <FiPenTool /> Desenhar
              </OptionButton>
              <OptionButton
                type="button"
                $active={signatureMode === "type"}
                onClick={() => setSignatureMode("type")}
              >
                <FiType /> Digitar
              </OptionButton>
            </SignatureOptions>
            <ClearButton type="button" onClick={clearSignature}>
              <FiTrash2 /> Limpar
            </ClearButton>
          </SignatureHeader>

          <InputWrapper>
            {signatureMode === "draw" ? (
              <>
                <StyledCanvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseOut={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                {!hasSignature && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "rgba(168, 168, 179, 0.4)",
                      pointerEvents: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "1.1rem",
                    }}
                  >
                    <FiPenTool /> Assine aqui
                  </div>
                )}
              </>
            ) : (
              <TypedSignatureInput
                type="text"
                placeholder="Digite seu nome completo..."
                value={typedSignature}
                onChange={(e) => setTypedSignature(e.target.value)}
              />
            )}
          </InputWrapper>
        </SignatureContainer>

        <SubmitButton
          type="submit"
          disabled={!selectedMachine || !allChecked || !isSignatureValid}
        >
          {isOffline ? <FiSave size={22} /> : <FiCheck size={22} />}
          {isOffline ? "Salvar Localmente (Offline)" : "Concluir e Enviar"}
        </SubmitButton>
        {(!allChecked || !isSignatureValid || !selectedMachine) && (
          <p
            style={{
              color: "#E53935",
              fontSize: "0.9rem",
              textAlign: "center",
              marginTop: "-16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <FiAlertCircle /> Preencha todos os campos obrigatórios para enviar.
          </p>
        )}
      </GlassForm>
    </Container>
  );
};
