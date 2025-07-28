let currentNo = null;
const HOST     = location.hostname;
const API_BASE = `http://${HOST}:8080/api/todo`;

// 1) 목록 로드 & 렌더링
function loadTodoList() {
  fetch(API_BASE)
    .then(res => res.json())
    .then(list => {
      window.allTodos = list;
      const tbody = document.querySelector("#todo-list");
      tbody.innerHTML = "";
      list.forEach(todo => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${todo.todoNo}</td>
          <td>${todo.isDone === 'Y' ? '✅' : '❌'}</td>
          <td>${todo.categoryName}</td>
          <td>${todo.dueDate}</td>
        `;
        tr.addEventListener("click", () => loadTodoDetail(todo.todoNo));
        tbody.appendChild(tr);
      });
    })
    .catch(() => alert("목록 불러오기 실패!"));
}

// 2) 상세조회 & 보이기
function loadTodoDetail(no) {
  currentNo = no;
  fetch(`${API_BASE}/${no}`)
    .then(res => res.json())
    .then(todo => {
      document.querySelector("#todo-no").value       = todo.todoNo;
      document.querySelector("#todo-content").value  = todo.todoContent;
      document.querySelector("#todo-duedate").value  = todo.dueDate;
      document.querySelector("#todo-category").value = todo.categoryNo;
      document.querySelector("#created-date").textContent  = todo.createdDate;
      document.querySelector("#modified-date").textContent = todo.modifiedDate;

      document.querySelector("#list-section").style.display   = "none";
      document.querySelector("#detail-section").style.display = "block";
    })
    .catch(() => alert("상세 불러오기 실패!"));
}

// 3) 등록
function insertTodo() {
  const content    = document.querySelector("#content-input").value;
  const dueDate    = document.querySelector("#duedate-input").value;
  const categoryNo = document.querySelector("#category-select").value;
  if (!content || !dueDate || categoryNo === "0") {
    return alert("모든 항목을 입력하세요!");
  }
  fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ todoContent: content, dueDate, categoryNo: Number(categoryNo) })
  })
    .then(res => { if (!res.ok) throw new Error(); return res.json(); })
    .then(() => {
      alert("등록 완료!");
      document.querySelector("#content-input").value = "";
      document.querySelector("#duedate-input").value = "";
      document.querySelector("#category-select").value = "0";
      loadTodoList();
    })
    .catch(() => alert("등록 실패!"));
}

// 4) 수정
function updateTodo() {
  if (!currentNo) return alert("수정할 항목을 선택하세요!");
  const content    = document.querySelector("#todo-content").value;
  const dueDate    = document.querySelector("#todo-duedate").value;
  const categoryNo = document.querySelector("#todo-category").value;
  if (!content || !dueDate || categoryNo === "0") {
    return alert("모든 항목을 입력하세요!");
  }
  fetch(API_BASE, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todoNo: currentNo,
      todoContent: content,
      dueDate,
      categoryNo: Number(categoryNo)
    })
  })
    .then(res => { if (!res.ok) throw new Error(); return res.json(); })
    .then(() => {
      alert("수정 완료!");
      loadTodoList();
      loadTodoDetail(currentNo);
    })
    .catch(() => alert("수정 실패!"));
}

// 5) 삭제
function deleteTodo() {
  if (!currentNo) return alert("삭제할 항목을 선택하세요!");
  if (!confirm("정말 삭제하시겠습니까?")) return;
  fetch(`${API_BASE}/${currentNo}`, { method: "DELETE" })
    .then(res => { if (!res.ok) throw new Error(); })
    .then(() => {
      alert("삭제 완료!");
      currentNo = null;
      document.querySelector("#detail-section").style.display = "none";
      document.querySelector("#list-section").style.display   = "block";
      loadTodoList();
    })
    .catch(() => alert("삭제 실패!"));
}

// 6) 뒤로 가기 & 필터 적용
document.querySelector("#back-btn").addEventListener("click", () => {
  document.querySelector("#detail-section").style.display = "none";
  document.querySelector("#list-section").style.display   = "block";
  currentNo = null;
});
document.querySelector("#category-filter").addEventListener("change", () => {
  const f = document.querySelector("#category-filter").value;
  const filtered = f === "0"
    ? window.allTodos
    : window.allTodos.filter(t => t.categoryNo.toString() === f);
  const tbody = document.querySelector("#todo-list");
  tbody.innerHTML = "";
  filtered.forEach(todo => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${todo.todoNo}</td>
      <td>${todo.isDone === 'Y' ? '✅' : '❌'}</td>
      <td>${todo.categoryName}</td>
      <td>${todo.dueDate}</td>
    `;
    tr.addEventListener("click", () => loadTodoDetail(todo.todoNo));
    tbody.appendChild(tr);
  });
});

// 7) 초기화
window.onload = () => {
  loadTodoList();
  document.querySelector("#insert-btn").addEventListener("click", insertTodo);
  document.querySelector("#update-btn").addEventListener("click", updateTodo);
  document.querySelector("#delete-btn").addEventListener("click", deleteTodo);
};
