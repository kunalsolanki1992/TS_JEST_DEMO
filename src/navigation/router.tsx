import React, { FC } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native';

// screens
import { HomeScreen } from "../screens/HomeScreen";
import { ShopScreen } from "../screens/ShopScreen";
import { LoveItListScreen } from "../screens/LoveItListScreen";
import { MyBagScreen } from "../screens/MyBagScreen";
import { MyAccountScreen } from "../screens/MyAccountScreen";

// constants
import Colors from '../constants/colors';
import { FONT_SIZE } from '../constants/fonts';

const Tab = createBottomTabNavigator();

const Router: FC = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: { backgroundColor: Colors.btm_tab_bar_bg }
                }}
            >
                <Tab.Screen
                    options={{
                        // headerShown: false,
                        tabBarLabel: ({ focused }) => <Text style={{ color: !focused ? Colors.btm_tab_bar_blue : Colors.btm_tab_bar_pink, fontSize: FONT_SIZE._10 }}>Home</Text>,
                        tabBarIcon: ({ focused }) => <Ionicons name={'home'} size={FONT_SIZE._24} style={{ color: !focused ? Colors.btm_tab_bar_blue : Colors.btm_tab_bar_pink }} />,
                    }}
                    name="Home"
                    component={HomeScreen}
                />

                <Tab.Screen
                    options={{
                        tabBarLabel: ({ focused }) => <Text style={{ color: !focused ? Colors.btm_tab_bar_blue : Colors.btm_tab_bar_pink, fontSize: FONT_SIZE._10 }}>Shop</Text>,
                        tabBarIcon: ({ focused }) => <Ionicons name={'grid'} size={FONT_SIZE._24} style={{ color: !focused ? Colors.btm_tab_bar_blue : Colors.btm_tab_bar_pink }} />
                    }}
                    name="Shop"
                    component={ShopScreen}
                />

                <Tab.Screen
                    options={{
                        tabBarLabel: ({ focused }) => <Text style={{ color: !focused ? Colors.btm_tab_bar_blue : Colors.btm_tab_bar_pink, fontSize: FONT_SIZE._10 }}>Love-it List</Text>,
                        tabBarIcon: ({ focused }) => <Ionicons name={'heart-sharp'} size={FONT_SIZE._24} style={{ color: !focused ? Colors.btm_tab_bar_blue : Colors.btm_tab_bar_pink }} />
                    }}
                    name="LoveItList"
                    component={LoveItListScreen}
                />

                <Tab.Screen
                    options={{
                        tabBarLabel: ({ focused }) => <Text style={{ color: !focused ? Colors.btm_tab_bar_blue : Colors.btm_tab_bar_pink, fontSize: FONT_SIZE._10 }}>My Bag</Text>,
                        tabBarIcon: ({ focused }) => <Ionicons name={'cart'} size={FONT_SIZE._24} style={{ color: !focused ? Colors.btm_tab_bar_blue : Colors.btm_tab_bar_pink }} />
                    }}
                    name="MyBag"
                    component={MyBagScreen}
                />

                <Tab.Screen
                    options={{
                        tabBarLabel: ({ focused }) => <Text style={{ color: !focused ? Colors.btm_tab_bar_blue : Colors.btm_tab_bar_pink, fontSize: FONT_SIZE._10 }}>My Account</Text>,
                        tabBarIcon: ({ focused }) => <Ionicons name={'person-circle'} size={FONT_SIZE._24} style={{ color: !focused ? Colors.btm_tab_bar_blue : Colors.btm_tab_bar_pink }} />
                    }}
                    name="MyAccount"
                    component={MyAccountScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Router;