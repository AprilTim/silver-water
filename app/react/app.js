import React from "react";
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

import "./style.scss";
import {Map, Placemark, YMaps} from "react-yandex-maps";

const mapData = {
    center: [47.270345072602424, 38.92152948196224],
    zoom: 18,
};


const coordinates = [
    [47.270345072602424, 38.92152948196224]
];

export const App = () => {
    return (
        <section id="contacts" className="contacts-section">
            <div className="container">

                <div className="title-block">
                    <p className="overhead">КОНТАКТЫ</p>
                    <h2 className="title">Наш магазин</h2>
                </div>

                <YMaps>
                    <Map defaultState={mapData} className="yandex-map">
                        {coordinates.map(coordinate => <Placemark geometry={coordinate}/>)}

                    </Map>
                </YMaps>

                <div className="contacts">
                    <dl>
                        <dt>Наш номер:</dt>
                        <dd>+ 7 999 999 99 99</dd>
                    </dl>
                    <dl>
                        <dt>Наш адрес:</dt>
                        <dd>г. Таганрог ул. Бакинская 10</dd>
                    </dl>
                    <dl>
                        <dt>Наш Email:</dt>
                        <dd>silverwater@gmail.com</dd>
                    </dl>
                </div>

            </div>
        </section>
    )
}