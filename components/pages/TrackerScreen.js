import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, Modal, ScrollView } from "react-native";
import AppLoading from "expo-app-loading";
import styles from "./TrackerScreen.styles";
import IconsContainer from "../common/IconsContainer";
import { toggleOption } from "../../redux/screenActionCreator";
import { useSelector, useDispatch } from "react-redux";

import * as Font from "expo-font";

import CircularSlider from "../common/CircularSlider";

import Search from "../common/Search";

const searchIconUrl =
  "https://firebasestorage.googleapis.com/v0/b/pain-tracker-934d3.appspot.com/o/assets%2Futility_icons%2Fsearch%2Fsearch_outline_ldpi.png?alt=media";

const stopWatchIconUrl =
  "https://firebasestorage.googleapis.com/v0/b/pain-tracker-934d3.appspot.com/o/assets%2Futility_icons%2Fstop_watch%2Fstop_watch_black_ldpi.png?alt=media";

const returnIconUrl =
  "https://firebasestorage.googleapis.com/v0/b/pain-tracker-934d3.appspot.com/o/assets%2Futility_icons%2Freturn%2Fback_black_ldpi.png?alt=media";

const displayTime = (time) => {
  if (time >= 60) return `${(time / 60).toFixed(1)} hr`;
  return `${time} min`;
};

const sliderScale = 0.8;

export default function TrackerScreen({
  data,
  screenWidth,
  screenHeight,
  onToggleOption,
  curIdx,
  bgs,
}) {
  const dispatch = useDispatch();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [time, setTime] = useState(30);
  const [curOption, setCurOption] = useState();

  const handleToggleOption = (option, setTime = false) => {
    if (!option) return;
    dispatch(toggleOption(option._id, option.categoryId, time, setTime));
  };

  const handleOpenTime = (option) => {
    if (!data.hasDuration || !option.selected) {
      handleToggleOption(option, false);
      return;
    }
    setCurOption(option);
    setIsTimeOpen(true);
  };

  const handleCloseTime = () => {
    setIsTimeOpen(false);
    handleToggleOption(curOption, true);
  };

  const loadFonts = async () => {
    await Font.loadAsync({
      indieflower_regular: {
        uri: require("../../assets/fonts/indieflower_regular.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
    return () => {};
  }, []);
  if (!fontsLoaded) return <AppLoading />;
  return (
    <View
      style={{
        width: screenWidth,
        height: screenHeight,
        alignItems: "center",
        paddingBottom: 100,
      }}
    >
      <View style={{ flex: 0.2, alignItems: "center" }}>
        <Text
          style={{
            fontWeight: "800",
            fontSize: 40,
            marginTop: 50,
            color: "white",
            fontFamily: "sans-serif",
          }}
        >
          {data.title}
        </Text>
        <View
          style={{
            // flex: 0.8,
            marginTop: data.options.length > 6 ? "2%" : "10%",
            marginHorizontal: "10%",
            height: screenHeight * 0.55,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {data.options &&
              data.options.map((option) => (
                <Pressable
                  key={"pressable" + option._id}
                  onPress={() => handleToggleOption(option, false)}
                  onLongPress={() => handleOpenTime(option)}
                  style={{
                    width: data.options.length > 4 ? "30%" : "40%",
                    alignItems: "center",
                    marginVertical: `5%`,
                  }}
                >
                  {data.hasDuration && (
                    <Text
                      key={"duration" + option._id}
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        color: bgs[curIdx],
                        fontFamily: "sans-serif-bold",
                        textAlign: "center",
                        backgroundColor: "white",
                        borderRadius: 5,
                        paddingVertical: 1,
                        paddingHorizontal: 7,
                      }}
                    >
                      {option.selected ? (option.duration / 60).toFixed(1) : 0}{" "}
                      hr
                    </Text>
                  )}
                  <Image
                    key={"icon" + option._id}
                    style={{
                      height: 100,
                      width: 100,
                    }}
                    source={{
                      uri: option.selected ? option.srcActive : option.src,
                    }}
                  />

                  <Text
                    key={"text" + option._id}
                    style={{
                      marginTop: 5,
                      fontSize: 18,
                      color: "white",
                      fontFamily: "sans-serif-light",
                      textAlign: "center",
                    }}
                  >
                    {option.title}
                  </Text>
                </Pressable>
              ))}
          </ScrollView>
        </View>
      </View>
      <Modal visible={isSearchOpen} animationType="fade">
        <Search
          bgs={bgs}
          curIdx={curIdx}
          screenHeight={screenHeight}
          screenWidth={screenWidth}
          categoryId={data._id}
          onClose={() => setIsSearchOpen(false)}
        />
      </Modal>
      <View
        style={{
          position: "absolute",
          width: screenWidth * 0.8,
          bottom: screenHeight * 0.15,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Pressable
          style={{
            height: 50,
            width: 50,
          }}
          onPress={() => setIsSearchOpen(true)}
        >
          <Image
            source={{
              height: 40,
              width: 40,
              uri: searchIconUrl,
            }}
          />
        </Pressable>
      </View>
      <Modal visible={isTimeOpen} animationType="fade">
        <Pressable
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setIsTimeOpen(false)}
        >
          <Text
            style={{
              width: screenWidth * 0.6,
              textAlign: "center",
              fontWeight: "800",
              fontSize: 40,
              marginTop: 50,
              color: bgs[curIdx],
              fontFamily: "sans-serif",
              borderColor: bgs[curIdx],
              borderWidth: 3,
              borderRadius: 10,
              paddingVertical: 5,
            }}
          >
            {displayTime(time)}
          </Text>
          <CircularSlider
            width={screenWidth * 0.8}
            height={screenHeight * 0.5}
            meterColor={bgs[curIdx]}
            textColor="#fff"
            value={time / sliderScale}
            onValueChange={(value) => {
              setTime((value * sliderScale).toFixed(0));
            }}
            onClose={() => handleCloseTime()}
          />
        </Pressable>
      </Modal>
    </View>
  );
}
