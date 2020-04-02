import React from 'react';
import './App.css';
import Row from './components/Row';
import * as userAction from "./redux/action/userAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const io = require('socket.io-client');
const socket = io('http://localhost:3000');

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data : ""
      ,
      message : [
        
      ],
    
    }
    this.send = this.send.bind(this); 
  }
  componentWillReceiveProps(nextprops){
    console.log("componentWillReceiveProps"  , nextprops)
    let array = nextprops.chat;
   
    console.log("after--------------" , array);
    this.setState({message : array });
  }
  

  componentDidMount(){

    let name  = prompt("Enter your Name to join the chat");
    this.props.checkUser(name);
    this.props.users();
  }
  send(){
    let data = localStorage.getItem('user_id');
    let data2 = localStorage.getItem('sender_id');
    console.log("state" , this.state);
    let message = this.state.data;
    if(data.trim() != "" && data2.trim() != "" && this.state.data != "" ){
      this.props.sendMessage({user_ids :[data , data2] } , message , data);
    this.setState({data : ""});
    
    }
    else {
      alert("something is missing!");
    }
    
  }
  // componentWillReceiveProps(nextprops){
  //   console.log("componentWillReceiveProps" , nextprops)
  // };
 
  render(){

    // socket.on("update_chat" , (data)=>{
    //   console.log("update_chat" , data)
    // } )


    const myStyle = { 
      color: "white",
      backgroundColor: "gray",
      fontFamily: "Arial",
      width : "30%",
      border : "1px solid black" 
    }  
    const myStyle2 = {
      color: "black",
      position : "absolute",
      right:"0px",
      fontFamily: "Arial",
      width : "69.5%",
      top : "0px",
      border : "1px solid black" 
    }

    const topView = {
      color: "white",
      height: "50px",
      backgroundColor: "gray",  
      fontFamily: "Arial",
      border : "1px solid black" 
    }

    const searchBar = {
      color: "white",
      height: "50px",
      backgroundColor: "white",  
      fontFamily: "Arial",
      border : "1px solid black",
      marginTop : "50px",
      
    }
    socket.on('update_chat' , (data)=>{
      let d = localStorage.getItem('sender_id');
      
      let data2 = localStorage.getItem('user_id');
      let arr = [d , data2];
      this.props.getChat(arr);
      // console.log("herr is update ----------" , data);
      // let {message}=  this.state;
      // message = [...message , data];
      // this.setState({message : message});
    })
    
    const addUser = ()=>{
      let name = prompt("Enter the name", "Ok");
      console.log("name" , name);
      this.props.addUser(name);

    };
    console.log("data agya" , this.state.message);

    return (
      <div >
        <div style = {myStyle}>
          <div style = {topView}>
              <button onClick={addUser}></button>
            <div style = {searchBar}>
              <input type="text" style = {{width : "98%" , height : "43px"}} />

            </div>
              {
                this.props.usersData.length > 0 ? this.props.usersData.map(d=>{
                //  console.log("ddddddddddddddddddddddddddddd" , d ,  localStorage.getItem('user_id'));
                if(d._id != localStorage.getItem('user_id')){ 
                  return (

                    <Row name = {d} />
                  )
                  }
                }) : <h1>no data found</h1>
              }
              
          </div>
        </div>
        <div style = {myStyle2}>
          {this.state.message.map(m=>(
           //console.log("mmmmmmm" , m)
            <div>
              <p style={{marginLeft:"10px"}}>{m.sender_id != localStorage.getItem('user_id') ? m.message : null}</p>
              <p align="right" style={{marginRight : "10px"  , marginTop : "5px" ,marginBottom : "5px"}}>{m.sender_id == localStorage.getItem('user_id') ? m.message : null}</p>
              
            </div>            
          )
            
          )}
          <div >
            <input type="text"  value={this.state.data} onChange = {(e)=>{this.setState({data : e.target.value})}} />
            <button onClick ={this.send} > Send</button>
          </div>

        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  loading: state.userReducer.loading,
  usersData : state.userReducer.users,
  chat : state.userReducer.chat
});
const mapDispatchToProps = dispatch => ({
  addUser: bindActionCreators(userAction.createUser, dispatch),
  users: bindActionCreators(userAction.getUser, dispatch),
  checkUser : bindActionCreators(userAction.checkUser , dispatch),
  sendMessage : bindActionCreators(userAction.sendMessage , dispatch),
  getChat: bindActionCreators(userAction.getChat, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
