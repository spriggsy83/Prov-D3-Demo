import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const width = 600;
const height = 400;

const catColours = {
  0: 'green',
  1: 'lightgreen',
  2: 'darkorange',
};

const ProvGraph = ({ data }) => {
  const ref = useRef();
  useEffect(() => {
    const { nodes, links, numCats, numTimes } = data;
    const svgElement = d3.select(ref.current);
    svgElement.selectAll('*').remove();

    const simulation = d3
      .forceSimulation(nodes)
      /*.force('charge', d3.forceManyBody().strength(1))*/
      .force(
        'x',
        d3
          .forceX()
          .x((d) => (d.time + 1) * (width / (numTimes + 1)))
          .strength(1.5),
      )
      .force(
        'y',
        d3
          .forceY()
          .y((d) => (d.cat + 1) * (height / (numCats + 1)))
          .strength(1.5),
      )
      .force(
        'collision',
        d3.forceCollide().radius((d) => 24 - d.cat * 9),
      )
      .force(
        'link',
        d3
          .forceLink()
          .links(links)
          .distance(height / (numCats + 1))
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
      .attr(
        'd',
        d3
          .symbol()
          .type((d) => (d.cat === 2 ? d3.symbolCircle : d3.symbolTriangle))
          .size((d) => 400 - d.cat * 190), // Size is square area
      )
      .attr('fill', (d) => catColours[d.cat]);

    const textElements = svgElement
      .append('g')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .text((d) => d.label)
      .attr('font-size', (d) => 20 - d.cat * 10)
      .attr('dx', (d) => 21 - d.cat * 9);

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

export default ProvGraph;
