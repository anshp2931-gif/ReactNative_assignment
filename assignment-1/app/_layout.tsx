import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Dashboard" onPress={() => router.push('/dashboard')} />
      <DrawerItem label="Survey" onPress={() => router.push('/survey')} />
      <DrawerItem label="Camera" onPress={() => router.push('/camera')} />
      <DrawerItem label="Contacts" onPress={() => router.push('/contact')} />
      <DrawerItem label="Location" onPress={() => router.push('/location')} />
      <DrawerItem label="Clipboard" onPress={() => router.push('/clipboard')} />
      <DrawerItem label="Settings" onPress={() => router.push('/settings')} />
    </DrawerContentScrollView>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="(tabs)" options={{ headerShown: false }} />
        <Drawer.Screen name="camera" options={{ title: 'Camera' }} />
        <Drawer.Screen name="contact" options={{ title: 'Contacts' }} />
        <Drawer.Screen name="location" options={{ title: 'Location' }} />
        <Drawer.Screen name="clipboard" options={{ title: 'Clipboard' }} />
        <Drawer.Screen name="settings" options={{ title: 'Settings' }} />
        <Drawer.Screen name="surveyPreview" options={{ title: 'Survey Preview' }} />
        <Drawer.Screen name="modal" options={{ title: 'Modal' }} />
      </Drawer>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
