import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import styles from "./Entry.module.sass";

import TextInput from "../../../components/TextInput";
import Image from "../../../components/Image";
import { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword } from "../../../config/firebaseConfig";

const Entry = () => {  // ✅ Remove unnecessary prop

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

   // ✅ Handle input change
   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submission (Firebase Sign-Up)
  const handleSubmit = async () => {
    switch (true) {
      case !formData.name:
        toast.error("⚠️ Name is required", { position: "top-right" });
        return;
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
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("✅ Account created successfully!", { position: "top-right" });
      navigate("/dashboard"); // ✅ Redirect to dashboard after successful sign-up
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.warn("⚠️ This email is already registered. Redirecting to Sign-In...", {
          position: "top-right",
          autoClose: 2000, // ✅ Delay 2 seconds before redirecting
        });
        setTimeout(() => {
          navigate("/signin"); // ✅ Auto-redirect after 2 seconds
        }, 2000);
      } else {
        toast.error("❌ Failed to create an account. Try again.", { position: "top-right" });
      }
    }
  };

  // ✅ Handle Google Authentication
  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("✅ Signed in with Google!", { position: "top-right" });
      navigate("/dashboard");
    } catch (error) {
      toast.error("❌ Google authentication failed.", { position: "top-right" });
    }
  };

  return (
    <div className={styles.entry}>

      <ToastContainer />

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
