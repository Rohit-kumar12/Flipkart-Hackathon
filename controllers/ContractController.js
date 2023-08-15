const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mnemonic =
  "early federal scrub chicken essence also appear purse save dove craft treat";
const infuraApiKey = "bb0a427d67f445028349c31c9a34c27b";
const userAddress = "";
const inputAmount = 100;

const provider = new HDWalletProvider(
  mnemonic,
  `https://goerli.infura.io/v3/${infuraApiKey}`
);
const web3 = new Web3(provider);

const contractAAbi = require("../build/contracts/ContractA.json").abi;
const contractBAbi = require("../build/contracts/ContractB.json").abi;

const contractAAddress = "0xf8e81D47203A594245E36C48e151709F0C19fBe8";
const contractBAddress = "0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B";

const contractA = new web3.eth.Contract(contractAAbi, contractAAddress);
const contractB = new web3.eth.Contract(contractBAbi, contractBAddress);

app.use(bodyParser.json());

exports.contractController = async (req, res) => {
  try {
    const amountToTransfer = (inputAmount * 1) / 50;

    await contractA.methods
      .transferAndMint(userAddress, inputAmount)
      .send({ from: userAddress });

    await contractB.methods
      .mintTokens(userAddress, amountToTransfer)
      .send({ from: userAddress });

    res.status(200).json({
      msg: "Tokens transferred and minted successfully",
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      msg: "An error occurred",
      err,
    });
  }
};
