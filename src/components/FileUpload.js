import React, {Fragment, useState} from 'react';
import {Button} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {postImageCategory} from '../services/redux/actions'

//https://stackoverflow.com/questions/40589302/how-to-enable-file-upload-on-reacts-material-ui-simple-input

const FileUpload = () => {
    const [filename, setFilename] = useState('Choose file..')
    const [file, setFile] = useState('');
    const [uploadedFile, setUploadedFile] = useState({})
    const dispatch = useDispatch();
    const upload = useSelector(state => state.upload)
    
    const onChangeFile =(e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }
    const onSubmit =  async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        await dispatch(postImageCategory(formData))
        setUploadedFile(upload.uploaded)
        // if (!upload.isRejected) {
        //     // const firstPath = process.cwd().split('/FIXED PROJECT')[0]
        //     const firstPath = "E:/Programming Stuff/Bootcamp arkademy"
        //     console.log(firstPath)
        //     setUploadedFile({
        //         fileName: upload.fileName,
        //         filePath: `${firstPath}${upload.filePath}`})
        // }else{
        //     if (upload.error.status == 500) {
        //     console.error(`Error ${upload.error.status}, there was a problem with the server`)
        //     } else {
        //         console.log(upload.error.result)
        //     }
        // }
  
        

    }

    return (
        <Fragment>
            <form onSubmit={onSubmit} >
                <Button
                    variant="contained"
                    component="label"
                >
                <input
                    type="file"
                    name="Image" 
                    id="gambar" 
                    style={{ display: "none" }}
                    onChange={onChangeFile}
                />
                <label htmlFor="gambar">
                    {filename}
                </label>
                </Button>
                <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    color="primary"
                >
                SUBMIT
                </Button>
            </form>
            {uploadedFile ?
             <div><h3>{uploadedFile.fileName}</h3>
             <img style={{width: '100%' }} src={uploadedFile.filePath} alt=""/></div> : null }
        </Fragment>
    )
}

export default FileUpload;