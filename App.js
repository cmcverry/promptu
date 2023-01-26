import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PromptScreen from './components/PromptList/PromptList';
import HomeScreen from './components/Home/Home';
import TopicScreen from './components/Topic/Topic';


const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: true, 
            headerStyle: {
              backgroundColor: "lightgray"
            } 
        }} />
        <Stack.Screen 
          name="Today's Prompts" 
          component={PromptScreen} 
          options={{ headerShown: true,   
            headerStyle: {
              backgroundColor: "lightgray"
            }
        }} />
        <Stack.Screen 
          name="Discuss the Prompt" 
          component={TopicScreen} 
          options={{ headerShown: true,  
            headerStyle: {
              backgroundColor: "lightgray"
            }
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;