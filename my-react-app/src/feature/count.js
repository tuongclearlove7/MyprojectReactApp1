import React, {Component} from 'react';

class Count extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countdown: 0,
        };
    }

    componentDidMount = async () => {

        this.intervalId = setInterval(() => {

            this.setState(prevState => ({

                countdown: prevState.countdown + 1,
            }));
        }, 1000);

    }

    componentWillUnmount() {

        return clearInterval(this.intervalId);
    }

    render() {

        return (<div id={"countdown"}>
            <h1>
                <div className={"App-link"}>
                    <span>Bạn sẽ hết hạn đăng nhập sau {this.props.timer / 1000} giây</span>
                    <span className={this.state.countdown < 50 ? "countdown-after" : "countdown-before"}>
                    {this.state.countdown}
                    </span>
                    <span>
                        s
                    </span>
                </div>
            </h1>
        </div>);
    }
}

export default Count;