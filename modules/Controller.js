export default function Controller(model, view){

    const onTodoChange = (todos) => {
        view.renderTodos(todos);
    }

    onTodoChange(model.getTodo());

    //handle add Todo
    const _handleAddTodo = (todoText) => {
        model.addTodo(todoText);
    };

    //handle remove Todo

    const _handleRemoveTodo = (id) => {
        model.removeTodo(id);
        //view.renderTodos();
        
    }
    //handle edit Todo
    const _handleEditTodo = (id, text) => {
        model.editTodo(id, text);
    }
    //handle toggle Todo
    const _handleToggleTodo = (id) => {
        model.toggleTodo(id);
    };

    view.bindAddTodo(_handleAddTodo);
    model.bindTodoChanged(onTodoChange);
    view.bindDeleteTodo(_handleRemoveTodo);
    view.bindToggleTodo(_handleToggleTodo);
    //view.bindEditTodo(_handleEditTodo);

    return {};

}