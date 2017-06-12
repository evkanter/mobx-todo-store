import { observable, action } from 'mobx';
import Moment from 'moment';

class TodoListStore {

	@observable todoList = [];

    getTodaysDate() {
        return Moment().format('l');
    }

    @action addNewTodoToList(todo) {
        if (todo.name.length > 0) {
            let date = todo.date
            if (date === '') { // Validate the date entered is valid.
                date = this.getTodaysDate();
            }
            this.todoList.push({"todoName": todo.name, "isCompleted": false, "enteredDate": date});
        }
    }


    @action clearCompletedTodos() {
        this.todoList = this.todoList.filter(todo => !todo.isCompleted);
    }

    @action deleteTodo(index) {
        if (this.todoList.length-1 >= index) {
            this.todoList.splice(index, 1);
        }
    }

	@action toggleIsCompletedValueByIndex(index) {
        this.todoList[index].isCompleted = !this.todoList[index].isCompleted;
	}
}

export const todoListStore = new TodoListStore();