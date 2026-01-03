export const fetchTodos = async () =>{
 const url = "https://jsonplaceholder.typicode.com/todos?_limit=10";
    let responce = await fetch(url)
    let todos = await responce.json()
    return todos;
}