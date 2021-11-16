import React, {useContext, useState} from 'react';
import moment from "moment";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import Calendar from "react-native-calendar-range-picker";
import DateContext from '../context/dateContext';

const DateScreen = ({navigation, route}) => {
    const where = route.params.where
    const { selectedRange, setRange } = useContext(DateContext)

    return ( 
        <View style={{ flex: 1 }}>
        <Calendar
            startDate={selectedRange ? selectedRange.firstDate : "2021-07-07"}
            endDate={selectedRange ? selectedRange.secondDate : "2021-07-17"}
            onChange={({ startDate, endDate }) => {
                setRange({firstDate: startDate, secondDate: endDate});
                if(endDate) navigation.navigate(where)
            }}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      margin: 50,
    },
    selectedDateContainerStyle: {
        height: 35,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue",
    },
    selectedDateStyle: {
        fontWeight: "bold",
        color: "white",
    },
});

export default DateScreen;