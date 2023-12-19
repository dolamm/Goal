import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { Login, Register } from '@api/userAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const USER_DATA = 'user';

export const storeData = async (key, value) => {
    try{
        const jsonValue = JSON.stringify(value);
        console.log(10, jsonValue);
        await AsyncStorage.setItem(key, jsonValue);
    }
    catch(e){
        console.log(e);
    }
}

export const getData = async (key) => {
    try{
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    }
    catch(e){
        console.log(e);
    }

}

export const UserLogin = createAsyncThunk(
    'user/login',
    async (data, thunkAPI) => {
        const auth = await getData(USER_DATA).then((res) => res);
        console.log("33", auth);
        if(auth != null){
            return auth;
        }
        const result = await Login(data.username, data.password).then((res) => res);
        await storeData(USER_DATA, result.data);
        return result;
    }
)

export const UserRegister = createAsyncThunk(
    'user/register',
    async (data, thunkAPI) => {
        const result = await Register(data).then((res) => res);
        return result;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
        message: '',
    },
    reducer: {
        Logout: (state) => {
            state.user = null;
            storeData(USER_DATA, null);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(UserLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(UserLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(UserLogin.rejected, (state, action) => {
                state.error = action.error.message;
                state.message = action.error.message;
                state.loading = false;
            })
            .addCase(UserRegister.pending, (state) => {
                state.loading = true;
            })
            .addCase(UserRegister.fulfilled, (state, action) => {
                state.message = action.payload.message;
            })
            .addCase(UserRegister.rejected, (state, action) => {
                state.message = action.error.message;
                state.loading = false;
            })
    },
})

export const {Logout} = userSlice.actions;
export default userSlice.reducer;