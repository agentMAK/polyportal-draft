import './App.css';
import './styles/stylesheet.css'
import styled from 'styled-components'
import {Row, Button, Form, Col, Spinner} from 'react-bootstrap'
import uni from './images/uni.png'
import polygon from './images/polygon.svg'
import { useState } from 'react'
import {ethers} from 'ethers'
import { ChainId, TradeContext, UniswapPair, UniswapPairSettings } from 'simple-uniswap-sdk';
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import LandingPage from './components/LandingPage';
import Polygon from './components/polygon';
import PolygonWallet from './components/PolygonWallet';
import PolygonAddress from './components/PolygonAddress';
import OnRamp from './components/OnRamp';
import UniswapInfo from './components/UniswapInfo';
import UniswapSwap from './components/UniswapSwap';
import OnBoarded from './components/OnBoarded';



function App() {
  const [amount, setAmount] = useState("50");
  const [token, setToken] = useState("MUSDC");
  const [walletAddress, setWalletAddress] = useState("0xFdf7175cd775b7425303291f8648194BBE605aF5")


  const [appPage, setAppPage] = useState('LandingPage')

  const appPages = {
    'LandingPage':<LandingPage app={setAppPage}></LandingPage>,
    'Polygon':<Polygon app={setAppPage}></Polygon>,
    'PolygonWallet':<PolygonWallet app={setAppPage}></PolygonWallet>,
    'PolygonAddress':<PolygonAddress app={setAppPage}></PolygonAddress>,
    'OnRamp':<OnRamp app={setAppPage}></OnRamp>,
    'UniswapInfo':<UniswapInfo app={setAppPage}></UniswapInfo>,
    'UniswapSwap':<UniswapSwap app={setAppPage} walletAddress={walletAddress} amount={amount}></UniswapSwap>,
    'OnBoarded':<OnBoarded app={setAppPage}></OnBoarded>
  }


  return (
    <div className="App">
      <Header>
        <h1>POLYPORTAL</h1>
      </Header>
      {/* <MainWrapper>
        <AppWrapper>
        { formState.chooseAmount && chooseAmount() }
        { formState.chooseWalletAddress && chooseWalletAddress() }
        { formState.chooseBillingAddress && chooseBillingAddress() }
        { formState.chooseCardDetails && chooseCardDetails() }
        { formState.verifyDetails && verifyDetails() }
        { formState.finaliseTransaction && finaliseTransaction() }
        </AppWrapper>
      </MainWrapper> */}
      {appPages[appPage]}
    </div>
  );
}

export default App;


const AppWrapper = styled.div`
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  color: (--black);
  width: 500px;
  height: 620px;
  background-color: white;
  border-radius: 10px;
  box-shadow: #b576f8 0px 8px 12px;
  border-style: solid;
  border-width: 1px;
  border-color: #7D00FF;
  text-align:center;
`;

const MainWrapper = styled.div`
`;

const FormWrapper = styled.div`
  margin:50px;
  text-align: left;
`;

const LoadingWrapper = styled.div`
  margin:50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 85%;
  justify-content: space-between;
  align-items: center;

  .uni {
    width: 300px;
  }
  .polygon {
    width: 150px;
  }
`;

const FinaliseButton = styled.div`
  width: 100%;
`;

const Header = styled.div`
  text-align: left;
  padding-left:50px;
  padding-top:20px;
  padding-bottom:20px;
  box-shadow: 0 0px 10px rgb(242,12,239,0.1);

  h1 {
    font-family: 'Graphik';
    font-weight: bold;
    font-style: normal;
    background: -webkit-linear-gradient(260deg,#1E98FD, #F20CEF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 150px;
    right:400px;
`