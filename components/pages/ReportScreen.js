import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import {
  createRecords,
  getPainDayData,
  getDailyTotal,
  getContribution,
} from "../../graphql/requests";
import { useSelector, useDispatch } from "react-redux";
import BarChart from "../common/BarChart";
import TimeLineChart from "../common/TimeLineChart";

export default function ReportScreen({ isFinal, screenWidth, screenHeight }) {
  const screens = useSelector((state) => state.screenState.screens);
  const [isUploading, setIsUploading] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [painDayData, setPainDayData] = useState();
  const [dailyTotalArgumets, setdailyTotalArgumets] = useState({
    categoryId: "3",
    categoryName: "exercises",
    numMonths: "3",
    type: "duration",
  });
  const [dailyTotalData, setDailyTotalData] = useState();

  const [contributionArguments, setContributionArguments] = useState({
    categoryId: "3",
    categoryName: "exercises",
    optionId: "16",
    optionName: "less pain",
    numMonths: "5",
    extension: "7",
  });
  const [contributionData, setContributionData] = useState();
  const upload = false;
  useEffect(() => {
    getPainData();
    getDailyTotalData();
    getContributionData();
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

  const getPainData = async () => {
    try {
      const result = await getPainDayData("3");
      setPainDayData(result);
      // console.log({ result });
    } catch (error) {
      console.error(error);
    }
  };

  const getDailyTotalData = async () => {
    try {
      const result = await getDailyTotal(dailyTotalArgumets);
      setDailyTotalData(result);
      // console.log("daily total data:", { result });
    } catch (error) {
      console.error(error);
    }
  };

  const getContributionData = async () => {
    try {
      const result = await getContribution(contributionArguments);
      setContributionData(result);
      // console.log("contribution data:", { result });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        width: screenWidth,
        alignItems: "center",
        paddingBottom: 100,
        // backgroundColor: "white",
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
        {painDayData && dailyTotalData && (
          <TimeLineChart
            chartData={[painDayData, dailyTotalData]}
            screenWidth={screenWidth}
            screenHeight={screenHeight}
          />
        )}
      </ScrollView>
    </View>
  );
}
