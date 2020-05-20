import React, { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import axios from "axios";

function TestScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [shelves, setShelves] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "http://192.168.219.100:3000/api/shelf",
    }).then(function (response) {
      setShelves(response.data);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Choose Shelf" onPress={toggleModal} />
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.1}
        onBackdropPress={toggleModal}
      >
        <View style={styles.modal}>
          {shelves ? (
            shelves.map((c, i) => {
              return (
                <Button
                  color="#2c3e50"
                  key={i}
                  title={c.shelf_name}
                  id={c.shelf_num}
                  onPress={toggleModal}
                />
              );
            })
          ) : (
            <View></View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
  },
  button: {},
});

export default TestScreen;
