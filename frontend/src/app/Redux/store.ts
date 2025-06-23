import { configureStore } from "@reduxjs/toolkit";
import challengeReducer from '@slice/challengeSlice'
import paymentReducer from '@slice/paymenSlice'
import planReducer from '@slice/planSlice'
import pqrReducer from '@slice/pqrSlice'
import rankingReducer from '@slice/rankingSlice'
import roleReducer from '@slice/roleSlice'
import taskReducer from '@slice/taskSlice'
import userReducer from '@slice/userSlice'
import voucherReducer from '@slice/voucherSlice'

export const store = configureStore({
    reducer: {
        challenge: challengeReducer,
        payment: paymentReducer,
        plan: planReducer,
        pqr: pqrReducer,
        ranking: rankingReducer,
        role: roleReducer,
        task: taskReducer,
        user: userReducer,
        voucher: voucherReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;