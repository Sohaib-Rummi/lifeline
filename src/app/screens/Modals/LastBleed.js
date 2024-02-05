import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../constants/Style';
import Title from './components/Title';
import Button from './components/Button';
import { colors } from '../../constants/Colors';
import Iconic from '../../components/ui/Icons/Icons';
import { Calendar } from 'react-native-calendars';
import { getFormatedDate, getTodayDate } from '../../utils/Functions';
import { AuthContext } from '../../api/AuthContentApi'

const LastBleed = ({ navigation }) => {
    const {
        updateProfile,
        error,
        message,
        setMessage,
        setError,
        user
    } = useContext(AuthContext);
    const [calendarToggle, setCalendarToggle] = useState(false);
    const [selectedDate, setSelectedDate] = useState(getTodayDate());
    const [formatedDate, setFormatedDate] = useState(getFormatedDate(new Date(), "WWW MMM DD YYYY"));
    const getMarkedDates = () => {
        const markedDates = {};
        markedDates[selectedDate] = { selected: true };
        return markedDates;
    };

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage(null);
                navigation.goBack();
            }, 3000)
        }

    }, [message]);

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null);
            }, 5000)
        }
    }, [error]);

    return (
        <View style={[globalStyles.wrapper, { paddingHorizontal: 20 }]}>
            <Title title="Your Last Donation Date" />
            {
                message && <View style={[globalStyles.errorContainer, { backgroundColor: '#b2f6a2' }]}>
                    <Text style={[globalStyles.error, { color: '#31ba12' }]}>{message}</Text>
                </View>
            }
            {
                error && <View style={globalStyles.errorContainer}>
                    <Text style={globalStyles.error}>{error}</Text>
                </View>
            }
            <View style={styles.datContaienr} >
                <Text style={styles.date}>{user.lastbleed ? getFormatedDate(new Date(user.lastbleed), "WWW MMM DD YYYY") : formatedDate}</Text>
                <TouchableOpacity>
                    <Iconic
                        name="calendar" size={24}
                        color={colors.red}
                        onPress={() => {
                            setCalendarToggle(!calendarToggle);
                        }}
                    />
                </TouchableOpacity>
            </View>
            {
                calendarToggle && <Calendar
                    maxDate={getTodayDate()}
                    enableSwipeMonths={true}
                    markedDates={getMarkedDates()}
                    onDayPress={day => {
                        setSelectedDate(day.dateString);
                        setFormatedDate(getFormatedDate(new Date(day.dateString), "WWW MMM DD YYYY"));
                        setCalendarToggle(false);
                    }}
                    theme={styles.calendar}
                    style={styles.calendarContainer}
                />

            }
            <Button onPress={() => updateProfile('Last Donation', 'lastbleed', selectedDate)} />
        </View>
    )
}

const styles = StyleSheet.create({
    datContaienr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: colors.white,
        elevation: 3,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    date: {
        color: colors.grey_200,
        fontSize: 16,
        fontFamily: 'Roboto-Light'

    },
    calendarContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginVertical: 10,
        elevation: 3,
    },
    calendar: {
        calendarBackground: colors.white,
        selectedDayBackgroundColor: colors.red,
        selectedDayTextColor: colors.white,
        dayTextColor: colors.grey_200,
        textDisabledColor: colors.grey,
        monthTextColor: colors.black,
        textMonthFontWeight: 'bold',
        arrowColor: colors.red,
    }
})

export default LastBleed

