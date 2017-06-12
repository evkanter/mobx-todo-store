import React from 'react';
import ReactDOM from 'react-dom';
import { observer, Provider } from 'mobx-react';

import { TodoList } from './views/todo-list/todo-list.jsx';
import { masterStore } from './core/stores/master.store.js';

import '../styles/main.scss';

@observer class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Provider store={masterStore}>
				<main id="main-content">
					<TodoList />
				</main>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
