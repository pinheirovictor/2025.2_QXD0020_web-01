import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser, getPostsByUser } from "../api/api";
import UserPostModal from "../components/UserPostModal";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    async function loadData() {
      const u = await getUser(id);
      const p = await getPostsByUser(id);
      setUser(u);
      setPosts(p);
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!user) return <p>Usuário não encontrado.</p>;

  return (
    <div>
      <h2>Detalhes do Usuário</h2>

      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Telefone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <p>Empresa: {user.company.name}</p>

      <h3>Endereço</h3>
      <p>{user.address.street}, {user.address.city}</p>

      <h3>Posts</h3>
      {posts.map(post => (
        <div key={post.id} style={{marginBottom:10}}>
          <strong>{post.title}</strong><br />
          <button onClick={() => setSelectedPost(post)}>Ver conteúdo</button>
        </div>
      ))}

      <UserPostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
}
