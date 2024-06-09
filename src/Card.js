import React from "react";

export default function Card(props) {
    const { cityName, cityTemp, cityState } = props;
    return (
        <div className="card-component">
            <h1>{cityName}</h1>
            <h2>{cityTemp}</h2>
            <h2>{cityState}</h2>
        </div>
    );
}