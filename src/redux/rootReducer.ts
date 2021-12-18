import { combineReducers } from "redux";
import columns from "./reducer/columns";
import rows from "./reducer/rows";
import filters from "./reducer/filters";
import measures from "./reducer/measures";

export default combineReducers({
    columns,
    rows,
    filters,
    measures
});

