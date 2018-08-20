export default function headerClassReducer(headerClass="headerFixed", action) {
    switch (action.type) {
        case "CHANGE_HEADER_ClASS":
            return action.data;
        default:
            return headerClass
    }
}