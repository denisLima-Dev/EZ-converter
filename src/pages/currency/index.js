import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import Keyboard from "../../keyboard";
import { currencyName } from "./units";

const { height, width } = Dimensions.get("window");

class Currency extends Component {
  state = {
    value: 0,
    unitInUse: "",
    currency: {},
    loaded: false,
  };

  rates = {
    base: "USD",
    date: "2020-07-25",
    rates: {
      AUD: 1,
      BGN: 1,
      BRL: 1,
      CAD: 1,
      CHF: 1,
      CNY: 1,
      CZK: 1,
      DKK: 1,
      EUR: 1,
      GBP: 1,
      HKD: 1,
      HRK: 1,
      HUF: 1,
      IDR: 1,
      ILS: 1,
      INR: 1,
      ISK: 1,
      JPY: 1,
      KRW: 1,
      MXN: 1,
      MYR: 1,
      NOK: 1,
      NZD: 1,
      PHP: 1,
      PLN: 1,
      RON: 1,
      RUB: 1,
      SEK: 1,
      SGD: 1,
      THB: 1,
      TRY: 1,
      USD: 1,
      ZAR: 1,
    },
  };

  async componentDidMount() {
    this.rates = await this.getRates();
    await this.checkData();
    this.setState({ loaded: true });
  }

  //Read value from keyboard and update values
  updateValue = (val) => {
    if (val.toString().length > 12) {
      return;
    }

    let i = new Object();
    i["currency"] = this.Convert(val);

    //i['currency'][this.state.unitInUse] = this.prepareNumber(val)

    i["value"] = val;

    this.setState(i);
  };

  prepareNumber = (e) => {
    let val = e.toString();

    let [int, dec] = val.split(".");

    if (!int) int = "0";

    let length = int.length;

    let arr = Array.from(int);

    let output = new String();

    if (int[0] === "-") length--;

    let aux = parseInt(length / 3);

    if (length % 3 === 0) aux--;

    if (length > 3) {
      arr.length = arr.length + aux;

      let i = arr.length - 1;

      let cont = 0;

      while (i >= 0) {
        if (cont === 3 && aux > 0) {
          arr[i] = ",";
          cont = 0;
          aux--;
        } else {
          arr[i] = arr[i - aux];
          cont++;
        }
        i--;
      }
      arr.map((e) => {
        output = output + e;
      });
    } else {
      output = int;
    }
    if (dec) {
      output = output + "." + dec;
    }

    if (val[val.length - 1] === "." && !dec) {
      output = output + ".";
    }

    return output;
  };

  truncateValue = (e) => {
    let i = e.toFixed(2);
    return this.prepareNumber(i);
  };

  //Functions to convert values
  Convert = (val) => {
    let baseCurrencyValue = val / this.rates.rates[this.state.unitInUse];

    let aux = new Object();

    Object.keys(this.rates.rates).map((e) => {
      aux[e] = this.truncateValue(baseCurrencyValue * this.rates.rates[e]);
    });

    return aux;
  };

  getApi = async () => {
    let response = await axios.get(
      "https://api.exchangeratesapi.io/latest?base=USD"
    );
    console.log("consultou a api");
    return response.data;
  };

  checkData = async () => {
    let yesterday;

    if (new Date().getDay() === 0) {
      yesterday = new Date(new Date().setHours(-25));
    }
    if (new Date().getDay() === 1) {
      yesterday = new Date(new Date().setHours(-49));
    }

    yesterday = new Date(new Date().setHours(-1));

    let val = new Object();

    let [year, month, day] = this.rates.date.split("-");
    let tYear = yesterday.getFullYear();
    let tMonth = yesterday.getMonth() + 1;
    let tDay = yesterday.getDate();

    if (tYear > +year) {
      val = await this.getApi();
      this.rates = val;
      await this.storeRates(val);
      return;
    }
    if (tYear === +year && tMonth > +month) {
      val = await this.getApi();
      this.rates = val;
      await this.storeRates(val);
      return;
    }
    if (tYear === +year && tMonth === +month && tDay > +day) {
      val = await this.getApi();
      this.rates = val;
      await this.storeRates(val);
      return;
    }

    return;
  };

  storeRates = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Exchange_Rate", jsonValue);
    } catch (e) {
      // console.log(e)
      return;
    }
  };

  getRates = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Exchange_Rate");
      if (jsonValue !== null) {
        let value = JSON.parse(jsonValue);
        return value;
      } else {
        return this.rates;
      }
    } catch (e) {
      // console.log(e)
      return;
    }
  };

  removeRates = async () => {
    try {
      await AsyncStorage.removeItem("@storage_Exchange_Rate");
    } catch (e) {
      // console.log(e)
      return;
    }
  };

  //Keyboard Animation
  translateY = new Animated.Value(0);

  openKeyboard = () => {
    Animated.timing(this.translateY, {
      toValue: 235,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  closeKeyboard = () => {
    this.setState({ unitInUse: "" });
    Animated.timing(this.translateY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let closed = false;

      let value = 0;

      const { translationY } = event.nativeEvent;

      if (translationY >= 80) {
        this.setState({ unitInUse: "" });

        closed = true;
      }

      Animated.timing(this.translateY, {
        toValue: closed ? 0 : 235,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        value = closed ? 0 : 235;
        this.translateY.setOffset(0);
        this.translateY.setValue(value);
      });
    }
  };

  render() {
    return (
      <View style={{ height: "100%", width: "100%", backgroundColor: "#fff" }}>
        <View style={{ height: "100%" }}>
          <Animated.View
            style={{
              height: this.translateY.interpolate({
                inputRange: [0, 235],
                outputRange: [height - 90 - 80, height - 90 - 215 - 80],
                extrapolate: "clamp",
              }),
            }}
          >
            <View style={{ alignItems: "center" }}>
              {this.state.loaded === true ? (
                <Text style={styles.smallText}>
                  Last updated on: {this.rates.date}
                </Text>
              ) : (
                <Text style={styles.smallText}>Faile to load rates</Text>
              )}
            </View>
            <ScrollView
              style={styles.wrapper}
              showsVerticalScrollIndicator={false}
            >
              {Object.keys(currencyName).map((e) => (
                <TouchableWithoutFeedback
                  key={e}
                  onPress={() => {
                    this.setState({ value: 0, unitInUse: e });
                    this.openKeyboard();
                  }}
                >
                  <View
                    style={[
                      styles.container,
                      this.state.unitInUse === e
                        ? { backgroundColor: "rgba(164, 193, 247,0.4)" }
                        : { backgroundColor: "rgba(0,0,0,0)" },
                    ]}
                  >
                    <View style={styles.textContainer}>
                      <View style={{ width: "100%" }}>
                        <Text style={styles.bigText}>{e}</Text>
                      </View>
                      <View style={{ width: "100%" }}>
                        <Text style={styles.smallText}>{currencyName[e]}</Text>
                      </View>
                    </View>
                    <View style={styles.content}>
                      <Text style={{ textAlign: "right", fontSize: 20 }}>
                        {this.state.currency[e] || 0}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              ))}

              <TouchableWithoutFeedback onPress={() => this.checkData()}>
                <View style={styles.container}>
                  <View style={styles.textContainer}>
                    <View style={{ width: "100%" }}>
                      <Text style={styles.bigText}>Check</Text>
                    </View>
                    <View style={{ width: "100%" }}>
                      <Text style={styles.smallText}>Date</Text>
                    </View>
                  </View>
                  <View style={styles.content}>
                    <Text style={{ textAlign: "right", fontSize: 20 }}>
                      Check Date
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => this.storeRates(this.rates)}
              >
                <View style={styles.container}>
                  <View style={styles.textContainer}>
                    <View style={{ width: "100%" }}>
                      <Text style={styles.bigText}>Save</Text>
                    </View>
                    <View style={{ width: "100%" }}>
                      <Text style={styles.smallText}>Async</Text>
                    </View>
                  </View>
                  <View style={styles.content}>
                    <Text style={{ textAlign: "right", fontSize: 20 }}>
                      Save Async
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => this.getRates()}>
                <View style={styles.container}>
                  <View style={styles.textContainer}>
                    <View style={{ width: "100%" }}>
                      <Text style={styles.bigText}>Get</Text>
                    </View>
                    <View style={{ width: "100%" }}>
                      <Text style={styles.smallText}>Async</Text>
                    </View>
                  </View>
                  <View style={styles.content}>
                    <Text style={{ textAlign: "right", fontSize: 20 }}>
                      Get Async
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => this.removeRates()}>
                <View style={styles.container}>
                  <View style={styles.textContainer}>
                    <View style={{ width: "100%" }}>
                      <Text style={styles.bigText}>Remove</Text>
                    </View>
                    <View style={{ width: "100%" }}>
                      <Text style={styles.smallText}>Async</Text>
                    </View>
                  </View>
                  <View style={styles.content}>
                    <Text style={{ textAlign: "right", fontSize: 20 }}>
                      Remove Async
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => console.log(this.rates)}>
                <View style={styles.container}>
                  <View style={styles.textContainer}>
                    <View style={{ width: "100%" }}>
                      <Text style={styles.bigText}>Ver</Text>
                    </View>
                    <View style={{ width: "100%" }}>
                      <Text style={styles.smallText}>Taxas</Text>
                    </View>
                  </View>
                  <View style={styles.content}>
                    <Text style={{ textAlign: "right", fontSize: 20 }}>
                      Ver Taxas
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </Animated.View>
          <PanGestureHandler
            onGestureEvent={(e) =>
              this.translateY.setValue(235 - e.nativeEvent.translationY)
            }
            onHandlerStateChange={this.onHandlerStateChange}
          >
            <Animated.View
              style={[
                styles.animView,
                {
                  transform: [
                    {
                      translateY: this.translateY.interpolate({
                        inputRange: [0, 235, 450],
                        outputRange: [0, -235, -250],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                },
              ]}
            >
              <View>
                <Keyboard
                  updateValue={this.updateValue}
                  value={this.state.value}
                  close={this.closeKeyboard}
                />
              </View>
            </Animated.View>
          </PanGestureHandler>

          <View style={styles.ad}>
            <Text>Propaganda</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
  },

  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 5,
    borderBottomWidth: 1,
    borderColor: "rgba(211, 211, 211, 0.4)",
    borderRadius: 5,
    borderRightWidth: 1,
    paddingVertical: 5,
  },

  textContainer: {
    width: "30%",
  },

  content: {
    width: "70%",
    padding: 6,
  },

  bigText: {
    fontSize: 20,
    paddingLeft: 2,
  },

  smallText: {
    fontSize: 11,
    color: "rgba(190,190,190, 1)",
    paddingLeft: 2,
  },

  ad: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 80,
    backgroundColor: "rgba(207, 207, 207, 1)",
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 10,
  },

  animView: {
    position: "absolute",
    bottom: -235 + 80,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    zIndex: 5,
  },
});

export default Currency;
