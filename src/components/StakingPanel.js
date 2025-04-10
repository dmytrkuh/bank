import React from 'react';
import { GiBee } from 'react-icons/gi';
import { FaMoneyBillWave } from 'react-icons/fa';
import styles from './StakingPanel.module.css';
import { useAccount, useWriteContract, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { ABI } from '@/scripts/ABI';
import { parseEther } from 'viem'
import {  UseWriteContractReturnType } from 'wagmi'
import { simulateContract, writeContract } from '@wagmi/core'
import { config } from './Web3Provider';
import { ethers } from 'ethers';

const StakingPanel = ({isAutoReinvest, setIsAutoReinvest, refferal, balance, setBalance, setHoney, refferalAddress}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { sendTransaction } = useSendTransaction()
  const [error, setError] = React.useState('')
  const [inputValue, setInputValue] = React.useState('0')
  const { address } = useAccount()
  const contract = "0xf9b9983e7429148e8a0F3D5512Df22033C6a5197"
  const Withdraw = async () => {
    try {
      const withdraw = await writeContract(config, {
        abi: ABI,
        address: contract,
        functionName: 'collectMoney',
        args: [
          address,
        ],
      })
      setBalance(0)
    }
    catch (error) {
      console.error('Withdraw operation failed:', error)
    }
  }
  const reinvest = async (checkbox) => {
    try {
      if(checkbox) {
        const reinvest = await writeContract(config, {
          abi: ABI,
          address: contract,
          functionName: 'toggleReinvest',
          value: parseEther('0.01'),
        })
        setIsAutoReinvest(true)
      } else {
        const reinvest = await writeContract(config, {
          abi: ABI,
          address: contract,
          functionName: 'removeReinvest',
        })
        setIsAutoReinvest(false)
        setHoney('0')
      }
    } catch (error) {
      console.error('Reinvest operation failed:', error)
      setIsAutoReinvest(!checkbox) // Возвращаем предыдущее состояние в случае ошибки
      setError('Failed to toggle auto-reinvest. Please try again.')
    }
  }
  const invest = async () => {
    console.log('investing')
    // sendTransaction({
    //   to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    //   value: parseEther('0.01'),
    // })
    console.log(refferal)
   let hash = await writeContract(config,{
    abi:ABI,
    address: contract,
    functionName: 'depositBNB',
    value: parseEther(inputValue),
    args: [
      refferalAddress,
    ],
   })
   console.log('123')
   let balString = Number(balance) + Number(parseEther(inputValue))
   setBalance(balString.toString())
   console.log(hash)
   const waitForTransaction = useWaitForTransaction({
    hash: hash,
    onSuccess(data) {
      console.log('Success', data)
    },
  })
  }
  return (
    <div className={styles.stakingPanel}>
      <div className={styles.panelHeader}>
        <GiBee className={styles.headerIcon} />
        <h2>Stake Your BNB</h2>
        <GiBee className={styles.headerIcon} />
      </div>
      
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <input 
            type="text" 
            placeholder="0.00 BNB" 
            className={styles.stakeInput}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className={styles.percentButtons}>
            <button className={styles.percentButton}>25%</button>
            <button className={styles.percentButton}>50%</button>
            <button className={styles.percentButton}>75%</button>
            <button className={styles.percentButton}>Max</button>
          </div>
        </div>
      </div>

      <div className={styles.autoReinvestContainer}>
        <label className={styles.toggleSwitch}>
          <input type="checkbox" checked={isAutoReinvest} onChange={(e) => {
              reinvest(e.target.checked);
            }}/>
          <span className={styles.toggleSlider}></span>
          <span className={styles.toggleLabel}>Auto-Reinvest</span>
        </label>
        <p className={styles.activationPrice}>Activation Price: 0.1 BNB</p>
      </div>
      
      <div className={styles.buttonGroup}>
        <button className={styles.stakeButton} onClick={async () => {
          setIsLoading(true);
          setError('');
          try {
            const success = await invest();
            if (!success) {

            }
          } catch (err) {
            
          } finally {
            setIsLoading(false);
          }
        }} >
          <GiBee className={styles.beeIcon} />
          Stake BNB
        </button>
        
        <button className={styles.harvestButton} onClick={Withdraw}>
          <FaMoneyBillWave className={styles.harvestIcon} />
          Withdraw Honey
        </button>
      </div>
      
      <div className={styles.rewardsInfo}>
        <p>Daily Rewards: <span className={styles.highlight}>3.9%</span></p>
        <p>Estimated Monthly Return: <span className={styles.highlight}>117%</span></p>
      </div>
    </div>
  );
};

export default StakingPanel;