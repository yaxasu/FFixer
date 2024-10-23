import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

// Define interfaces for placeholder data
interface FeaturedService {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface RecentJob {
  id: number;
  title: string;
  description: string;
  budget: number;
  createdAt: string;
}

// Sample placeholder data
const featuredServices: FeaturedService[] = [
  {
    id: 1,
    name: "Plumbing",
    description: "Expert plumbing services for your home.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Electrical",
    description: "Certified electricians available 24/7.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Cleaning",
    description: "Professional cleaning services.",
    image: "https://via.placeholder.com/150",
  },
];

const recentJobs: RecentJob[] = [
  {
    id: 1,
    title: "Fix Kitchen Sink",
    description: "Kitchen sink leaking, needs immediate repair.",
    budget: 100,
    createdAt: "2024-04-20",
  },
  {
    id: 2,
    title: "Install Ceiling Fan",
    description: "Need a ceiling fan installed in the living room.",
    budget: 75,
    createdAt: "2024-04-18",
  },
  {
    id: 3,
    title: "Home Cleaning",
    description: "Deep cleaning required for a 3-bedroom apartment.",
    budget: 150,
    createdAt: "2024-04-15",
  },
];

const { width } = Dimensions.get("window");

export default function Home() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Featured Services Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Services</Text>
        <FlatList
          data={featuredServices}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Recent Jobs Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Jobs</Text>
        {recentJobs.map((job) => (
          <View key={job.id} style={styles.jobCard}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobBudget}>${job.budget}</Text>
            </View>
            <Text style={styles.jobDescription}>{job.description}</Text>
            <Text style={styles.jobDate}>Posted on: {job.createdAt}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Image
              source={{ uri: "https://img.icons8.com/ios-filled/50/000000/post-job.png" }}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Post a Job</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Image
              source={{ uri: "https://img.icons8.com/ios-filled/50/000000/search.png" }}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Search Workers</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginBottom: 15,
    marginLeft: 2
  },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    width: width * 0.55,
  },
  cardImage: {
    width: "100%",
    height: 90,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: "#777",
  },
  jobCard: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  jobBudget: {
    fontSize: 15,
    fontWeight: "500",
    color: "#4caf50",
  },
  jobDescription: {
    fontSize: 13,
    color: "#777",
    marginBottom: 5,
  },
  jobDate: {
    fontSize: 12,
    color: "#999",
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginRight: 10,
  },
  actionIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
    tintColor: "#4caf50",
  },
  actionText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
  },
});
