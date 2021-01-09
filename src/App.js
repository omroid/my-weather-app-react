import React from 'react';
import './App.css';
import Toolbar from './Components/Toolbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home';
import Favorite from './Components/favorite';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            IsShowHomePage: true,
        };
        toast.configure({
            autoClose: 4000,
            draggable: true,
        });
    }




    onChange(param) {
        let temp = this.state;
        temp.IsShowHomePage = param;
        this.setState(temp);
    }

    render() {
        return (
            <div><Toolbar ChangePage={this.onChange.bind(this)} />
                {this.state.IsShowHomePage === true ? <Home /> : <Favorite />}
            </div>
        );
    }
}

export default App;
