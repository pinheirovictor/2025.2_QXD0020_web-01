import { useAuth } from "../auth/AuthContext";
import TopMenu from "../components/TopMenu";
import SessoesUsuario from "../user/SessoesUsuario";
import SessoesAdmin from "../admin/SessoesAdmin";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <TopMenu />

      {user.role === "admin"
        ? <SessoesAdmin />
        : <SessoesUsuario />
      }
    </>
  );
}
