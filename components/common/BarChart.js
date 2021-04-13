import React from "react";
import { View, Text } from "react-native";
import { Svg, G, Line, Rect } from "react-native-svg";
import * as d3 from "d3";

const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 5;
const colors = {
  axis: "#E4E4E4",
  bars: "#FFF",
};

export default function BarChart({ chartData }) {
  const SVGHeight = 300;
  const SVGWidth = 300;
  const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
  const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;
  const { title, seriesData } = chartData;
  const { xlabel, ylabel, data } = seriesData[0];

  const xDomain = data.map((item) => item.x);
  const xRange = [0, graphWidth];
  const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1);

  const yDomain = [0, d3.max(data, (d) => d.y)];
  const yRange = [0, graphHeight];
  const y = d3.scaleLinear().domain(yDomain).range(yRange);
  console.log(data);
  return (
    <Svg width={SVGWidth} height={SVGHeight}>
      <G y={graphHeight}>
        {/* Bars */}
        {data &&
          data.map((item) => (
            <Rect
              x={x(item.x) - GRAPH_BAR_WIDTH / 2}
              y={y(item.y) * -1}
              rx={2.5}
              width={GRAPH_BAR_WIDTH}
              height={y(item.y)}
              fill={colors.bars}
              key={item.x + item.y}
            />
          ))}
        <Line
          x1="0"
          y1="2"
          x2={graphWidth}
          y2="2"
          stroke={colors.axis}
          strokeWidth="0.5"
        />
      </G>
    </Svg>
  );
}
