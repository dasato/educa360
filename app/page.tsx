"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

interface Paciente {
  id: string;
  nombre: string;
}

export default function Home() {
  const [nombre, setNombre] = useState("");
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  const guardarDato = async () => {
    if (!nombre.trim()) return;

    try {
      await addDoc(collection(db, "pacientes"), {
        nombre: nombre,
      });

      alert("Paciente guardado correctamente");
      setNombre("");
    } catch (error) {
      console.error(error);
      alert("Error al guardar");
    }
  };

  const leerDatos = async () => {
    try {
      const consulta = await getDocs(
        collection(db, "pacientes")
      );

      const listaPacientes: Paciente[] = [];

      consulta.forEach((doc) => {
        listaPacientes.push({
          id: doc.id,
          nombre: doc.data().nombre,
        });
      });

      setPacientes(listaPacientes);
    } catch (error) {
      console.error(error);
      alert("Error al leer datos");
    }
  };

  return (
    <main style={{ padding: "20px" }}>
      <h1>Portal Clínico</h1>

      <input
        type="text"
        placeholder="Introduce un nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{
          padding: "8px",
          marginRight: "10px",
        }}
      />

      <button onClick={guardarDato}>
        Guardar
      </button>

      <button
        onClick={leerDatos}
        style={{ marginLeft: "10px" }}
      >
        Leer pacientes
      </button>

      <hr style={{ margin: "20px 0" }} />

      <h2>Pacientes guardados</h2>

      <ul>
        {pacientes.map((paciente) => (
          <li key={paciente.id}>
            <strong>ID:</strong> {paciente.id}
            {" - "}
            <strong>Nombre:</strong> {paciente.nombre}
          </li>
        ))}
      </ul>
    </main>
  );
}