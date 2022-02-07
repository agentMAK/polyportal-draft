import styled from "styled-components"
import uniswapLogo from '../images/uniswapLogo.png'
import {ethers} from 'ethers'
import { useState } from 'react'
import { ChainId, TradeContext, UniswapPair, UniswapPairSettings } from 'simple-uniswap-sdk';
import {Row, Button, Form, Col, Spinner} from 'react-bootstrap'
import uni from '../images/uni.png'
import polygon from '../images/polygon.svg'

function UniswapSwap(props) {
    const [approveStatus, setApproveStatus] = useState('active')
    const [swapStatus, setSwapStatus] = useState('inactive')
    const [ethersConfig,setEthersConfig] = useState({
        provider:"",
        signer:"",
        trade:""
      })
    const [exchangeState,setExchangeState] = useState({
        uniswapExchange:true,
        confirmedTransaction:false
    })
    const approveSwap = async () => {

        const uniswapPair = new UniswapPair({
          // the contract address of the token you want to convert FROM
          fromTokenContractAddress: '0xeb8f08a975ab53e34d8a0330e0d34de942c95926',
          // the contract address of the token you want to convert TO
          toTokenContractAddress: '0x01be23585060835e02b77ef475b0cc51aa1e0709',
          // the ethereum address of the user using this part of the dApp
          ethereumAddress:props.walletAddress,
          // you can pass in the provider url as well if you want
          providerUrl: "https://eth-rinkeby.alchemyapi.io/v2/uJtp7jXfk1873L-3XsfmrR9DIKnRzeP7",
          // OR if you want to inject your own ethereum provider (no need for chainId if so)
          // ethereumProvider: YOUR_WEB3_ETHERS_OR_CUSTOM_ETHEREUM_PROVIDER,
          chainId: ChainId.RINKEBY,
          settings: new UniswapPairSettings({
            gasSettings: {
              getGasPrice: async () => {
                return 'GWEI_GAS_PRICE';
              },
            },
          })
        });
        const uniswapPairFactory = await uniswapPair.createFactory();
        const trade = await uniswapPairFactory.trade(props.amount);
    
        if (!trade.fromBalance.hasEnough) {
          throw new Error('You do not have enough from balance to execute this swap');
        }
    
        // subscribe to quote changes this is just in example so your dont miss it
        trade.quoteChanged$.subscribe((value: TradeContext) => {
          // value will hold the same info as below but obviously with
          // the new trade info.
        });
    
    
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner()
        console.log(signer)
    
        setEthersConfig({
            provider:provider,
            signer:signer,
            trade:trade
        })
         console.log(ethersConfig)
        
    
        if (trade.approvalTransaction) {
          const approved = await signer.sendTransaction(trade.approvalTransaction);
          console.log('approved txHash', approved.hash);
          setApproveStatus('waiting')
          const approvedReceipt = await approved.wait();
          console.log('approved receipt', approvedReceipt);
          setApproveStatus('disabled')
          setSwapStatus('active')
        } else {setSwapStatus('active')}
      };
    
      const sendTransaction = async () => {
        const tradeTransaction = await ethersConfig.signer.sendTransaction(ethersConfig.trade.transaction);
        console.log('trade txHash', tradeTransaction.hash);
        setSwapStatus('waiting')
        const tradeReceipt = await tradeTransaction.wait();
        console.log('trade receipt', tradeReceipt);
        setSwapStatus('disabled')
        setExchangeState({
            uniswapExchange:false,
            confirmedTransaction: true
        })
         // once done with trade aka they have sent it and you don't need it anymore call
        ethersConfig.trade.destroy();
      }

      const statusButton = (text: String,status: String,onClick: function) => {
        let button
        if(status === 'inactive') {
          button = <Button variant="primary"  size="lg" disabled>
                      {''} {text}
                    </Button>
          }
          else if(status === 'waiting') {
            button = <Button variant="primary"  size="lg">
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"/>
                        {''} {text}
                    </Button>
          }else if(status === 'disabled'){
            button = <Button variant="secondary"  size="lg" disabled>
                      {''} {text}
                    </Button>
          }else if(status === 'active') {
            button = <Button variant="primary"  size="lg" onClick={onClick}>
                        {''} {text}
                    </Button>
          }
          return button
      }

      const confirmedTransaction = () => {
        return ( <FinalWrapper>
          <h2>Transaction Confirmed</h2>
              <img  className="polygon" src={polygon} alt="Polygon"></img>
              <br/><br/><br/>
              <p>You have 3.2 LINK <br/>in your <strong>Polygon Wallet</strong></p>
          </FinalWrapper>
          )
      }

      const uniswapExchange = () => {
          return(<FormWrapper>
            <Uni>
                <img  className="uni" src={uni} alt="Uniswap"></img>
            </Uni>
            <Form>
            <Form.Label>You pay</Form.Label>
              <Form.Group className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">USDC</span>
                </div>
                <Form.Control type="number"  defaultValue="50"/>
              </Form.Group>
              <Row className="mb-3">
              <Form.Label>You will recieve</Form.Label>
              <Form.Group as={Col} className="mb-3">
                <Form.Control type="number" value='3.2' disabled/>
              </Form.Group>
                <Form.Group as={Col} className="mb-3">
                  <Form.Select aria-label="Default select example" defaultValue="1">
                    <option value="1">LINK</option>
                    <option value='2'>MATIC</option>
                    <option value="3">DAI</option>
                    <option value="4">UNI</option>
                  </Form.Select>
                </Form.Group>
              </Row>
            </Form>
            <br /><br /><br /><br /><br />
            <FinaliseButton>
                    <div className="d-grid gap-2">
                    {statusButton('Approve',approveStatus,approveSwap)}
                    </div>
                    <br />
                    <div className="d-grid gap-2">
                    {statusButton('Swap for LINK',swapStatus,sendTransaction)}
                        </div>
                </FinaliseButton>
           </FormWrapper>)
      }
    return(<HomeWrapper>
            <LeftWrapper>
                <h1>Interacting with dApps</h1>
                <Description>
                    <p>Uniswap is one of the largest decentralised exchanges in crypto, we’re going to use it to make your first swap.</p>
                </Description>
            </LeftWrapper>
            <BulletWrapper>
                <BulletContainer>
                    <p><strong>1 - Approve</strong> <br/><br/>you're completely new to web3, just curious or you’re already obsessed, we’re here to help you into the Web3 with ease</p>
                </BulletContainer>
                <BulletContainer>
                    <p><strong>2 - Send</strong> <br/><br/>Whether you're completely new to web3, just curious or you’re already obsessed, we’re here to help you into the Web3 with ease</p>
                </BulletContainer>
            </BulletWrapper>
            <ButtonWrapper>
                <button onClick={() => props.app('OnBoarded')}>Continue</button>
            </ButtonWrapper>
            <AppWrapper>
            { exchangeState.uniswapExchange && uniswapExchange() }
            { exchangeState.confirmedTransaction && confirmedTransaction() }
            </AppWrapper>
        </HomeWrapper>)
}

export default UniswapSwap

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
    bottom: 100px;
    right:150px;

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
    }
`

const AppWrapper = styled.div`
  position: absolute;
  top:150px;
  bottom: 0;
  right: 350px;
  color: (--black);
  width: 500px;
  height: 620px;
  background-color: white;
  border-radius: 50px;
  box-shadow: 0 0px 20px #A64FF2;
  /* box-shadow: #A64FF2 0px 8px 12px; */
  text-align:center;
`;

const MainWrapper = styled.div`
`;

const FormWrapper = styled.div`
  margin:50px;
  text-align: left;

  .uni {
      width:300px
  }
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

const Uni = styled.div`
    text-align: center;
    margin-bottom:20px;

}`

const FinalWrapper = styled.div`
  margin:50px;

  .polygon { 
    width:300px;
  }

  h2 {
    font-family: 'Graphik';
    font-weight: bold;
    font-style: normal;
    background: -webkit-linear-gradient(260deg,#1E98FD, #F20CEF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top:75px;
  }
`;