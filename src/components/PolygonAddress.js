import styled from "styled-components"
import maticWhite from '../images/matic-white.png'

function PolygonAddress(props) {
    return(<HomeWrapper>
            <LeftWrapper>
                <h1>Polygon Address</h1>
                <Description>
                    <p><strong>Your Polygon Wallet Address is: </strong>0x1d0e7D9C3851dEaA4ea9bb157915Ef4E47c2d3bC</p>
                </Description>
            </LeftWrapper>
            <BulletWrapper>
                <BulletContainer>
                    <p><strong>Private Keys</strong> you're completely new to web3, just curious or you’re already obsessed, we’re here to help you into the Web3 with ease</p>
                </BulletContainer>
                <BulletContainer>
                    <p><strong>Non-Custodial</strong> Whether you're completely new to web3, just curious or you’re already obsessed, we’re here to help you into the Web3 with ease</p>
                </BulletContainer>
            </BulletWrapper>
            <ButtonWrapper>
                <button onClick={() => props.app('OnRamp')}>Buy USDC</button>
            </ButtonWrapper>
            <ButtonText><p><strong>Let's fund your wallet...</strong></p></ButtonText>
        </HomeWrapper>)
}

export default PolygonAddress

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
    }
`
const ButtonText = styled.div`
    position: absolute;
    bottom: 150px;
    right:550px;
    
    p { 
        line-height: 0;
    }
`