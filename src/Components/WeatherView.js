import React from 'react';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import '../Components/styles/WeatherView.css';





class WeatherView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFavorite: false,
            dataLocation: this.props.dataLocation,
            dataCurrentDay: this.props.dataDayWeather,
            dataNextFiveDays: this.props.dataFiveDaysWeather
        };
        let temp = this.state;
        temp.isFavorite = this.isFavoriteCheak();
        this.setState(temp);

    }



    isFavoriteCheak() {
        let valueFromLocalStorage = JSON.parse(localStorage.getItem(this.state.dataLocation.Key));
        if (valueFromLocalStorage != null && valueFromLocalStorage != "null") {
            return true;
        }
        return false;
    }


    addOrRemoveFromFavoriteClick() {
        let temp = this.state;
        if (localStorage.getItem(this.state.dataLocation.Key) == "null" || localStorage.getItem(this.state.dataLocation.Key) == null) {
            localStorage.setItem(this.state.dataLocation.Key, JSON.stringify (this.state.dataLocation))
            temp.isFavorite = true;
        }
        else {
            localStorage.setItem(this.state.dataLocation.Key, "null");
            temp.isFavorite = false;
        }
        this.setState(temp);


    }

    render() {
        return (
         
            <div className="WeatherViewDiv">
              

                <Card className="text-center">
                    <Card.Header>

                    </Card.Header>
                    <Card.Body>
                        <Card.Title><h3>{this.state.dataLocation.LocalizedName}</h3><p>{this.state.dataLocation.AdministrativeArea.LocalizedName}</p><p>{this.state.dataLocation.Country.ID}</p></Card.Title>
                        <img width="75" height="45" title={this.state.dataCurrentDay.WeatherText} className="img-responsive" alt={this.state.dataCurrentDay.WeatherText} src={"https://developer.accuweather.com/sites/default/files/" + this.state.dataCurrentDay.WeatherIcon + "-s.png"} typeof="foaf:Image" />
                        <p>{this.state.dataCurrentDay.WeatherText}</p>
                        <h3>Temperature</h3>
                        <Card.Text>
                            <i class={this.state.dataCurrentDay.IsDayTime === true ? "fas fa-sun fa-3x" : "far fa-moon fa-3x"}></i>
                            <p> {this.state.dataCurrentDay.Temperature.Metric.Value}{this.state.dataCurrentDay.Temperature.Metric.Unit} </p>
                        </Card.Text><br /><br />


                        <table class="card-table table">
                            <thead>
                                {this.state.dataNextFiveDays !== undefined && this.state.dataNextFiveDays !== null ? <tr>
                                    <th scope="col"><i class="far fa-calendar-alt"></i></th>
                                    <th scope="col"><i class="fas fa-sun"></i></th>
                                    <th scope="col"><i class="far fa-moon fa"></i></th>
                                </tr> : <div></div>}
                            </thead>
                            <tbody>
                                {this.state.dataNextFiveDays !== undefined && this.state.dataNextFiveDays !== null ?
                                    this.state.dataNextFiveDays.map((item, index) => {
                                        return (<tr>
                                            <td>{item.Date.split('T')[0]}</td>
                                            <td>{item.Temperature.Maximum.Value}{item.Temperature.Maximum.Unit}</td>
                                            <td>{item.Temperature.Minimum.Value}{item.Temperature.Maximum.Unit}</td>
                                        </tr>)
                                    }) : <div></div>}
                            </tbody>
                        </table>
                        <Card.Footer className="text-muted">
                            {this.state.isFavorite === false ?
                                <Button variant="primary" onClick={() => this.addOrRemoveFromFavoriteClick()}>add to favorites</Button>
                                : <Button variant="danger" onClick={() => this.addOrRemoveFromFavoriteClick()}>remove from favorites</Button>
                            }
                       </Card.Footer>
                    </Card.Body>
                </Card>
                <br />
        
            </div>);


    }
}
export default WeatherView;