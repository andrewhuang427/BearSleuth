import React from 'react';
import { Message } from './Message';

export class MessagesPanel extends React.Component {
    state = { input_value: '' }
    send = () => {
        if (this.state.input_value && this.state.input_value != '') {
            this.props.onSendMessage(this.props.channel.id, this.state.input_value);
            this.setState({ input_value: '' });
        }
    }

    handleInput = e => {
        this.setState({ input_value: e.target.value });
    }

    render() {

        let list1 = <div className="no-content-message">There are no messages to show</div>;
        let list2 = <div>{}</div>;

        if (this.props.channel)
        {
            if(this.props.channel.history)
            {
                list1 = this.props.channel.history.map(m => <Message key={m.id} id={m.id} senderName={m.senderName} text={m.text} />);
            }
            if(!this.props.channel.history)
            {
                if(this.props.channel.messages)
                {
                    list1 = {};
                    list2 = this.props.channel.messages.map(m => <Message key={m.id} id={m.id} senderName={m.senderName} text={m.text} />);
                };
            }
            if(this.props.channel.messages)
            {
                list2 = this.props.channel.messages.map(m => <Message key={m.id} id={m.id} senderName={m.senderName} text={m.text} />);
            }
        }

        return (
            <div className='messages-panel'>
                <div className="messages-list">{list1}</div>
                <div className="messages-list">{list2}</div>
                {this.props.channel &&
                    <div className="messages-input">
                        <input type="text" onChange={this.handleInput} value={this.state.input_value} />
                        <button onClick={this.send}>Send</button>
                    </div>
                }
            </div>);
    }

}