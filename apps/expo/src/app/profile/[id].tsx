import React from "react";
import { Button, Text } from "react-native";

const Profile = ({ route, navigation }: any) => {
  const { id, otherParam } = route.params;
  return (
    <>
      <Text style={{ margin: 50 }}>Some Fancy ass Profile</Text>
      <Text>{id}</Text>
      <Text>{otherParam}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </>
  );
};

export default Profile;
