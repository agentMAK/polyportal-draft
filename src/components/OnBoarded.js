import styled from "styled-components"
import uniswapLogo from '../images/uniswapLogo.png'
import party from '../images/party.png'

function OnBoarded(props) {
    return(<HomeWrapper>
            <LeftWrapper>
                <h1>On-boarding Successful</h1>
                <Description>
                    <p>You are ready to get fully enter the web3 world. Check out the many application available in the Polygon eco-system</p>
                </Description>
            </LeftWrapper>
            <BulletWrapper>
                <BulletContainer>
                    <p><strong>DeFi -</strong> you're completely new to web3, just curious or you’re already obsessed, we’re here to help you into the Web3 with ease</p>
                </BulletContainer>
                <BulletContainer>
                    <p><strong>NFTs -</strong> Whether you're completely new to web3, just curious or you’re already obsessed, we’re here to help you into the Web3 with ease</p>
                </BulletContainer>
                <BulletContainer>
                    <p><strong>Cool stuff - </strong> Whether you're completely new to web3, just curious or you’re already obsessed, we’re here to help you into the Web3 with ease</p>
                </BulletContainer>
            </BulletWrapper>
            <ButtonWrapper>
                <button>Explore dApps</button>
            </ButtonWrapper>
            <RightWrapper>
                 <img src={party} alt="Matic"></img>
            </RightWrapper>
        </HomeWrapper>)
}

export default OnBoarded

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
    margin-left: 55%;
    margin-top: 100px;
    flex-direction: column;
    position: absolute;

    img {
        width:250px;
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