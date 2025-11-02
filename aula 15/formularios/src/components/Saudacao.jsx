import { useState } from "react";


function Saudacao() {

    const [nome, setNome] = useState("")

    return (
        <div>
            <h3>Digite seu nome:</h3>
            <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Maria"
            />
            <p>Olá {nome || "Visitante!"}</p>
        </div>
    )
}

export default Saudacao;