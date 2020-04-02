import * as actionTypes from "./types";
import axios from "axios";
//const url = 'https://enigmatic-garden-72625.herokuapp.com/'; 
const url = "http://localhost:3000/"
//import Modal from 'react-bootstrap/Modal';
    
    
    //  dispatch =>{
    //      alert("new message");
    //     let data = localStorage.getItem('user_id');
    //     let data2 = localStorage.getItem('sender_id');
    //     let array = [data , data2];
    //     console.log("array-----------------------------",array)
    //     axios.post(`${url}chat/all` ,{
    //         user_ids : array
    //     })
    //     .then(resp=>{
    //         if(resp.status === 200){
    //             console.log("chat--------------------"  , resp.data);
    //             dispatch({
    //                 type:actionTypes.CHAT,
    //                 payload : resp.data
    //             });
    //         }
    //     })
    //     .catch(err=>{
    //         console.log("err" , err)
    //     });
    // }
    

//)



export const createUser = (name) =>
    dispatch => {
        console.log("user" ,name );
      //  dispatch({
        //     action : actionTypes.START_LOADING,
        //     payload : true
        // });
       
    axios.post(`${url}user`,{
                name : name
                }).then(resp =>{
                    console.log("resp black", resp)
                     
                    if (resp.status === 200) {
                        console.log("resp", resp)
                        alert("created");
                    }
                }).catch(err=>{
                    console.log("err" , err);

                });
      
          
              
        }

export const getUser = () =>
dispatch => {
 dispatch({
    type: actionTypes.START_LOADING,
    payload : true
 });

axios.get(`${url}user`).then(resp =>{
            
        if (resp.status === 200) {
            console.log("resp.com", resp.data)
            
            dispatch({
                type : actionTypes.USERS,
                payload : resp.data
             });

        }
    }).catch(err=>{
        console.log("err" , err);

    });


    
};


export const checkUser = (name)=>
    dispatch=>{
        console.log("datat idhar hai" , name)
        axios.post(`${url}user/check` , {
            name : name
        })
        .then(resp=>{
           // console.log("resp" , resp)
                if(resp.status === 200){
           //s         console.log("resp reult" , resp.data);
                    localStorage.setItem('user_id', resp.data._id);
                }
        })
        .catch(err=>{
           alert("No Username Found");
           window.location.reload();
        })
    };

export const  getChat = (array) => dispatch =>{
    // alert("call ");
    // console.log("array",array)
    axios.post(`${url}chat/all` ,{
        user_ids : array
    })
    .then(resp=>{
        if(resp.status === 200){
            console.log("chat--------------------"  , resp.data);
            dispatch({
                type:actionTypes.CHAT,
                payload : resp.data
            });
        }
    })
    .catch(err=>{
        console.log("err" , err)
    });
}; 

export const sendMessage = (user_ids , message , sender_id) =>dispatch =>{
    console.log("message" , user_ids , message , sender_id);
    axios.post(`${url}chat` , {
        user_ids : user_ids.user_ids ,
        message : message,
        sender_id
    })
    .then(resp=>{
        if(resp.status === 200){
            console.log("get chat data" , resp);
            // dispatch({
            //     type:actionTypes.CHAT,
            //     payload : resp.data
            // });
            alert("message is successfully sended");

        }
    })
    .catch(err=>{
        console.log("err" , err)
    });
};

// export const getUser = () =>
// dispatch => {
//  dispatch({
//     type: actionTypes.START_LOADING,
//     payload : true
//  });

// axios.get(`${url}chat`).then(resp =>{
            
//         if (resp.status === 200) {
//             console.log("resp.com", resp.data)
            
//             dispatch({
//                 type : actionTypes.USERS,
//                 payload : resp.data
//              });

//         }
//     }).catch(err=>{
//         console.log("err" , err);

//     });


    
// };

