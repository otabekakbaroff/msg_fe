import axiosWithAuth from '../../axiosWithAuth'
import io from "socket.io-client"




export const socket = io('https://viota-backend.herokuapp.com',{autoConnect: true})
// export const socket = io('http://localhost:5000',{autoConnect: true})


export const loginUser = usersInfo => dispatch => {
    axiosWithAuth().post(`/api/users/login`, usersInfo)
        .then(response => {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('username', response.data.username)
            dispatch({ type: 'LOGIN', payload: response.data })
            window.location.pathname=('/dashboard')
        })
        .catch(error => {
            console.log(error)
        })
};


export const registerUser = usersInfo => dispatch => {
    axiosWithAuth().post(`/api/users/register`, usersInfo)
        .then(response => {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('username', response.data.username)
            dispatch({ type: 'REGISTER', payload: response.data })
            window.location.pathname=('/dashboard')
        })
        .catch(error => {
            console.log(error)
        })
};


export const getFriendsList = () => dispatch => {
    axiosWithAuth().get(`/api/connection/${localStorage.getItem('username')}/friends-list`)
        .then(response => {
            dispatch({ type: 'GET_FRIENDS_LIST', payload: response.data })
        })
        .catch(error => {
            console.log(error)
        })
};



export const searchUser = (user) => dispatch =>{
    socket.emit('user-search', user)
}



export const selectFriend = friend => dispatch=>{
    dispatch({type:'SELECT_FRIEND', payload: friend})
}



export const getMyMessages = usersInfo => dispatch => {
    if(usersInfo.from && usersInfo.to){
        console.log(usersInfo.from, usersInfo.to)
        axiosWithAuth().post(`/api/messages/my-messages`, {from:usersInfo.from, to:usersInfo.to})
        .then(response => {
            console.log(response)
            dispatch({ type: 'GET_MY_MESSAGES', payload: response.data })
        })
        .catch(error => {
            console.log(error)
        })
    }else{
        console.log("error: retrieving messages failed")
    }
};


export const friendsRequest = () => dispatch => {
    axiosWithAuth().post(`/api/connection/friend-requests`, {username:localStorage.getItem('username')})
        .then(response => {
            dispatch({ type: 'FRIENDS_REQUESTS', payload: response.data })
        })
        .catch(error => {
            console.log(error)
        })
};


export const acceptRequest = requestInfo => dispatch=>{
    axiosWithAuth().put(`/api/connection/request-reply`, requestInfo)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
    })  
    dispatch({ type: 'UPDATE_FRIENDS_LIST', payload: {username: requestInfo.to} })
    dispatch({ type: 'UPDATE_REQUEST_LIST', payload: {username: requestInfo.to} })
}


export const declineRequest = requestInfo => dispatch=>{
    axiosWithAuth().put(`/api/connection/request-reply`, requestInfo)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
    })  
    dispatch({ type: 'UPDATE_FRIENDS_LIST', payload: {username: requestInfo.to} })
}


export const sendMessage = msg => dispatch => {
    socket.emit('private-message', msg)
    dispatch({type:'SEND_MESSAGE', payload: msg})
};



export const receiverMessage = msg => dispatch =>{
    dispatch({type:'RECEIVE_MESSAGE', payload: msg})
}



export const sendRequest = user => dispatch => {
    axiosWithAuth().post(`/api/connection/send-friend-request`, {from:localStorage.getItem('username'),to:user})
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    }) 
}



// ↓ NOT DONE ↓


export const cancelRequest = () => dispatch => {

}





