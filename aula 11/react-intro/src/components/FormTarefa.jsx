import { useState } from "react";

function FormTarefa() {
  const [tarefa, setTarefa] = useState("");
  const [tarefas, setTarefas] = useState([]);

  function adicionar() {
    if (tarefa.trim() === "") return;
    setTarefas([...tarefas, tarefa]);
    setTarefa("");
  }

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Lista de Tarefas</h2>
      <div style={styles.form}>
        <input
          type="text"
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
          placeholder="Digite a tarefa"
          style={styles.input}
        />
        <button onClick={adicionar} style={styles.button}>
          Adicionar
        </button>
      </div>

      <ul style={styles.list}>
        {tarefas.map((t, i) => (
          <li key={i} style={styles.item}>
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}

const styles = {
  section: {
    textAlign: "center",
    margin: "40px auto",
    width: "80%",
    maxWidth: "600px",
  },
  title: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  input: {
    flex: "1",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    marginTop: "20px",
  },
  item: {
    backgroundColor: "#f4f4f4",
    padding: "8px",
    marginBottom: "6px",
    borderRadius: "4px",
  },
};

export default FormTarefa;
