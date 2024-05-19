import { Alert, StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { AppNavigation } from './src/Navigation';
import { ThemeModel } from './src/Models/ThemeModel';
import { StorageModel } from './src/Models/StorageModel';
import { AppContext } from './src/AppContext';
import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const paperTheme = ThemeModel();
  const [appIsReady, setAppIsReady] = useState(false);
  const { todo, completed, getData, moveToCompleted, moveToTodo, createTask, insertTodo } = StorageModel();

  useEffect(() => {
    async function Prepare() {
      try {
        getData();
      } catch (error) {
        Alert.alert('Error', 'Failed to load data', [{ text: "Close" }])
      } finally {
        setAppIsReady(true);
      }
    }
    Prepare();
  }, [])
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady])
  if (!appIsReady) {
    return null
  }
  return (
    <PaperProvider theme={paperTheme}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <AppContext.Provider value={{
          todo,
          completed,
          moveToCompleted,
          moveToTodo,
          createTask,
          insertTodo,
        }}>
          <AppNavigation />
        </AppContext.Provider>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
