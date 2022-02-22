import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Web3Modal, { connectors } from "web3modal";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { abi } from "../constants/abi";

let web3Modal;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: { 42: process.env.NEXT_PUBLIC_RPC_URL }, // required
    },
  },
};

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions, // required
  });
}

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState(undefined);

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web3ModalProvider = await web3Modal.connect();
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(web3ModalProvider);
        setSigner(provider.getSigner());
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function execute() {
    if (typeof window.ethereum !== "undefined") {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        await contract.store(5000);
      } catch (e) {
        console.log(e);
      }

    } else {
      console.log("Metamask missing. Please install");
    }
  }

  return (
    <div className={styles.container}>
      {isConnected ? "Connected! " :
        (<button onClick={() => connect()}>Connect</button>)}
      {isConnected ? (<button onClick={() => execute()}>Execute</button>) :
        ""}
    </div>
  )
}
