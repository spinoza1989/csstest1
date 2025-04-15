console.log("Hello, world_test22!");

document.getElementById("addDivs").addEventListener("click", function () {
    const array = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
        { id: 4, name: "Item 4" }
    ]; // 自定义对象数组

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

    // 如果子元素个数大于 2，启动滚动效果
    if (array.length > 2) {
        startScrolling(parentDiv);
    }
});

function startScrolling(parentDiv) {
    const children = parentDiv.children;
    const childHeight = children[0].offsetHeight; // 子元素高度
    const totalHeight = childHeight * children.length; // 子元素总高度

    // 克隆子元素实现无缝滚动
    const cloneFragment = document.createDocumentFragment();
    Array.from(children).forEach(child => {
        const clone = child.cloneNode(true);
        cloneFragment.appendChild(clone);
    });
    parentDiv.appendChild(cloneFragment);

    let scrollPosition = 0; // 当前滚动位置

    // 滚动逻辑
    setInterval(() => {
        scrollPosition += 1; // 每次向上滚动 1px
        if (scrollPosition >= totalHeight) {
            scrollPosition = 0; // 重置滚动位置，实现无缝滚动
        }
        parentDiv.scrollTop = scrollPosition; // 设置滚动位置
    }, 20); // 每 20ms 滚动 1px
}