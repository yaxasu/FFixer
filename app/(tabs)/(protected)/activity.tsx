import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { Activity, ActivityType } from "@/constants/types";
import { activities } from "@/components/Activity";

// Define an icon mapping based on activity type
const activityIcons: { [key in ActivityType]: string } = {
  [ActivityType.JOB_POSTED]: "https://img.icons8.com/ios-filled/50/000000/job.png",
  [ActivityType.JOB_APPLIED]: "https://img.icons8.com/ios-filled/50/000000/application.png",
  [ActivityType.RATING_RECEIVED]: "https://img.icons8.com/ios-filled/50/000000/rating.png",
  [ActivityType.RATING_GIVEN]: "https://img.icons8.com/ios-filled/50/000000/rating.png",
  [ActivityType.NEW_MESSAGE]: "https://img.icons8.com/ios-filled/50/000000/message.png",
};

const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};

export default function ActivityScreen() {
  const renderActivityItem = ({ item }: { item: Activity }) => (
    <View style={styles.activityCard}>
      <Image source={{ uri: activityIcons[item.type] }} style={styles.activityIcon} />
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{item.title}</Text>
        <Text style={styles.activityDescription}>{item.description}</Text>
        <Text style={styles.activityTimestamp}>{formatTimestamp(item.timestamp)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderActivityItem}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No activities to display.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  activityCard: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0", // Lighter background for cards
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    alignItems: "center",
  },
  activityIcon: {
    width: 36, // Slightly smaller for balance
    height: 36,
    marginRight: 12,
    tintColor: "#4caf50",
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: "500", // Slightly reduced weight for a cleaner look
    color: "#333",
  },
  activityDescription: {
    fontSize: 13,
    color: "#666",
    marginTop: 3,
  },
  activityTimestamp: {
    fontSize: 11,
    color: "#999",
    marginTop: 3,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});
