import React from 'react';
import styles from './Header.module.css';
import Image from 'next/image';
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Image 
            src="/logo.svg" 
            alt="BNB Hive Logo" 
            width={150} 
            height={50} 
            priority
          />
        </div>
        <div className={styles.connectWallet}>
        <ConnectKitButton />
        </div>
      </div>
    </header>
  );
};

export default Header;