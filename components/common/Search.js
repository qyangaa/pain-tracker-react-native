import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  InteractionManager,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addOption } from "../../redux/screenActionCreator";

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
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef();
  const debouncedText = useDebounced(searchText, 500);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    focusInputWithKeyboard();
  }, []);

  const focusInputWithKeyboard = () => {
    InteractionManager.runAfterInteractions(() => {
      inputRef.current.focus();
    });
  };

  useEffect(() => {
    searchOption(debouncedText, categoryId).then((data) =>
      setSearchResults(data)
    );
  }, [debouncedText]);

  const handleSelect = (option) => {
    dispatch(addOption(option));
    onClose();
  };

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

      {searchResults &&
        searchResults.map((option) => (
          <Pressable
            key={"pressable" + option._id}
            onPress={() => handleSelect(option)}
            style={{
              width: searchResults.length > 4 ? "30%" : "40%",
              justifyContent: "space-around",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Image
              key={"icon" + option._id}
              style={{
                height: 100,
                width: 100,
              }}
              source={{
                uri: option.srcActive,
              }}
            />
            <Text
              key={"text" + option._id}
              style={{
                marginTop: 15,
                fontSize: 20,
                color: "white",
                fontFamily: "sans-serif-light",
              }}
            >
              {option.title}
            </Text>
          </Pressable>
        ))}
    </View>
  );
}
