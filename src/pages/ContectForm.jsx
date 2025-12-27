import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import styles from "../styles/ContactForm.module.css";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import FallingText from "../components/FallingText.jsx";

const ContactForm = () => {
  const [isFallen, setIsFallen] = useState(false);
  const formRef = useRef();
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

  const handleRestore = () => {
    setIsFallen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsFallen(true);
    setFormData({
      fullName: "",
      businessName: "",
      contactNumber: "",
      email: "",
      service: "",
      budget: "",
      message: "",
    });
    console.log("Form submitted:", formData);
    // emailjs.send(
    //   "service_0gnmyhi",
    //   "template_qr9kbl5",
    //   {
    //     fullName: formData.fullName,
    //     businessName: formData.businessName,
    //     contactNumber: formData.contactNumber,
    //     email: formData.email,
    //     service: formData.service,
    //     budget: formData.budget,
    //     message: formData.message,
    //   },
    //   "PNvdW4dxNAsyOWbIs"
    // )
    // .then(() => {
    //   toast.success("Inquiry sent successfully!");
    //   setFormData({ fullName: '', businessName: '', contactNumber: '', email: '', service: '', budget: '', message: '' });
    // })
    // .catch((error) => {
    //   console.error(error);
    //   toast.error("Failed to send inquiry");
    // });
  };

  return (
    <div className={styles.viewportWrapper}>
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
              Minimalism is not a lack of something. It’s simply the perfect
              amount of everything.
            </p>
          </motion.div>
        </div>

        <div className={styles.panelRight}>

        {isFallen && ( <span className={styles.Thanks}>Thanks</span>)}
  <FallingText isFallen={isFallen} gravity={1.5}>
    <form ref={formRef} className={styles.responsiveForm} onSubmit={onSubmit}>
      
      {/* Row 1: Identify & Company Separate */}
      <div className={styles.flexRow}>
        <div className={styles.formGroup}>
          <label className="fall-target">Identify</label>
          <input className={`${styles.inputField} fall-target`} name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
        </div>
        <div className={styles.formGroup}>
          <label className="fall-target">Company</label>
          <input className={`${styles.inputField} fall-target`} name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Optional" />
        </div>
      </div>

      {/* Row 2: Direct Line & Email Separate */}
      <div className={styles.flexRow}>
        <div className={styles.formGroup}>
          <label className="fall-target">Direct Line</label>
          <input className={`${styles.inputField} fall-target`} name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="+1..." required />
        </div>
        <div className={styles.formGroup}>
          <label className="fall-target">Digital Mail</label>
          <input className={`${styles.inputField} fall-target`} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" required />
        </div>
      </div>

      {/* Project Scope: Every Pill falls individually */}
      <div className={styles.formGroup}>
        <label className="fall-target">Project Scope</label>
        <div className={styles.pillContainer}>
          {services.map(s => (
            <button 
              type="button" 
              key={s} 
              className={`${styles.pill} ${formData.service === s ? styles.pillActive : ''} fall-target`} 
              onClick={() => handleSelect('service', s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Investment Range: Every Budget falls individually */}
      <div className={styles.formGroup}>
        <label className="fall-target">Investment Range</label>
        <div className={styles.pillContainer}>
          {budgets.map(b => (
            <button 
              type="button" 
              key={b} 
              className={`${styles.pill} ${formData.budget === b ? styles.pillActiveAccent : ''} fall-target`} 
              onClick={() => handleSelect('budget', b)}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Message & Submit Button Separate */}
      <div className={styles.formGroup}>
        <label className="fall-target">Detailed Brief</label>
        <textarea className={`${styles.inputField} fall-target`} name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about the project goal..." rows="1" />
      </div>

      <motion.button whileTap={{ scale: 0.98 }} type="submit" className={`${styles.submitTrigger} fall-target`}>
        SEND INQUIRY <span>→</span>
      </motion.button>
    </form>
  </FallingText>      

  {/* Restore Button (Fixed Position) */}
  {isFallen && (
    <button 
      onClick={handleRestore} 
      style={{ 
        position: 'fixed', 
        bottom: '100px', 
        left: '50%',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', 
        transform: 'translateX(-50%)',
        zIndex: 10000, 
        backgroundColor: '#000', 
        color: '#fff', 
        padding: '12px 24px', 
        border: '1px solid #fff', 
        borderRadius: '50px', 
        cursor: 'pointer',
        pointerEvents: 'all' 
      }}
    >
      RESTORE FORM ↺
    </button>
  )}
</div>
      </div>
    </div>
  );
};

export default ContactForm;
