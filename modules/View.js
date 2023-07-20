export default function View(){

    let _tempTodoText = "";
 
    const createElement = (tag, className) => {
        const element = document.createElement(tag);
        className && element.classList.add(className);
        return element;       
    }
    const getElement = (selector) => {
        const element = document.querySelector(selector);
        return element;
    }

    const handleValues = () => {
        const input = getElement("input");
        const todoText = () => input.value;
        const resetInput = () => (input.value = "");
        return [todoText, resetInput]
    };

    const bindAddTodo = (handler) => {
        const form = getElement('form');
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const [todoText, resetInput] = handleValues();
            handler(todoText());
            resetInput();
            
        });
    }
    const bindDeleteTodo = (handler) => {
        const todoList = getElement('.todo-list');
        todoList.addEventListener('click', (e) => {
            if(e.target.className === 'delete'){
                const id = parseInt(e.target.parentElement.id);
                handler(id);
            };                  
        });
    };

    const bindEditTodo = (handler) => {
        const todoList = getElement('.todo-list');
        todoList.addEventListener('focusout', (event) => {   
            if(event.target.className === "editable"){        
                const id = parseInt(event.target.parentElement.id);
                const _tempTodoText = event.target.innerHTML;
                handler(id, _tempTodoText);  
            }              
        });        
    };

    const bindToggleTodo = (handler) => {
        const todoList = getElement('.todo-list');
        todoList.addEventListener('change', (e) => {
            if(e.target.type === 'checkbox'){
                const id = parseInt(e.target.parentElement.id);
                handler(id)
            };
        });
        
    };

    const configure = () => {
        //create Title
        const root = getElement('#root');
        const title = createElement('h1', 'title');
        title.textContent = 'Todos';
        //create Form
        const form = createElement('form');
        const input = createElement('input');
        input.classList.add('input_todo')
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
    };
    configure();

    const renderTodos = (todos) => {
        //delete all todos
        const todoList = getElement('.todo-list');
        todoList.innerHTML = "";
        //show message if there are no todos
        if(todos.length === 0){
            const message = createElement("p", "message");
            message.textContent = "No todos in list";
            todoList.append(message);
            return;
        } else{
            //render todos
            todos.forEach(todo => {
                //create list element
                const listElement = createElement('li');
                listElement.id = todo.id;

                //create Chechkbox to toogle todos
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.completed;

                //span with content withtable text
                const span = createElement('span', 'editable');
                span.contentEditable = true;

                //strike through completed todos
                if(todo.completed){
                    const strike = createElement("s");
                    strike.textContent = todo.text;
                    span.appendChild(strike);
                }else {
                    span.textContent = todo.text;
                }

                //create delete button
                const deleteButton = createElement('button', 'delete');
                deleteButton.textContent = "delete";

                //append elements to listElement
                listElement.append(checkbox, span, deleteButton);

                //append ListElement to todoList
                todoList.append(listElement);

            });
        }
    }
    const _initTempListener = () => {
        const todoList = document.querySelector(".todo-list");
        todoList.addEventListener("input", (event) => {
            if(event.target.className === "editable"){
                _tempTodoText = event.target.innerText;
            };           
        });       
    };
    _initTempListener();
     


    return {createElement, getElement, renderTodos, bindAddTodo, bindDeleteTodo, bindToggleTodo, bindEditTodo};
}