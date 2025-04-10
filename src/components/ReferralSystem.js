import React, { useEffect } from 'react';
import { FaCopy, FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import { GiBee } from 'react-icons/gi';
import styles from './ReferralSystem.module.css';
import { ethers  } from 'ethers'
import { useAccount } from "wagmi";
import { simulateContract, writeContract } from '@wagmi/core'
import { useState } from'react';

const ReferralSystem = ({refferal, totalRefsBounty, setTotalRefsBounty}) => {
  const { address } = useAccount()
  const [refLink, setRefLink] = useState("Login to get your referral link")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if(address) {
      setRefLink(`https://bnbhive.xyz/?ref=${address}`)
    } else {
      setRefLink("Login to get your referral link")
    }
  },[address])

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(refLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  const witdrawRef = async () => {
    try{
      const withdraw = await writeContract({
        abi: ABI,
        address: contract,
        functionName: 'refsBountyGet',
        args: [address],
      })
      setTotalRefsBounty(0)
    }
    catch(error) {
      console.error('Failed to withdraw: ', error);
    }
  };
  return (
    <div className={styles.referralSystem}>
      <div className={styles.referralHeader}>
        <GiBee className={styles.headerIcon} />
        <h2>Referral Program</h2>
        <GiBee className={styles.headerIcon} />
      </div>
      
      {/* First show the referral link - most important action */}
      <div className={styles.referralLinkContainer}>
        <p className={styles.referralDescription}>
          Share your referral link and earn rewards from your referrals' investments!
        </p>
        <div className={styles.referralInputGroup}>
          <input 
            type="text" 
            readOnly 
            value={refLink} 
            className={styles.referralInput}
          />
          <button 
            className={styles.copyButton}
            onClick={handleCopyClick}
          >
            <FaCopy className={styles.copyIcon} />
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
      
      {/* Show earnings and actions */}
      <div className={styles.earningsSection}>
        <h3 className={styles.sectionTitle}>Your Earnings</h3>
        <div className={styles.referralStats}>
          <div className={styles.statItem}>
            <p className={styles.statLabel}>BNB Referral Income</p>
            <p className={styles.statValue}>{Number(ethers.formatEther(totalRefsBounty)).toFixed(2)} BNB</p>
          </div>
          <div className={styles.statItem}>
            <p className={styles.statLabel}>Airdrop Points</p>
            <p className={styles.statValue}>{refferal * 50}</p>
          </div>
        </div>
        
        <button className={styles.withdrawButton}>
          <FaMoneyBillWave />
          Withdraw BNB Income
        </button>
      </div>
      
      {/* Show referral levels/rewards */}
      <div className={styles.rewardsSection}>
        <h3 className={styles.sectionTitle}>Reward Levels</h3>
        <div className={styles.referralLevels}>
          <div className={styles.levelCard}>
            <p className={styles.levelPercent}>30%</p>
            <p className={styles.levelLabel}>Direct</p>
          </div>
          <div className={styles.levelCard}>
            <p className={styles.levelPercent}>5%</p>
            <p className={styles.levelLabel}>Indirect</p>
          </div>
          <div className={styles.levelCard}>
            <p className={styles.levelPercent}>2%</p>
            <p className={styles.levelLabel}>Extended</p>
          </div>
        </div>
      </div>
      
      {/* Show referral count */}
      <div className={styles.referralCount}>
        <div className={styles.countDisplay}>
          <FaUsers className={styles.countIcon} />
          <span>Referrals Invited: <strong>{refferal}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default ReferralSystem;