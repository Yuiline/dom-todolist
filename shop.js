// ---------- 商店 ----------

// 商品表：只写数据，界面交给下面的循环生成
const shopItems = [
  { name: "可乐",         price: 5,   favor: 1 },
  { name: "毛绒抱枕",      price: 20,  favor: 5 },
  { name: "自助餐券",      price: 120, favor: 30 },
  { name: "Switch 游戏机", price: 500, favor: 200 }
]

const shopOverlay = document.getElementById("shopOverlay")
const shopList    = document.getElementById("shopList")
const shopFavorEl = document.getElementById("shopFavor")
const shopCoinEl  = document.getElementById("shopCoin")
const shopMsgEl   = document.getElementById("shopMsg")

// 刷新商店顶部那两个数字
function renderShop() {
  shopFavorEl.textContent = save.favor
  shopCoinEl.textContent = save.coin
}

function showMsg(text) {
  shopMsgEl.textContent = text
}

// 买一件商品
function buy(item) {
  if (save.favor >= FAVOR_MAX) {
    showMsg("好感度已经满了，先别浪费金币啦")
    return
  }
  if (!spendCoin(item.price)) {
    showMsg("金币不够，还差 " + (item.price - save.coin) + " 个")
    return
  }
  addFavor(item.favor)
  renderShop()
  showMsg("购买成功：" + item.name + "，好感度 +" + item.favor)
}

// 按商品表生成列表：以后加商品只需要往数组里加一条
shopItems.forEach(function (item) {
  const row = document.createElement("div")
  row.className = "shopItem"

  const name = document.createElement("span")
  name.className = "shopName"
  name.textContent = item.name

  const info = document.createElement("span")
  info.className = "shopInfo"
  info.textContent = item.price + " 金币 → 好感 +" + item.favor

  const btn = document.createElement("button")
  btn.textContent = "购买"
  btn.addEventListener("click", function () {
    buy(item)          // 这个 item 就是当前这一圈的这件商品
  })

  row.appendChild(name)
  row.appendChild(info)
  row.appendChild(btn)
  shopList.appendChild(row)
})

// 点左侧"商店"图标 → 打开
document.getElementById("menuShop").addEventListener("click", function () {
  renderShop()
  showMsg("")
  shopOverlay.classList.add("open")
})

// 点遮罩空白处 → 关闭（点面板里面不关）
shopOverlay.addEventListener("click", function (e) {
  if (e.target === shopOverlay) shopOverlay.classList.remove("open")
})
