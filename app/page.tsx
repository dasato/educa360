"use client";
 
import { useState } from "react";
import { db } from "../lib/firebase";
 
import {
collection,
addDoc,
getDocs
} from "firebase/firestore";
 
export default function Home() {
const [nombre, setNombre] = useState("");
const [resultado, setResultado] = useState("");
 
async function guardarDato() {
await addDoc(
collection(db, "pacientes"),
{
nombre: nombre
}
);
 
alert("Dato guardado");
}
 
async function leerDato() {
const snapshot = await getDocs(
collection(db, "pacientes")
);
 
snapshot.forEach((doc) => {
const datos = doc.data();
setResultado(datos.nombre);
});
}
 
return (
<div style={{ padding: "20px" }}>
<h1>Portal Clínico</h1>
 
<input
type="text"
placeholder="Nombre"
value={nombre}
onChange={(e) => setNombre(e.target.value)}
/>
 
<br />
<br />
 
<button onClick={guardarDato}>
Guardar
</button>
 
<button
style={{ marginLeft: "10px" }}
onClick={leerDato}
>
Leer
</button>
 
<p>{resultado}</p>
</div>
);
}