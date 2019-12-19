const initialState = {
    isLoading: false,
    isRejected: false,
    isSuccess: false,
    totalPrice: 0,
    productInCart: []
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
              isSuccess: true,
              totalPrice: 0,
              productInCart: []
            };
        case 'REMOVE_FROM_CART':
            const afterCartRemove = state.productInCart.filter(p => p.id !== action.id)
            const cartRemove = state.productInCart.filter(p => p.id === action.id)[0]
            const lastSubtract = cartRemove.subTotal
            return {
                ...state,
                productInCart: afterCartRemove,
                totalPrice: state.totalPrice - lastSubtract
            }
        case 'ADD_TO_CART':
            let firstSum
            let afterCartAdd = state.productInCart.map(item => ({...item}));
            const existingList = state.productInCart.filter(p => p.id === action.product.id )
            if (existingList.length > 0) {
                const withoutExistingList = state.productInCart.filter(p => p.id !== action.product.id)
                const updatedQtyofList = {
                    ...existingList[0],
                    subTotal: existingList[0].subTotal + action.product.price,
                    productQty: existingList[0].productQty + action.product.productQty,
                    isPick: !existingList[0].isPick
                }
                afterCartAdd = [...withoutExistingList, updatedQtyofList]
            } else {
                action.product.subTotal = (action.product.subTotal === undefined) ? action.product.price : action.product.subTotal
                action.product.productQty = (action.product.productQty === undefined) ? 1 : action.product.productQty
                action.product.isPick = (action.product.isPick === undefined) ? true : action.product.isPick
                firstSum = action.product.subTotal
                afterCartAdd.push(action.product)
            }

            return {
                ...state,
                productInCart: afterCartAdd,
                totalPrice: state.totalPrice + firstSum
            }
        case 'CART_CHANGE':
            let sumTotal = 0
            const afterCartChange = state.productInCart.map(item => {
                if (item.id === action.product.id) {
                    return action.product
                }
                sumTotal += item.subTotal
                return item
            })
            return {
                ...state,
                productInCart: afterCartChange,
                totalPrice: state.totalPrice + sumTotal 
            };
        case 'SET_TOTAL_PRICE':
            return {
                ...state,
                totalPrice: action.price
            }
        default:
            return state;
    }

}

export default transaction;