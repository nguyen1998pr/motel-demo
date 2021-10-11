import React, { Component } from "react";
import { FaTv, FaBiking, FaDog, FaCouch } from "react-icons/fa";
import Title from "./Title";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaTv />,
        title: "Media Room",
        info: "with the most advanced equipment to ensure all your entertainment needs",
      },
      {
        icon: <FaBiking />,
        title: "Bike Parking",
        info: "near the center, market, ... convenient for traveling as well as traveling in the city",
      },
      {
        icon: <FaDog />,
        title: "Pet Area",
        info: "A place to play for your pets with a full range of care services",
      },
      {
        icon: <FaCouch />,
        title: "Lounge Area",
        info: "spacious, cool, guaranteed you will get the best support",
      },
    ],
  };
  render() {
    return (
      <section className="services">
        <Title title="services" />
        <div className="services-center">
          {this.state.services.map((item) => {
            return (
              <article key={`item-${item.title}`} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
