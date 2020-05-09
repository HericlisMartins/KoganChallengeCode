import React from 'react';
import Koganlogo from './koganlogo.png';
import Hericlislogo from './logogreyhericlis.png';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CodeIcon from '@material-ui/icons/Code';
import './App.css';

import axios from 'axios';
import ProductCategory from './modules/CategorySelect'; //react-select eith axios get api json
//import ProductList from './Products';

class iframe extends React.Component {
  url() {
    return {
      __html: this.props.url
    }
  }
  render(){
    return (
      <div>
        <div dangerouslySetInnerHTML={ this.url() } />
      </div>
    );
  }
}

async function API(endpoint="api/products/1"){
  const urlLink = "http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/"+endpoint
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
      category: null,
      dataAPI: []
    }
    this.updateCategory = this.updateCategory.bind(this);
  }
 
  updateCategory(category) {
    if(category) this.setState({category: category})
  }

  getData(){
    return API()
          .then(res=>{ return res })
  }

  render() {
    
    return (
    <div className="App">
      <CssBaseline />
      <Container>
        <Grid container spacing={2} className="header">
          <Grid item xs>
            <img src={Koganlogo} className="App-logo" alt="logo" />
          </Grid>
          <Grid item xs className="code">
            <CodeIcon/> 
            <iframe src="https://codesandbox.io/s/winter-fire-8o7s0?fontsize=14&hidenavigation=1&theme=dark&view=editor"></iframe>
          </Grid>
          <Grid item xs>
            <img src={Hericlislogo} className="App-logo" alt="logo" />
          </Grid>
        </Grid>

        <ProductCategory update={this.updateCategory} data={this.getData} ></ProductCategory>
        {
        /*
        <ProductList category={this.state.category} update={this.updateState}  data={this.state.data}></ProductList>
        */}

      </Container>
    </div>
    )
  }
}

export default App;
