import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

@inject('store')
@observer 
export class TodoListRow extends React.Component {

	static propTypes = {
        num: PropTypes.number.isRequired,
        todoName: PropTypes.string.isRequired,
        enteredDate: PropTypes.string.isRequired,
        store: PropTypes.any,
        isCompleted: PropTypes.bool.isRequired
	}

	constructor(props) {
		super(props);
		this.store = this.props.store.todoListStore;
        this.onToggleTodoCheckbox = this.onToggleTodoCheckbox.bind(this);
	}

    onToggleTodoCheckbox(index) {
		this.store.toggleIsCompletedValueByIndex(index);
    }

	render () {
		return(
            <tr>
                <td>{ this.props.enteredDate }</td>
                <td>{ this.props.todoName }</td>
                <td className="checkbox-container"><input type="checkbox" 
                    name={'todo-'+this.props.num} 
                    onChange={this.onToggleTodoCheckbox.bind(this,this.props.num)} 
                    checked={this.props.isCompleted}
                /></td>
            </tr>
		);
	}
}