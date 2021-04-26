import React, { useRef, useEffect, useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { LineChart, XAxis, YAxis, Grid } from "react-native-svg-charts";
import Tooltip from "./Tooltip";
import * as scale from "d3-scale";
import * as shape from "d3-shape";

const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 5;
const colors = {
  axis: "#000",
  bars: "#000",
  background: "#4f85a8",
  first: "#BA6A31",
  second: "#8BB9D3",
  text: "white", //"#27333A",
};

const lineStyles = {
  strokeWidth: 3,
  curveTension: 0.8,
};

export default function TimeLineChart({
  chartData,
  screenWidth,
  screenHeight,
}) {
  const [showLegend, setShowLegend] = useState(true);

  const graphHeight = screenHeight * 0.6;
  const graphWidth = screenWidth * 0.9;
  const xAxisHeight = graphHeight * 0.1;
  const verticalContentInset = { top: 10, bottom: 10 };

  const { title: title1, seriesData: seriesData1 } = chartData[0];
  const { xlabel: xlabel1, ylabel: ylabel1, data: data1 } = seriesData1[0];
  const { title: title2, seriesData: seriesData2 } = chartData[1];
  const { xlabel: xlabel2, ylabel: ylabel2, data: data2 } = seriesData2[0];
  return (
    <View>
      <Pressable
        style={{
          marginTop: 0,
          height: graphHeight,
          width: graphWidth,
          // borderWidth: 2,
          padding: 10,
          borderColor: "#FFF",
          borderRadius: 5,
          // backgroundColor: "#FFF",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onPressIn={() => setShowLegend(!showLegend)}
      >
        <YAxis
          data={data1}
          yAccessor={({ item }) => new Date(parseInt(item.y))}
          style={{ marginBottom: xAxisHeight }}
          contentInset={verticalContentInset}
          numberOfTicks={5}
          svg={{ fontSize: 15, fill: colors.first }}
        />
        <View
          style={{
            height: "100%",
            width: "90%",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              height: "85%",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <LineChart
              style={{ flex: 1 }}
              contentInset={verticalContentInset}
              data={data1}
              yAccessor={({ item }) => item.y}
              xAccessor={({ item }) => new Date(parseInt(item.x))}
              xScale={scale.scaleTime}
              curve={shape.curveCardinal.tension(lineStyles.curveTension)}
              svg={{
                stroke: colors.first,
                backgroundColor: "transparent",
                strokeWidth: lineStyles.strokeWidth,
              }}
              contentInset={{ top: 20, bottom: 20 }}
            ></LineChart>
            <LineChart
              style={StyleSheet.absoluteFill}
              contentInset={verticalContentInset}
              data={data2}
              yAccessor={({ item }) => item.y}
              xAccessor={({ item }) => new Date(parseInt(item.x))}
              xScale={scale.scaleTime}
              curve={shape.curveCardinal.tension(lineStyles.curveTension)}
              svg={{
                stroke: colors.second,
                strokeWidth: lineStyles.strokeWidth,
              }}
              contentInset={{ top: 20, bottom: 20 }}
            ></LineChart>
            {showLegend && (
              <View
                style={{
                  borderRadius: 5,
                  padding: 10,
                  margin: 20,
                  position: "absolute",
                  backgroundColor: "#FFFFFFDB",
                }}
              >
                <Text style={{ color: colors.first, fontSize: 15 }}>
                  ---- {title1}
                </Text>
                <Text style={{ color: colors.second, fontSize: 15 }}>
                  ---- {title2}
                </Text>
              </View>
            )}
          </View>

          <XAxis
            data={data1}
            svg={{
              fill: colors.text,
              fontSize: 12,
              fontWeight: "bold",
              rotation: 50,
              originY: 30,
              y: 5,
            }}
            xAccessor={({ item }) => new Date(parseInt(item.x))}
            scale={scale.scaleTime}
            numberOfTicks={6}
            style={{
              marginHorizontal: -10,
              height: xAxisHeight,
            }}
            contentInset={{ left: 10, right: 33 }}
            formatLabel={(value) =>
              `${value.getMonth() + 1} / ${value.getDate()} `
            }
          />
        </View>

        <YAxis
          data={data2}
          yAccessor={({ item }) => new Date(parseInt(item.y))}
          style={{ marginBottom: xAxisHeight }}
          numberOfTicks={5}
          contentInset={verticalContentInset}
          svg={{ fontSize: 15, fill: colors.second }}
        />
      </Pressable>
    </View>
  );
}
