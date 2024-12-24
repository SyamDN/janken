import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Button from "../components/button";
import { useEffect, useState, React, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Home({}) {
  const [player, setPlayer] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem("token");
  //       if (value != null) {
  //         const res = await axios.get(
  //           "https://janken-api-fix.vercel.app/api/profile",
  //           {
  //             headers: {
  //               Authorization: `Bearer ${value}`,
  //             },
  //           }
  //         );
  //         const user = res.data.data;
  //         setUser(user);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   getData();
  // }, [refreshing]);

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const res = await axios.get(
          "https://janken-api-fix.vercel.app/api/users"
        );
        const player = res.data.data;
        setPlayer(player);
      } catch (e) {
        console.log(e);
      }
    };
    getTransaction();
  }, []);

  const currentUser = { username: "YourAccount", score: 80 }; // Contoh user saat ini

  const getRankIcon = (rank) => {
    if (rank === 1) return require("../assets/rank1.png");
    if (rank === 2) return require("../assets/rank2.png");
    if (rank === 3) return require("../assets/rank3.png");
    return require("../assets/rank4.png");
  };

  const navigation = useNavigation(); // Access navigation

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Hi , {currentUser.username}</Text>
          <View>
            <Text style={styles.scoreText}>
              Highscore : {currentUser.score}
            </Text>
          </View>
        </View>

        <Image
          source={require("../assets/janken_logo-white.png")}
          style={styles.logo}
        />
      </View>

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
          {/* {dummyData.slice(0, 10).map((item, index) => ( */}
          {player.slice(0, 10).map((players, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.rankCell}>
                <Image
                  source={getRankIcon(index + 1)}
                  style={styles.rankIcon}
                />
                <Text style={styles.rankText}>{index + 1}</Text>
              </View>
              <Text style={styles.tableCell}>{players.username}</Text>
              <Text style={styles.tableCell}>{players.win_streak}</Text>
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
          onPress={() => navigation.navigate("userPick")}
        />
        <Button
          text="Quit"
          textColor="#CB1B45"
          bgColor="#F5F5F5"
          onPress={() => navigation.navigate("login")}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    top: 0,
    position: "absolute",
  },
  scoreContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: 15, // Add margin to separate from logo
  },
  scoreText: {
    alignSelf: "align-start",
    color: "#FFF",
    fontSize: 13,
  },

  logo: {
    width: 100, // Adjust logo width
    height: 100, // Adjust logo height
    justifyContent: "flex-end",
    resizeMode: "contain",
  },
  leaderboardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 35,
    padding: 10,
    width: "90%",
    alignItems: "center",
    marginTop: 80,
    marginBottom: 1,
    borderWidth: 5,
    borderColor: "#FFD700", // Gold border
  },
  leaderboardTitle: {
    fontSize: 30,
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
    paddingVertical: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  rankCell: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  rankIcon: {
    width: 30,
    height: 30,
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
