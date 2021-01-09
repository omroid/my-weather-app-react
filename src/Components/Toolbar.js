import React from 'react';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import './styles/toolbar.css';

 class Toolbar extends React.Component {

    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg" >
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="justify-content-end">
                            <Nav.Link onClick={() => { this.props.ChangePage(true) }}>Home</Nav.Link>
                            <Nav.Link onClick={() => { this.props.ChangePage(false) }}>Favorite</Nav.Link>
                        </Nav>
                    
                    </Navbar.Collapse>
                </Navbar>
            
              </div>
        );
  

    }
}
export default Toolbar;


