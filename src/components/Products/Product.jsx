import React from 'react'
import { Grid, Card, CardHeader, CardMedia, CardContent, CardActionArea, CardActions, Button, Typography, Avatar, Paper, Badge } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { updatedTimeForSinglePost as dateConvert, newlyProduct } from '../../functions/dateconvert'
import firebase from 'firebase'
import CurrencyFormat from 'react-currency-format';
import FindInPageIcon from '@material-ui/icons/FindInPage';

// name, description, category, price, unit, timestamp, uploader, imageId, imageUrl

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        marginTop: theme.spacing(5),
    },
    root: {
        minHeight: '450px',
        maxWidth: '350px',
        margin: 'auto',
        marginBottom: '50px',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardCategory: {
        padding: theme.spacing(1),
        height: 20,
        marginRight: theme.spacing(4)
    },
    image: {
        width: '100%',
        maxHeight: 230
    },
    imageContainer: {
        display: 'flex',
        height: 230,
        background: 'var(--light-green)'
    },
    price: {
        padding: theme.spacing(1),
        backgroundColor: '#004d40',
        textAlign: 'center'
    },
    boldTextBox: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#E0F2F1',
        display: 'inline',
    }
}))

function Product({ data, users, callbackImage, detailCallback }) {
    const classes = useStyles()

    const serverTimeNow = firebase.firestore.Timestamp.now().toDate().getTime()

    const findExistUser = (uId, usersData) => {
        const findUser = usersData.find(e => e.userId === uId)
        return findUser
    }

    return (
        <Grid container className={classes.container} justify="space-around">
            {data.length !== 0 ? (data.map((product, index) => {
                const getUser = findExistUser(product.uploader, users)
                const getData = {
                    name: product.name,
                    description: product.description,
                    category: product.category,
                    price: product.price,
                    unit: product.unit,
                    timestamp: dateConvert(serverTimeNow - product.timestamp.toDate().getTime(), product.timestamp.toDate().getTime()),
                    imageUrl: product.imageUrl
                }
                return (
                    <Grid data-aos="fade-down" key={index} item xs={12} md={6} lg={4}>
                        <Card elevation={5} className={classes.root}>
                            <div className={classes.cardHeader}>

                                <CardHeader
                                    className="muiCardHeader"
                                    avatar={
                                        <Avatar
                                            imgProps={{ title: getUser && getUser.displayName }}
                                            style={{ backgroundColor: '#004d40', color: '#E0F2F1' }}
                                            src={getUser && getUser.profileImageUrl}
                                        ></Avatar>
                                    }
                                    title={<Typography variant="subtitle1" noWrap style={{ maxWidth: 150 }}>{product.name}</Typography>}
                                    subheader={dateConvert(serverTimeNow - product.timestamp.toDate().getTime(), product.timestamp.toDate().getTime())}
                                />

                                <Paper elevation={3} className={classes.cardCategory}>
                                    <Badge
                                        className="productNewBadge"
                                        badgeContent="NEW"
                                        color="primary"
                                        invisible={newlyProduct(serverTimeNow, product.timestamp.toDate().getTime())}
                                    >
                                        <Typography variant="subtitle2">{product.category}</Typography>
                                    </Badge>
                                </Paper>

                            </div>
                            <CardActionArea onClick={() => callbackImage(true, product.imageUrl)}>
                                <div className={classes.imageContainer}>
                                    <CardMedia
                                        component="img"
                                        className={classes.image}
                                        image={product.imageUrl}
                                        title={product.name}
                                    />
                                </div>
                            </CardActionArea>
                            <CardContent>
                                <Paper className={classes.price}>
                                    <Typography variant="body2" className={classes.boldTextBox}>
                                        <CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                                    </Typography>
                                    <Typography variant="body2" className={classes.boldTextBox}> / {product.unit}</Typography>
                                </Paper>
                            </CardContent>
                            <CardActions>
                                <Button component="a" target="_blank" rel="noopener noreferrer" href="https://api.whatsapp.com/send?phone=+6289687583180" variant="outlined">Pesan</Button>
                                <Button variant="outlined" onClick={() => detailCallback(true, getData, getUser)}>Detail</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )

            })) : (<div style={{ height: 300, display: 'flex' }}>
                <Typography variant="h3" align="center" color="primary"><FindInPageIcon color="primary" style={{ fontSize: "2.5rem" }} />Produk tidak Ditemukan</Typography></div>)
            }

        </Grid >
    )
}

export default Product
