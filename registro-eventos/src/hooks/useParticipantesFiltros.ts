import { useState } from "react";

export function useParticipantesFiltros() {

  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroModalidad, setFiltroModalidad] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("");

  const limpiarFiltros = () => {
    setFiltroNombre("");
    setFiltroModalidad("");
    setFiltroNivel("");
  };

  return {
    filtroNombre,
    setFiltroNombre,
    filtroModalidad,
    setFiltroModalidad,
    filtroNivel,
    setFiltroNivel,
    limpiarFiltros,
  };
}