import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  InteractionManager,
} from "react-native";

import { searchOption } from "../../graphql/requests";
import useDebounced from "../../utils/useDebounce";
import _ from "lodash";

const searchIconUrl =
  "https://firebasestorage.googleapis.com/v0/b/pain-tracker-934d3.appspot.com/o/assets%2Futility_icons%2Fsearch%2Fsearch_solid_ldpi.png?alt=media";

export default function Search({
  categoryId,
  screenHeight,
  screenWidth,
  bgs,
  curIdx,
  onClose,
}) {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef();
  const debouncedText = useDebounced(searchText, 800);

  useEffect(() => {
    focusInputWithKeyboard();
  }, []);

  const focusInputWithKeyboard = () => {
    InteractionManager.runAfterInteractions(() => {
      inputRef.current.focus();
    });
  };

  useEffect(() => {
    searchOption(debouncedText, categoryId);
  }, [debouncedText]);

  return (
    <View
      style={{
        backgroundColor: bgs[curIdx],
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Pressable
        style={{
          height: 30,
          marginVertical: 20,
        }}
        onPress={onClose}
      >
        <Text
          style={{
            fontWeight: "800",
            fontSize: 40,
            color: "white",
            fontFamily: "sans-serif",
          }}
        >
          Search
        </Text>
      </Pressable>
      <TextInput
        value={searchText}
        style={{
          height: 60,
          width: screenWidth * 0.8,
          margin: 12,
          borderWidth: 3,
          borderColor: "white",
          borderRadius: 4,
          textAlign: "center",
          color: "white",
          fontSize: 25,
          fontFamily: "sans-serif",
        }}
        autoCorrect
        onChangeText={(text) => setSearchText(text)}
        ref={inputRef}
        selectionColor={"white"}
      />
    </View>
  );
}
