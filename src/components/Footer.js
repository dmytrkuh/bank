import React from 'react';
import { FaTwitter, FaTelegram, FaDiscord } from 'react-icons/fa';
import Image from 'next/image';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <Image 
            src="/logo.svg" 
            alt="BNB Hive Logo" 
            width={150} 
            height={50} 
            priority
          />
        </div>
        
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>Home</a>
          <a href="#" className={styles.footerLink}>About</a>
          <a href="#" className={styles.footerLink}>FAQ</a>
          <a href="#" className={styles.footerLink}>Terms</a>
        </div>
        
        <div className={styles.socialLinks}>
          <a href="#" className={styles.socialLink}>
            <FaTwitter className={styles.socialIcon} />
          </a>
          <a href="#" className={styles.socialLink}>
            <FaTelegram className={styles.socialIcon} />
          </a>
          <a href="#" className={styles.socialLink}>
            <FaDiscord className={styles.socialIcon} />
          </a>
        </div>
      </div>
      
      <div className={styles.copyright}>
        <p>&#169; 2025 BNB Hive. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;