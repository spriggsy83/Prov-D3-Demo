import React, { useRef, useEffect } from 'react';
import { uniq, sortBy } from 'lodash';
import * as d3 from 'd3';
import {
  getNodeType,
  getNodeYOrder,
  getNodeSymbol,
  getNodeSymbolSize,
  getNodeCollideRadius,
  getNodeColour,
  getNodeLabelSize,
  getNodeLabelOffset,
} from './graphNodesConfig';

const width = 600;
const height = 400;

const styles = {
  svgContainer: {
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    paddingBottom: '66%',
    verticalAlign: 'middle',
    overflow: 'hidden',
  },
  svgContent: {
    display: 'inline-block',
    position: 'absolute',
    top: 0,
    left: 0,
  },
};

const ProvGraph = ({ data }) => {
  const ref = useRef();
  useEffect(() => {
    const svgElement = d3.select(ref.current);
    svgElement.selectAll('*').remove();

    const { nodes, links } = data;
    // Categorise and order distinct types in data
    const orderedTypes = sortBy(uniq(nodes.map(getNodeType)), getNodeYOrder);
    const numTypes = orderedTypes.length;
    const yOrder = orderedTypes.reduce((result, type, i) => {
      result[type] = i;
      return result;
    }, {});
    // Categorise and order distinct times in data
    const orderedTimes = sortBy(uniq(nodes.map((d) => d.time)));
    const numTimes = orderedTimes.length;
    const xOrder = orderedTimes.reduce((result, time, i) => {
      result[time] = i;
      return result;
    }, {});

    const simulation = d3
      .forceSimulation(nodes)
      /*.force('charge', d3.forceManyBody().strength(1))*/
      .force(
        'x',
        d3
          .forceX()
          .x((d) => (xOrder[d.time] + 1) * (width / (numTimes + 1)))
          .strength(1.5),
      )
      .force(
        'y',
        d3
          .forceY()
          .y((d) => (yOrder[getNodeType(d)] + 1) * (height / (numTypes + 1)))
          .strength(1.5),
      )
      .force('collision', d3.forceCollide().radius(getNodeCollideRadius))
      .force(
        'link',
        d3
          .forceLink()
          .links(links)
          .distance(height / (numTypes + 1))
          .id((d) => d.id),
      );

    const linkElements = svgElement
      .selectAll('line')
      .data(links)
      .enter()
      .append('g')
      .attr('class', 'link')
      .append('line')
      .attr('stroke-width', 0.2)
      .attr('stroke', 'grey');

    var linkLabelsElements = svgElement
      .selectAll('.link')
      .append('text')
      .attr('class', 'link-label')
      .attr('fill', 'black')
      .style('font', 'normal 5px Arial')
      .attr('dy', '.35em')
      .attr('dx', '.35em')
      .attr('text-anchor', 'start')
      .text((d) => d.label);

    const nodeElements = svgElement
      .append('g')
      .selectAll('node')
      .data(nodes)
      .enter()
      .append('path')
      .attr('d', d3.symbol().type(getNodeSymbol).size(getNodeSymbolSize))
      .attr('fill', getNodeColour);

    const textElements = svgElement
      .append('g')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .text((d) => d.label)
      .attr('font-size', getNodeLabelSize)
      .attr('dx', getNodeLabelOffset)
      .attr('dominant-baseline', 'central');

    simulation.nodes(nodes).on('tick', () => {
      linkElements
        .attr('x1', (link) => link.source.x)
        .attr('y1', (link) => link.source.y)
        .attr('x2', (link) => link.target.x)
        .attr('y2', (link) => link.target.y);
      linkLabelsElements
        .attr('x', (d) => (d.source.x + d.target.x) / 2)
        .attr('y', (d) => (d.source.y + d.target.y) / 2);
      nodeElements.attr(
        'transform',
        (d) => 'translate(' + d.x + ',' + d.y + ')',
      );
      textElements.attr('x', (node) => node.x).attr('y', (node) => node.y);
    });
  }, [data]);
  return (
    <div style={styles.svgContainer}>
      <svg
        style={styles.svgContent}
        preserveAspectRatio="xMidYMid meet"
        viewBox={`0 0 ${width} ${height}`}
        ref={ref}
      />
    </div>
  );
};

export default ProvGraph;
