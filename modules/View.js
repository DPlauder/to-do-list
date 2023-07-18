export default function View(){
    const createElement = (tag, className) => {
        const element = document.createElement(tag);
        className && element.classList.add(className);
        return element;       
    }
    const getElement = (selector) => {
        const element = document.querySelector(selector);
        return element;
    }

    const configure = () => {
        //create Title
        const root = getElement('#root');
        const title = createElement('h1', 'title');
        title.textContent = 'Todos';
        //create Form
        const form = createElement('form');
        const input = createElement('input');
        input.type = 'text';
        input.placeholder = 'Add todo';
        input.name = 'todo';
        //create Submit Button
        const submitButton = createElement('button');
        submitButton.textContent = 'Add';
        //create todo list
        const todoList = createElement('ul', "todo-list");
        //apend elements
        form.append(input, submitButton);
        root.append(title, form, todoList);

    }
    configure();

    const renderTodos = (todos) => {
        //delete all todos
        const todoList = getElement('.todo-list');
        todoList.innerHtlm = "";
        //show message if there are no todos
        if(todos.length === 0){
            const message = createElement("p", "message");
            message.textContent = "No todos in list";
            todoList.append(message);
            return;
        }
    }

    return {createElement, getElement};
}