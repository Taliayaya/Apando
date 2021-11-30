import axios from "axios";
import React, { useState } from "react";
import FileUploader from "./FileUploader";

const ProfileUtilisateur = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const submitForm = () => {
      console.log(selectedFile);
    const formData = new FormData();
    formData.append(
      "user_id",
      JSON.parse(localStorage.getItem("user_data")).id
    );
    formData.append("file", selectedFile);
    localStorage.setItem("Avatar", true);
    axios
      .post(
        "http://localhost/Project-Plateforme/src/php/avatarUploader.php",
        formData,
        {
            headers: {

                'Content-Type': 'multipart/form-data'

            }
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.removeItem("Avatar");
      })
      .catch((err) => alert("File Upload Error"));
  };
  return (
    <div>
      <h1>Avatar</h1>
      <div className="avatar-uploader">
        <form action="#">
          <FileUploader
            onFileSelectSuccess={(file) => setSelectedFile(file)}
            onFileSelectError={({ error }) => alert(error)}
          />
          <button onClick={submitForm}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUtilisateur;
