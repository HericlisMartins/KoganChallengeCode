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
            selectedOption: "Air Conditioners",
            endpoint:this.props.endpoint
        };
        this.handleChange = this.handleChange.bind(this);
        this.populateOptions(this.props.endpoint);
    }

    handleChange(event){
        this.setState({selectedOption:event.target.value});
        this.props.updateCategory(event.target.value);
    };

    populateOptions(endpoint) {
        this.props.data(endpoint)
        .then(res=>{
            const category=[];
            res.objects.map( (product, i)=>{ 
                if(!category.includes(product.category))
                    category.push( product.category);
                return true;
            })
            this.setState({options: category})
            this.setState({endpoint: endpoint})
        })
    }

    renderOptions() {
        return this.state.options.map((category, i) => {
            return (<MenuItem  label={category} value={category} key={i} name={category}><em>{category}</em></MenuItem>);
        });
    }
    
    render(){
        if(this.props.endpoint!==this.state.endpoint)
            this.populateOptions(this.props.endpoint)
        return (
            <div>
            <FormControl >
                <InputLabel >Category: </InputLabel>
                <Select className="selectInput" onChange={this.handleChange} value={this.state.selectedOption}>
                    {this.renderOptions()}
                </Select>
            </FormControl>
            </div>
        )
    }
}
  
export default ProductsCategories;