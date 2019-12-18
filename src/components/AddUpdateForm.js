import React, {useState, useEffect} from 'react';
import {FormGroup,TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useSelector} from 'react-redux'
// import {catData} from '../mocks/data'


const AddUpdateForm = (props) => { 
  const catData = useSelector(state => state.category.categoryList)
  const type = props.type
  const [state, setState] = useState({})


  useEffect( () => {
    if (props.data){
        if (type === "Category") {
          const {id, category, image } = props.data
          setState({ id, category, image })    
        } else {
          const {id, name, description, price, stock, category_name, image } = props.data
          setState({ id, name, description, price, stock, category_name, image }) 
        }
    }
}, [])

const onChange = e => {
  setState({...state, [e.target.name]: e.target.value})
  console.log(state,'statata')
  }

//   const submitFormAdd = async (e) => {
//     e.preventDefault()
//     await dispatch (postCategory(state));
//     const item = category.categoryList
//     const addToTable = (item) => {
//         if (Array.isArray(item)) {
//             props.addItemToState(item[0])
//             props.toggle()
//         } else {
//             console.log('failure')
//         }
//     }
//     addToTable(item);   
// }    

// const submitFormEdit = async (e) => {
//     e.preventDefault();
//     await dispatch (props.update(state.id, state));
//     const item = category.categoryList
//     console.log(item, 'item')
//     const editToTable = (item) => {
//         if (Array.isArray(item)) {
//             props.addItemToState(item)
//             props.toggle()
//         } else {
//             console.log('failure')
//         }
//     }
//     editToTable(item);   
// }      
    return (
      <FormGroup>
        {
          type === "Product" ?
          <div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Product Name"
            type="text"
            fullWidth
            value={state.name === null? '' : state.name}
            onChange={e => onChange(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={state.description === null? '' : state.description}
            onChange={e => onChange(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="text"
            fullWidth
            value={state.price === null? '' : state.price}
            onChange={e => onChange(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="stock"
            name="stock"
            label="Stock"
            type="text"
            fullWidth
            value={state.stock === null? '' : state.stock}
            onChange={e => onChange(e)}
          />
          <Autocomplete
            id="combo-box-category"
            options={catData}
            getOptionLabel={option => option.category}
            renderInput={params => (
              <TextField {...params} placeholder="Category" variant="outlined" fullWidth />
            )}
            value={state.category_name === null? '' : state.category_name}
            onChange={e => onChange(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="image"
            name="image"
            label="Image"
            type="text"
            fullWidth
            value={state.image === null? '' : state.image}
            onChange={e => onChange(e)}
          />
        </div>
          :
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="category"
            label="Category Name"
            type="text"
            fullWidth
            value={state.category === null? '' : state.category}
            onChange={e => onChange(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="image"
            name="image"
            label="Category Image"
            type="text"
            fullWidth
            value={state.image === null? '' : state.image}
            onChange={e => onChange(e)}
          />
        </div>
        }
        </FormGroup>

    );
}
export default AddUpdateForm;









