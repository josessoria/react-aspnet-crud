import React, { useContext } from "react";
import { Or } from "../../components/Or";
import { AuthBody } from "../../components/AuthBody";
import { AuthForm } from "../../components/AuthInputForm";
import { AuthFooter } from "../../components/AuthFooter";
import { AuthHeader } from "../../components/AuthHeader";
import { AuthSubmit } from "../../components/AuthSubmit";
import { AuthContext } from "../../context/AuthContext";
import { AuthLoginOptions } from "../../components/AuthLoginOptions";
import { ContinueWithGoogle } from "../../components/ContinueWithGoogle";

import "./Auth.scss";

export interface InputConfig {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Login = () => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    username: "",
    password: "",
  });

  const authContext = useContext(AuthContext);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });

    handleValidation(name, value);
  };

  const handleBlur = (e: any) => {
    const { name, value } = e.target;
    handleValidation(name, value);
  };

  const handleValidation = (name: any, value: any) => {
    let newErrors = { ...errors };

    switch (name) {
      case "username":
        if (value.trim() === "") {
          newErrors.username = "Por favor, ingresa tu nombre de usuario.";
        } else {
          newErrors.username = "";
        }
        break;
      case "password":
        if (value.trim() === "") {
          newErrors.password = "Por favor, ingresa tu contraseña.";
        } else {
          newErrors.password = "";
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleLogin = async () => {
    const newErrors = {
      username: "",
      password: "",
    };
    let valid = true;

    if (data.username.trim() === "") {
      newErrors.username = "Por favor, ingresa tu nombre de usuario.";
      valid = false;
    }

    if (data.password.trim() === "") {
      newErrors.password = "Por favor, ingresa tu contraseña.";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    try {
      if (authContext) {
        await authContext.login(data);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputs: InputConfig[] = [
    {
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "Enter your username",
      onBlur: handleBlur,
      onChange: handleChange,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      onBlur: handleBlur,
      onChange: handleChange,
    },
  ];

  return (
    <AuthBody>
      <AuthHeader
        title="Sign In"
        description="Enter your email and password to sign in!"
      />
      <ContinueWithGoogle />
      <Or />
      <AuthForm inputs={inputs} handleChange={handleChange} errors={errors} />
      <AuthLoginOptions />
      <AuthSubmit label="Sign In" onClick={() => handleLogin()} />
      <AuthFooter
        href="/register"
        label="Not registered yet?"
        hrefLabel="Create an Account"
      />
    </AuthBody>
  );
};

export default Login;
