import styled from "styled-components"
import maticWhite from '../images/matic-white.png'
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import {Col} from 'react-bootstrap';


const rinkebyConfig: CustomChainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget: "https://eth-rinkeby.alchemyapi.io/v2/uJtp7jXfk1873L-3XsfmrR9DIKnRzeP7",
    blockExplorer: "https://rinkeby.etherscan.io/",
    chainId: "0x4",
    displayName: "Rinkeby Testnet",
    ticker: "ETH",
    tickerName: "ETH",
  };


  const polygonMumbaiConfi: CustomChainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget: "https://rpc-mumbai.maticvigil.com",
    blockExplorer: "https://mumbai-explorer.matic.today",
    chainId: "0x13881",
    displayName: "Polygon Mumbai Testnet",
    ticker: "matic",
    tickerName: "matic",
  };

  const web3auth = new Web3Auth({
    chainConfig: rinkebyConfig,
    clientId: "BLM3BLJ7oG0roos5PhU4XiwICwCrE62t2AajM-ISvghfZaT-rX_ch6t85Xni9DMDjNjWR3LLKHdMwKaln3yWxa4", // get your clientId from https://developer.web3auth.io
  });
const showModal = async () => {
  await web3auth.initModal();
//   await web3auth.logout();
  await web3auth.connect();
};

function PolygonWallet(props) {

    
    return(<HomeWrapper>
            <LeftWrapper>
                <h1>Polygon Wallet</h1>
                <Description>
                    <p>Whether you're completely new to web3, just curious or you’re already obsessed, we’re here to help you into the Web3 with ease</p>
                </Description>
            </LeftWrapper>
            <BulletWrapper>
                <BulletContainer>
                    <p><strong>Wallet</strong> you're completely new to web3, just curious or you’re already obsessed, we’re here to help you into the Web3 with ease</p>
                </BulletContainer>
                <BulletContainer>
                    <p><strong>Gas Fees</strong> Whether you're completely new to web3, just curious or you’re already obsessed, we’re here to help you into the Web3 with ease</p>
                </BulletContainer>
            </BulletWrapper>
            <ButtonWrapper>
                <button onClick={showModal}>Create a Wallet</button>
                <button onClick={() => props.app('PolygonAddress')}>Continue</button>
            </ButtonWrapper>
            <ButtonText><p><strong>Let's get started...</strong></p></ButtonText>
        </HomeWrapper>)
}

export default PolygonWallet

const HomeWrapper = styled.div`
    h1 {
        font-family: 'Graphik';
        font-weight: 600;
        font-style: normal;
        font-size:75pt;
        color:#1E98FD;
        /* background: -webkit-linear-gradient(294deg,#1E98FD, #F20CEF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent; */
    }

    p {
        font-family: 'Graphik';
        font-weight: normal;
        font-style: normal;
        font-size: 15pt;
        line-height: normal;
    }
`
const LeftWrapper = styled.div`
    display: flex;
    text-align: left;
    justify-content: flex-end;
    margin-right: 50%;
    margin-left: 250px;
    margin-top: 100px;
    flex-direction: column;
    position: absolute;

`

const Description = styled.div`
   margin-top: 10px;
   margin-right:100px;


`

const RightWrapper = styled.div`
    display: flex;
    text-align: left;
    justify-content: flex-end;
    margin-left: 50%;
    margin-right: 150px;
    margin-top: 25px;
    flex-direction: column;
    position: absolute;

    img {
        width:400px;
    }

`

const BulletWrapper = styled.div`
    display: flex;
    text-align: left;
    margin-left: 250px;
    margin-top: 475px;
    position: absolute;
`

const BulletContainer = styled.div`
    width:350px;
    margin-right:50px;
`

const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 150px;
    right:400px;
    display: flex;

    button {
        padding:20px;
        background-image: -webkit-linear-gradient(294deg,#1E98FD, #F20CEF);
        border-radius: 15px;
        color: inherit;
        border: none;
        font: inherit;
        cursor: pointer;
	    outline: inherit;
        font-family: 'Graphik';
        font-weight: 600;
        font-style: normal;
        color:white;
        margin-left: 15px;
    }
`
const ButtonText = styled.div`
    position: absolute;
    bottom: 150px;
    right:700px;
    
    p { 
        line-height: 0;
    }
`