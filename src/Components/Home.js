import React from 'react';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
import WeatherView from './WeatherView';
import Search from './Search';
import ApiCode from '../Models/ApiCode.json';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearchSuccess: false,
            isUiLocked: false,
            dataLocation: null,
            dataDayWeather: null,
            dataFiveDaysWeather: null,
            responseDataLocation: null,
            apiKey: ApiCode.apiKey

        };


        toast.configure({
            autoClose: 4000,
            draggable: true,
        });

        this.search("tel aviv");
    }



    search(query) {
        let apiKey = this.state.apiKey;
        let temp = this.state;
        temp.isUiLocked = true;
        this.setState(temp);

        //validate query
        if (query.length === 0 || query === undefined || query === null) {
            toast.error("search field is empty");
            temp.isUiLocked = false;
            this.setState(temp);
            return;
        }
        let letters = /^[A-Za-z' ']+$/;
        if (!query.match(letters)) {
            toast.error("please use English letters or space only");
            temp.isUiLocked = false;
            this.setState(temp);
            return;
        }
        if (query[0] === ' ') {
            toast.error("illegal search query");
            temp.isUiLocked = false;

            return;
        }




        temp.dataLocation = null;
        temp.dataDayWeather = null;
        temp.dataFiveDaysWeather = null;
        temp.responseDataLocation = null;


        this.setState(temp);

        //searching location
        toast.info("searching please wait...");
        axios.get("https://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=" + query + "&apikey=" + apiKey)
            .then(function (response) {
                temp.isUiLocked = false;
                if (!response) {
                    toast.info("no response from server");
                    this.setState(temp);
                    return;
                }
                if (response.data.length == 0) {
                    toast.info("location was not found");
                    this.setState(temp);
                    return;
                } else if (response.data.length > 1) {
                    temp.responseDataLocation = response.data;
                    toast.info("too many cities was found");
                } else {
                    temp.responseDataLocation = response.data[0];
                    temp.dataLocation = response.data[0];
                    toast.success("city was found successfully");
                    this.FindWeather(temp, apiKey);
                }
                this.setState(temp);
            }.bind(this))
            .catch(function (error) {
                toast.error(error.response);
            });

    }

    FindWeather(temp, apiKey) {
        //searching weather for current day
        temp.isUiLocked = true;
        this.setState(temp);
        axios.get("https://dataservice.accuweather.com/currentconditions/v1/" + this.state.dataLocation.Key + "?apikey=" + apiKey)

            .then(function (response) {
                console.log("1 day" + response);
                if (!response.data) {
                    toast.info(response.message);
                }
                else {

                    temp.dataDayWeather = response.data[0];
                    toast.success("weather was found successfully");
                }
                temp.isUiLocked = false;
                this.setState(temp);



            }.bind(this))
            .catch(function (error) {
                toast.error(error.response);
            });

        //searching weather for next five days
        temp.isUiLocked = true;
        this.setState(temp);
        axios.get("https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + this.state.dataLocation.Key + "?apikey=" + apiKey + "&metric=true")
            .then(function (response) {
                console.log("5 days" + response);
                if (!response) {
                    toast.info("no response from server");

                }
                else {

                    temp.dataFiveDaysWeather = response.data.DailyForecasts;
                    toast.success("future weather was found successfully");
                }
                temp.isUiLocked = false;
                this.setState(temp);



            }.bind(this))
            .catch(function (error) {
                toast.error(error.response);
            });

    }

    selectedOption(e) {
        let index = e.target.name;
        let temp = this.state;
        temp.dataLocation = temp.responseDataLocation[index];
        temp.dataDayWeather = null;
        temp.dataFiveDaysWeather = null;
        temp.responseDataLocation = null;

        this.setState(temp);
        this.FindWeather(temp, this.state.apiKey);

    }

    render() {
        return (
            <div>
                <div> <Search isUiLocked={this.state.isUiLocked} search={this.search.bind(this)} /><br /></div>
                {
                    this.state.responseDataLocation !== null && this.state.responseDataLocation !== undefined && this.state.responseDataLocation.length > 1 ?
                        <div>
                            <Form inline className="SearchForm">
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        please choose one option from the list below
                            </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {
                                            this.state.responseDataLocation.map((item, index) => {
                                                return (<Dropdown.Item name={index} onClick={(e) => { this.selectedOption(e) }}>
                                                    {item.LocalizedName}
                                                    {" " + item.AdministrativeArea.LocalizedName}
                                                    {" " + item.Country.ID}
                                                </Dropdown.Item>)
                                            })
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form>
                        </div>
                        : <div></div>
                }
                {this.state.dataLocation !== undefined && this.state.dataLocation !== null &&
                    this.state.dataDayWeather !== undefined && this.state.dataDayWeather !== null &&
                    this.state.dataFiveDaysWeather !== undefined && this.state.dataFiveDaysWeather !== null ?
                    <WeatherView dataLocation={this.state.dataLocation} dataDayWeather={this.state.dataDayWeather} dataFiveDaysWeather={this.state.dataFiveDaysWeather} /> : <div></div>
                }

            </div>
        );


    }
}

export default Home;

