import React, { useState, useRef } from 'react';

import { motion } from 'framer-motion';
import styles from '../styles/ContactForm.module.css'; 
import { toast } from 'react-toastify';
import emailjs from "@emailjs/browser";


const ContactForm = () => {

  const formRef = useRef();

  const [formData, setFormData] = useState({
    fullName: '', businessName: '', contactNumber: '', email: '',
    service: '', budget: '', message: ''
  });

  const services = ['UI/UX', 'WEB DEV', 'BRANDING', 'SEO'];
  const budgets = ['$1K-$5K', '$5K-$10K', '$20K+'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const onSubmit = (e) => {
  e.preventDefault();

  emailjs.send(
    "service_0gnmyhi",     // service_xxxxx
    "template_qr9kbl5",    // template_xxxxx
    {
      fullName: formData.fullName,
      businessName: formData.businessName,
      contactNumber: formData.contactNumber,
      email: formData.email,
      service: formData.service,
      budget: formData.budget,
      message: formData.message,
    },
    "PNvdW4dxNAsyOWbIs"      // public key
  )
  .then(() => {
    toast.success("Inquiry sent successfully!");
    setFormData({
      fullName: '',
      businessName: '',
      contactNumber: '',
      email: '',
      service: '',
      budget: '',
      message: ''
    });
  })
  .catch((error) => {
    console.error(error);
    toast.error("Failed to send inquiry");
  });
};



  return (
    <div className={styles.viewportWrapper}>
      <div className={styles.layoutSplit}>
        
        {/* LEFT PANEL - Text is White here */}
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
            <p className={styles.subHeading}>Minimalism is not a lack of something. It’s simply the perfect amount of everything.</p>
          </motion.div>
        </div>

        {/* RIGHT PANEL - Text is Dark here */}
        <div className={styles.panelRight}>
          <form  ref={formRef} className={styles.responsiveForm} onSubmit={onSubmit}>
            <input type="hidden" name="fullName" value={formData.fullName} />
<input type="hidden" name="businessName" value={formData.businessName} />
<input type="hidden" name="contactNumber" value={formData.contactNumber} />
<input type="hidden" name="email" value={formData.email} />
<input type="hidden" name="service" value={formData.service} />
<input type="hidden" name="budget" value={formData.budget} />
<input type="hidden" name="message" value={formData.message} />

            <div className={styles.flexRow}>
              <div className={styles.formGroup}>
                <label>Identify</label>
                <input className={styles.inputField} name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
              </div>
              <div className={styles.formGroup}>
                <label>Company</label>
                <input className={styles.inputField} name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Optional" />
              </div>
            </div>

            <div className={styles.flexRow}>
              <div className={styles.formGroup}>
                <label>Direct Line</label>
                <input className={styles.inputField} name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="+1..." required />
              </div>
              <div className={styles.formGroup}>
                <label>Digital Mail</label>
                <input className={styles.inputField} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" required />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Project Scope</label>
              <div className={styles.pillContainer}>
                {services.map(s => (
                  <button 
                    type="button" key={s} 
                    className={`${styles.pill} ${formData.service === s ? styles.pillActive : ''}`}
                    onClick={() => handleSelect('service', s)}>{s}</button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Investment Range</label>
              <div className={styles.pillContainer}>
                {budgets.map(b => (
                  <button 
                    type="button" key={b} 
                    className={`${styles.pill} ${formData.budget === b ? styles.pillActiveAccent : ''}`}
                    onClick={() => handleSelect('budget', b)}>{b}</button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Detailed Brief</label>
              <textarea className={styles.inputField} name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about the project goal..." rows="1" />
            </div>

            <motion.button 
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={styles.submitTrigger}
            >
              SEND INQUIRY <span>→</span>
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;