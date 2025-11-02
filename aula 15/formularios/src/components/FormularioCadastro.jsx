import { useState } from "react";


function Formulariocadastro() {

    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: ""
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     console.log("Dados enviados:", form)
    // }

    // function handleSubmit(e){
    //     e.preventDefault();

    //     if(form.nome.trim() === ""){
    //         alert("O campo nome é obrigatório");
    //         return;
    //     }

    //     if(!form.email.includes("@")){
    //         alert("Digite um email válido!");
    //         return;
    //     }

    //     if(form.senha.length < 6){
    //         alert("A senha deve ter pelo menos 6 caracteres");
    //         return;
    //     }

    
    //      console.log("Dados enviados:", form)
    // }



    async function handleSubmit(e) {
        e.preventDefault();

        if(!form.nome || !form.email || !form.senha){
            alert("Preencha todos os campos")
            return;
        }


        const response = await fetch("https://jsonplaceholder.typicode.com/users", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(form),
        })

        const data = await response.json()

        console.log(response)

        alert(`Usuário ${data.name} cadastrado com sucesso`)
    }

    return (
        <>

            <form onSubmit={handleSubmit}>
                <h2>Cadastro de Usuário</h2>
                <label>Nome:</label>
                <input name="nome" value={form.nome} onChange={handleChange} />
                <br/>

                <label>Email:</label>
                <input name="email" value={form.email} onChange={handleChange} />
                <br/>

                <label>Senha:</label>
                <input name="senha" value={form.senha} onChange={handleChange} />
                <br/>

                <button type="submit">Cadastrar</button>

            </form>

        </>
    )

}

export default Formulariocadastro;