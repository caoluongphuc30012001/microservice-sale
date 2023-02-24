import { combineReducers } from "redux";
import userReducer from "./user";
import { categoryReducer } from "./category";
import { brandReducer } from "./brand";

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  brand: brandReducer,
});

export default rootReducer;
