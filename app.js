// ---------- 拿到页面上的元素 ----------
const todoInput = document.getElementById("todo")   // 输入框
const addBtn    = document.getElementById("add")    // 添加按钮
const clearBtn  = document.getElementById("clear")  // 全部清空按钮
const listEl    = document.getElementById("list")   // 待办列表 <ul>
const statEl    = document.getElementById("stat")   // 统计文字
const tipEl     = document.getElementById("tip")    // 提示文字

// ---------- 统计 ----------
// 列表有任何变化就调用一次，重新算一遍总数和已完成数
function renderStat() {
  const done = listEl.querySelectorAll("li.done").length
  statEl.textContent = "共 " + listEl.children.length + " 项，完成 " + done + " 项"
}

// ---------- 添加一条待办 ----------
function addTodo() {
  const text = todoInput.value.trim()

  if (text === "") {
    tipEl.textContent = "请先输入内容"
    return
  }
  tipEl.textContent = ""

  const li = document.createElement("li")
  li.textContent = text

  const del = document.createElement("span")
  del.textContent = "删除"
  del.className = "del"
  li.appendChild(del)

  listEl.appendChild(li)
  todoInput.value = ""
  renderStat()
}

// ---------- 事件绑定 ----------
addBtn.addEventListener("click", addTodo)

// 输入框里按回车也能添加
todoInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTodo()
})

// 全部清空
clearBtn.addEventListener("click", function () {
  listEl.innerHTML = ""
  renderStat()
})

// 事件委托：点文字切换完成状态，点"删除"删掉那一条
listEl.addEventListener("click", function (e) {
  const li = e.target.closest("li")
  if (!li) return

  if (e.target.classList.contains("del")) {
    li.remove()
  } else {
    li.classList.toggle("done")
  }
  renderStat()
})

// ---------- 初始化 ----------
renderStat()

// ---------- 面板开关：点左侧"待办事项"图标 ----------

const todoOverlay = document.getElementById("todoOverlay")

document.getElementById("menuTodo").addEventListener("click", function () {
  todoOverlay.classList.add("open")
})

// 点遮罩空白处关闭（点面板里面不关）
todoOverlay.addEventListener("click", function (e) {
  if (e.target === todoOverlay) todoOverlay.classList.remove("open")
})
