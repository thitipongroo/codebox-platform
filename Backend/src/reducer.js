
function codeBoxReducer(state = {firstName: '', lastName: '', status: '', typeId: '', packageId: '', customer: [], customerDetail: {}}, action) {
    switch (action.type) {
        case 'keyInput':
            return { ...state, [action.name]: action.val }
        case 'updateUser':
            return { ...state, userAuth: { ...action.val } }
        case 'customerList':
            return { ...state, customer: [ ...action.val ] }
        case 'customerDetail':
            return { ...state, customerDetail: { ...action.val } }
        case 'removeList':
            return { ...state, customer: [] }
        case 'resetProp':
            return { ...state, firstName: '', lastName: '',  status: '', typeId: '', packageId: '' }
        default:
            return state
    }
}

export default codeBoxReducer