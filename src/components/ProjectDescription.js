import React from 'react';
import { GiBee, GiHoneycomb } from 'react-icons/gi';
import styles from './ProjectDescription.module.css';

const ProjectDescription = () => {
  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.descriptionHeader}>
        <GiHoneycomb className={styles.headerIcon} />
        <h2>About BNB Hive</h2>
        <GiHoneycomb className={styles.headerIcon} />
      </div>
      
      <div className={styles.descriptionContent}>
        <p>
          BNB Hive is a decentralized investment platform that allows you to stake your BNB and earn 
          <span className={styles.highlight}> 2.1% daily rewards</span> on your investment.
        </p>
        
        <div className={styles.featuresList}>
          <div className={styles.featureItem}>
            <GiBee className={styles.featureIcon} />
            <p>Earn <span className={styles.highlight}>2.1%</span> daily returns on your staked BNB</p>
          </div>
          <div className={styles.featureItem}>
            <GiBee className={styles.featureIcon} />
            <p>Compound your earnings with auto-reinvest for maximum growth</p>
          </div>
          <div className={styles.featureItem}>
            <GiBee className={styles.featureIcon} />
            <p>Invite friends and earn additional BNB through our referral program</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ProjectDescription;
