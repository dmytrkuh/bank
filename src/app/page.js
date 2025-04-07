'use client'
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StakingPanel from "../components/StakingPanel";
import ReferralSystem from "../components/ReferralSystem";
import HeroStats from "../components/HeroStats";
import ProjectDescription from "../components/ProjectDescription";
import styles from "./page.module.css";
import { Web3Provider } from "../components/Web3Provider";
import { useAccount } from "wagmi";
import { useBalance, useReadContract } from "wagmi";
import { ABI } from "@/scripts/ABI";
import { useState, useEffect, Suspense } from 'react';
import { setNewRefferal } from "@/scripts/refferals";
import { config } from "../components/Web3Provider";
import { getChainId } from '@wagmi/core'
import { switchChain } from '@wagmi/core'
import { bscTestnet } from '@wagmi/core/chains'


export default function Home() {
  const [balance, setBalance] = useState('0')
  //const [address, setAddress] = useState('')
  const [honey, setHoney] = useState('0')
  const [reinvest, setReinvest] = useState(0)
  const [isAutoReinvest, setIsAutoReinvest] = useState(false)
  const [refferal, setRefferal] = useState(0)
  const [totalRefsBounty, setTotalRefsBounty] = useState(0)
  const [refferalAddress, setRefferalAddress] = useState('0xC83605F01b903F17Fb88b346332782e13AE9ffDd')
  
  const chainId = getChainId(config)
  useEffect(()=>{
    if(chainId != 97)
    {
      switchChain(config, {chainId:bscTestnet.id})
    }
  },[chainId])
  return (
    <Web3Provider >
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
      <Suspense fallback={<div>Loading stats...</div>}>
        <HeroStats 
          balance={balance} 
          honey={honey} 
          setBalance={setBalance} 
          setHoney={setHoney} 
          reinvest={isAutoReinvest} 
          setReinvest={setIsAutoReinvest} 
          setRefferal={setRefferal} 
          setTotalRefsBounty={setTotalRefsBounty} 
          setRefferalAddress={setRefferalAddress}
        />
      </Suspense>
        
        <div className={styles.stakingReferralContainer}>
          <div className={styles.leftColumn}>
            <StakingPanel isAutoReinvest={isAutoReinvest} setIsAutoReinvest={setIsAutoReinvest} refferal={refferal} balance={balance} setBalance={setBalance} setHoney={setHoney} refferalAddress={refferalAddress}/>
            <div className={styles.desktopDescription}>
              <ProjectDescription />
            </div>
          </div>
          <ReferralSystem refferal={refferal} totalRefsBounty={totalRefsBounty} setTotalRefsBounty={setTotalRefsBounty} />
          <div className={styles.mobileDescription}>
            <ProjectDescription />
          </div>
        </div>
      </main>
      <Footer />
    </div>
    </Web3Provider>
  );
}
