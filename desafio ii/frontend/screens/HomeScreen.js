import React, { useEffect, useState } from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { FAB, Card, Title, Paragraph } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles";
import axios from "axios";

const API_URL = "http://192.168.15.149:3000";

export default function HomeScreen() {
  const [outfits, setOutfits] = useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/outfits`);
      const data = await res.data;
      setOutfits(data);
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={outfits}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.store}</Title>
              <Paragraph>{item.description}</Paragraph>
            </Card.Content>
            {item.photo && (
              <Card.Cover
                source={{ uri: `${API_URL}/${item.photo}` }}
                style={styles.image}
              />
            )}
          </Card>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("Add Outfit")}
      />
      <FAB
        icon="map"
        style={styles.mapButton}
        onPress={() => navigation.navigate("Mapa")}
      />
    </View>
  );
}
