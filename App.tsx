import { Alert, StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { AppNavigation } from './src/Navigation';
import { ThemeModel } from './src/Models/ThemeModel';
import { StorageModel } from './src/Models/StorageModel';
import { AppContext } from './src/AppContext';
import { useCallback, useEffect, useState } from 'react';
import { changeBarColors } from 'react-native-immersive-bars';
import { enGB, registerTranslation } from 'react-native-paper-dates';
import * as SplashScreen from 'expo-splash-screen';

registerTranslation('en', enGB);
SplashScreen.preventAutoHideAsync();

export default function App() {

  const { paperTheme, appTheme, loadTheme, changeTheme } = ThemeModel();
  const [appIsReady, setAppIsReady] = useState(false);
  const { todo, completed, getData, moveToCompleted, moveToTodo,
    toggleIsStarred, createTask, insertTodo, undoLastAction } = StorageModel();

  useEffect(() => {
    async function Prepare() {
      try {
        getData(); // Get app data from storage
        loadTheme(); // Load app theme mode
        changeBarColors(paperTheme.dark, '#50000000', 'transparent');
        // await setButtonStyleAsync(paperTheme.dark ? 'light' : 'dark');
      } catch (error) {
        Alert.alert('Error', 'Failed to load data', [{ text: "Close" }])
      } finally {
        setAppIsReady(true);
      }
    }
    !appIsReady ?
      Prepare() : null;
  }, [])
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, appTheme])
  if (!appIsReady) {
    return null
  }
  return (
    <PaperProvider theme={paperTheme}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <AppContext.Provider value={{
          appTheme,
          changeTheme,
          todo,
          completed,
          moveToCompleted,
          moveToTodo,
          createTask,
          insertTodo,
          toggleIsStarred,
          undoLastAction
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
