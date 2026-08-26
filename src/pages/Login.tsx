import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #121214;
  background-image:
    radial-gradient(circle at center, transparent 0%, #121214 90%),
    linear-gradient(rgba(217, 101, 43, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(217, 101, 43, 0.08) 1px, transparent 1px);
  background-size:
    100% 100%,
    40px 40px,
    40px 40px;
  background-position: center center;
`;

const GlassCard = styled.form`
  background: rgba(32, 32, 36, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(217, 101, 43, 0.2);
  border-radius: 18px;
  padding: 48px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 16px 40px rgba(18, 18, 20, 0.8);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 12px;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  color: #f2f2f2;
  font-weight: 500;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  color: #a8a8b3;
  font-size: 1rem;
  font-weight: 400;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  color: #e1e1e6;
  font-size: 0.95rem;
  font-weight: 500;
  margin-left: 4px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 20px;
  color: #7c7c8a;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  width: 100%;
  background-color: rgba(18, 18, 20, 0.6);
  border: 1px solid rgba(242, 242, 242, 0.08);
  border-radius: 18px;
  padding: 18px 18px 18px 52px;
  color: #f2f2f2;
  font-size: 1rem;
  font-family: "Space Grotesk", sans-serif;
  letter-spacing: -0.5px;
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

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 20px;
  background: none;
  border: none;
  color: #7c7c8a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;

  &:hover {
    color: #d9652b;
  }
`;

const SubmitButton = styled.button`
  background-color: #d9652b;
  color: #f2f2f2;
  border: none;
  border-radius: 99px;
  padding: 16px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "Space Grotesk", sans-serif;
  margin-top: 12px;
  letter-spacing: -0.9px;

  &:hover {
    background-color: #bf5824;
  }
`;

const ActionLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  padding: 0 4px;
`;

const TextButton = styled.button`
  background: none;
  border: none;
  color: #a8a8b3;
  font-size: 0.95rem;
  cursor: pointer;
  font-family: "Space Grotesk", sans-serif;
  transition: color 0.3s ease;
  font-weight: 500;
  letter-spacing: -0.9px;

  &:hover {
    color: #d9652b;
  }
`;

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cardRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
      );
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleButtonPress = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { scale: 0.97, duration: 0.1 });
    }
  };

  const handleButtonRelease = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  return (
    <PageContainer>
      <GlassCard ref={cardRef} onSubmit={handleLogin}>
        <Header>
          <Title>
            <strong style={{ color: "#d9652b" }}>M</strong>Predict
          </Title>
          <Subtitle>Sistema de Manutenção Preditiva</Subtitle>
        </Header>

        <InputGroup>
          <Label htmlFor="email">E-mail corporativo</Label>
          <InputWrapper>
            <IconWrapper>
              <FiMail size={20} />
            </IconWrapper>
            <StyledInput
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputWrapper>
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">Senha de acesso</Label>
          <InputWrapper>
            <IconWrapper>
              <FiLock size={20} />
            </IconWrapper>
            <StyledInput
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TogglePasswordButton
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </TogglePasswordButton>
          </InputWrapper>
        </InputGroup>

        <SubmitButton
          type="submit"
          ref={buttonRef}
          onMouseDown={handleButtonPress}
          onMouseUp={handleButtonRelease}
          onMouseLeave={handleButtonRelease}
        >
          Entrar no Sistema
        </SubmitButton>

        <ActionLinks>
          <TextButton type="button">Esqueci minha senha</TextButton>
          <TextButton type="button">Criar nova conta</TextButton>
        </ActionLinks>
      </GlassCard>
    </PageContainer>
  );
};
