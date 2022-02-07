import styled from "styled-components"
import maticWhite from '../images/matic-white.png'

function Polygon(props) {
    return(<HomeWrapper>
            <LeftWrapper>
                <h1>What is Polygon?🤔</h1>
                <Description>
                    <p>Whether you're completely new to web3, just curious or you’re already obsessed, we’re here to help you into the Web3 with ease</p>
                </Description>
            </LeftWrapper>
            <BulletWrapper>
                <BulletContainer>
                    <p><strong>Low Fees</strong> you're completely new to web3, just curious or you’re already obsessed, we’re here to help you into the Web3 with ease</p>
                </BulletContainer>
                <BulletContainer>
                    <p><strong>Security</strong> Whether you're completely new to web3, just curious or you’re already obsessed, we’re here to help you into the Web3 with ease</p>
                </BulletContainer>
                <BulletContainer>
                    <p><strong>Community</strong> Whether you're completely new to web3, just curious or you’re already obsessed, we’re here to help you into the Web3 with ease</p>
                </BulletContainer>
            </BulletWrapper>
            <RightWrapper>
                 <img src={maticWhite} alt="Matic"></img>
            </RightWrapper>
            <ButtonWrapper>
                <button onClick={() => props.app('PolygonWallet')}>Continue</button>
            </ButtonWrapper>
        </HomeWrapper>)
}

export default Polygon

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