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

    // Definition for arrow markers, referenced in linkElement
    svgElement
      .append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', -20)
      .attr('markerWidth', 15)
      .attr('markerHeight', 15)
      .attr('orient', 'auto')
      .append('path')
      .attr('stroke-width', 1)
      .attr('stroke', 'grey')
      .attr('fill', 'none')
      .attr('d', 'M0,-5L10,0L0,5');

    const linkElements = svgElement
      .selectAll('line')
      .data(links)
      .enter()
      .append('g')
      .attr('class', 'link')
      .append('polyline')
      .attr('stroke-width', 0.2)
      .attr('stroke', 'grey')
      .attr('marker-mid', 'url(#arrow)');

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

    const textBackgrounds = svgElement
      .append('g')
      .selectAll('rect')
      .data(nodes)
      .join('rect')
      .style('fill', 'white')
      .style('opacity', '1');

    const textElements = svgElement
      .append('g')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .text((d) => d.label)
      .attr('font-family', 'sans-serif')
      .attr('font-size', getNodeLabelSize)
      .attr('dx', getNodeLabelOffset)
      .attr('dominant-baseline', 'central')
      .each(function (d) {
        d.bbox = this.getBBox();
      });

    simulation.nodes(nodes).on('tick', () => {
      linkElements.attr(
        'points',
        (d) =>
          d.target.x +
          ',' +
          d.target.y +
          ' ' +
          ((2 * d.target.x) / 3 + d.source.x / 3) +
          ',' +
          ((2 * d.target.y) / 3 + d.source.y / 3) +
          ' ' +
          d.source.x +
          ',' +
          d.source.y,
      );
      /*.attr('x1', (link) => link.source.x)
        .attr('y1', (link) => link.source.y)
        .attr('x2', (link) => link.target.x)
        .attr('y2', (link) => link.target.y);*/
      linkLabelsElements
        .attr('x', (d) => (d.source.x + d.target.x) / 2)
        .attr('y', (d) => (d.source.y + d.target.y) / 2);
      nodeElements.attr(
        'transform',
        (d) => 'translate(' + d.x + ',' + d.y + ')',
      );
      textElements.attr('x', (d) => d.x).attr('y', (d) => d.y);
      textBackgrounds
        .attr('x', (d) => d.x + getNodeLabelOffset(d))
        .attr('y', (d) => d.y - d.bbox.height / 2)
        .attr('width', (d) => d.bbox.width + 2)
        .attr('height', (d) => d.bbox.height + 2);
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
