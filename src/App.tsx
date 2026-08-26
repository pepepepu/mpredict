import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Maquinas } from "./pages/Maquinas";
import { Checklist } from "./pages/Checklist";
import { Historico } from "./pages/Historico";
import { Relatorios } from "./pages/Relatorio";
import { Cadastros } from "./pages/Cadastros";

const PlaceholderContent = ({ title }: { title: string }) => (
  <div style={{ padding: "48px", color: "#F2F2F2" }}>
    <h2>{title}</h2>
    <p style={{ color: "#A8A8B3", marginTop: "8px" }}>
      Módulo em desenvolvimento.
    </p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="maquinas" element={<Maquinas />} />
          <Route path="checklist" element={<Checklist />} />
          <Route path="historico" element={<Historico />} />
          <Route path="relatorios" element={<Relatorios />} />
          <Route path="cadastros" element={<Cadastros />} />
          <Route
            path="profissional"
            element={<PlaceholderContent title="Área Profissional" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
