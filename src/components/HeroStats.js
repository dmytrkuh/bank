'use client';
import React from 'react';
import styles from './HeroStats.module.css';
import { useBalance, useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';
import { ABI } from '@/scripts/ABI';
import { parseEther } from 'viem'
import { ethers  } from 'ethers'
import { setNewRefferal, getRefs } from '@/scripts/refferals';
import { useSearchParams } from 'next/navigation'
import ClientOnly from './ClientOnly';

const HeroStats = ({ balance, honey, reinvest, setHoney, setBalance, isAutoReinvest, setReinvest, setRefferal, setTotalRefsBounty, setRefferalAddress }) => {
  const [contractBalance, setContractBalance] = useState('0.00')
  const [isLoaded, setIsLoaded] = useState(false)
  const [refLoaded, setRefLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { address} = useAccount()
  const account = useAccount()
  useEffect(()=>{
    if(account.status == 'connected')
    {
      console.log('account connected')
      console.log(address)
    }
    else{
      console.log('account not connected')
    }
  }, account)
  const contract = "0xf9b9983e7429148e8a0F3D5512Df22033C6a5197"
  // Handle mounting
  useEffect(() => {
    setIsMounted(true)
  }, [])
  const searchParams = useSearchParams();
  // Handle referral
  useEffect(() => {
    if (!isMounted) return;
    
    try {
      console.log('Handling referral...');
      console.log('isMounted:', isMounted);
      console.log('address:', address);
      if(account.status == 'connected')
        {
          console.log('account connected')
          console.log(address)
        }
        else{
          console.log('account not connected')
          setRefferal(0)
          setTotalRefsBounty(0)
        }
      const ref = searchParams.get('ref');
      console.log('ref:', ref);
      if (ref && address) {
        console.log('Setting new referral...');
        setNewRefferal(address, ref);
        setRefferalAddress(ref)
      }
    } catch (error) {
      console.error('Error handling referral:', error);
    }
  }, [isMounted, address]);
  const contractBalanceData = useBalance({
    address: contract,
  })
  const userData = useReadContract({
    abi: ABI,
    address: contract,
    functionName: 'users',
    args: [address],
  })
  const EstimatedHoney = useReadContract({
    abi: ABI,
    address: contract,
    functionName: 'getEstimatedBalance',
    args: [address],
  })
  const EstimatedBalnce = useReadContract({
    abi: ABI,
    address: contract,
    functionName: 'getEstimatedBalanceReinvest',
    args: [address],
  })
  useEffect(() => {
    if (EstimatedHoney && EstimatedHoney.isSuccess && reinvest == 0) {
      console.log(reinvest)
      console.log(EstimatedHoney.data)
      setHoney(EstimatedHoney.data)
    }
    else if (EstimatedHoney && EstimatedHoney.isSuccess && reinvest == true){
      console.log(EstimatedBalnce.data)
      setHoney(EstimatedBalnce.data)
      console.log(reinvest)
    }
    
  }, )
  console.log(honey + "HONEY")
  useEffect(() => {
    async function fetchRefs() {
      if (!refLoaded && address) {
        const refs = await getRefs(address);
        if(!refs)
        {
          setRefferal(address)
        }
        setRefferal(refs);
        setRefLoaded(true);
      }
    }

    fetchRefs();
  }, [address, refLoaded]);
  useEffect(() => {
    if (userData && userData.isSuccess) {
      if(!isLoaded)
      {
        setReinvest(userData.data[4])
        setIsLoaded(true)
        setTotalRefsBounty(userData.data[5])
        if (EstimatedHoney && EstimatedHoney.isSuccess && reinvest == true){
          setBalance(EstimatedBalnce.data)
          console.log(reinvest)
        }
        else if(EstimatedHoney && EstimatedHoney.isSuccess){
          //setHoney(EstimatedBalnce.data)
        }
      }
      if(reinvest == false)
      {
        setBalance(userData.data[0])
      }
      //setReinvest(true)

    }
    else{
    }
  }, [userData])
  useEffect(() => {
    if (contractBalanceData && contractBalanceData.isSuccess) {
      setContractBalance(contractBalanceData.data.formatted)
    }
    else{
      console.log('no data')
    }
  }, [contractBalanceData])
  return (
      <div className={styles.heroStatsContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>BNB Hive</h1>
          <p className={styles.description}>Stake BNB and earn 3.9% daily rewards</p>
        </div>
        <div className={styles.statsContent}>
          <div className={styles.statCard}>
            <h3>Contract Balance</h3>
            <p className={styles.statValue}>{Number(contractBalance).toFixed(2)} BNB</p>
          </div>
          <div className={styles.statCard}>
            <h3>Invested</h3>
            <p className={styles.statValue}>{Number(ethers.formatEther(balance)).toFixed(3)} BNB</p>
          </div>
          <div className={styles.statCard}>
            <h3>Harvested Honey</h3>
            <p className={styles.statValue}>{Number(ethers.formatEther(honey)).toFixed(5)} BNB</p>
            {/* <p className={styles.statValue}>{honey} BNB</p> */}
          </div>
          <div className={styles.statCard}>
            <h3>Withdrawal Tax</h3>
            <p className={styles.statValue}>5%</p>
          </div>
        </div>
      </div>
  );
};

export default HeroStats;
