import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import styles from "./Entry.module.sass";
import TextInput from "../../../components/TextInput";
import Image from "../../../components/Image";
import { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword } from "../../../config/firebaseConfig";

const Entry = () => {  // ✅ Remove unnecessary prop

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

   // ✅ Handle input change
   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submission (Firebase Sign-Up)
  const handleSubmit = async () => {
    let tempErrors = {};

    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.password) tempErrors.password = "Password is required";
    if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setErrors({}); // ✅ Clear errors if all validations pass

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/dashboard"); // ✅ Redirect to dashboard after successful sign-up
    } catch (error) {
      setErrors({ email: "Failed to create an account. Try again." });
    }
  };

  // ✅ Handle Google Authentication
  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (error) {
      setErrors({ email: "Google authentication failed." });
    }
  };

  return (
    <div className={styles.entry}>
      <div className={styles.head}>
        <div className={styles.info}>Sign up with Open account</div>
        <div className={styles.btns}>
          <button className={cn("button-stroke", styles.button)} onClick={handleGoogleAuth}>
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
      <div className={styles.body}>
        <div className={styles.info}>Or continue with email address</div>
        <div className={styles.error}>{errors.name}</div>
        <TextInput
          className={styles.field}
          name="name"
          type="name"
          placeholder="Your Name"
          required
          icon="diamond"
          value={formData.name}
          onChange={handleChange}
        />
        <div className={styles.error}>{errors.email}</div>
        <TextInput
          className={styles.field}
          name="email"
          type="email"
          placeholder="Your email"
          required
          icon="mail"
          value={formData.email}
          onChange={handleChange}
        />
        <div className={styles.error}>{errors.password}</div>
        <TextInput
          className={styles.field}
          name="password"
          type="password"
          placeholder="Password"
          required
          icon="lock"
          value={formData.password}
          onChange={handleChange}
        />
        <button className={cn("button", styles.button)} onClick={handleSubmit}>
          Continue
        </button>
        <div className={styles.note}>
          This site is protected by reCAPTCHA and the Google Privacy Policy.
        </div>
      </div>
    </div>
  );
};

export default Entry;
