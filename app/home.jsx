import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Button from "../components/button";

export default function Home() {
  const dummyData = [
    { username: "IsnaB3ll4", score: 999 },
    { username: "R3drum", score: 850 },
    { username: "Flame0n", score: 780 },
    { username: "Ghostly", score: 750 },
    { username: "AceHigh", score: 730 },
    { username: "SkyWalker", score: 700 },
    { username: "Shadow", score: 650 },
    { username: "Phoenix", score: 600 },
    { username: "Dreamer", score: 550 },
    { username: "p4rhanz", score: 500 },
  ];

  const getRankIcon = (rank) => {
    if (rank === 1) return require("../assets/rank1.png"); // Yellow circle for rank 1
    if (rank === 2) return require("../assets/rank2.png"); // Blue circle for rank 2
    if (rank === 3) return require("../assets/rank3.png"); // Red circle for rank 3
    return require("../assets/rank4.png"); // Black circle for ranks 4 and above
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/janken_logo-white.png")}
        style={styles.logo}
      />

      {/* Leaderboard Section */}
      <View style={styles.leaderboardContainer}>
        <Text style={styles.leaderboardTitle}>Leaderboard</Text>
        <Text style={styles.leaderboardSubtitle}>Winstreak</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Rank</Text>
          <Text style={styles.tableHeaderText}>Username</Text>
          <Text style={styles.tableHeaderText}>Score</Text>
        </View>
        <ScrollView style={styles.tableContent}>
          {dummyData.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.rankCell}>
                <Image
                  source={getRankIcon(index + 1)}
                  style={styles.rankIcon}
                />
                <Text style={styles.rankText}>{index + 1}</Text>
              </View>
              <Text style={styles.tableCell}>{item.username}</Text>
              <Text style={styles.tableCell}>{item.score}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          text="Play Game"
          textColor="#CB1B45"
          bgColor="#F5F5F5"
          onPress={() => {}}
        />
        <Button
          text="Quit"
          textColor="#CB1B45"
          bgColor="#F5F5F5"
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CB1B45",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 158,
    height: 76,
    resizeMode: "contain",
    marginBottom: 20,
  },
  leaderboardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 35,
    padding: 15,
    width: "90%",
    alignItems: "center",
    marginBottom: 1,
    borderWidth: 2,
    borderColor: "#FFD700", // Gold border
  },
  leaderboardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  leaderboardSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 5,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  tableContent: {
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  rankCell: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    position: "relative",
    marginBottom: 9,
  },
  rankIcon: {
    width: 25,
    height: 25,
    alignItems: "center",
    position: "absolute",
  },
  rankText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "bold",
    zIndex: 1,
  },
  tableCell: {
    fontSize: 14,
    flex: 1,
    textAlign: "center",
    color: "#000000",
  },
  ellipsis: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 5,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
});
