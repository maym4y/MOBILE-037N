import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.15.149:3000';

export default function MapScreen() {
  const [outfits, setOutfits] = useState([]);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API_URL}/outfits`);
      const data = await res.data;
      setOutfits(data);

      if (data.length > 0) {
        const avgLat =
          data.reduce((sum, p) => sum + Number(p.latitude), 0) / data.length;
        const avgLng =
          data.reduce((sum, p) => sum + Number(p.longitude), 0) / data.length;

        setRegion({
          latitude: avgLat,
          longitude: avgLng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
    };

    fetchData();
  }, []);

  if (!region) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} initialRegion={region}>
        {outfits.map((p) => (
          <Marker
            key={p._id}
            coordinate={{
              latitude: Number(p.latitude),
              longitude: Number(p.longitude),
            }}
            title={p.name}
            description={p.description}
            pinColor="pink"
          />
        ))}
      </MapView>
    </View>
  );
}
