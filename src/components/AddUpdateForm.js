import React, { } from 'react';
import {FormGroup, TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import {catData} from '../mocks/data'
import {useSelector} from 'react-redux'


const AddUpdateForm = (props) => { 
  const catData = useSelector(state => state.category.categoryList)
  const type = props.type      
    return (
      <FormGroup >
        {
          type === "Product" ?
          <div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product Name"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="stock"
            label="Stock"
            type="text"
            fullWidth
          />
          <Autocomplete
            id="combo-box-category"
            options={catData}
            getOptionLabel={option => option.category}
            renderInput={params => (
              <TextField {...params} placeholder="Category" variant="outlined" fullWidth />
            )}
          />
          <TextField
            autoFocus
            margin="dense"
            id="image"
            label="Image"
            type="text"
            fullWidth
          />
        </div>
          :
          <div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="image"
            label="Category Image"
            type="text"
            fullWidth
          />
        </div>
        }
        </FormGroup>

    );
}
export default AddUpdateForm;









