import React from 'react';
import * as d3 from 'd3';

import './Dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.svgWidth = 500;
    this.svgHeight = 300;

    this.margin = {
      top: 25,
      right: 25,
      bottom: 25,
      left: 25,
    };

    this.width = this.svgWidth - this.margin.left - this.margin.right;
    this.height = this.svgHeight - this.margin.top - this.margin.bottom;

    this.ticks = 10;
    this.maxValue = 100;
  }

  componentDidMount() {
    this.initSVG();
  }

  addLine(color) {
    const dotRadius = 5;
    const dataset = d3.range(this.ticks).map(() => ({ y: d3.randomUniform(100)() }));

    const line = d3.line()
      .x((d, i) => this.xScale(i))
      .y((d) => this.yScale(d.y))
      .curve(d3.curveMonotoneX);

    const areaGradient = this.svg.append('defs')
      .append('linearGradient')
      .attr('id', 'areaGradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');

    areaGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', 'lightseagreen')
      .attr('stop-opacity', 0.6);

    areaGradient.append('stop')
      .attr('offset', '80%')
      .attr('stop-color', 'white')
      .attr('stop-opacity', 0);

    const area = d3.area()
      .x((d, i) => this.xScale(i))
      .y0(this.yScale(0))
      .y1(d => this.yScale(d.y))
      .curve(d3.curveMonotoneX);

    // area chart
    this.svg.append('path')
      .datum(dataset)
      .style('fill', 'url(#areaGradient)')
      .attr('d', area);

    // line
    this.svg.append('path')
      .datum(dataset)
      .attr('class', `line ${color}`)
      .attr('d', line);

    this.svg.selectAll('dot')
      .data(dataset)
      .enter().append('circle')
      .attr('class', `dot ${color}`)
      .attr('cx', (d, i) => this.xScale(i))
      .attr('cy', (d) => this.yScale(d.y))
      .attr('r', dotRadius)
      .on('mouseover', function () {
        d3.select(this).classed('focus', true);
      })
      .on('mouseout', function () {
        d3.select(this).classed('focus', false);
      });
  }

  initSVG = () => {
    const shiftAxis = 0;

    this.xScale = d3.scaleLinear()
      .domain([0, this.ticks])
      .range([0, this.width]);

    this.yScale = d3.scaleLinear()
      .domain([0, this.maxValue])
      .range([this.height, 0]);

    this.svg = d3.select('.line-chart').append('svg')
      .attr('width', this.svgWidth)
      .attr('height', this.svgHeight)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(${shiftAxis}, ${this.height})`)
      .call(d3.axisBottom(this.xScale));

    this.svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${shiftAxis}, 0)`)
      .call(d3.axisLeft(this.yScale).ticks(5))
      .call(g => g.select(".domain").remove());

    this.addLine('blue');
  }

  render() {
    return (
      <div className='line-chart'>
        <h2>Dashboard</h2>
      </div>
    );
  }
};

export default Dashboard;
