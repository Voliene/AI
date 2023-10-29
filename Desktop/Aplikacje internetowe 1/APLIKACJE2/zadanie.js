
class Todo {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [
            {
                task: "Chocolate",
                dueDate: "2023-10-30T12:00" // Ustaw termin w odpowiednim formacie
            },
            {
                task: "Macaroon",
                dueDate: "2023-10-31T15:30"
            },
            {
                task: "Chupachups",
                dueDate: "2023-11-01T09:00"
            },
            {
                task: "Bon Bons",
                dueDate: "2023-11-02T14:00"
            },
            {
                task: "Candy Canes",
                dueDate: "2023-11-03T10:30"
            }
        ];
        this.term = '';
        this.draw(); // Wywołaj funkcję draw, aby wyświetlić zadania na stronie
    }

    setTerm(term) {
        this.term = term;
        this.draw();
    }
    addTask(task) {
        const newTaskInput = document.getElementById("newTask");

        const taskValue = newTaskInput.value;
        if (taskValue.trim() === "") {
            alert("Proszę wpisać nazwę zadania.");
            return;
        }

        const taskDueDateInput = document.getElementById("taskDueDate");
        const taskDueDateValue = taskDueDateInput.value;


        this.tasks.push({ task: taskValue, dueDate: taskDueDateValue });
        this.saveToLocalStorage();
        this.draw();
    }

    removeTask(task) {
        // Pobierz indeks zadania w tablicy
        const index = this.tasks.indexOf(task);

        if (index !== -1) {
            this.tasks.splice(index, 1);
            this.saveToLocalStorage();
            this.draw(); // Wywołaj funkcję draw, aby zaktualizować widok
        }
    }
    draw() {
        const todoList = document.getElementById("taskList");
        todoList.innerHTML = '';
        const filteredTasks = this.getFilteredTasks();
        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement('tr');
            const cell1 = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `checkbox${index}`;
            const label1 = document.createElement('label');
            label1.setAttribute('for', `checkbox${index}`);
            label1.textContent = task.task;
            const taskName = task.task;
            const highlightedTask = this.highlightMatch(taskName, this.term); // Wydobywanie pasujących fragmentów
            label1.innerHTML = highlightedTask; // Ustaw wydobyte fragmenty z podświetleniem
            cell1.appendChild(checkbox);
            cell1.appendChild(label1);

            // Druga komórka (td) - wyświetlenie czasu zadania
            const cell2 = document.createElement('td');
            const datetimeLocal = document.createElement('input');
            datetimeLocal.type = 'datetime-local';
            datetimeLocal.value = task.dueDate; // Wyświetlenie czasu zadania
            const label2 = document.createElement('label');
            label2.setAttribute('for', '');
            cell2.appendChild(datetimeLocal);
            cell2.appendChild(label2);

            // Trzecia komórka (td)
            const cell3 = document.createElement('td');
            const button = document.createElement('button');
            button.textContent = 'Usun';
            button.onclick = () => this.removeTask(task);
            cell3.appendChild(button);

            taskItem.appendChild(cell1);
            taskItem.appendChild(cell2);
            taskItem.appendChild(cell3);

            taskItem.addEventListener('click', () => this.editTask(index, task.task, task.dueDate));
            todoList.appendChild(taskItem);

        });
    }
    editTask(index, task, dueDate) {
        const newTask = prompt('Edytuj zadanie:', task);
        if (newTask === null) {
            return; // Jeśli użytkownik anulował, to nie wprowadzamy zmian
        }

        const newDueDate = prompt('Edytuj termin:', dueDate);
        if (newDueDate === null) {
            return; // Jeśli użytkownik anulował, to nie wprowadzamy zmian
        }

        this.tasks[index] = { task: newTask, dueDate: newDueDate };
        this.saveToLocalStorage();
        this.draw();
    }
    saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    getFilteredTasks() {
        return this.tasks.filter(task => {
            return task.task.toLowerCase().includes(this.term.toLowerCase()) || task.dueDate.includes(this.term);
        });
    }
    highlightMatch(text, term) {
        if (!term) {
            return text;
        }

        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<span class="highlighted">$1</span>');
    }
}
const todo = new Todo();









