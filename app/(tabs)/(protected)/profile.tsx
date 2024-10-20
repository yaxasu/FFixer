import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import ProfileHeader from "@/components/profileContents/ProfileHeader";
import ProfileOptions from "@/components/profileContents/ProfileOptions";
import ProfileActionButton from "@/components/profileContents/ProfileActionButton";

export default function Profile() {
  return (
    <>
      <ProfileHeader />
      <ScrollView style={styles.container}>
        <ProfileOptions />
        <ProfileActionButton />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
