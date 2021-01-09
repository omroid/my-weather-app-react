import React from 'react';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            txtSearch:""
        };
    }
    handleChange(e) {
        let temp = this.state;
        temp.txtSearch = e.target.value;
        this.setState(temp);
    }


    render() {
        return (
            <div>
           
                    <Form inline className="SearchForm">
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" disabled={this.props.isUiLocked} onChange={(e) => this.handleChange(e)} value={this.state.txtSearch} />
                    <Button variant="outline-success" disabled={this.props.isUiLocked} onClick={() => this.props.search(this.state.txtSearch)}>Search</Button>
                    </Form>
          
            </div>
        );


    }
}
export default Search;


