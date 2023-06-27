import { Image, TouchableOpacity } from "react-native";
import { withLayoutContext } from "expo-router";
import {
  // Import the types
  DrawerNavigationOptions,
  // Import the creation function
  createDrawerNavigator,
} from "@react-navigation/drawer";

const { Navigator } = createDrawerNavigator();

// This can be used like `<Drawer />`
export const Drawer = withLayoutContext<
  DrawerNavigationOptions,
  typeof Navigator
>(Navigator);

export default function MyDrawer() {
  return (
    <>
      <Drawer
        screenOptions={({ navigation }) => ({
          // headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                style={{ width: 40, height: 40, marginLeft: 10 }}
                source={require("~/components/../../assets/logo.jpeg")}
              />
            </TouchableOpacity>
          ),
        })}
        initialRouteName="index"
      >
        <Drawer.Screen name="index" options={{ drawerLabel: "Index" }} />
        <Drawer.Screen
          name="profile/index"
          options={{ drawerLabel: "Profile" }}
        />

        <Drawer.Screen
          name="learningHub/index"
          options={{ drawerLabel: "Learning Hub" }}
        />
        <Drawer.Screen
          name="communities/index"
          options={{
            drawerLabel: "Communities",
          }}
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
          name="learningHub/[id]"
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
    </>
  );
}
