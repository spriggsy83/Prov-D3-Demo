import { has } from 'lodash';
import * as d3 from 'd3';

const nodeTypeConfig = {
  experiment: {
    yOrder: 0,
    symbol: d3.symbolTriangle,
    symbolSize: 300, // Size for symbols is square area
    collideRadius: 20,
    colour: 'green',
    labelSize: 15,
    labelOffset: 16,
  },
  activity: {
    yOrder: 1,
    symbol: d3.symbolTriangle,
    symbolSize: 200,
    collideRadius: 16,
    colour: 'lightgreen',
    labelSize: 10,
    labelOffset: 12,
  },
  entity: {
    yOrder: 2,
    symbol: d3.symbolCircle,
    symbolSize: 20,
    collideRadius: 7,
    colour: 'darkorange',
    labelSize: 0,
    labelOffset: 0,
  },
  observation: {
    yOrder: 3,
    symbol: d3.symbolSquare,
    symbolSize: 150,
    collideRadius: 12,
    colour: 'dodgerblue',
    labelSize: 8,
    labelOffset: 10,
  },
  default: {
    yOrder: 4,
    symbol: d3.symbolCircle,
    symbolSize: 50,
    collideRadius: 6,
    colour: 'darkgreen',
    labelSize: 8,
    labelOffset: 6,
  },
};

const getNodeType = (node) =>
  has(nodeTypeConfig, node.type) ? node.type : 'default';

const getNodeConfig = (node) =>
  has(nodeTypeConfig, node.type)
    ? nodeTypeConfig[node.type]
    : nodeTypeConfig.default;

const getNodeYOrder = (node) => getNodeConfig(node).yOrder;
const getNodeSymbol = (node) => getNodeConfig(node).symbol;
const getNodeSymbolSize = (node) => getNodeConfig(node).symbolSize;
const getNodeCollideRadius = (node) => getNodeConfig(node).collideRadius;
const getNodeColour = (node) => getNodeConfig(node).colour;
const getNodeLabelSize = (node) => getNodeConfig(node).labelSize;
const getNodeLabelOffset = (node) => getNodeConfig(node).labelOffset;

export {
  getNodeType,
  getNodeConfig,
  getNodeYOrder,
  getNodeSymbol,
  getNodeSymbolSize,
  getNodeCollideRadius,
  getNodeColour,
  getNodeLabelSize,
  getNodeLabelOffset,
};
