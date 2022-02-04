import './App.css';
import styled from 'styled-components'
import {Row, Button, Form, Col, Spinner} from 'react-bootstrap'
import uni from './images/uni.png'
import polygon from './images/polygon.svg'
import { useState } from 'react'
import Web3 from 'web3'



function App() {
  const bearerToken = 'SK-R7L3DVYC-XWF284ZA-RNQAD4XE-8AA3284Q'
  const [OrderReservation, setOrderReservation] = useState(false)
  const [orderId,setOrderId] = useState('')
  const [orderStatus, setOrderStatus] = useState(false)
  const [formState, setFormState] = useState({
      chooseAmount: true,
      chooseWalletAddress: false,
      chooseBillingAddress: false,
      chooseCardDetails: false,
      verifyDetails: false,
      finaliseTransaction: false
    }
  )
  const [amount, setAmount] = useState("50");
  const [token, setToken] = useState("MUSDC");
  const [walletAddress, setWalletAddress] = useState("0xB02D29d680C82A0FB6Ba4CACFC6A238d1dcfE620")
  const [billingAddress, setBillingAddress] = useState({
    firstName:"John",
    lastName:"Doe",
    street1:"975 Polygon Street",
    city:"London",
    state:"Greater London",
    postalCode:"09675",
    country:"US",
    email:"hello@gmail.com",
    phone:"+14158581212"
  })
  const [cardDetails,setCardDetails] = useState({
    number:"4111111111111111",
    year:"2023",
    month:"10",
    cvv:"555"
  })
  const [verify,setVerify] = useState({
    sms:"000000",
    card2fa:"000000"

  })

  async function getWalletOrder() {

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`
      },
      body: JSON.stringify({referrerAccountId: 'AC_UWBZ6FRQ68Z'})
    };
    console.log(JSON.parse(options.body))
    fetch('https://api.testwyre.com/v3/orders/reserve', options)
      .then(response => response.json())
      .then(response => setOrderReservation(response.reservation))
      .catch(err => console.error(err));

  }
  
  async function createOrder() {

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`
      },
      body: JSON.stringify({
        reservationId: OrderReservation,
        amount:amount,
        sourceCurrency:"USD",
        destCurrency:token,
        dest:`matic:${walletAddress}`,
        givenName:billingAddress.firstName,
        familyName:billingAddress.lastName,
        phone:billingAddress.phone,
        email:billingAddress.email,
        referrerAccountId:"AC_UWBZ6FRQ68Z",
        referenceId:"AC_UWBZ6FRQ68Z",
        ipAddress:"1.1.1.1",
        address: {
          street1:billingAddress.street1,
          city:billingAddress.city,
          state:"AK",
          postalCode:billingAddress.postalCode,
          country:billingAddress.country
          },
        debitCard: {
          number:cardDetails.number,
          year:cardDetails.year,
          month:cardDetails.month,
          cvv:cardDetails.cvv
          }
        
      })
    };

    console.log(JSON.parse(options.body))
    fetch('https://api.testwyre.com/v3/debitcard/process/partner', options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setOrderId(response.id)
      })
      .catch(err => console.error(err));

  }

  async function sendAuth() {

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`
      },
      body: JSON.stringify({
        type:"ALL",
        walletOrderId:orderId,
        sms:verify.sms,
        card2fa:verify.card2fa
        })
      }

    console.log(JSON.parse(options.body))
    fetch('https://api.testwyre.com/v3/debitcard/authorize/partner', options)
      .then(response => response.json())
      .then(response => {
        setOrderReservation(response.reservation)
        console.log(response)})
      .catch(err => console.error(err));

  }

  async function getWalletOrderProgress() {

    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`
        }
      }

    fetch(`https://api.testwyre.com/v3/orders/${orderId}`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response.status)
        if(response.status === 'COMPLETE')
          setOrderStatus(true);
        else
          setOrderStatus(false);
      })
      .catch(err => console.error(err));

  }

  const chooseBillingAddressOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBillingAddress(values => ({...values, [name]: value}))
  }

  const chooseCardDetailsOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCardDetails(values => ({...values, [name]: value}))
  }

  const verifyDetailsOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setVerify(values => ({...values, [name]: value}))
  }

  const chooseBillingAddressOnSubmit = (event) => {
    event.preventDefault();
    setFormState({
      chooseAmount: false,
      chooseWalletAddress: false,
      chooseBillingAddress: false,
      chooseCardDetails: true,
      verifyDetails: false,
      finaliseTransaction: false
    })

  }

  const verifyDetailsOnSubmit = (event) => {
    event.preventDefault();
    sendAuth()
    setInterval(getWalletOrderProgress, 3000);
    setFormState({
      chooseAmount: false,
      chooseWalletAddress: false,
      chooseBillingAddress: false,
      chooseCardDetails: false,
      verifyDetails: false,
      finaliseTransaction: true
    })

  }
  
  const chooseCardDetailsOnSubmit = (event) => {
    event.preventDefault();
    createOrder()
    setFormState({
      chooseAmount: false,
      chooseWalletAddress: false,
      chooseBillingAddress: false,
      chooseCardDetails: false,
      verifyDetails: true,
      finaliseTransaction: false
    })
  }
  const chooseAmountSubmit = (event) => {
    event.preventDefault();
    setFormState({
      chooseAmount: false,
      chooseWalletAddress: true,
      chooseBillingAddress: false,
      chooseCardDetails: false,
      verifyDetails: false,
      finaliseTransaction: false
    })
  }

  const chooseWalletAddressSubmit = (event) => {
    event.preventDefault();
    getWalletOrder()
    setFormState({
      chooseAmount: false,
      chooseWalletAddress: false,
      chooseBillingAddress: true,
      chooseCardDetails: false,
      verifyDetails: false,
      finaliseTransaction: false
    })
  }
  

  const setTokenHandler = (event) => {
    const tokenAddress = {
      1: 'MUSDC',
      2: 'y',
      3: 'x',
      4: 'z'
    }

    setToken(tokenAddress[event.target.value])
  }

  const chooseAmount = () => {
    return (
      <FormWrapper>
            <Form onSubmit={chooseAmountSubmit}>
            <Form.Label>You pay</Form.Label>
              <Form.Group className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <Form.Control type="number"  defaultValue={amount} onChange={(e) => setAmount(e.target.value)}/>
              </Form.Group>
              <Row className="mb-3">
              <Form.Label>You will recieve</Form.Label>
              <Form.Group as={Col} className="mb-3">
                <Form.Control type="number" value='50' disabled/>
              </Form.Group>
                <Form.Group as={Col} className="mb-3">
                  <Form.Select aria-label="Default select example" defaultValue="1" onChange={setTokenHandler}>
                    <option value="1">USDC</option>
                    <option value='2'>MATIC</option>
                    <option value="3">DAI</option>
                    <option value="4">UNI</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Button variant="primary" type="submit">
                Buy Now
              </Button>
            </Form>
          </FormWrapper>
    )
  }

  const chooseWalletAddress = () => {
    return (
      <FormWrapper>
            <Form onSubmit={chooseWalletAddressSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Polygon Wallet Address</Form.Label>
                <Form.Control value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} type="text" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Next
              </Button>
            </Form>
          </FormWrapper>
    )
  }

  const chooseBillingAddress = () => {
    return (
    <FormWrapper>
              <Form onSubmit={chooseBillingAddressOnSubmit}>
                <Row>
                  <Form.Group as={Col}>
                  <Form.Label>First Name</Form.Label>
                    <Form.Control defaultValue={billingAddress.firstName} onChange={chooseBillingAddressOnChange} name="firstName" placeholder="First name" />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control defaultValue={billingAddress.lastName} name="lastName" onChange={chooseBillingAddressOnChange} placeholder="Last name" />
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control defaultValue={billingAddress.email} name='email' onChange={chooseBillingAddressOnChange} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridEmail">
                  <Form.Label >Contact Number</Form.Label>
                  <Form.Control defaultValue={billingAddress.phone}  name="phone" onChange={chooseBillingAddressOnChange} type="text" placeholder="Number" />
                </Form.Group>



                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label >Address</Form.Label>
                  <Form.Control defaultValue={billingAddress.street1} name="street1" onChange={chooseBillingAddressOnChange}  placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>State</Form.Label>
                  <Form.Control defaultValue={billingAddress.state} name="state" onChange={chooseBillingAddressOnChange} placeholder="Apartment, studio, or floor" />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control defaultValue={billingAddress.city} name="city" onChange={chooseBillingAddressOnChange} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Post Code</Form.Label>
                    <Form.Control defaultValue={billingAddress.postalCode} name="postalCode" onChange={chooseBillingAddressOnChange}  />
                  </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                  Next
                </Button>
              </Form>
            </FormWrapper>
    )}

    const chooseCardDetails = () => {
      return (
        <FormWrapper>
          <Form onSubmit={chooseCardDetailsOnSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control defaultValue={cardDetails.number} name="number" onChange={chooseCardDetailsOnChange} type="number" />
            </Form.Group>
            <Row> 
              <Form.Group as={Col}>
              <Form.Label>Expire Date</Form.Label>
                <Form.Control defaultValue="10/2023" />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label >CVV</Form.Label>
                <Form.Control defaultValue={cardDetails.cvv} name="cvv" onChange={chooseCardDetailsOnChange}placeholder="CVV" />
              </Form.Group>
            </Row>
            <br/>
            <Button variant="primary" type="submit">
              Next
            </Button>
          </Form>
      </FormWrapper>
      )
    }

    const verifyDetails = () => {
      return (
        <FormWrapper>
              <Form onSubmit={verifyDetailsOnSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Verify Card</Form.Label>
                  <Form.Control defaultValue={verify.sms} name="sms" onChange={verifyDetailsOnChange} type="number" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Verify Number</Form.Label>
                  <Form.Control defaultValue={verify.card2fa} name="card2fa" onChange={verifyDetailsOnChange} type="number" />
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit">
                  Next
                </Button>
              </Form>
            </FormWrapper>
      )
    }

  const finaliseTransaction = () => {
    return ( <LoadingWrapper>
      <h2>Finalising Transaction</h2>
          <img  className="uni" src={uni} alt="Uniswap"></img>
          <img  className="polygon" src={polygon} alt="Polygon"></img>
          <FinaliseButton>
            <div className="d-grid gap-2">
            {!orderStatus
                ? <Button variant="primary"  size="lg">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"/>
                      {''} Depositing to Wallet
                  </Button>
                :<Button variant="secondary"  size="lg" disabled>
                  {''} Depositing to Wallet
                  </Button>
              }
              </div>
              <br />
            <div className="d-grid gap-2">
              <Button variant="primary"  size="lg" onClick={getWalletOrderProgress}>
              {/* <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> */}
              {''} Approve
              </Button>
            </div>
            <br />
            <div className="d-grid gap-2">
              <Button variant="primary"  size="lg">
                {/* <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> */}
                {''} Swap for UNI
              </Button>
            </div>
          </FinaliseButton>
      </LoadingWrapper>
      )
  }
  return (
    <div className="App">
      <header>
          <h1>PolyPortal</h1>
      </header>
      <MainWrapper>
        <AppWrapper>
        { formState.chooseAmount && chooseAmount() }
        { formState.chooseWalletAddress && chooseWalletAddress() }
        { formState.chooseBillingAddress && chooseBillingAddress() }
        { formState.chooseCardDetails && chooseCardDetails() }
        { formState.verifyDetails && verifyDetails() }
        { formState.finaliseTransaction && finaliseTransaction() }
        </AppWrapper>
      </MainWrapper>
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