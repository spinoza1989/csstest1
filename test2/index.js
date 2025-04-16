console.log("Hello, world_test22!");

const queue = []; // 声明一个队列
const MAX_QUEUE_SIZE = 50; // 队列最大长度
let isScrolling = false; // 标记是否正在滚动
let scrollInterval = null; // 保存滚动的定时器
let index = 0;

document.getElementById("addData").addEventListener("click", function () {
    // 模拟向队列中添加数据
    index++;
    const newItem = { id: index, name: `Item ${index}` };
    if (queue.length < MAX_QUEUE_SIZE) {
        queue.push(newItem); // 队列未满，直接添加数据
    } else {
        queue.shift(); // 队列已满，移除最旧的数据
        queue.push(newItem); // 添加最新的数据
    }
    //console.log("当前队列：", queue);
});

function startProcessing() {
    const parentDiv = document.querySelector(".a1");

    // 定时器任务
    scrollInterval = setInterval(() => {
        //console.log(queue.length);

        const children = parentDiv.children;
        const childHeight = children.length > 0 ? children[0].offsetHeight : 100; // 子元素高度，默认 100px
        const childMargin = children.length > 0 ? parseInt(getComputedStyle(children[0]).marginBottom, 10) : 10; // 子元素的 margin-bottom，默认 10px
        const parentHeight = parentDiv.offsetHeight; // 父容器高度
        const totalHeight = (childHeight + childMargin) * children.length - childMargin; // 子元素总高度

        // 如果父容器未填满，优先从队列中取数据填满父容器
        while (totalHeight < parentHeight && queue.length > 0) {
            const data = queue.shift(); // 从队列中取出一条数据
            const childDiv = document.createElement("div");
            childDiv.className = "b1";
            childDiv.textContent = `${data.id}: ${data.name}`;
            parentDiv.appendChild(childDiv); // 插入到父容器中
        }

        // 第二个任务：检查子容器高度是否大于父容器，并滚动
        if (totalHeight > parentHeight) {
            isScrolling = true;
            parentDiv.scrollTop += 1; // 向上滚动 1px

            // 检查最后一个子元素的底部是否与父容器的底部重合
            const lastChild = children[children.length - 1];
            const lastChildBottom = lastChild.offsetTop + lastChild.offsetHeight;
            if (lastChildBottom <= parentDiv.scrollTop + parentHeight) {
                // 从队列中取出数据并插入到父容器中
                if (queue.length > 0) {
                    const data = queue.shift();
                    const childDiv = document.createElement("div");
                    childDiv.className = "b1";
                    childDiv.textContent = `${data.id}: ${data.name}`;
                    parentDiv.appendChild(childDiv); // 插入到父容器中
                }
            }
        } else {
            isScrolling = false;
        }
    }, 20); // 每 20ms 执行一次
}

// 启动定时器
startProcessing();