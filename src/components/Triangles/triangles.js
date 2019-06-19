import React from 'react';
import { delaunay } from '../../utils';
const { Component } = React;

class Triangles extends Component {

  state = {
    points: []
  };

  componentDidMount() {

    console.log("mounting");
    let xMax = 400;
    let yMax = 200;

    const points = [];

    var series = []

    for (let i = 0 ; i < 50; i++) {
      let coordinates = {
        x: Math.floor(Math.random() * Math.floor(xMax)),
        y: Math.floor(Math.random() * Math.floor(yMax))
      }

      points.push(coordinates);
      series.push([coordinates.x, coordinates.y]);
    }

    this.setState({points: points})

    delaunay()
  }

  render() {
    return (
      <div className="triangles">
        <svg width="400" height="200">
          {this.state.points.map((point) => (
            <circle cx={point.x} cy={point.y} r="3"/>
          ))}
        </svg>
      </div>
    );
  }
};

export default Triangles;
