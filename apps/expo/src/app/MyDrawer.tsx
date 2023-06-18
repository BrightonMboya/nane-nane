import { Image, TouchableOpacity } from "react-native";
import { withLayoutContext } from "expo-router";
import {
  // Import the types
  DrawerNavigationOptions,
  // Import the creation function
  createDrawerNavigator,
} from "@react-navigation/drawer";

import P from "~/components/DesignSys/Text";

const { Navigator } = createDrawerNavigator();

// This can be used like `<Drawer />`
export const Drawer = withLayoutContext<
  DrawerNavigationOptions,
  typeof Navigator
>(Navigator);

// export const Drawer = Navigator()
function ProfileIcon() {
  return (
    <TouchableOpacity>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60.jpg",
        }}
        className="absolute right-5 top-5 h-10 w-10 rounded-full"
      />
    </TouchableOpacity>
  );
}

export default function MyDrawer() {
  return (
    <Drawer
      screenOptions={({ navigation }) => ({
        drawerIcon: () => <ProfileIcon />,
      })}
      initialRouteName="index"
    >
      <Drawer.Screen name="index" options={{ drawerLabel: "Index" }} />
      <Drawer.Screen
        name="profile/index"
        options={{ drawerLabel: "Profile" }}
      />

      <Drawer.Screen
        name="oldIndex"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name="events/index"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name="MyDrawer"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name="profile/edit"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name="post/add"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />

      <Drawer.Screen
        name="resources/index"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name="resources/addJob"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name="communities/[id]"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name="communities/index"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />

      <Drawer.Screen
        name="post/[id]"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name="events/[id]"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name="profile/[id]"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name="resources/[id]"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
    </Drawer>
  );
}
