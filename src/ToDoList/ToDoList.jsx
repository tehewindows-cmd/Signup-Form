import React, { useState } from "react";

function ToDoList() {
    const [tasks, setTasks] = useState(["Clean kitchen", "Walk the dog", "Rape Assadi"]);
    const [newTask, setNewTask] = useState()

    function handleImputChange(e) {
        setNewTask(e.target.value)
    }

    function addTask() {
        
        if(newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function RemoveTask(index) {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    function moveUpTask(index) {
        
        if(index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveDownTask(index) {

        if(index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return(
        <>
            <div className="List-header">
                <h1>To-Do-List</h1>

                <input type="text" 
                value={newTask}
                placeholder="Enter a task..."
                onChange={handleImputChange} />

                <button onClick={addTask}>Add</button>
            </div>

            <ol className="List-body">
                {tasks.map((task, index) => 
                    <li key={index}>
                        <span> {task} </span>
                        <button onClick={() => moveUpTask(index)}>👆</button>
                        <button onClick={() => moveDownTask(index)}>👇</button>
                        <button onClick={() => RemoveTask(index)}>×</button>
                    </li>
                )}
            </ol>
        </>
    )
}


export default ToDoList