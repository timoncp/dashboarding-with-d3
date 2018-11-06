import React from 'react';
import { scaleLinear } from 'd3-scale';
import { line as d3Line, curveMonotoneX } from 'd3-shape';
import { range } from 'd3-array';
import { randomUniform } from 'd3-random';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

import './LineChart.css';

const svgWidth = 500,
  svgHeight = 300;

const margin = { top: 25, right: 25, bottom: 25, left: 25 },
  width = svgWidth - margin.left - margin.right,
  height = svgHeight - margin.top - margin.bottom;

const max = {
  X: 20,
  Y: 5,
};

const generateData = () => range(max.X).map(x => ({ x, y: randomUniform(max.Y)() }));

const x = scaleLinear().range([0, width]),
  y = scaleLinear().range([height, 0]);

const line = d3Line()
  .curve(curveMonotoneX)
  .x(d => x(d.x))
  .y(d => y(d.y));

x.domain([0, max.X]);

y.domain([0, max.Y]);

const drawLine = (color) => (
  <path
    className={`line ${color}`}
    d={line(generateData())}
  />
);

const lines = [
  'green',
  'orange',
  'blue',
];

export default () => (
  <svg width={svgWidth} height={svgHeight}>
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <g
        className="axis axis--x"
        transform={`translate(0, ${height})`}
        ref={node => select(node).call(axisBottom(x))}
      />
      <g className="axis axis--y" ref={node => select(node).call(axisLeft(y))} />
      <g className="lines">
        { lines.map(color => drawLine(color)) }
      </g>
    </g>
  </svg>
);
