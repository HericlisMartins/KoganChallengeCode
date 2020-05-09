import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

  
class ProductsCategories extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            options:[],
            selected: ''
        };
    }

    handleChange = selected => {
        this.setState({ selected: selected});
    };

    componentDidMount() {
        this.props.data()
        .then(res=>{
            const category=[];
            res.objects.map( (product, i)=>{ 
                if(!category.includes(product.category))
                    category.push( product.category);
                return true;
            })

            this.setState({options: category})
        })
    }

    renderOptions() {
        return this.state.options.map((category, i) => {
          return (
              <MenuItem label={category} value={category} key={i} name={category}><em>{category}</em></MenuItem>
          );
        });
    }
    
    render(){
        return (
            <div>
            <FormControl >
                <InputLabel >Category: </InputLabel>
                <Select className="selectInput" onChange={this.handleChange} defaultValue="Air Conditioners">
                    {this.renderOptions()}
                </Select>
            </FormControl>
            </div>
        )
    }
}
  
export default ProductsCategories;