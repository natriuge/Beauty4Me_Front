import React, { useState, createContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({ token: "", user: {} });

function AuthContextComponent(props) {
  const [loggedInUser, setLoggedInUser] = useState({ token: "", user: {} });
  const [loading, setLoading] = useState(true);

  //caso o user esteja logado, eu preciso preencher o state com os dados dele
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    const parsedStoredUser = JSON.parse(storedUser || '""');

    if (parsedStoredUser.user) {
      setLoggedInUser({ ...parsedStoredUser });
    }
  }, []);

  useEffect(() => setLoading(false), [loggedInUser.user]);

  const navigate = useNavigate();

  function handleLogout() {
    window.localStorage.removeItem("loggedInUser");
    setLoggedInUser({ token: "", user: {} });
    navigate("/");
  }

  //dessa função eu vou exportar o provider.
  //o provider precisa saber quais os dados ele vai disponibilizar para os outros componentes (vulgo seus filhos 'children'), de forma global. Isso é feito via value
  return (
    <AuthContext.Provider
      value={{ loggedInUser, setLoggedInUser, loading, handleLogout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// fazer exportação nomeada, ou seja, exatamente o nome da variável que eu quero que seja exportada
export { AuthContextComponent, AuthContext };
