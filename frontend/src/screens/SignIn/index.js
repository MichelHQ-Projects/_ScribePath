import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword } from "../../config/firebaseConfig";
import cn from "classnames";
import styles from "./SignIn.module.sass";
import { use100vh } from "react-div-100vh";
import TextInput from "../../components/TextInput";
import Image from "../../components/Image";

const SignIn = () => {
  const heightWindow = use100vh();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  // Handle Email/Password Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect after successful login
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.login} style={{ minHeight: heightWindow }}>
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
          <div className={styles.subtitle}>Sign up with Open account</div>
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
        <form className={styles.body} onSubmit={handleEmailLogin}>
          <div className={styles.subtitle}>Or continue with email address</div>
          <div className={styles.error}>{error}</div>
          <TextInput
            className={styles.field}
            name="email"
            type="email"
            placeholder="Your email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
            icon="mail"
          />
          <TextInput
            className={styles.field}
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon="lock"
          />
          <button className={cn("button", styles.button)}>Sign in</button>
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
