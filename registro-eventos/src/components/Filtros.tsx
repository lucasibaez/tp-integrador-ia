type Props = {
  filtroNombre: string;
  setFiltroNombre: (valor: string) => void;

  filtroModalidad: string;
  setFiltroModalidad: (valor: string) => void;

  filtroNivel: string;
  setFiltroNivel: (valor: string) => void;

  limpiarFiltros: () => void;

  // 🔥 NUEVO: ref para useRef (Ctrl + B)
  filtroRef?: React.RefObject<HTMLInputElement | null>;
};

export default function Filtros({
  filtroNombre,
  setFiltroNombre,
  filtroModalidad,
  setFiltroModalidad,
  filtroNivel,
  setFiltroNivel,
  limpiarFiltros,
  filtroRef,
}: Props) {

  return (
    <div className="bg-white shadow rounded p-6 mb-6 grid md:grid-cols-4 gap-4">

      {/* ===================== NOMBRE ===================== */}
      <input
        ref={filtroRef}   // 🔥 useRef conectado (Ctrl + B)
        placeholder="Buscar por nombre"
        value={filtroNombre}
        onChange={(e) => setFiltroNombre(e.target.value)}
        className="border p-2 rounded"
      />

      {/* ===================== MODALIDAD ===================== */}
      <select
        value={filtroModalidad}
        onChange={(e) => setFiltroModalidad(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Todas</option>
        <option>Presencial</option>
        <option>Virtual</option>
        <option>Híbrido</option>
      </select>

      {/* ===================== NIVEL ===================== */}
      <select
        value={filtroNivel}
        onChange={(e) => setFiltroNivel(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Todos</option>
        <option>Principiante</option>
        <option>Intermedio</option>
        <option>Avanzado</option>
      </select>

      {/* ===================== LIMPIAR ===================== */}
      <button
        onClick={limpiarFiltros}
        className="bg-gray-500 text-white p-2 rounded"
      >
        Limpiar
      </button>

    </div>
  );
}