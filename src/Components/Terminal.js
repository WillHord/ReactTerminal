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
        this.handleTyping = this.handleTyping.bind(this);
        this.handleGlobals = this.handleGlobals.bind(this);
        this.handleSkip = this.handleSkip.bind(this);

        this.numberOfItems = this.props.children.length - this.props.children.filter(child => child.type === TerminalSkip).length;

        this.props.children.forEach((child, index) => this[`child-${index}`] = React.createRef());
    }

    handleSkip(){
        const childNumber = this.state.childNumber;
        if(childNumber < this.numberOfItems){
            if(this.props.children[childNumber] && this.props.children[childNumber].type === TerminalItem){
                this.setState({skipped: true})
                this.handleGlobals(this[`child-${childNumber}`])
            } else if(this.props.children[childNumber]){
                this.setState({childNumber: this.state.childNumber + 1});
                // this.numberOfItems = this.numberOfItems + 1;
            }
            setTimeout(() => this.handleSkip(), 0)
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
        if(this.state.childNumber === this.numberOfItems){
            child.setLastLine();
        }
        if(this.state.childNumber === 1){
            child.setFirstLine();
        }
    }

    handleTyping(){
        const childNumber = this.state.childNumber;
        if(childNumber < this.numberOfItems && this.props.children[childNumber].type !== TerminalItem){
            this.setState({childNumber: this.state.childNumber + 1});
            this.handleTyping();
        } else if(childNumber < this.numberOfItems && !this.state.skipped){
            if(childNumber === 0){
                this.handleGlobals(this[`child-${childNumber}`]);
                setTimeout(() => this[`child-${childNumber}`].handleType(), this.props.startDelay)
            } else{
                this.handleGlobals(this[`child-${childNumber}`]);
                this[`child-${childNumber}`].handleType();
            }
        }
        return
    }

    render(){
        return(
            <>
            {this.props.children.map((child, index) => {
            if(child.type === TerminalItem)
                    return <TerminalItem
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
            if(child.type === TerminalSkip)
                    return <TerminalSkip
                        key={`child-${this.props.children.indexOf(child).toString()}`}
                        ref={(ref) => {this[`child-${this.props.children.indexOf(child)}`] = ref;}}
                        skip={this.handleSkip}
                        >
                            {child}
                        </TerminalSkip>
            return <span
                key={`child-${index.toString()}`}
            >
                {child}
            </span>
            })}
            </>
        )
    }
}

export default Terminal;