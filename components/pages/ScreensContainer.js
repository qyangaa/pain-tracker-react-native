import React, { useEffect, useRef, useState } from "react";
import SvgXml from "react-native-svg";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Animated,
  Image,
  StyleSheet,
} from "react-native";
import { getLastUsed, toggleOption } from "../../redux/screenActionCreator";
import { useSelector, useDispatch } from "react-redux";

// import styles from "./ScreensContainer.styles";

import TrackerScreen from "./TrackerScreen";
import ReportScreen from "./ReportScreen";
import ReportsScreenWebview from "./ReportsScreenWebview";
import Indicator from "../common/Indicator";
import Backdrop from "../common/Backdrop";
import Footer from "../common/Footer";

const bgs = ["#9ACFDD", "#6b8f67", "#F28A80", "#F2ADA7", "#D9BACE"];
const reportBg = "#00172E";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function ScreensContainer() {
  const dispatch = useDispatch();
  const screens = useSelector((state) => state.screenState.screens);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [curIdx, setCurIdx] = useState(0);
  const onViewableItemsChanged = React.useRef(({ viewableItems, changed }) => {
    setCurIdx(viewableItems[0].index);
  });

  useEffect(() => {
    (async () => {
      try {
        await getLastUsed("Token")(dispatch);
        bgs[screens.length - 1] = reportBg;
        // console.log(bgs);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} screenWidth={width} bgs={bgs} />
      <Text
        style={{
          marginTop: 15,
          fontSize: 20,
          color: "#FFFFFF",
          fontFamily: "sans-serif-thin",
        }}
      >
        Hey, pain!
      </Text>
      {screens && (
        <Animated.FlatList
          data={screens}
          keyExtractor={(item, index) => item._id}
          renderItem={({ item, index }) => {
            if (index == 3) {
              return (
                <>
                  {/* <ReportScreen */}
                  <ReportsScreenWebview
                    isFinal={curIdx == screens.length - 1}
                    screenWidth={width}
                    screenHeight={height}
                  />
                </>
              );
            }
            return (
              <>
                <Footer
                  scrollX={scrollX}
                  screenWidth={width}
                  screenHeight={height}
                />
                <TrackerScreen
                  data={item}
                  screenWidth={width}
                  screenHeight={height}
                  bgs={bgs}
                  curIdx={curIdx}
                />
              </>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          decelerationRate={"fast"}
          contentContainerStyle={{ paddingBottom: 0 }}
          scrollEventThrottle={1000}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={onViewableItemsChanged.current}
        />
      )}
      <Indicator curIdx={curIdx} count={screens.length} bgs={bgs} />
    </View>
  );
}
