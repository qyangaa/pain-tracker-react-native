import React, { useEffect } from "react";
import { View, Text } from "react-native";

import { getLastUsed } from "../../redux/screenActionCreator";
import { useSelector, useDispatch } from "react-redux";

export default function IconPage() {
  const dispatch = useDispatch();
  console.debug("Here");
  useEffect(() => {
    (async () => {
      await getLastUsed("Token")(dispatch);
    })();
  }, []);
  return (
    <View>
      <Text>Here</Text>
    </View>
  );
}
