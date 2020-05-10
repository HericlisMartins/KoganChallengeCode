import React from 'react';
import axios from 'axios';

import Koganlogo from './img/koganlogo.png';
import Hericlislogo from './img/logogreyhericlis.png';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import './App.css';

import ProductCategory from './modules/CategorySelect'; //react-select eith axios get api json
import ProductsList from './modules/ProductsList';

async function API(endpoint){
  if(!endpoint)
    endpoint = "/api/products/1";
  const urlLink = "http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com"+endpoint
  try {
     let res = await axios({
          url: urlLink,
          method: 'get',
          timeout: 8000,
          headers: {'Content-Type': 'application/json',}
      })

      return res.data
  }
  catch (err) { console.error(err); }
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      category: "Air Conditioners",
      endpoint: "/api/products/1"
    }
    this.getData = this.getData.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
 
  updateCategory(category) {
    if(category) this.setState({category: category})
  }

  getData(endpoint){
    return API(endpoint)
          .then(res=>{ 
            this.setState({dataAPI: res})
            return res 
          })
  }

  handleClick(){
    if(this.state.dataAPI.next)
      this.setState({endpoint: this.state.dataAPI.next})
  }

  render() {
    return (
    <div className="App">
      <CssBaseline />
      <Container>
        <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={2} className="header">
          <Grid item xs>
            <img src={Koganlogo} className="App-logo" alt="logo" />
          </Grid>
          <Grid item xs={6} className="code">
            {<iframe src="https://codesandbox.io/embed/inspiring-hugle-xko7n?fontsize=10&hidenavigation=1&module=%2Fsrc%2Fdemo.js&theme=dark&view=editor" title="inspiring-hugle-xko7n" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>}
          </Grid>
          <Grid item xs>
            <img src={Hericlislogo} className="App-logo" alt="logo" />
          </Grid>
          <Divider />
        </Grid>

        <Grid container direction="row" justify="center" alignItems="center" spacing={5}>
          <Grid item >
            <ProductCategory updateCategory={this.updateCategory} data={this.getData} endpoint={this.state.endpoint}></ProductCategory>
          </Grid>
          <Grid item >
            <Button variant="contained" color="primary" onClick={this.handleClick} endIcon={<NavigateNextIcon/>}>
              Next Endpoint
            </Button>
          </Grid>
        </Grid>

        <Container className="ProductList">
          <ProductsList category={this.state.category} data={this.getData} endpoint={this.state.endpoint}></ProductsList>
        </Container>
      </Container>
    </div>
    )
  }
}

export default App;
