const list = document.getElementById("ft_list");
const newBtn = document.getElementById("newBtn");

// โหลด TO DO จาก localStorage
function loadTodos() {
    const data = localStorage.getItem("todos");
    if (!data) return;

    const todos = JSON.parse(data);
    todos.forEach(text => {
        addTodo(text);
    });
}

// บันทึก TO DO ลง localStorage
function saveTodos() {
    const todos = [];
    const items = document.querySelectorAll(".todo");

    items.forEach(item => {
        todos.push(item.textContent);
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

// เพิ่ม TO DO
function addTodo(text) {
    const div = document.createElement("div");
    div.className = "todo";
    div.textContent = text;

    div.addEventListener("click", function () {
        const confirmDelete = confirm("Do you want to remove this TO DO?");
        if (confirmDelete) {
            div.remove();
            saveTodos();
        }
    });

    // ใส่ไว้บนสุด
    if (list.firstChild) {
        list.insertBefore(div, list.firstChild);
    } else {
        list.appendChild(div);
    }
}

// ปุ่ม New
newBtn.addEventListener("click", function () {
    const text = prompt("Enter a new TO DO:");
    if (!text || text.trim() === "") return;

    addTodo(text.trim());
    saveTodos();
});

// โหลดตอนเปิดเว็บ
window.onload = function () {
    loadTodos();
};
