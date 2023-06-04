import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import Index from "~/app/resources";
import Profile from "./profile";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Community" component={Index} />
    </Drawer.Navigator>
  );
}

export default function SideBar() {
  const router = useRouter();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          router.push(`/profile`);
        }}
      >
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60.jpg",
          }}
          className="absolute right-5 top-5 h-10 w-10 rounded-full"
        />
      </TouchableOpacity>

      {/* <MyDrawer /> */}
    </View>
  );
}
