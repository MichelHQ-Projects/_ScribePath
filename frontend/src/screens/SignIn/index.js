import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword } from "../../config/firebaseConfig";
import cn from "classnames";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import styles from "./SignIn.module.sass";
import { use100vh } from "react-div-100vh";
import TextInput from "../../components/TextInput";
import Image from "../../components/Image";

const SignIn = () => {
  const heightWindow = use100vh();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  
  //Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    switch (true) {
      case !formData.email:
        toast.error("⚠️ Email is required", { position: "top-right" });
        return;
      case !formData.password:
        toast.error("⚠️ Password is required", { position: "top-right" });
        return;
      case formData.password.length < 6:
        toast.error("⚠️ Password must be at least 6 characters", { position: "top-right" });
        return;
    }
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("✅ Signed in successfully!", { position: "top-right" });
      navigate("/dashboard"); // Redirect after successful login
    } catch (error) {
      toast.error("❌ Invalid email or password.", { position: "top-right" });
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("✅ Signed in with Google!", { position: "top-right" });
      navigate("/dashboard");
    } catch (error) {
      toast.error("❌ Google authentication failed.", { position: "top-right" });
    }
  };

  return (
    <div className={styles.login} style={{ minHeight: heightWindow }}>
      <ToastContainer />

      <div className={styles.wrapper}>
        <Link className={styles.logo} to="/">
          <Image
            className={styles.pic}
            src="/images/logo-dark.png"
            srcDark="/images/logo-light.png"
            alt="Core"
          />
        </Link>
        <div className={cn("h2", styles.title)}>Sign in</div>
        <div className={styles.head}>
          <div className={styles.subtitle}>Sign in with Open account</div>
          <div className={styles.btns}>
            <button className={cn("button-stroke", styles.button)} onClick={handleGoogleLogin}>
              <img src="/images/content/google.svg" alt="Google" />
              Google
            </button>
            <button className={cn("button-stroke", styles.button)}>
              <Image
                className={styles.pic}
                src="/images/content/apple-dark.svg"
                srcDark="/images/content/apple-light.svg"
                alt="Apple"
              />
              Apple ID
            </button>
          </div>
        </div>
        <form className={styles.body} onSubmit={handleSubmit}>
          <div className={styles.subtitle}>Or continue with email address</div>
          <TextInput
            className={styles.field}
            name="email"
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
            icon="mail"
          />
          <TextInput
            className={styles.field}
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            icon="lock"
          />
          <button className={cn("button", styles.button)} onClick={handleSubmit}>Sign in</button>
          <div className={styles.note}>
            This site is protected by reCAPTCHA and the Google Privacy Policy.
          </div>
          <div className={styles.info}>
            Don’t have an account?{" "}
            <Link className={styles.link} to="/signup">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
