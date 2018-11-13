import React from 'react';
import { scaleLinear } from 'd3-scale';
import { line as d3Line, area as d3Area, curveMonotoneX } from 'd3-shape';
import { max, extent } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

import './LineChart.css';

const svgWidth = 500,
  svgHeight = 300;

const margin = { top: 25, right: 25, bottom: 25, left: 25 },
  width = svgWidth - margin.left - margin.right,
  height = svgHeight - margin.top - margin.bottom;

const x = scaleLinear().range([0, width]),
  y = scaleLinear().range([height, 0]);

const line = d3Line()
  .curve(curveMonotoneX)
  .x(d => x(d.x))
  .y(d => y(d.y));

const area = d3Area()
  .curve(curveMonotoneX)
  .x(d => x(d.x))
  .y0(y(0))
  .y1(d => y(d.y));

const drawLine = (data, color) => (
  <path
    className={'line'}
    d={line(data)}
    stroke={color}
  />
);

const drawDots = (data, color) => data.map(point =>
  <circle
    cx={x(point.x)}
    cy={y(point.y)}
    r={5}
    fill={color}
    strokeWidth='10%'
    pointerEvents='all'
    className='dot'
    cursor='pointer'
    onPointerEnter={e => e.target.setAttribute('r', '10')}
    onPointerLeave={e => e.target.setAttribute('r', '5')}
  />
);

const drawArea = (data) => (
  <path
    d={area(data)}
    fill='url(#areaGradient)'
  />
);

const DEFAULT_COLOR = 'lightseagreen';

export default (props) => {
  const data = props.data || [];
  const color = props.color || DEFAULT_COLOR;

  x.domain(extent(data, el => el.x));
  y.domain([0, max(data, el => el.y) + 1]);

  return (
    <svg width={svgWidth} height={svgHeight}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g
          className="axis axis--x"
          transform={`translate(0, ${height})`}
          ref={node => select(node).call(axisBottom(x))}
        />
        <g className="axis axis--y"
          ref={node => select(node)
            .call(axisLeft(y).ticks(5))
            .call(g => g.select('.domain').remove())}
        />
        <g className="areas">
          { drawArea(data, color) }
        </g>
        <g className="lines">
          { drawLine(data, color) }
          { drawDots(data, color) }
        </g>
        <defs>
          <linearGradient id='areaGradient' x1='0%' y1='15%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor={color} stopOpacity='0.6' />
            <stop offset='100%' stopColor='white' stopOpacity='0.5' />
          </linearGradient>
        </defs>
      </g>
    </svg>
  );
};
