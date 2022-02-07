import styled from "styled-components"
import appIcons from '../images/app-icons.png'

function LandingPage(props) {
    return(<HomeWrapper>
            <LeftWrapper>
                <h1>Your Gateway to Web3</h1>
                <Description>
                    <p>Whether you're completely new to web3, just curious or you’re already obsessed, we’re here to help you into the Web3 with ease</p>
                </Description>
                <ButtonWrapper>
                    <button onClick={() => props.app('Polygon')}>Enter Web3</button>
                </ButtonWrapper>
            </LeftWrapper>
            <RightWrapper>
                 <img src={appIcons} alt="App Icons"></img>
            </RightWrapper>
        </HomeWrapper>)
}

export default LandingPage

const HomeWrapper = styled.div`
    h1 {
        font-family: 'Graphik';
        font-weight: 600;
        font-style: normal;
        font-size:75pt;
        background: -webkit-linear-gradient(294deg,#1E98FD, #F20CEF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    p {
        font-family: 'Graphik';
        font-weight: normal;
        font-style: normal;
        font-size: 16pt;
    }
`
const LeftWrapper = styled.div`
    display: flex;
    text-align: left;
    justify-content: flex-end;
    margin-right: 50%;
    margin-left: 250px;
    margin-top: 150px;
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
    margin-left: 60%;
    margin-right: 200px;
    margin-top: 150px;
    flex-direction: column;
    position: absolute;

    img {
        width:350px;
    }

`

const ButtonWrapper = styled.div`
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