import { Image, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Entypo";
import { withLayoutContext } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import {
  DrawerContentScrollView,
  DrawerItemList,
  // Import the types
  DrawerNavigationOptions,
  // Import the creation function
  createDrawerNavigator,
} from "@react-navigation/drawer";

import { api } from "~/utils/api";
import P from "~/components/DesignSys/Text";

const { Navigator } = createDrawerNavigator();

// This can be used like `<Drawer />`
export const Drawer = withLayoutContext<
  DrawerNavigationOptions,
  typeof Navigator
>(Navigator);

function CustomDrawer(props: any) {
  const { user } = useUser();
  const { data } = api.users.profile.useQuery({
    email: user?.primaryEmailAddress?.emailAddress as string,
  });
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1 }} className="bg-[#f2f2f2] ">
      <DrawerContentScrollView {...props}>
        <View className="mb-10 mt-5 pl-5">
          <Image
            source={{
              uri: "https://st3.depositphotos.com/4111759/13425/v/450/depositphotos_134255532-stock-illustration-profile-placeholder-male-default-profile.jpg",
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
          <View>
            <P style="pt-2 text-base" textType="medium">
              {data?.username}
            </P>
            <P style="text-sm">
              {user?.primaryEmailAddress?.emailAddress as string}
            </P>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        className="absolute bottom-[50] left-0 right-0 flex h-[60px] flex-row items-center space-x-3 bg-red-100 pl-3"
        onPress={() => signOut()}
      >
        <P style="text-red-500 text-base " textType="medium">
          Log Out
        </P>
        <Icon name="log-out" size={15} color="#1a1a1a" />
      </TouchableOpacity>
    </View>
  );
}

export default function MyDrawer() {
  return (
    <>
      <Drawer
        screenOptions={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                style={{ width: 40, height: 40, marginLeft: 10 }}
                source={require("~/components/../../assets/logo.jpeg")}
              />
            </TouchableOpacity>
          ),
        })}
        drawerContent={(props) => <CustomDrawer {...props} />}
        initialRouteName="index"
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            drawerIcon() {
              return <AntDesign name="home" size={24} color="black" />;
            },
          }}
        />
        <Drawer.Screen
          name="profile/index"
          options={{
            drawerLabel: "Profile",
            drawerIcon() {
              return <AntDesign name="user" size={24} color="black" />;
            },
          }}
        />

        <Drawer.Screen
          name="learningHub/index"
          options={{
            drawerLabel: "Learning Hub",
            drawerIcon() {
              return <AntDesign name="book" size={24} color="black" />;
            },
          }}
        />
        <Drawer.Screen
          name="communities/index"
          options={{
            drawerLabel: "Communities",
            drawerIcon() {
              return <AntDesign name="team" size={24} color="black" />;
            },
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
