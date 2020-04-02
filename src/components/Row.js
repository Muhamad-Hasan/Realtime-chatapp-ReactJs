import React from 'react';
import * as userAction from "../redux/action/userAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Row extends React.Component{
    constructor(props){
        super(props);
    }

    idPasss(data){
        let data2 = localStorage.getItem('user_id');
        let arr = [data , data2];
        this.props.getChat(arr);
        localStorage.setItem("sender_id", data);

    }
    render(){
        console.log("props" , this.props);
        const row = {
            height : "50px",
            border : "1px solid gray ",
           
        }

        const image = {
            marginLeft : "20px",
            backgroundColor : "gray",
            width : "40px",
            height : "40px",
            marginTop : "6px"
            
        };

        const name = {
            marginTop : "-30px",
            marginLeft : "70px",
            color : "black"
        }
        return (
            <div style={row} onClick ={()=>{this.idPasss(this.props.name._id)}}>
               <div style={image}>
               </div>
               <div style = {name}>
                    <span>{this.props.name.name ? this.props.name.name : "No" }</span>
               </div>
            </div>
        )
        
    }
}


const mapStateToProps = state => ({
    loading: state.screenReducer.categories,
    isLoadingCategories: state.screenReducer.isLoadingCategories
  });
  const mapDispatchToProps = dispatch => ({
    addUser: bindActionCreators(userAction.createUser, dispatch),
    getChat: bindActionCreators(userAction.getChat, dispatch),
    
  });
  
  export default connect(null, mapDispatchToProps)(Row);
  