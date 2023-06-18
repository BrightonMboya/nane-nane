import { Image, TouchableOpacity } from "react-native";
// import { Stack, useRouter, withLayoutContext } from "expo-router";
// import {
//   // Import the types
//   DrawerNavigationOptions,
//   // Import the creation function
//   createDrawerNavigator,
// } from "@react-navigation/drawer";

// import { Drawer } from "expo-router/drawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import Index from "~/app/resources";
import Profile from "./profile";

// const { Navigator } = createDrawerNavigator();

// // This can be used like `<Drawer />`
// export const Drawer = withLayoutContext<
//   DrawerNavigationOptions,
//   typeof Navigator
// >(Navigator);

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

// function MyDrawer() {
//   return (
//     <Drawer screenOptions={({ navigation }) => ({})}>
//       <Drawer.Screen
//         name="profile/index"
//         options={{ drawerLabel: "Profile" }}
//       />
//       {/* <Drawer.Screen name="Community" options={{ drawerLabel: "Index" }} /> */}
//     </Drawer>
//   );
// }

const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default function SideBar() {
  return <MyDrawer />;
}
