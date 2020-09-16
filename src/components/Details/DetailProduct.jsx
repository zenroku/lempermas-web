import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CardMedia, CardContent, Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import CurrencyFormat from 'react-currency-format';

const useStyles = makeStyles(theme => ({
    image: {
        objectFit: 'contain',
        width: '100%'
    },
    paper: {
        padding: theme.spacing(1.5),
        marginTop: theme.spacing(3)
    },
    price: {
        padding: theme.spacing(1),
        backgroundColor: '#004d40',
        display: 'inline-block'
    },
    marginGrid: {
        marginBottom: theme.spacing(2),
    }
}))

export default function DetailProduct({ openModal, closeModal, detailProduct, detailUser }) {

    const classes = useStyles()


    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (openModal) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openModal]);

    return (
        <div>
            <Dialog
                open={openModal}
                onClose={() => closeModal(false)}
                scroll='paper'
                aria-labelledby="detailProduct-title"
                aria-describedby="detailProduct-content"
            >
                <DialogTitle id="detailProduct-title">{detailProduct && detailProduct.name}</DialogTitle>
                <DialogContent dividers>
                    <CardMedia
                        component="img"
                        image={detailProduct && detailProduct.imageUrl}
                        title={detailProduct && detailProduct.name}
                        className={classes.image}
                    />
                    <CardContent
                        id="detailProduct-content"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                        style={{ outline: 'none' }}
                    >
                        <Typography variant="subtitle2">Diperbarui : {detailProduct && detailProduct.timestamp}</Typography>
                        <Typography style={{ marginBottom: 15 }} variant="body2">Oleh {detailUser && detailUser.displayName}</Typography>
                        <Grid container alignItems="center">
                            <Grid className={classes.marginGrid} item md={4} xs={5}>
                                <Typography variant="subtitle1">Harga</Typography>
                            </Grid>
                            <Grid className={classes.marginGrid} item md={8} xs={7}>
                                <Paper className={classes.price}>
                                    <Typography variant="body2" style={{ fontWeight: 'bold', textAlign: 'center', color: '#E0F2F1' }}>
                                        <CurrencyFormat value={detailProduct && detailProduct.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /> / {detailProduct && detailProduct.unit}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid className={classes.marginGrid} item md={4} xs={5}>
                                <Typography variant="subtitle1">Kategori</Typography>
                            </Grid>
                            <Grid className={classes.marginGrid} item md={8} xs={7}>
                                <Paper className={classes.price}>
                                    <Typography variant="body2" style={{ fontWeight: 'bold', textAlign: 'center', color: '#E0F2F1' }}>
                                        {detailProduct && detailProduct.category}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Paper className={classes.paper} elevation={5}>
                            <Typography gutterBottom variant="h5">Deskripsi Produk :</Typography>
                            <Typography variant="body1">
                                {detailProduct && detailProduct.description}
                            </Typography>
                        </Paper>
                    </CardContent>
                </DialogContent>
                <DialogActions>
                    <Button component="a" target="_blank" rel="noopener noreferrer" href="https://api.whatsapp.com/send?phone=+6289687583180" color="primary">
                        Pesan
          </Button>
                    <Button onClick={() => closeModal(false)} color="primary">
                        Tutup
          </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}
