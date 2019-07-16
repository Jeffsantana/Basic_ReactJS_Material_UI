import { push } from 'connected-react-router';



export const navigate = route => dispatch =>{
    return (new Promise( () =>{
        dispatch(push(route))
    }))
}

// export default navigate;