function MainContent() {
  return (
    <main style={styles.main}>
      <h2>O que é React?</h2>
      <p>
        React é uma biblioteca JavaScript para criar interfaces de usuário
        (UI). Ele facilita a criação de componentes reutilizáveis.
      </p>

      <h3>Por que usar React?</h3>
      <ul>
        <li>Componentização</li>
        <li>Reatividade com estado</li>
        <li>Virtual DOM eficiente</li>
      </ul>
    </main>
  );
}

const styles = {
  main: {
    padding: "20px",
    backgroundColor: "#f4f4f4",
  },
};

export default MainContent;
