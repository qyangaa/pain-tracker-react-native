import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createRecords } from "../../graphql/requests";
import { useSelector, useDispatch } from "react-redux";

export default function ReportScreen({ isFinal, screenWidth }) {
  const screens = useSelector((state) => state.screenState.screens);
  const [isUploading, setIsUploading] = useState("");
  const [uploadError, setUploadError] = useState("");
  useEffect(() => {
    if (isFinal) {
      setIsUploading("Uploading");
      console.log("creatingRecords Screen");
      async function upload() {
        try {
          await createRecords(screens);
          setIsUploading("Upload successful!");
          setTimeout(() => {
            setIsUploading("");
          }, 2000);
        } catch (error) {
          setUploadError("Failed to upload records, please try again");
        }
      }
      upload();
    }
  }, [isFinal]);

  return (
    <View
      style={{
        width: screenWidth,
        alignItems: "center",
        paddingBottom: 100,
      }}
    >
      <Text>
        {isUploading && isUploading} {uploadError && uploadError}
      </Text>
    </View>
  );
}
