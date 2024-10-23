import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { Activity, ActivityType } from "@/constants/types";

// Sample data for activities
export const activities: Activity[] = [
  {
    id: 1,
    type: ActivityType.JOB_POSTED,
    title: "Job Posted: Fix Kitchen Sink",
    description: "You have successfully posted a new job to fix the kitchen sink.",
    timestamp: "2024-04-22T10:30:00Z",
  },
  {
    id: 2,
    type: ActivityType.JOB_APPLIED,
    title: "Job Applied: Install Ceiling Fan",
    description: "John Doe has applied to your job for installing a ceiling fan.",
    timestamp: "2024-04-21T14:15:00Z",
  },
  {
    id: 3,
    type: ActivityType.RATING_RECEIVED,
    title: "New Rating Received",
    description: "Jane Smith rated you 4.5 stars for your excellent work.",
    timestamp: "2024-04-20T09:00:00Z",
  },
  {
    id: 4,
    type: ActivityType.NEW_MESSAGE,
    title: "New Message from Alex",
    description: "Alex sent you a new message regarding the cleaning job.",
    timestamp: "2024-04-19T16:45:00Z",
  },
  {
    id: 5,
    type: ActivityType.RATING_GIVEN,
    title: "Rating Given to Mark",
    description: "You rated Mark 5 stars for his prompt service.",
    timestamp: "2024-04-18T11:20:00Z",
  },
];

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
    backgroundColor: "#f7f7f7", // Lighter background for cards
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, // Softer shadow for a minimal look
    shadowRadius: 2,
    elevation: 1,
  },
  activityIcon: {
    width: 36,
    height: 36,
    marginRight: 12,
    tintColor: "#4caf50",
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: "500", // Slightly less bold for minimalism
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
