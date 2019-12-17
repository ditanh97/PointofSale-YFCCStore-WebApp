const initialState = {
    isLoading: false,
    isRejected: false,
    totalPrice: 0,
    transactionDetail: [],
    productInCart: [
        // id: '',
        // name: '',
        // uri: '',
        // price: '',
        // subTotal: '',
        // productQty: '',
    ]
}

const transaction = (state= initialState, action)=>{
    switch (action.type) {
        case 'CHECKOUT_SELL_PENDING':
            return {
              ...state,
              isLoading: true,
              isRejected: false,
            };
        case 'CHECKOUT_SELL_REJECTED':
            return {
              ...state,
              isLoading: false,
              isRejected: true,
            };
        case 'CHECKOUT_SELL_FULLFILLED':
            return {
              ...state,
              isLoading: false,
              isRejected: false,
              totalPrice: 0,
              transactionDetail: []
            };
        case 'REMOVE_FROM_CART':
            const afterCartRemove = state.productInCart.filter(p => p.id !== action.id)
            return {
                ...state,
                productInCart: afterCartRemove
            }
        case 'ADD_TO_CART':
            const afterCartAdd = []
            const existingList = state.productInCart.filter(p => p.id === action.product.id )
            if (existingList.length > 0) {
                const withoutExistingList = state.productInCart.filter(p => p.id !== action.product.id)
                const updatedQtyofList = {
                    ...existingList[0],
                    productQty: existingList[0].productQty + action.product.productQty  
                }
                afterCartAdd = [...withoutExistingList, updatedQtyofList]
            } else {
                action.product.productQty = (action.product.productQty === undefined) ? 1 : action.product.productQty
                afterCartAdd.push(state.productInCart)
                afterCartAdd.push(action.product)
            }
            return {
                ...state,
                productInCart: afterCartAdd
            }
        case 'CART_CHANGE':
            const afterCartChange = state.productInCart.map(item => {
                if (item.id === action.product.id) {
                    return action.product
                }
                return item
            })
            return {
                ...state,
                productInCart: afterCartChange,
            };
        default:
            return state;
    }

}

export default transaction;