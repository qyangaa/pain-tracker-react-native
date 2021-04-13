import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { createRecords, getPainDayData } from "../../graphql/requests";
import { useSelector, useDispatch } from "react-redux";
import BarChart from "../common/BarChart";
import TimeLineChart from "../common/TimeLineChart";

export default function ReportScreen({ isFinal, screenWidth }) {
  const screens = useSelector((state) => state.screenState.screens);
  const [isUploading, setIsUploading] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [painDayData, setPainDayData] = useState();
  const upload = false;
  useEffect(() => {
    getPainChart();
    if (isFinal && upload) {
      setIsUploading("Uploading");
      console.log("creatingRecords Screen");
      console.log(screens);
      async function upload() {
        try {
          await createRecords(screens);
          setIsUploading("Upload successful!");
          setTimeout(() => {
            setIsUploading("");
          }, 2000);
        } catch (error) {
          setUploadError("Failed to upload records, please try again");
          console.log({ error });
        }
      }
      upload();
    }
  }, [isFinal]);

  const getPainChart = async () => {
    try {
      const result = await getPainDayData("1");
      setPainDayData(result);
      // console.log({ result });
    } catch (error) {}
  };

  return (
    <View
      style={{
        width: screenWidth,
        alignItems: "center",
        paddingBottom: 100,
      }}
    >
      <Text style={{ fontSize: 20, color: "#FFFFFF", marginTop: 100 }}>
        {isUploading && isUploading} {uploadError && uploadError}
      </Text>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {painDayData && (
          <TimeLineChart chartData={painDayData} screenWidth={screenWidth} />
        )}
      </ScrollView>
    </View>
  );
}
