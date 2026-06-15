import { useState, useEffect, useRef, useId } from "react";
import type { FormEvent, ChangeEvent } from "react";

import { useNavigate } from "react-router-dom";

import { Participante } from "../models/Participante";

import { useParticipantes } from "../context/ParticipantesContext";

export default function Formularios() {

  const navigate = useNavigate();

  const {
    participantes,
    agregar,
    editar,
    editando,
    dispatch
  } = useParticipantes();

  // =========================
  // useRef (FOCO AUTOMÁTICO)
  // =========================
  const nombreRef = useRef<HTMLInputElement>(null);

  // =========================
  // useId (ACCESIBILIDAD)
  // =========================
  const nombreId = useId();
  const emailId = useId();
  const edadId = useId();
  const paisId = useId();
  const nivelId = useId();
  const modalidadBaseId = useId();
  const terminosId = useId();

  const [form, setForm] = useState({
    id: undefined as number | undefined,
    nombre: "",
    email: "",
    edad: "",
    pais: "Argentina",
    modalidad: "",
    tecnologias: [] as string[],
    nivel: "Principiante",
    aceptaTerminos: false,
  });

  useEffect(() => {

    if (editando) {

      setForm({
        id: editando.id,
        nombre: editando.nombre,
        email: editando.email,
        edad: String(editando.edad),
        pais: editando.pais,
        modalidad: editando.modalidad,
        tecnologias: editando.tecnologias,
        nivel: editando.nivel,
        aceptaTerminos: editando.aceptaTerminos,
      });

    }

    // FOCO AUTOMÁTICO
    nombreRef.current?.focus();

  }, [editando]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    const { name, value, type } = e.target;

    if (type === "checkbox" && name === "tecnologias") {

      const checked = (e.target as HTMLInputElement).checked;

      let nuevas = [...form.tecnologias];

      if (checked) {
        nuevas.push(value);
      } else {
        nuevas = nuevas.filter((t) => t !== value);
      }

      setForm({
        ...form,
        tecnologias: nuevas,
      });

    }

    else if (type === "checkbox") {

      const checked = (e.target as HTMLInputElement).checked;

      setForm({
        ...form,
        [name]: checked,
      });

    }

    else {

      setForm({
        ...form,
        [name]: value,
      });

    }
  };

  const handleSubmit = (e: FormEvent) => {

    e.preventDefault();

    if (!form.nombre.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    if (!form.email.trim()) {
      alert("El email es obligatorio");
      return;
    }

    if (!form.email.includes("@")) {
      alert("Email inválido");
      return;
    }

    const existe = participantes.some(
      (p) =>
        p.email === form.email &&
        p.id !== form.id
    );

    if (existe) {
      alert("El email ya existe");
      return;
    }

    if (!form.edad || Number(form.edad) <= 17) {
      alert("Edad inválida debe ser mayor de 18 años");
      return;
    }

    if (!form.edad || Number(form.edad) >= 100) {
      alert("Edad inválida");
      return;
    }

    if (!form.modalidad) {
      alert("Seleccioná modalidad");
      return;
    }

    if (form.tecnologias.length === 0) {
      alert("Seleccioná al menos una tecnología");
      return;
    }

    if (!form.aceptaTerminos) {
      alert("Debés aceptar los términos");
      return;
    }

    const nuevo = new Participante(
      editando ? editando.id : Date.now(),
      form.nombre,
      form.email,
      Number(form.edad),
      form.pais,
      form.modalidad,
      form.tecnologias,
      form.nivel,
      form.aceptaTerminos
    );

    if (editando) {

      editar(nuevo);

      dispatch({
        type: "SET_EDITANDO",
        payload: null,
      });

    } else {

      agregar(nuevo);

    }

    setForm({
      id: undefined,
      nombre: "",
      email: "",
      edad: "",
      pais: "Argentina",
      modalidad: "",
      tecnologias: [],
      nivel: "Principiante",
      aceptaTerminos: false,
    });

    navigate("/");
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="grid gap-4"
    >

      {/* ================= NOMBRE ================= */}
      <label htmlFor={nombreId}>Nombre</label>
      <input
        id={nombreId}
        ref={nombreRef}
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        className="border p-2"
      />

      {/* ================= EMAIL ================= */}
      <label htmlFor={emailId}>Email</label>
      <input
        id={emailId}
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2"
      />

      {/* ================= EDAD ================= */}
      <label htmlFor={edadId}>Edad</label>
      <input
        id={edadId}
        name="edad"
        type="number"
        value={form.edad}
        onChange={handleChange}
        placeholder="Edad"
        className="border p-2"
      />

      {/* ================= PAÍS ================= */}
      <label htmlFor={paisId}>País</label>
      <select
        id={paisId}
        name="pais"
        value={form.pais}
        onChange={handleChange}
        className="border p-2"
      >
        <option>Argentina</option>
        <option>Chile</option>
        <option>Uruguay</option>
      </select>

      {/* ================= MODALIDAD ================= */}
      <p>Modalidad</p>

      {["Presencial", "Virtual", "Híbrido"].map((m) => {
        const id = `${modalidadBaseId}-${m}`;

        return (
          <label key={m} htmlFor={id} className="mr-4">

            <input
              id={id}
              type="radio"
              name="modalidad"
              value={m}
              checked={form.modalidad === m}
              onChange={handleChange}
            />

            {m}

          </label>
        );
      })}

      {/* ================= TECNOLOGÍAS ================= */}
      <div>

        {["React", "Angular", "Vue"].map((t) => (

          <label key={t} className="mr-4">

            <input
              type="checkbox"
              name="tecnologias"
              value={t}
              checked={form.tecnologias.includes(t)}
              onChange={handleChange}
            />

            {t}

          </label>

        ))}

      </div>

      {/* ================= NIVEL ================= */}
      <label htmlFor={nivelId}>Nivel</label>
      <select
        id={nivelId}
        name="nivel"
        value={form.nivel}
        onChange={handleChange}
        className="border p-2"
      >
        <option>Principiante</option>
        <option>Intermedio</option>
        <option>Avanzado</option>
      </select>

      {/* ================= TÉRMINOS ================= */}
      <label htmlFor={terminosId}>
        <input
          id={terminosId}
          type="checkbox"
          name="aceptaTerminos"
          checked={form.aceptaTerminos}
          onChange={handleChange}
        />
        Acepto términos
      </label>

      {/* ================= BOTÓN ================= */}
      <button className="bg-blue-500 text-white p-2">

        {editando ? "Actualizar" : "Registrar"}

      </button>

    </form>
  );
}