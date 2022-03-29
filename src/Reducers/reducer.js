export function invaluateReducer(state = { invMonth: "" }, action) {
    switch (action.type) {
        case 'get_invMonth':
            console.log("invaluateReducer:: date: "+ action.invMonth)
            return {
                invMonth: action.invMonth
            }
        default:
            return {
                invMonth: ""
            };
    }
};