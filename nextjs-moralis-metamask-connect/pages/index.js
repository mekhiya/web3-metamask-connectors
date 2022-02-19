import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { abi } from "../constants/abi";

export default function Home() {
  const { enableWeb3, isWeb3Enabled } = useMoralis();

  const { runContractFunction } = useWeb3Contract({
    abi: abi,
    contractAddress: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    functionName: "store",
    params: {
      _favoriteNumber: 2211,
    }
  })
  return (
    <div className={styles.container}>
      {isWeb3Enabled ? "Connected! " : (<button onClick={() => enableWeb3()}>Connect</button>)};

      {isWeb3Enabled ? <button onClick={() => runContractFunction()}>Execute</button> : ""}
    </div>
  )
}
