import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Service } from "@/constants/types";

const allServices: Service[] = [
  {
    id: 1,
    name: "Plumbing",
    description: "Expert plumbing services for your home and office.",
    icon: "https://img.icons8.com/ios-filled/50/000000/plumbing.png",
  },
  {
    id: 2,
    name: "Electrical",
    description: "Certified electricians available for all your electrical needs.",
    icon: "https://img.icons8.com/ios-filled/50/000000/electrical.png",
  },
  {
    id: 3,
    name: "Cleaning",
    description: "Professional cleaning services for residential and commercial spaces.",
    icon: "https://img.icons8.com/ios-filled/50/000000/cleaning-service.png",
  },
  {
    id: 4,
    name: "Carpentry",
    description: "Skilled carpenters for custom woodwork and repairs.",
    icon: "https://img.icons8.com/ios-filled/50/000000/carpentry.png",
  },
  {
    id: 5,
    name: "Landscaping",
    description: "Beautify your outdoor spaces with our landscaping services.",
    icon: "https://img.icons8.com/ios-filled/50/000000/landscaping.png",
  },
];

const { width } = Dimensions.get("window");

export default function ServicesScreen() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredServices, setFilteredServices] = useState<Service[]>(allServices);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredServices(allServices);
    } else {
      const filtered = allServices.filter((service) =>
        service.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  };

  const renderServiceItem = ({ item }: { item: Service }) => (
    <TouchableOpacity style={styles.serviceCard}>
      <Image source={{ uri: item.icon }} style={styles.serviceIcon} />
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#888" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#888"
            />
          </View>

          {/* Services List */}
          <FlatList
            data={filteredServices}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderServiceItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No services found.</Text>
              </View>
            }
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff", // Pure white background
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 16,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "#999",
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 5,
  },
  listContent: {
    paddingBottom: 20,
  },
  serviceCard: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0", // Light grey card background
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    alignItems: "center",
  },
  serviceIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
    tintColor: "#4caf50",
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "500", // Slightly less bold for minimalism
    color: "#333",
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#666",
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
