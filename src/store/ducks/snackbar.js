
export const Types = {
    SHOW_SIMPLE:"snackbar/SHOW_SIMPLE",
    CLOSE_SIMPLE:"snackbar/CLOSE_SIMPLE",
    SHOW_STATUS:"snackbar/SHOW_STATUS",
    CLOSE_STATUS:"snackbar/CLOSE_STATUS",
    SHOW_ERROR:"snackbar/SHOW_ERROR",
    CLOSE_ERROR:"snackbar/CLOSE_ERROR",
}

const INITIAL_STATE = {
    error:false,
    simple:false,
    error_message:'',
    simple_message:'',
    callback: () => null,
    callbackText:''
}

export default (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case Types.SHOW_ERROR:{
            return {
                ...state,
                error:true,
                error_message:action.payload.message
            };
        }
        case Types.CLOSE_ERROR:{
            return {
                ...state,
                error:false,
                error_message:""
            };
        }
        case Types.SHOW_SIMPLE:{
            return {
                ...state,
                simple:true,
                simple_message:action.payload.message
            };
        }
        case Types.CLOSE_SIMPLE:{
            return {
                ...state,
                simple:false,
                simple_message:""
            };
        }
        
        default:{
            return state;
        }
    }
}

export const Creators = {
    showError:(message) => dispacth =>{
        return new Promise(() =>{
            setTimeout(()=>{
                dispacth({type:Types.SHOW_ERROR, payload:{message}})
                setTimeout(() =>{
                    dispacth({type:Types.CLOSE_ERROR})
                }, 5000)
            }, 500)
        })
    },
    showSimple:(message) => dispacth =>{
        return new Promise(() =>{
            setTimeout(()=>{
                dispacth({type:Types.SHOW_SIMPLE, payload:{message}})
                setTimeout(() =>{
                    dispacth({type:Types.CLOSE_SIMPLE})
                }, 5000)
            }, 500)
        })
    },
    closeError:() => {
        return { type: Types.CLOSE_ERROR}
    },
    closeSimple:() => {
        return { type: Types.CLOSE_SIMPLE}
    }
}
