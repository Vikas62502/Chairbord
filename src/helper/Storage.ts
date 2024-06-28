import AsyncStorage from '@react-native-async-storage/async-storage'

export const setCache = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.log('error in saving data', error)
  }
}

export const getCache = async (key: string, defaultValue: any = null) => {
  try {
    const data = await AsyncStorage.getItem(key)

    if (data === '"undefined"') {
      return defaultValue
    }
    if (data) {
      return JSON.parse(data)
    } else {
      return defaultValue
    }
  } catch (error) {
    console.log('error in saving data', error)
  }
}
