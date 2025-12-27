import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/ContactForm.module.css";
import FallingText from "../components/FallingText";
import emailjs from "@emailjs/browser";
// IMPORT CHANGES: 'unstyled' ki jagah standard import use karein styles ke saath
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const ContactForm = () => {
  const formRef = useRef();
  const [isFallen, setIsFallen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    contactNumber: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });

  const services = ["UI/UX", "WEB DEV", "BRANDING", "SEO"];
  const budgets = ["$1K-$5K", "$5K-$10K", "$20K+"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const serviceID = "service_0gnmyhi";
    const templateID = "template_qr9kbl5";
    const publicKey = "PNvdW4dxNAsyOWbIs";

    emailjs
      .sendForm(serviceID, templateID, formRef.current, publicKey)
      .then(
        (result) => {
          setIsSending(false);
          setIsFallen(true); 
          // Toast Notification
          toast.success("Inquiry sent successfully! 🎮", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
        },
        (error) => {
          setIsSending(false);
          toast.error("Failed to send message.");
        }
      );
  };

  const handleRestore = () => {
    window.location.reload();
  };

  return (
    <div className={styles.viewportWrapper}>
      {/* 1. TOAST CONTAINER YAHAN ZAROORI HAI */}
      <ToastContainer 
        position="top-center" 
        style={{ zIndex: 10000000 }} // Sabse upar dikhne ke liye
      />

      <div className={styles.layoutSplit}>
        <div className={styles.panelLeft}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.statusBadge}>AVAILABLE FOR PROJECTS</span>
            <h1 className={styles.heroHeading}>
              Design <br /> <span>Your</span> Future.
            </h1>
            <p className={styles.subHeading}>
              Minimalism is not a lack of something. It's simply the perfect
              amount of everything.
            </p>
          </motion.div>
        </div>

        <div className={styles.panelRight} style={{ position: "relative" }}>
          <AnimatePresence>
            {isFallen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  zIndex: 0,
                  pointerEvents: "none",
                  width: "100%",
                  userSelect: "none",
                }}
              >
                <h2
                  style={{
                    fontSize: "clamp(3rem, 8vw, 6rem)",
                    margin: 0,
                    lineHeight: "1.3",
                    color: "var(--panelLeft)",
                    fontWeight: "900",
                    textTransform: "uppercase",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginBottom: "-0.1em" }}>Thanks,</span>
                  <span
                    style={{
                      fontSize: "0.45em",
                      opacity: 0.8,
                      letterSpacing: "-1px",
                    }}
                  >
                    Now, Play a game
                  </span>
                </h2>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isFallen && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onClick={handleRestore}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  zIndex: 2000000,
                  padding: "10px 20px",
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "1px solid #000",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                RESTORE FORM ↺
              </motion.button>
            )}
          </AnimatePresence>

          <FallingText trigger={isFallen} gravity={1.5}>
            <form
              ref={formRef}
              className={styles.responsiveForm}
              onSubmit={onSubmit}
            >
              <div className={styles.flexRow}>
                <div className={styles.formGroup}>
                  <label className="fall-target">Identify</label>
                  <input
                    className={`${styles.inputField} fall-target`}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className="fall-target">Company</label>
                  <input
                    className={`${styles.inputField} fall-target`}
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className={styles.flexRow}>
                <div className={styles.formGroup}>
                  <label className="fall-target">Direct Line</label>
                  <input
                    className={`${styles.inputField} fall-target`}
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="+1..."
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className="fall-target">Digital Mail</label>
                  <input
                    className={`${styles.inputField} fall-target`}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <input type="hidden" name="service" value={formData.service} />
              <input type="hidden" name="budget" value={formData.budget} />

              <div className={styles.formGroup}>
                <label className="fall-target">Project Scope</label>
                <div className={styles.pillContainer}>
                  {services.map((s) => (
                    <button
                      type="button"
                      key={s}
                      className={`${styles.pill} ${
                        formData.service === s ? styles.pillActive : ""
                      } fall-target`}
                      onClick={() => handleSelect("service", s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className="fall-target">Investment Range</label>
                <div className={styles.pillContainer}>
                  {budgets.map((b) => (
                    <button
                      type="button"
                      key={b}
                      className={`${styles.pill} ${
                        formData.budget === b ? styles.pillActiveAccent : ""
                      } fall-target`}
                      onClick={() => handleSelect("budget", b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className="fall-target">Detailed Brief</label>
                <textarea
                  className={`${styles.inputField} fall-target`}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about the project goal..."
                  rows="1"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSending}
                className={`${styles.submitTrigger} fall-target`}
                style={{ opacity: isSending ? 0.7 : 1 }}
              >
                {isSending ? "SENDING..." : "SEND INQUIRY"} <span>→</span>
              </motion.button>
            </form>
          </FallingText>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;