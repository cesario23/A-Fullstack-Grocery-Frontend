
import React, { Component } from 'react'
import axios from 'axios'
import GroceriesList from './GroceriesList'
import './Groceries.css'


//const URL= "http://localhost:3001"
export class Groceries extends Component {
    state = {
        groceryList : [],
        groceryInput: "",
        error: null,
        errorMessage: "",
    };

async componentDidMount() {
        try{
         let allGroceries = await axios.get(
             "http://localhost:3001/api/shop/get-all-groceries"
        )
        console.log(allGroceries);
        this.setState({
        groceryList: allGroceries.data.payload,
        })
        }catch (e){
         console.log(e);
        }
    };

handleGroceriesOnChange = (event) =>{
        this.setState({
            groceryInput: event.target.value,
            error: null,
            errorMessage: "",
        })
    };

handleSubmit = async (event) => {
        event.preventDefault();
        if(this.state.groceryInput.length === 0){
            this.setState({
                error:true,
                errorMessage: "you need to fill out the space"
            })
        }else{
            let checkIfGroceryExist = this.state.groceryList.findIndex((item)=>
            item.grocery.toLocaleLowerCase()===
            this.state.groceryInput.toLocaleLowerCase ()
            )
         if(checkIfGroceryExist > -1){
             this.setState({
                 error: true,
                 errorMessage: "you have already purchased that grocery!!"
             })
         }else{
             try{
                 let createdGrocery = await axios.post("http://localhost:3001/api/shop/create-groceries", 
                    {grocery: this.state.groceryInput,
                    })
                 let newArray = [...this.state.groceryList, createdGrocery.data.payload];
                 this.setState ({
                     groceryList: newArray,
                     groceryInput: "",
                 });
             }catch (e){
               console.log(e);
             }
         }
        }
    };
    handleEditByID = async (id, editInput) => {
        try {
          let editedGrocery = await axios.put(
            `http://localhost:3001/api/shop/update-groceries-by-id/${id}`,
            {
              grocery: editInput,
            }
          );
          console.log(editedGrocery);
          let updatedGroceryArray = this.state.groceryList.map((item) => {
            if (item._id === id) {
              item.grocery = editedGrocery.data.payload.grocery;
            }
            return item;
          });
          this.setState({
            groceryList: updatedGroceryArray,
          });
        } catch (e) {
          console.log(e);
        }
      };
  


handleDelete = async (_id) => {
        console.log("click");
        try{
            let deletedGrocery = await axios.delete(`localhost:3001/api/shop/delete-groceries-by-id/${_id}`)
            let filteredArray = this.state.groceryList.filter((item)=> item._id !== deletedGrocery.data.payload._id);
            this.setState({
                groceryList:filteredArray
            })
        }catch (e){
            console.log(e)
        }
    };
handlePurchased = async (id, purchased) => {
    try{
    let groceyPurchased = await axios.put()
    }catch (e){
        console.log(e)
    }
}
    
    
    render() {
       return (
            <div>
            <div className="form-div">
                <form onSubmit={this.handleSubmit}>
                    <input 
                    name = "groceryInput"
                    type = "text"
                    onChange = {this.handleGroceriesOnChange}
                    value = {this.state.groceryInput}
                    autoFocus
                    id="inputGroceries"
                    />
                    <button type= "submit">Submit</button>
                    <br />
                    <span style={{color: "red"}}>{this.state.error && this.state.errorMessage}</span>
                 </form>
             </div>
             <div className = "groceries-list">
             <ul>
            {this.state.groceryList.map((item) => {
              return (
                <GroceriesList
                key={item._id}
                item={item}
                handleDelete= {this.handleDelete} 
                handleEditByID = {this.handleEditByID}
                inputID = {item._id}
                />
              );
            })}
            </ul>
            </div>   
            </div>
        )
    }
}

export default Groceries
