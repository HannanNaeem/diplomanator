import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Container } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText} from 'reactstrap';
import IPageProps from '../interfaces/page';
// import '../pages/homepage.css'


const HomePage: React.FunctionComponent<IPageProps> = props => {
    
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [walletAddress, setWalletAddress] = useState('');
    
    useEffect(() => {
        getCurrentWalletConnected();
        addWalletListener();
    }, [walletAddress]);
    
    const connectWallet = async () => {
        let provider = window.ethereum;
        if (typeof window != "undefined" && typeof provider != "undefined") {
            try{
                /* Metamask is installed and ready to connect */
                const accounts:any = await window.ethereum?.request({ method: 'eth_requestAccounts' });
                console.log(accounts[0]);
            } catch(error) {
                console.log(error);
            }
        }
        else{
            /* Metamask is not installed */
            console.log("Install Metamask");
        }
    }
    
    const getCurrentWalletConnected = async () => {
        if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
            try {
                const accounts : any = await window.ethereum?.request({
                    method: "eth_accounts",
                });
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                    console.log(accounts[0]);
                } else {
                    console.log("Connect to MetaMask using the Connect button");
                }
            } catch (err) {
                console.error(err);
            }
        } else {
            /* MetaMask is not installed */
            console.log("Please install MetaMask");
        }
    };
    
    const addWalletListener = async () => {
        if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
            window.ethereum.on("accountsChanged", (accounts:any) => {
                setWalletAddress(accounts[0]);
                console.log(accounts[0]);
            });
        } else {
            /* MetaMask is not installed */
            setWalletAddress("");
            console.log("Please install MetaMask");
        }
    }
    
    return (
        <Container header = "Verify Diploma">
           <div>
          <Navbar {...props}>
            <NavbarBrand>Dropdown Menu</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="me-auto" navbar>
                <div>
                    <Button
                        tag={Link} to="./change"
                        active
                        color="primary"
                        outline
                        size="sm">
                        Change account password
                    </Button>
                    {' '}
                    <Button
                        tag={Link} to="./logout"
                        active
                        color="secondary"
                        outline
                        size="sm">
                        Logout
                    </Button>
                    {' '}
                    <Button
                        active
                        color="success"
                        outline
                        size="sm"
                        onClick={connectWallet}>
                        {walletAddress && walletAddress.length > 0 ? 
                        `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}` 
                        : `Connect Wallet`}
                    </Button>
                </div>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
    
    
            <Form>
                <FormGroup>
                    <Label for="name-of-student">Name of Student</Label>
                    <Input type="textarea" name="text" id="nameOfStudent" placeholder='Sam' />
                </FormGroup>
                <FormGroup>
                    <Label for="major">Major of Student</Label>
                    <Input type="textarea" name="text" id="majorOfStudent" placeholder='Political Science, Engineering, CS, etc.' />
                </FormGroup>
                <FormGroup>
                    <Label for="graduation-year">Graduation Year</Label>
                    <Input type="textarea" name="text" id="graduationYear" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleFile">Attachments</Label>
                    <Input type="file" name="file" id="exampleFile" />
                    <FormText color="muted">
                    Any files !
                    </FormText>
                </FormGroup> 
                <FormGroup check>
                    <Label check>
                    <Input type="checkbox" />{' '}
                    Are you sure ?
                    </Label>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </Container>
    );
}

export default HomePage;