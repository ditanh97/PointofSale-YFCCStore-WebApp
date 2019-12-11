import React, { useState, useEffect } from 'react';
import {FormGroup, TextField} from '@material-ui/core'


const AddUpdateForm = (props) => { 
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
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Category"
            type="text"
            fullWidth
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









