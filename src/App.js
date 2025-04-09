import { useState } from 'react';

export default function TaskGenerator() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isInputMode, setIsInputMode] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setTasks([...tasks, { id: Date.now(), text: inputValue.trim(), importance: 1 }]);
      setInputValue('');
      setCurrentNumber(currentNumber + 1);
    }
  };

  const handleDoneClick = () => {
    if (inputValue.trim()) {
      setTasks(prev => [...prev, { id: Date.now(), text: inputValue.trim(), importance: 1 }]);
      setInputValue('');
      setCurrentNumber(currentNumber + 1);
    }
    
    if (tasks.length > 0 || inputValue.trim()) {
      setIsInputMode(false);
    }
  };
  

  const handleImportanceChange = (id, importance) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, importance } : task
      )
    );
  };

  const handlePickTask = () => {
    const availableTasks = tasks.filter(
      (task) => !completedTasks.includes(task.id)
    );
    
    if (availableTasks.length > 0) {
      // Weight tasks by importance
      const weightedTasks = [];
      availableTasks.forEach(task => {
        for (let i = 0; i < task.importance; i++) {
          weightedTasks.push(task);
        }
      });
      
      const randomIndex = Math.floor(Math.random() * weightedTasks.length);
      setSelectedTask(weightedTasks[randomIndex]);
    } else {
      setSelectedTask(null);
    }
  };

  const handleTaskCompletion = (id) => {
    setCompletedTasks([...completedTasks, id]);
    setSelectedTask(null);
  };

  const handleBackToEdit = () => {
    setIsInputMode(true);
    setSelectedTask(null);
    setCurrentNumber(tasks.length > 0 ? tasks.length + 1 : 1);
  };

  const startEditingTask = (id) => {
    setEditingTaskId(id);
  };

  const updateTaskText = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const finishEditingTask = () => {
    setEditingTaskId(null);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Task Generator</h1>
        
        {isInputMode ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Work Space:</label>
              <div className="border border-gray-300 rounded-md p-3 min-h-32">
                {tasks.map((task, index) => (
                  <div key={task.id} className="mb-2">
                    <span className="font-bold mr-2">{index + 1}.</span>
                    {editingTaskId === task.id ? (
                      <input 
                        type="text"
                        value={task.text}
                        onChange={(e) => updateTaskText(task.id, e.target.value)}
                        onBlur={finishEditingTask}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            finishEditingTask();
                          }
                        }}
                        className="border-b border-gray-300 focus:outline-none focus:border-blue-500 w-4/5"
                        autoFocus
                      />
                    ) : (
                      <span 
                        onClick={() => startEditingTask(task.id)}
                        className="cursor-pointer hover:text-blue-500"
                      >
                        {task.text}
                      </span>
                    )}
                  </div>
                ))}
                <div className="flex">
                  <span className="font-bold mr-2">{currentNumber}.</span>
                  <input
                    type="text"
                    className="focus:outline-none w-4/5"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a task and press Enter"
                  />
                </div>
              </div>
            </div>
            
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
              onClick={handleDoneClick}
              disabled={tasks.length === 0}
            >
              Done
            </button>
          </>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Rate your tasks:</h2>
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li 
                    key={task.id} 
                    className={`flex items-center p-2 rounded-md ${completedTasks.includes(task.id) ? 'bg-gray-100 text-gray-500 line-through' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={completedTasks.includes(task.id)}
                      onChange={() => handleTaskCompletion(task.id)}
                      className="mr-2"
                      disabled={completedTasks.includes(task.id)}
                    />
                    <span className="flex-grow">
                      {editingTaskId === task.id ? (
                        <input 
                          type="text"
                          value={task.text}
                          onChange={(e) => updateTaskText(task.id, e.target.value)}
                          onBlur={finishEditingTask}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              finishEditingTask();
                            }
                          }}
                          className="border-b border-gray-300 focus:outline-none focus:border-blue-500 w-4/5"
                          autoFocus
                          disabled={completedTasks.includes(task.id)}
                        />
                      ) : (
                        <span 
                          onClick={() => !completedTasks.includes(task.id) && startEditingTask(task.id)}
                          className={`${!completedTasks.includes(task.id) ? 'cursor-pointer hover:text-blue-500' : ''}`}
                        >
                          {task.text}
                        </span>
                      )}
                    </span>
                    <div className="flex">
                      {[1, 2, 3].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleImportanceChange(task.id, star)}
                          className={`w-6 h-6 ${task.importance >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                          disabled={completedTasks.includes(task.id)}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {selectedTask && (
              <div className="mb-4 p-4 bg-blue-50 rounded-md border border-blue-200">
                <h3 className="text-lg font-semibold mb-2">Your selected task:</h3>
                <p className="mb-2">{selectedTask.text}</p>
                <div className="flex justify-between">
                  <span className="text-yellow-500">
                    {Array(selectedTask.importance).fill('★').join('')}
                  </span>
                  <button
                    onClick={() => handleTaskCompletion(selectedTask.id)}
                    className="text-sm bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded"
                  >
                    Mark as done
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex space-x-2">
              <button
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
                onClick={handlePickTask}
                disabled={tasks.length === completedTasks.length}
              >
                Pick a Task
              </button>
              <button
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
                onClick={handleBackToEdit}
              >
                Edit Tasks
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}