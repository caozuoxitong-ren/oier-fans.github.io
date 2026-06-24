# switch 多分支结构

在 C++ 中，switch 语句用于基于不同的条件执行不同的代码块，它通常用来替代一系列的 if-else 语句，使代码更清晰和易读。一个 switch 语句允许测试一个变量等于多个值时的情况。每个值称为一个 case，且被测试的变量会对每个 switch case 进行检查。

## 一、switch语句核心知识点

### 1. 基本概念与适用场景

switch语句是C++提供的多分支选择语句，适用于等值多分支判断的场景。当分支较多时，使用switch比嵌套的if-else结构更清晰、更高效。

适用场景特征：

- 判断条件单一：仅判断「表达式的值是否等于某个固定常量」

- 分支数量多：通常≥3个分支时switch优势明显

- 值域离散：如菜单选项、星期几、月份等

### 2. 语法格式

```cpp
switch (表达式) {
    case 常量表达式1:
        语句序列1;
        break;
    case 常量表达式2:
        语句序列2;
        break;
    // 可以有任意多个case
    case 常量表达式n:
        语句序列n;
        break;
    default:
        语句序列n+1;
}
```

### 3. 执行流程

| 步骤 | 操作说明 |
|-----|----------|
| 1 | 计算switch后圆括号内表达式的值，得到M（整型/字符型/枚举型）|
| 2 | 将M与各case后的常量表达式进行比较 |
| 3 | 若找到匹配的case，从该处开始执行后续语句，直到遇到break语句或switch结束 |
| 4 | 若未找到匹配，且存在default，则执行default |
| 5 | 若未找到匹配且无default，则不执行任何操作 |


### 4. switch vs if-else 对比

| 对比维度 | 	switch |	if-else |
|:------|:-------| :---------|
| 适用条件	 | 仅等值判断（==）	| 等值+范围+复杂条件 |
| 表达式类型 | 整型/字符型/枚举 | 任意布尔表达式 |
| 执行效率 | 可能生成跳转表，效率高 | 逐条件判断，分支多时效率低 |
| 代码可读性 | 多分支时结构清晰 | 多分支嵌套易臃肿 |

## 二、奥赛必知的避坑指南

### 1. 表达式类型限制

switch后的表达式必须是整型、字符型或枚举类型，不支持浮点型、字符串、布尔型。

```cpp
double d = 3.14;
switch (d) {  // ❌ 错误：浮点型不能用于switch
    case 3.14: ...
}

string s = "abc";
switch (s) {  // ❌ 错误：字符串不能用于switch
    case "abc": ...
}
```

### 2. case常量要求

必须是常量：不能是变量或表达式

必须唯一：同一switch中不能出现相同值的case

类型匹配：应与表达式类型兼容

```cpp
int a = 5;
switch (n) {
    case a:      // ❌ 错误：case后不能是变量
    case 1+2:    // ❌ 错误：case后不能是表达式
    case 5:      // ✅ 正确
}
```

### 3. case穿透（最重要坑点）

一旦匹配某个case，会从该处一直执行到遇到break或switch结束，即使后面有其他的case标签也会继续执行。

```cpp
int n = 2;
switch (n) {
    case 1: cout << "A";
    case 2: cout << "B";  // 匹配，执行
    case 3: cout << "C";  // 没有break，继续执行
    default: cout << "D"; // 继续执行
}
// 输出：BCD（不是B！）
```

### 4. break的合理使用

```cpp
switch (x) {
    case 1:
        cout << "选项1";
        break;      // ✅ 正确：每个case后加break
    case 2:
    case 3:         // ✅ 合法穿透：2和3执行相同代码
        cout << "选项2或3";
        break;
    default:
        cout << "其他";
        // default后可不加break（最后分支）
}
```

### 5. default的位置

default可以放在任意位置，但执行逻辑仍是"先匹配case，无匹配才执行default"。

```cpp
switch (x) {
    default:        // default放前面
        cout << "默认";
        // 注意：若放在前面且无break，匹配后会继续向下执行
    case 1:
        cout << "1";
}
// 当x=1时：输出"1"（先匹配case1，跳过default）
// 当x=2时：输出"默认1"（匹配default，然后穿透执行case1）
```

### 6. 变量定义问题

在case中定义变量存在风险，因为变量的初始化可能被跳过。若必须定义，应用花括号创建作用域。

```cpp
switch (n) {
    case 1:
        int a = 10;    // ❌ 危险！如果n=2直接跳到其他case，a可能未初始化
        break;
    case 2:
        // 这里a可能未初始化就被使用
        break;
}

// 正确做法：
switch (n) {
    case 1: {
        int a = 10;    // ✅ 用花括号限定作用域
        break;
    }
    case 2: {
        int a = 20;    // 另一个独立变量
        break;
    }
}
```

## 三、奥赛常见题型与真题

### 题型一：概念选择题

**例题1（GESP C++三级）：下列场景中，最适合用switch实现的是（ ）**

A. 判断分数是否≥90

B. 判断月份是否为春季（1/2/3月）

C. 判断年龄是否在18-60之间

D. 判断一个数是否为偶数

答案：B（A/C是范围判断，D虽然可写但分支少，B是纯等值多分支）

**例题2：C++的switch语句中default标号能使用几次？（ ）**

A. 0次 

B. 1次 

C. 任意次 

D. 2次

答案：B

### 题型二：程序阅读题

**例题3：以下程序输出什么？**

```cpp
int num = 2;
switch (num) {
    case 1: cout << "A";
    case 2: cout << "B";
    case 3: cout << "C";
    default: cout << "D";
}
```

答案：BCD（考察case穿透）

**例题4：以下程序输出什么？**

```cpp
int x = 1;
switch (x) {
    default:
        cout << "D";
    case 1:
        cout << "A";
    case 2:
        cout << "B";
}
```

答案：AB（x=1匹配case1，从case1执行到结束，跳过default）

### 题型三：编程题

**例题5（晶晶去看展）：每周1、3、5有课，输入星期几（1-7），如果有课输出"NO"，否则输出"YES"。**

```cpp
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    switch (n) {
        case 1:
        case 3:
        case 5: 
            cout << "NO"; 
            break;
        default:
            cout << "YES";
    }
    return 0;
}
```

注意多个case共用代码块的技巧。

**例题6（月份天数）：输入月份，输出该月的天数（假设平年）。**

```cpp
int m, d;
cin >> m;
switch (m) {
    case 2: 
        d = 28; 
        break;
    case 4:
    case 6:
    case 9:
    case 11:
        d = 30; 
        break;
    default:
        d = 31;
}
cout << d << endl;
```

考察多个case穿透共用代码。

**例题7（简单计算器）：输入两个整数和一个运算符，输出运算结果。**

```cpp
int a, b;
char op;
cin >> a >> b >> op;
switch (op) {
    case '+':
        cout << a + b << endl;
        break;
    case '-':
        cout << a - b << endl;
        break;
    case '*':
        cout << a * b << endl;
        break;
    case '/':
        if (b == 0) 
            cout << "Divided by zero!" << endl;
        else 
            cout << a / b << endl;
        break;
    default:
        cout << "Invalid operator!" << endl;
}
```
考察字符类型和除零判断。

**例题8（买笔问题）：用x元钱买笔，单价6、5、4元，要买尽量多支笔且把钱用完，输出三种笔的数量。**

```cpp
int a, b, c, x, y;
cin >> x;
c = x / 4;  // 最多能买的笔数（全买4元）
y = x % 4;  // 余数
switch (y) {
    case 0: 
        a = 0; b = 0; 
        break;
    case 1: 
        a = 0; b = 1; c--; 
        break;
    case 2: 
        a = 1; b = 0; c--; 
        break;
    case 3: 
        a = 1; b = 1; c -= 2; 
        break;
}
cout << a << ' ' << b << ' ' << c << endl;
```

考察用switch处理余数分支。

## 四、进阶思考题（拔高训练）

**思考题1：以下代码输出什么？为什么？**

```cpp
int n = 0;
switch (n) {
    case 0: 
        int x = 5;
        cout << x;
    case 1: 
        cout << x;  // x是否可用？
}
```

**思考题2：如果不使用if，能否用switch判断一个数是否在[10,20]区间内？有哪些方法？**

**思考题3：以下代码有什么问题？**

```cpp
double d = 1.5;
switch (d) {
    case 1.5: cout << "1.5";
}
```