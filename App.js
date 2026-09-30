import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import styles from "./styles";

const Stack = createNativeStackNavigator();

const menu = [
  {
    id: "1",
    name: "Greek Salad",
    category: "Salads",
    price: "$12",
    description: "Fresh vegetables with feta cheese.",
  },
  {
    id: "2",
    name: "Bruschetta",
    category: "Starters",
    price: "$9",
    description: "Toasted bread with tomatoes and herbs.",
  },
  {
    id: "3",
    name: "Grilled Fish",
    category: "Mains",
    price: "$18",
    description: "Fresh grilled fish with vegetables.",
  },
  {
    id: "4",
    name: "Pasta",
    category: "Mains",
    price: "$15",
    description: "Homemade pasta with tomato sauce.",
  },
  {
    id: "5",
    name: "Lemon Cake",
    category: "Desserts",
    price: "$8",
    description: "Soft cake with fresh lemon flavor.",
  },
  {
    id: "6",
    name: "Ice Cream",
    category: "Desserts",
    price: "$7",
    description: "Creamy vanilla ice cream.",
  },
];

const categories = [
  "All",
  "Starters",
  "Mains",
  "Desserts",
  "Salads",
];

/* ---------------- START SCREEN ---------------- */

function StartScreen({ navigation }) {
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const user = await AsyncStorage.getItem("user");

    if (user) {
      navigation.replace("Home");
    } else {
      navigation.replace("Onboarding");
    }
  };

  return (
    <View style={styles.center}>
      <Text style={styles.logo}>LITTLE LEMON</Text>
      <Text>Loading...</Text>
    </View>
  );
}

/* ---------------- ONBOARDING ---------------- */

function OnboardingScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const continueApp = async () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === ""
    ) {
      Alert.alert("Error", "Please enter all details.");
      return;
    }

    const user = {
      firstName,
      lastName,
      email,
    };

    await AsyncStorage.setItem("user", JSON.stringify(user));

    navigation.replace("Home");
  };

  return (
    <ScrollView contentContainerStyle={styles.onboarding}>
      <Text style={styles.logo}>LITTLE LEMON</Text>

      <Text style={styles.title}>Welcome to Little Lemon</Text>

      <Text style={styles.subtitle}>
        Let's get to know you
      </Text>

      <Text style={styles.label}>First Name</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter first name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={styles.label}>Last Name</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter last name"
        value={lastName}
        onChangeText={setLastName}
      />

      <Text style={styles.label}>Email</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity
        style={[
          styles.button,
          (!firstName || !lastName || !email) &&
            styles.disabledButton,
        ]}
        disabled={!firstName || !lastName || !email}
        onPress={continueApp}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ---------------- HOME ---------------- */

function HomeScreen({ navigation }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredMenu = menu.filter((item) => {
    const categoryMatch =
      category === "All" || item.category === category;

    const searchMatch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredMenu}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            {/* HEADER */}

            <View style={styles.header}>
              <View>
                <Text style={styles.headerLogo}>LITTLE</Text>
                <Text style={styles.headerLogo}>LEMON</Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("Profile")}
              >
                <Text style={styles.profileIcon}>👤</Text>
              </TouchableOpacity>
            </View>

            {/* HERO */}

            <View style={styles.hero}>
              <Text style={styles.heroTitle}>
                Little Lemon
              </Text>

              <Text style={styles.heroText}>
                We are a family-owned Mediterranean restaurant
                serving fresh and delicious food.
              </Text>

              <TextInput
                style={styles.search}
                placeholder="Search menu..."
                value={search}
                onChangeText={setSearch}
              />
            </View>

            {/* MENU BREAKDOWN */}

            <Text style={styles.sectionTitle}>
              Menu Categories
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryList}
            >
              {categories.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.categoryButton,
                    category === item &&
                      styles.selectedCategory,
                  ]}
                  onPress={() => setCategory(item)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      category === item &&
                        styles.selectedCategoryText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* FOOD MENU */}

            <Text style={styles.sectionTitle}>
              Food Menu
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <View style={styles.menuInfo}>
              <Text style={styles.menuName}>
                {item.name}
              </Text>

              <Text style={styles.menuDescription}>
                {item.description}
              </Text>

              <Text style={styles.price}>
                {item.price}
              </Text>
            </View>

            <View style={styles.foodImage}>
              <Text style={styles.foodEmoji}>🍽️</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No menu items found.
          </Text>
        }
      />
    </View>
  );
}

/* ---------------- PROFILE ---------------- */

function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const savedUser = await AsyncStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  };

  const saveProfile = async () => {
    await AsyncStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    Alert.alert(
      "Profile Updated",
      "Your changes have been saved."
    );
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");

    navigation.replace("Onboarding");
  };

  return (
    <ScrollView contentContainerStyle={styles.profile}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>👤</Text>
      </View>

      <Text style={styles.profileTitle}>
        Personal Information
      </Text>

      <Text style={styles.label}>First Name</Text>

      <TextInput
        style={styles.input}
        value={user.firstName}
        onChangeText={(text) =>
          setUser({
            ...user,
            firstName: text,
          })
        }
      />

      <Text style={styles.label}>Last Name</Text>

      <TextInput
        style={styles.input}
        value={user.lastName}
        onChangeText={(text) =>
          setUser({
            ...user,
            lastName: text,
          })
        }
      />

      <Text style={styles.label}>Email</Text>

      <TextInput
        style={styles.input}
        value={user.email}
        onChangeText={(text) =>
          setUser({
            ...user,
            email: text,
          })
        }
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveProfile}
      >
        <Text style={styles.buttonText}>
          Save Changes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={logout}
      >
        <Text style={styles.logoutText}>
          Log Out
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ---------------- APP ---------------- */

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ title: "Welcome" }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Little Lemon" }}
        />

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Profile" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
