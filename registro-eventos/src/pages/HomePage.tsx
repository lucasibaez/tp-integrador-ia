import { useRef } from "react";

import { Link } from "react-router-dom";

import { useParticipantes } from "../context/ParticipantesContext";

import { useAuth } from "../context/AuthContext";

import ParticipanteCard from "../components/ParticipanteCard";

import Filtros from "../components/Filtros";

import { useParticipantesFiltros } from "../hooks/useParticipantesFiltros";

import { useFocusShortcut } from "../hooks/useFocusShortcut";

export default function HomePage() {

  const { participantes } = useParticipantes();

  const { user } = useAuth();

  // ==============================
  // CUSTOM HOOK FILTROS
  // ==============================
  const {
    filtroNombre,
    setFiltroNombre,
    filtroModalidad,
    setFiltroModalidad,
    filtroNivel,
    setFiltroNivel,
    limpiarFiltros,
  } = useParticipantesFiltros();

  // ==============================
  // REF PARA CTRL + B
  // ==============================
  const filtroRef = useRef<HTMLInputElement>(null);

  useFocusShortcut("b", filtroRef);

  // ==============================
  // FILTRADO
  // ==============================
  const participantesFiltrados = participantes.filter((p) => {
    return (
      p.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
      (filtroModalidad === "" || p.modalidad === filtroModalidad) &&
      (filtroNivel === "" || p.nivel === filtroNivel)
    );
  });

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Participantes
          </h1>

          {user && (
            <p className="text-gray-600 mt-1">
              Usuario: <strong>{user.username}</strong> | Rol:{" "}
              <strong>{user.rol}</strong>
            </p>
          )}

        </div>

        {user?.rol === "ADMIN" && (
          <Link
            to="/nuevo"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Nuevo participante
          </Link>
        )}

      </div>

      {/* FILTROS */}
      <Filtros
        filtroNombre={filtroNombre}
        setFiltroNombre={setFiltroNombre}
        filtroModalidad={filtroModalidad}
        setFiltroModalidad={setFiltroModalidad}
        filtroNivel={filtroNivel}
        setFiltroNivel={setFiltroNivel}
        limpiarFiltros={limpiarFiltros}
        filtroRef={filtroRef}
      />

      {/* LISTADO */}
      <div className="grid md:grid-cols-3 gap-4 mt-4">

        {participantesFiltrados.map((p) => (
          <ParticipanteCard
            key={p.id}
            participante={p}
          />
        ))}

      </div>

    </div>
  );
}