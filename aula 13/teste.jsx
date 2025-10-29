import axios from "axios";

async function handleSubmit(e) {
  e.preventDefault();
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      formData
    );
    console.log(response.data);
  } catch (error) {
    console.error("Erro ao enviar:", error);
  }
}
