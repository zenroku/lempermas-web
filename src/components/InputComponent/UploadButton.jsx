import React, { useState } from 'react'
import { Fab, Button, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 250
    },
    textInfo: {
        display: 'block',
        maxWidth: 150,
        paddingRight: 10
    },
    button: {
        marginRight: 5,
    }
}))

function UploadButton({ imageUploadCallback, required }) {
    const [image, setImage] = useState(null)
    const classes = useStyles()

    imageUploadCallback(image)

    const uploadChange = (event) => {

        const photo = event.target.files[0]
        const sizePhoto = (photo.size / (1024 * 1024)).toFixed(2)

        if (sizePhoto >= 4) {
            console.log('max 4mb')
        }

        if (photo && sizePhoto <= 4) {
            setImage(event.target.files[0])
        }
    }

    return (

        <div className={classes.root}>
            {image ? (
                <Button className={classes.button} variant="contained" color="secondary" onClick={() => setImage(null)}>Batal</Button>
            ) : (
                    <label htmlFor="upload-photo">
                        <input
                            style={{ display: "none" }}
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                            onChange={uploadChange}
                            required={required ? required : null}
                        />
                        <Fab
                            className={classes.button}
                            color="primary"
                            size="small"
                            component="span"
                            aria-label="add"
                            variant="extended"
                        >
                            <AddIcon /> Upload Photo&nbsp;&nbsp;
                        </Fab>
                    </label>
                )}
            {image ? (<Typography className={classes.textInfo} noWrap variant="subtitle2">{image.name}</Typography>) : (<Typography className={classes.textInfo} variant="subtitle2">
                Pilih 1 foto
            </Typography>)}
        </div>

    )
}

export default UploadButton
