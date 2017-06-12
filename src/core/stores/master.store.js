import { todoListStore } from './todo-list.store';
import { observable } from 'mobx';

class MasterStore {
	constructor() {
		this.todoListStore = todoListStore;
	}

	@observable user = "";
}

export const masterStore = new MasterStore();