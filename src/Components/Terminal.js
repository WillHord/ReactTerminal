import React from 'react';

import TerminalItem from './TerminalItem'
import TerminalSkip from './TerminalSkip'

class Terminal extends React.Component{
    static defaultProps ={
        typingSpeed: 150,
        lineDelay: 1000,
        timeInBetweenLines: 150,
        startDelay: 2000,
        prefix: '',
    }
    constructor(props){
        super (props);
        this.state = {
            childNumber: 0,
            typingSpeed: 150,
            firstLine: true,
            lineComplete: false,
            skipped: false,
        }
        this.output = '';
        this.handleTyping = this.handleTyping.bind(this);
        this.handleGlobals = this.handleGlobals.bind(this);
        this.handleSkip = this.handleSkip.bind(this);

        this.numberOfItems = this.props.children.filter(child => child.type.name === 'TerminalItem')

        const {children} = props;
        children.forEach((child, index) => this[`child-${index}`] = React.createRef());
    }

    handleSkip(){
        const childNumber = this.state.childNumber;
        if(childNumber < this.numberOfItems.length){
            this.setState({skipped: true})
            this.handleGlobals(this[`child-${childNumber}`])
            setTimeout(() => this.handleSkip(), 100)
        } else{
            return
        }
        return
    }

    componentDidMount() {
        setTimeout(this.handleTyping, 500)
      }

    handleGlobals(child){
        this.setState({childNumber: this.state.childNumber + 1});
        if(this.props.prefix !== ''){
            child.changePrefix(this.props.prefix);
        }
        if(this.state.childNumber === this.numberOfItems.length){
            child.setLastLine();
        }
        if(this.state.childNumber === 1){
            child.setFirstLine();
        }
    }

    handleTyping(){
        const childNumber = this.state.childNumber;

        if(childNumber !== this.numberOfItems.length && !this.state.skipped){
            if(childNumber === 0){
                this.handleGlobals(this[`child-${childNumber}`]);
                setTimeout(() => this[`child-${childNumber}`].handleType(), this.props.startDelay)
            } else{
                this.handleGlobals(this[`child-${childNumber}`]);
                this[`child-${childNumber}`].handleType();
            }
            // this.handleGlobals(this[`child-${childNumber}`]);
            // this[`child-${childNumber}`].handleType();
        }
        return
    }

    render(){
        const {children} = this.props;
        return(
            <>
            {children.filter(child => child.type.name === 'TerminalItem').map((child, index) => (
                <TerminalItem
                key={`child-${index.toString()}`}
                lineComplete={this.handleTyping}
                ref={(ref) => {this[`child-${index}`] = ref;}}
                shouldDelete={child.props.shouldDelete}
                newLine={child.props.newLine}
                style={child.props.style}
                className={this.props.className}
                skip={this.state.skipped}
                >
                    {child}
                </TerminalItem>
            ))}
            {children.filter(child => child.type.name === 'TerminalSkip').map((child,index) => (
                <TerminalSkip
                key={`child-${children.indexOf(child).toString()}`}
                ref={(ref) => {this[`child-${children.indexOf(child)}`] = ref;}}
                skip={this.handleSkip}
                >
                    {child}
                </TerminalSkip>
            ))
            }
            </>
        )
    }
}

export default Terminal;