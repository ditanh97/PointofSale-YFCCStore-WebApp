const initialState = {
    isLoading: false,
    isRejected: false,
    isSuccess: false,
    totalPrice: 0,
    productInCart: [],
    recentRecipt : [],
    billTotal: 0,
    orderId:'',
    billFullfilled: false
}

const transaction = (state= initialState, action)=>{
    switch (action.type) {
        case 'CHECKOUT_SELL_PENDING':
            return {
              ...state,
              isLoading: true,
              isRejected: false,
              isSuccess: false,
            };
        case 'CHECKOUT_SELL_REJECTED':
            return {
              ...state,
              isLoading: false,
              isRejected: true,
            };
        case 'CHECKOUT_SELL_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            };
        case 'RECENT_BILL_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                billFullfilled: false,
            };
        case 'RECENT_BILL_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'RECENT_BILL_FULFILLED':
            console.log(action.payload.data.result, 'result222')
            return {
                ...state,
                isLoading: false,
                billFullfilled: true,
                recentRecipt: action.payload.data.result,
                billTotal: action.payload.data.addInfo.totalPrice,
                orderId: action.payload.data.addInfo.orderId
            };
        case 'CLEAR_CART': 
            return {
                ...state,
                totalPrice: 0,
                productInCart: [],
            }
        case 'CLEAR_BILL': 
            return {
                ...state,
                isSuccess: false,
                billFullfilled: false,
                recentRecipt: [],
                billTotal: 0,
                orderId: '',
            }
        case 'REMOVE_FROM_CART':
            const afterCartRemove = state.productInCart.filter(p => p.id !== action.id)
            console.log("afterCartRemove", afterCartRemove)
            const cartRemove = state.productInCart.filter(p => p.id === action.id)[0]
            const lastSubtract = cartRemove.subTotal
            return {
                ...state,
                productInCart: afterCartRemove,
                totalPrice: state.totalPrice - lastSubtract
            }
        case 'ADD_TO_CART':
            let firstSum = 0
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
                firstSum = action.product.price
            } else {
                action.product.subTotal = (action.product.subTotal === undefined) ? action.product.price : action.product.subTotal
                action.product.productQty = (action.product.productQty === undefined) ? 1 : action.product.productQty
                action.product.isPick = (action.product.isPick === undefined) ? true : action.product.isPick
                afterCartAdd.push(action.product)
                firstSum = action.product.price
            }

            return {
                ...state,
                productInCart: afterCartAdd,
                totalPrice: state.totalPrice + firstSum
            }
        case 'CART_CHANGE':
            console.log("productinCart", state.productInCart)
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