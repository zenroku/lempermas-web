import { createMuiTheme } from '@material-ui/core/styles';

const monserrat = "'Montserrat', sans-serif"
const darkGreen = '#004d40'
// const lightGreen = '#E0F2F1'

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: darkGreen
        },
        text: {
            primary: darkGreen
        }
    },
    typography: {
        fontFamily: monserrat
    },
    overrides: {
        MuiDialogContentText: {
            root: {
                fontWeight: 500,
            }
        },
        MuiButton: {
            label: {
                textTransform: 'none'
            }
        },
        MuiFab: {
            label: {
                textTransform: 'none'
            }
        }
    },
})