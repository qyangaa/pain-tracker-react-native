import React, { useRef, useEffect } from "react";
import { View, Text } from "react-native";
import { LineChart, XAxis, Grid } from "react-native-svg-charts";
import * as scale from "d3-scale";
import * as shape from "d3-shape";

const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 5;
const colors = {
  axis: "#000",
  bars: "#000",
  background: "#4f85a8",
};

export default function TimeLineChart({ chartData, screenWidth }) {
  const graphHeight = 300;
  const graphWidth = screenWidth * 0.9;
  console.log({ screenWidth });
  const { title, seriesData } = chartData;
  const { xlabel, ylabel, data } = seriesData[0];
  return (
    <View
      style={{
        marginTop: 20,
        height: graphHeight,
        width: graphWidth,
        // borderWidth: 2,
        padding: 10,
        borderColor: "#FFF",
        borderRadius: 5,
        backgroundColor: "#FFF",
      }}
    >
      <Text style={{ fontSize: 18, color: "black", alignSelf: "center" }}>
        {title}
      </Text>
      <LineChart
        style={{ height: "70%" }}
        data={data}
        yAccessor={({ item }) => item.y}
        xAccessor={({ item }) => new Date(parseInt(item.x))}
        xScale={scale.scaleTime}
        curve={shape.curveCardinal.tension(0.5)}
        svg={{ stroke: colors.bars }}
        contentInset={{ top: 20, bottom: 20 }}
      ></LineChart>
      <XAxis
        data={data}
        svg={{
          fill: colors.axis,
          fontSize: 12,
          fontWeight: "bold",
          rotation: 50,
          originY: 30,
          y: 5,
        }}
        xAccessor={({ item }) => new Date(parseInt(item.x))}
        scale={scale.scaleTime}
        numberOfTicks={6}
        style={{ marginHorizontal: -15, height: "15%" }}
        contentInset={{ left: 10, right: 33 }}
        formatLabel={(value) => `${value.getMonth() + 1} / ${value.getDate()} `}
      />
      <Text style={{ alignSelf: "center", color: "#000" }}>{xlabel}</Text>
    </View>
  );
}
