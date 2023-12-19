import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Logout} from '@redux/reducer/userSlice';
import {useDispatch} from 'react-redux';
import {useAuth} from '@context/auth';
export default function Profile() {
    const dispatch = useDispatch();
    const {auth, setAuth} = useAuth();
    const handleLogout = async () => {
        dispatch(Logout());
        setAuth(null);
    }
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.setting}>
                <Icon name="cog" size={25} color="#900" />
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.logout}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});