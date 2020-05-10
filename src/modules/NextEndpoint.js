import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

class NextEndpoint extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.setnextEndpoint();
    }

    render(){
        return(    
            <div>
            <FormControl>
                <Button variant="contained" color="primary" onClick={this.handleClick} endIcon={<NavigateNextIcon/>}>
                    Next Endpoint
                </Button>
            </FormControl>
            </div>
        )
    }

}
export default NextEndpoint;