import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import api from "../../apis/api";
import { Link, Outlet } from "react-router-dom";
import hands from "../../assets/images/hands.jpg";
import BtnLoginSignUp from "../../components/form-control-login-signup/BtnLoginSignUp";
import "./profileStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Profile() {
  const { loggedInUser, handleLogout } = useContext(AuthContext);

  const [profilePicture, setprofilePicture] = useState({
    picture: "",
  });

  function handleChange({ target }) {
    const { name, files } = target;
    if (files) {
      setprofilePicture({ ...profilePicture, [name]: files[0] });
      return;
    }
    return profilePicture;
  }

  console.log("profilePicture", profilePicture);

  async function handleFileUpload(file) {
    // 1. Criar uma instância da construtora FormData
    const formData = new FormData();

    // 2. Criar um campo para armazenar nosso arquivo nessa instância
    formData.append("profilePicture", file); // O primeiro argumento de append precisa ser a mesma string passada para o método 'single' do middleware uploader na sua rota do backend

    // 3. Enviar essa instância para a API
    const response = await api.post("/upload", formData);

    return response.data;
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      // Envia o arquivo que o usuário selecionou para a rota de upload de arquivo
      if (profilePicture.picture) {
        const { fileUrl } = await handleFileUpload(profilePicture.picture);

        const clone = { ...profilePicture };

        delete clone.picture;
        // Mandar os dados pra API
        const response = await api.patch("/profile/:_id", {
          ...clone,
          profilePictureUrl: fileUrl,
        });

        console.log("FINAL", response.data);
      } else {
        await api.patch("/profile/:_id", profilePicture);
      }
    } catch (err) {
      console.error(err);
    }
  }

  console.log("profile pic", profilePicture);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await api.get(`/profile/${loggedInUser.user._id}`);
        console.log("O QUE TA VINU", response.data);
        setUserInfo({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserInfo();
  }, [loggedInUser.user._id]);

  console.log("userInfo", userInfo);

  return (
    <div className="profile-page">
      <div className="row d-flex flex-nowrap">
        <div className="col-4 align-items-start me-5">
          <img
            src={userInfo.profilePictureUrl}
            className="card-img mt-5"
            alt="Profile pic"
          />
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="file"
                name="picture"
                id="profileFormPicture"
                onChange={handleChange}
              />
              <BtnLoginSignUp>Save</BtnLoginSignUp>
            </div>
          </form>

          <div className="mt-5 ">
            <h6 className="mb-3">Welcome Back, {loggedInUser.user.name}</h6>
            <h6 className="mb-3">
              Your skin type is {loggedInUser.user.userSkinType}
            </h6>
            <ul>
              <li>
                <Link to="favorites">Favorites</Link>
              </li>
              <li>
                {" "}
                <Link to="my-reviews">My Reviews</Link>
              </li>
              <li>
                <button className="btn btn-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-6 align-items-center m-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;
