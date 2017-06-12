jest.unmock('../todo-list');

import { TodoList } from '../todo-list';
import { MemoryRouter } from 'react-router-dom';
import { todoListStore } from '../../../core/stores/todo-list.store.js'

describe('<TodoList />', () => {

    const store = todoListStore;

    describe('renders', () => {
        test('matches previous todo list snapshot', () =>{
            const component = renderer.create(
                <MemoryRouter>
                    <TodoList store={store} />
                </MemoryRouter>
            );
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
