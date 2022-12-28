import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  error: null,
  loading: false,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    replaceTransactions(state, action) {
      state.transactions = action.payload.transactions;
    },
  },
});

const fetchDataFromServer = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhOWMzOTIxMzVjYzgyNTJjYzE3MjY4In0sImlhdCI6MTY3MjE1MDc3NH0.BC3RsNkMD0xpLhF1FcsqRvwfB56-U0mvbyq9I2eQukU`,
    },
  });

  if (!response.ok) {
    throw new Error({ message: "Couldn't fetch data" });
  }

  const data = await response.json();
  return data;
};


export const fetchTransactions = () => {
  return async (dispatch) => {
    try {
      const data = await fetchDataFromServer();
      dispatch(
        transactionActions.replaceTransactions({
          transactions: data.transactions || [],
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};


export const transactionActions = transactionSlice.actions;

export default transactionSlice.reducer;
