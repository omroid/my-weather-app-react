import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import WeatherView from './WeatherView';
import ApiCode from '../Models/ApiCode.json';

export default class Favorite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: ApiCode.apiKey,
            dataLocation: null,
            data: null
        }
        let temp = this.state;
        temp.data = this.allStorage();
        this.setState(temp);
        this.getDataWeather();


        toast.configure({
            autoClose: 4000,
            draggable: true,
        });
    }
    allStorage() {
        let values = [];
        let keys = Object.keys(localStorage);
        let i = keys.length;

        while (i--) {
            if (localStorage.getItem(keys[i]) != null || localStorage.getItem(keys[i]) != "null") {
                if (JSON.parse(localStorage.getItem(keys[i])) != null) {
                    values.push({
                        dataLocation: JSON.parse(localStorage.getItem(keys[i])),
                        dataDayWeather: null
                    });
                }
            }
        }
        return values;
    }

    getDataWeather() {
        for (let i = 0; i < this.state.data.length; i++) {
            let temp = this.state;
            axios.get("https://dataservice.accuweather.com/currentconditions/v1/" + this.state.data[i].dataLocation.Key + "?apikey=" + this.state.apiKey)
                .then(function (response) {

                    if (!response.data) {
                        toast.info(response.message);
                    }
                    else {
                        temp.data[i].dataDayWeather = response.data[0];
                        this.setState(temp);
                        toast.success("weather was found successfully");
                    }
                }.bind(this))
                .catch(function (error) {
                    toast.error(error.response);
                });
        }
    }


    render() {
        return (
            <div>
                <div class="container">
                    <div class="row">
                        {
                            this.state.data.map((item, index) => {
                                return (
                                    <div class="col-md-4">
                                        <div class="thumbnail">
                                            {((JSON.parse(localStorage.getItem(Object.keys(localStorage)[index]))) != null || JSON.parse(localStorage.getItem(Object.keys(localStorage)[index])) != "null") && item.dataDayWeather !== null ? <WeatherView dataLocation={item.dataLocation} dataDayWeather={item.dataDayWeather} /> : <div></div>}
                                        </div>
                                    </div> )
                            }
                            )}
                    </div>
                </div>
            </div>
        )
    }
}




