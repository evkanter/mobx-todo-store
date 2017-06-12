import { MemoryRouter } from 'react-router-dom';
import { todoListStore } from '../../../core/stores/todo-list.store.js'

describe("TodoListStore", function() {

    describe("TodoListStore.functional", () => {
        it("makes sure store is empty to start and adds a todo to the todoList", () => {
            let store = todoListStore;
            store.addNewTodoToList('Automated Todo 1');
            expect(store.todoList.length).toBe(1);
        })
    })

})