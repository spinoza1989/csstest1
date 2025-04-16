console.log("Hello, world_test22!");

let array = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" }
]; // 动态数组

let isScrolling = false; // 标记是否正在滚动

document.getElementById("addDivs").addEventListener("click", function () {
    renderElements();
    if (array.length > 2 && !isScrolling) {
        startScrolling();
    }
});

document.getElementById("addData").addEventListener("click", function () {
    // 模拟向数组中添加数据
    const newItem = { id: array.length + 1, name: `Item ${array.length + 1}` };
    array.push(newItem);
    renderElements(); // 重新渲染子元素
    if (!isScrolling) {
        startScrolling(); // 如果未滚动，则启动滚动
    }
});

function renderElements() {
    const parentDiv = document.querySelector(".a1");
    parentDiv.innerHTML = ""; // 清空 .a1 中的所有子元素

    const fragment = document.createDocumentFragment(); // 使用文档片段优化性能

    array.forEach(item => {
        const childDiv = document.createElement("div");
        childDiv.className = "b1";
        childDiv.textContent = `${item.id}: ${item.name}`;
        fragment.appendChild(childDiv);
    });

    parentDiv.appendChild(fragment); // 一次性插入所有子元素
}

function startScrolling() {
    const parentDiv = document.querySelector(".a1");
    const children = parentDiv.children;
    const childHeight = children[0].offsetHeight; // 子元素高度
    const childMargin = parseInt(getComputedStyle(children[0]).marginBottom, 10); // 子元素的 margin-bottom
    const parentHeight = parentDiv.offsetHeight; // 父元素高度

    let scrollPosition = parentDiv.scrollTop; // 当前滚动位置

    isScrolling = true; // 标记为正在滚动

    // 滚动逻辑
    const interval = setInterval(() => {
        const totalHeight = (childHeight + childMargin) * children.length - childMargin; // 动态计算子元素总高度

        scrollPosition += 1; // 每次向上滚动 1px
        parentDiv.scrollTop = scrollPosition; // 设置滚动位置

        // 检查是否滚动到最后一个子元素的底部
        if (scrollPosition >= totalHeight - parentHeight) {
            parentDiv.scrollTop = totalHeight - parentHeight; // 精确对齐最后一个子元素的底部

            // 检查数组是否有新数据
            if (array.length > children.length) {
                renderElements(); // 重新渲染子元素
            } else {
                clearInterval(interval); // 停止滚动
                isScrolling = false; // 标记为未滚动
            }
        }
    }, 20); // 每 20ms 滚动 1px
}