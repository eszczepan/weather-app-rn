import { StatusBar } from "expo-status-bar";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { fetchWeather } from "../store/actions";
import { IAppState } from "../store";
import SearchForm from "./components/molecules/SearchForm/SearchForm";
import Weather from "./components/molecules/Weather/Weather";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const App: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { data, error } = useSelector((state: IAppState) => state.weather);

  useEffect(() => {
    setIsLoading(true);
    // dispatch(fetchWeather("Cracow"));
    setIsLoading(false);
  }, [dispatch]);

  const handleSearchSubmit = () => {
    if (searchValue === "") {
      return Alert.alert(
        "You have entered an invalid value.",
        "City name is required. Please try again.",
        [{ text: "Got it" }]
      );
    } else {
      setIsLoading(true);
      dispatch(fetchWeather(searchValue.trim()));
      setSearchValue("");
      Keyboard.dismiss();
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <SearchForm
          searchValue={searchValue}
          onSetSearchValue={setSearchValue}
          onSubmit={handleSearchSubmit}
        />
        <Weather loading={isLoading} weather={data} error={error} />
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    paddingHorizontal: 20,
  },
});

export default App;
