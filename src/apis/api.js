import axios from "axios";

const apis = {
  development: "http://localhost:4000",
  production: "https://beauty4me.herokuapp.com",
};

// Pré-configurando a URL padrão do nosso backend em uma instância do Axios
const api = axios.create({
  baseURL: apis[process.env.NODE_ENV],
});


// Configura a instância do Axios para injetar o cabeçalho de autenticação antes de cada requisição
//intercepta ANTES de toda a requisição nesta instância específica que configuramos
api.interceptors.request.use((config) => {
  // Verifica se já temos as informações do usuário logado no localStorage
  //localstorage: sobrevive em um arquivo no pc do usuário até que o usuário manualmente delete do pc dele ou formate o pc dele. o token expira, mas enquanto ele for válido, o usuário fica logado!
  const storedUser = localStorage.getItem("loggedInUser");

  const loggedInUser = JSON.parse(storedUser || '""');

  if (loggedInUser.token) {
    config.headers = {
      Authorization: `Bearer ${loggedInUser.token}`,
    };
  }

  return config;
});

export default api;
