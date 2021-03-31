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
import { getLastUsed } from "../../redux/screenActionCreator";
import { useSelector, useDispatch } from "react-redux";

// import styles from "./ScreensContainer.styles";

import TrackerScreen from "./TrackerScreen";
import Indicator from "../common/Indicator";
import Backdrop from "../common/Backdrop";
import Footer from "../common/Footer";
import WavyBackground from "../../assets/images/WavyBackground";

const bgs = ["#8ABFBA", "#9ACFDD", "#F28A80", "#F2ADA7", "#595248"];

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
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} screenWidth={width} bgs={bgs} />
      <Footer scrollX={scrollX} screenWidth={width} screenHeight={height} />
      {screens && (
        <Animated.FlatList
          data={screens}
          keyExtractor={(item, index) => item._id}
          renderItem={({ item }) => (
            <TrackerScreen
              data={item}
              screenWidth={width}
              screenHeight={height}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          decelerationRate={"fast"}
          snapToInterval={Dimensions.get("window").width}
          contentContainerStyle={{ paddingBottom: 100 }}
          scrollEventThrottle={32}
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