import React from 'react';

class TerminalSkip extends React.Component{
    render(){
        return(
            <>
            <span
            className='skip'
            onClick={this.props.skip}
            >
                {this.props.children}</span>
            </>
        )
    }
}

export default TerminalSkip;