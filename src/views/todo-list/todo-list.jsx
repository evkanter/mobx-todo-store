import React from 'react';
import { observer, inject, PropTypes } from 'mobx-react';

import { TodoListRow } from './todo-list-row.jsx';

@inject('store')
@observer 
export class TodoList extends React.Component {

	static propTypes = {
		store: PropTypes.observableObject.isRequired
	}

	constructor(props) {
		super(props);
		this.store = this.props.store.todoListStore;
		this.state = {newTodoName: '', newTodoDate: ''};

		this.addATodo = this.addATodo.bind(this);
		this.clearCompletedTodos = this.clearCompletedTodos.bind(this);
		this.handleTextboxChange = this.handleTextboxChange.bind(this);
		this.resetInputFields = this.resetInputFields.bind(this);
	}

	addATodo(event) {
		event.preventDefault();
		let todo = {
			name: this.state.newTodoName, 
			date: this.state.newTodoDate
		};
		this.store.addNewTodoToList(todo);
		this.resetInputFields();
	}

	clearCompletedTodos(event) {
		event.preventDefault();
		this.store.clearCompletedTodos();
	}
	
	handleTextboxChange (name, e) {
		if (name==='newTodoName') {
			this.setState({newTodoName: e.target.value});
		} else if (name==='newTodoDate') {
			this.setState({newTodoDate: e.target.value});
		}
	}

	resetInputFields() {
		this.setState({newTodoName: '', newTodoDate: ''});
	}
	
	getTodos() {
		this.rows = this.store.todoList.map(function(todo, i){
			return <TodoListRow 
				key={i} 
				num={i} 
				enteredDate={todo.enteredDate} 
				todoName={todo.todoName} 
				isCompleted={todo.isCompleted} />;
		}, this.props)
	}

	render () {
		this.getTodos();
		return(
			<section className="todo-list-container">
				<div className="todo-list">
					<h1>My Todo List</h1>
					<form>
						<table>
							<thead>
								<tr>
									<th className="small">date</th>
									<th>to do</th>
									<th className="small">&#10003;</th>
								</tr>
							</thead>
							<tbody>

								{this.rows}

								<tr className="grey-row">
									<td><input type="date" 
											id="newTodoDate" 
											value={this.state.newTodoDate}
											onChange={this.handleTextboxChange.bind(this,'newTodoDate')}																		
									/></td>
									<td><input type="text" 
											id="newTodoName" 
											className="fullsize"
											placeholder="Add an item"
											value={this.state.newTodoName} 
											maxLength="60"
											required="required"
											onChange={this.handleTextboxChange.bind(this,'newTodoName')}								
									/></td>
									<td><button className="small"
										onClick={this.addATodo.bind(this)} 
										disabled={this.state.newTodoName.length === 0} >+</button></td>
								</tr>

								<tr>
									<td colSpan={3} className="button-bar">
										<button onClick={this.clearCompletedTodos.bind(this)}>Clear completed</button>
									</td>
								</tr>
							</tbody>
						</table>
						
					</form>
				</div>
            </section>
		);
	}
}