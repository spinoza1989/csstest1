console.log("Hello, World!");


// 为ID为 controller1的button 绑定点击事件
document.getElementById('controller1').addEventListener('click', function() {
    var newDiv = document.createElement('div');
    newDiv.className = 'child1';
    newDiv.innerHTML = 'child1';
    document.querySelector('.leftBottom').appendChild(newDiv);
});

