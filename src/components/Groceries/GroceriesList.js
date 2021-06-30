import React, { Component } from 'react'
import "./GroceriesList.css"

export class GroceriesList extends Component {
    state ={
        canEdit: false,
        editInput: this.props.item.grocery
    }
    onHandleEdit = () =>{
        this.setState((prevState) => {
            return {
                canEdit: !prevState.canEdit,
            }
        })
    };
     
    handleEditOnChange = (event) => {
        this.setState ({
            editInput: event.target.value,
        })
    };
     
    onHandleEditSubmit = (id) => {
        this.onHandleEdit();
        this.props.handleEditByID (id, this.state.editInput);
    }

    render() {
     const { grocery, _id, purchased} = this.props.item
     const { handleOnDelete,   } = this.props;
        return (
              <div className= "grocerieslist-div">
                <li></li>
                <button onClick ={() => this.onHandleEdit} id="edit-button">Edit</button>
                <button id ="done-button">Purchased</button>
                <button onClick={() => handleOnDelete ()} id="delete-button">Delete</button>
            </div>
        )
    }
}

export default GroceriesList;
