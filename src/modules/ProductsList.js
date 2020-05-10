import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

class ProductsList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products:[],
            endpoint:this.props.endpoint,
        };
        this.populateProducts(this.props.endpoint);
    }

    populateProducts(endpoint) {
        this.props.data(endpoint)
        .then(res=>{
            this.setState({endpoint: endpoint})
            this.setState({products: res.objects})
        })
        .catch(err=>console.log(err))
    }

    renderCard(){
        var num=0;
        const cardList = this.state.products.map((product, key)=>{
            if(product.category===this.props.category){
                num++;
                return (
                    <Card className="ProductItem" key={key} variant="outlined">
                    <CardActionArea>
                    <CardMedia image={"products/"+product.title+".jpg"}  title="" className="ProductImg"/>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                        {product.title}
                        </Typography>
                        <Typography variant="body2" component="p"> Weight: {product.weight} </Typography>
                        <Typography variant="body2" component="p"> Size: W.{product.size.width}xL.{product.size.length}xH.{product.size.height} </Typography>
                        <SnackbarContent message={"Average: "+((product.size.width/100*product.size.length/100*product.size.height/100)*250).toFixed(2)+ "mᵌ"}  />
                    </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button onClick={()=> window.open("https://www.kogan.com/au/shop/?q="+product.title, "_blank")}  variant="contained" color="secondary" startIcon={<PowerSettingsNewIcon />}>
                            Open on Kogan
                        </Button>
                    </CardActions>
                </Card>
                )
            }
            return"";
        })
        if(num === 0)
            return (<h1 className="noproducts">OPS!! no product found in category <em>{this.props.category} </em></h1>);
        return cardList;
    }

    render(){
        if(this.props.endpoint!==this.state.endpoint)
            this.populateProducts(this.props.endpoint)
        
        return( this.renderCard() )
    }
}

export default ProductsList;