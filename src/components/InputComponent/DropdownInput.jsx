import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const values = [
    {
        type: 'unit',
        label: 'Satuan',
        value: ['pcs', 'gelas', 'porsi', 'mangkuk']
    },
    {
        type: "category",
        label: 'Kategori',
        value: ['Kue', 'Masakan', 'Minuman']
    }
]

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 150,
    }
}));

function DropdownInput({ categoryCallback, tipe, required, currentVal }) {

    const setValues = values.find(elm => elm.type === tipe)

    const classes = useStyles()
    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="category-filter-label">{setValues.label}</InputLabel>
            <Select
                labelId="category-filter-label"
                id="category-filter"
                value={currentVal}
                onChange={(event) => categoryCallback(event.target.value)}
                className="selectCategory"
                disableUnderline
                label={setValues.label}
                required={required ? required : null}
            >
                <MenuItem value="">
                    <em>Semua</em>
                </MenuItem>
                {setValues.value.map((elm, index) => <MenuItem key={index} value={elm}>{elm}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export default DropdownInput
