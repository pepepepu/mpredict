import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import {
  FiBriefcase,
  FiCheckSquare,
  FiClock,
  FiDatabase,
  FiFileText,
  FiHome,
  FiLogOut,
  FiServer,
  FiUser,
} from "react-icons/fi";
import { PiSidebarBold } from "react-icons/pi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #121214;
  background-image:
    radial-gradient(
      circle at top right,
      rgba(217, 101, 43, 0.08) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at bottom left,
      rgba(32, 32, 36, 0.8) 0%,
      transparent 50%
    );
`;

const Sidebar = styled.aside<{ $isExpanded: boolean }>`
  width: ${({ $isExpanded }) => ($isExpanded ? "280px" : "96px")};
  background: rgba(32, 32, 36, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-right: 1px solid rgba(242, 242, 242, 0.08);
  display: flex;
  flex-direction: column;
  transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  z-index: 10;
`;

const SidebarHeader = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $isExpanded }) =>
    $isExpanded ? "space-between" : "center"};
  padding: ${({ $isExpanded }) => ($isExpanded ? "32px 24px" : "32px 0")};
  height: 96px;
`;

const Title = styled.h1<{ $isExpanded: boolean }>`
  font-size: 1.6rem;
  color: #f2f2f2;
  font-weight: 600;
  white-space: nowrap;
  opacity: ${({ $isExpanded }) => ($isExpanded ? 1 : 0)};
  width: ${({ $isExpanded }) => ($isExpanded ? "auto" : 0)};
  overflow: hidden;
  transition:
    opacity 0.3s ease,
    width 0.3s ease;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #a8a8b3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    color: #d9652b;
    background-color: rgba(217, 101, 43, 0.1);
  }
`;

const UserProfile = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ $isExpanded }) => ($isExpanded ? "24px" : "10px")};
  margin: ${({ $isExpanded }) =>
    $isExpanded ? "0 16px 24px 16px" : "0 auto 24px auto"};
  width: ${({ $isExpanded }) => ($isExpanded ? "auto" : "64px")};
  height: ${({ $isExpanded }) => ($isExpanded ? "auto" : "64px")};
  background-color: rgba(18, 18, 20, 0.6);
  border: 1px solid rgba(242, 242, 242, 0.05);
  border-radius: 18px;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  justify-content: ${({ $isExpanded }) =>
    $isExpanded ? "flex-start" : "center"};
  gap: ${({ $isExpanded }) => ($isExpanded ? "16px" : "0")};
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background-color: rgba(217, 101, 43, 0.15);
  color: #d9652b;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-weight: 600;
`;

const UserInfo = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  opacity: ${({ $isExpanded }) => ($isExpanded ? 1 : 0)};
  width: ${({ $isExpanded }) => ($isExpanded ? "auto" : 0)};
  white-space: nowrap;
  transition: opacity 0.3s ease;
  overflow: hidden;
`;

const UserName = styled.span`
  color: #f2f2f2;
  font-weight: 500;
  font-size: 1rem;
`;

const UserRole = styled.span`
  color: #a8a8b3;
  font-size: 0.85rem;
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;
  flex: 1;
`;

const StyledNavLink = styled(NavLink)<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ $isExpanded }) => ($isExpanded ? "16px" : "0")};
  padding: ${({ $isExpanded }) => ($isExpanded ? "16px" : "0")};
  height: ${({ $isExpanded }) => ($isExpanded ? "auto" : "64px")};
  width: ${({ $isExpanded }) => ($isExpanded ? "100%" : "64px")};
  margin: 0 auto;
  color: #a8a8b3;
  text-decoration: none;
  border-radius: 18px;
  transition: all 0.3s ease;
  font-weight: 500;
  white-space: nowrap;
  justify-content: ${({ $isExpanded }) =>
    $isExpanded ? "flex-start" : "center"};
  overflow: hidden;

  &:hover {
    background-color: rgba(217, 101, 43, 0.05);
    color: #f2f2f2;
  }

  &.active {
    color: #d9652b;
    background-color: rgba(217, 101, 43, 0.1);
  }
`;

const NavText = styled.span<{ $isExpanded: boolean }>`
  opacity: ${({ $isExpanded }) => ($isExpanded ? 1 : 0)};
  width: ${({ $isExpanded }) => ($isExpanded ? "auto" : 0)};
  overflow: hidden;
  transition: opacity 0.3s ease;
`;

const LogoutButton = styled.button<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ $isExpanded }) => ($isExpanded ? "16px" : "0")};
  padding: ${({ $isExpanded }) => ($isExpanded ? "16px" : "0")};
  height: ${({ $isExpanded }) => ($isExpanded ? "auto" : "64px")};
  width: ${({ $isExpanded }) => ($isExpanded ? "auto" : "64px")};
  margin: ${({ $isExpanded }) => ($isExpanded ? "16px" : "16px auto")};
  color: #a8a8b3;
  background: none;
  border: none;
  border-radius: 18px;
  transition: all 0.3s ease;
  font-weight: 500;
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;
  white-space: nowrap;
  justify-content: ${({ $isExpanded }) =>
    $isExpanded ? "flex-start" : "center"};
  overflow: hidden;

  &:hover {
    background-color: rgba(229, 57, 53, 0.1);
    color: #e53935;
  }
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: hidden;
  overflow-x: hidden;
`;

export const Layout = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const sidebarRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );
    }
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <Container>
      <Sidebar ref={sidebarRef} $isExpanded={isExpanded}>
        <SidebarHeader $isExpanded={isExpanded}>
          <Title $isExpanded={isExpanded}>
            <strong style={{ color: "#d9652b" }}>M</strong>Predict
          </Title>
          <MenuButton onClick={() => setIsExpanded(!isExpanded)}>
            <PiSidebarBold size={24} />
          </MenuButton>
        </SidebarHeader>

        <UserProfile $isExpanded={isExpanded}>
          <Avatar>
            <FiUser size={20} />
          </Avatar>
          <UserInfo $isExpanded={isExpanded}>
            <UserName>Eng. Técnico</UserName>
            <UserRole>Manutenção</UserRole>
          </UserInfo>
        </UserProfile>

        <NavList>
          <StyledNavLink to="/dashboard" end $isExpanded={isExpanded}>
            <FiHome size={22} style={{ flexShrink: 0 }} />
            <NavText $isExpanded={isExpanded}>Dashboard</NavText>
          </StyledNavLink>

          <StyledNavLink to="/dashboard/maquinas" $isExpanded={isExpanded}>
            <FiServer size={22} style={{ flexShrink: 0 }} />
            <NavText $isExpanded={isExpanded}>Máquinas</NavText>
          </StyledNavLink>

          <StyledNavLink to="/dashboard/checklist" $isExpanded={isExpanded}>
            <FiCheckSquare size={22} style={{ flexShrink: 0 }} />
            <NavText $isExpanded={isExpanded}>Checklist</NavText>
          </StyledNavLink>

          <StyledNavLink to="/dashboard/historico" $isExpanded={isExpanded}>
            <FiClock size={22} style={{ flexShrink: 0 }} />
            <NavText $isExpanded={isExpanded}>Histórico</NavText>
          </StyledNavLink>

          <StyledNavLink to="/dashboard/relatorios" $isExpanded={isExpanded}>
            <FiFileText size={22} style={{ flexShrink: 0 }} />
            <NavText $isExpanded={isExpanded}>Relatórios</NavText>
          </StyledNavLink>

          <StyledNavLink to="/dashboard/cadastros" $isExpanded={isExpanded}>
            <FiDatabase size={22} style={{ flexShrink: 0 }} />
            <NavText $isExpanded={isExpanded}>Cadastros</NavText>
          </StyledNavLink>

          <StyledNavLink to="/dashboard/profissional" $isExpanded={isExpanded}>
            <FiBriefcase size={22} style={{ flexShrink: 0 }} />
            <NavText $isExpanded={isExpanded}>Área Profissional</NavText>
          </StyledNavLink>
        </NavList>

        <LogoutButton $isExpanded={isExpanded} onClick={handleLogout}>
          <FiLogOut size={22} style={{ flexShrink: 0 }} />
          <NavText $isExpanded={isExpanded}>Sair da conta</NavText>
        </LogoutButton>
      </Sidebar>

      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};
