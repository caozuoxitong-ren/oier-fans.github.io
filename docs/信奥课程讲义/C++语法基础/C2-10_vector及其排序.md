# 第 10 课 vector及其排序

vector数组、二维 vector 与 sort 排序

> **学习目标**：理解 vector“可动态增长的数组”这一核心思想，能说清它与普通数组的区别；掌握 vector 的定义、初始化、下标访问、末尾增删、大小调整和遍历；能用 `sort` 完成升序、降序和部分排序；了解二维 vector 的规则与不规则写法；能避开下标越界、空 vector 访问和排序区间写错等常见问题。

## 一、vector 是什么

普通数组像一排提前建好的柜子：

```cpp
int a[100];
```

它一开始就有 100 个位置。即使只读入 3 个数，也占着这 100 个位置；如果后来需要第 101 个位置，普通数组无法自己变长。

vector 像一排可以向后加柜子的抽屉：元素按顺序存放，末尾不够时可以继续加。

```cpp
vector<int> v;
v.push_back(10);
v.push_back(20);
v.push_back(30);
```

此时 `v` 中依次存有 10、20、30，长度为 3。

原理先知道这一层就够了：vector 的元素在内存中是连续存储的，和普通数组一样可以用下标快速访问。区别在于，当容量不够时，它会申请一块更大的连续空间，把旧元素搬过去，再释放旧空间。初学阶段不用自己管理这件事，只要知道：**末尾添加很方便，中间插入、删除会移动后面的元素。**


## 二、vector 与普通数组的区别

| | 普通数组 | vector |
| :--- | :--- | :--- |
| 长度 | 定义时固定 | 可以动态增长 |
| 末尾添加 | 需要自己维护下标 | `push_back` 直接加 |
| 长度查询 | 需要另存变量 | `v.size()` |
| 内存管理 | 固定分配 | 自动扩容 |
| 适用场景 | 数据量已知且固定 | 数据量未知或需要动态增删 |

一句话：**数据量固定用数组，数据量会变或不确定则用 vector。**


## 三、定义与初始化

使用 vector 前必须包含头文件：

```cpp
#include <vector>
```

通用格式：

```cpp
vector<元素类型> 变量名;
```

常见元素类型：

```cpp
vector<int> a;             // 存整数
vector<long long> b;       // 存较大的整数
vector<double> c;          // 存小数
vector<char> d;            // 存字符
vector<string> words;      // 存字符串，需同时 #include <string>
```

`vector<int>` 是一个完整的类型，尖括号中写“每个元素是什么类型”，不是写长度。

四种高频初始化写法：

| 写法 | 得到什么 | 适合什么时候用 |
| :--- | :--- | :--- |
| `vector<int> v;` | 空 vector，长度为 0 | 数据数量未知，准备逐个加入 |
| `vector<int> v(n);` | 长度为 n，每个 int 初始为 0 | 已知有 n 个位置，稍后逐项读入 |
| `vector<int> v(n, x);` | 长度为 n，每个元素都是 x | 需要统一初值，如全部设为 -1 |
| `vector<int> v = {2, 4, 6};` | 初始就有 3 个元素 | 已知少量固定测试数据 |

示例：读入 n 个数并输出。

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> v(n);
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }

    for (int i = 0; i < n; i++) {
        cout << v[i] << ' ';
    }
    cout << '\n';
    return 0;
}
```


## 四、访问与查询：长度、下标、首尾

把 `vector<int> v = {10, 20, 30};` 想成下表：

| 下标 | 0 | 1 | 2 |
| :--- | :--- | :--- | :--- |
| 元素 | 10 | 20 | 30 |

常用访问方法：

| 写法 | 含义 | 使用前提 |
| :--- | :--- | :--- |
| `v.size()` | 当前元素个数 | 任意 vector 均可 |
| `v[i]` | 第 i 个下标对应的元素 | `0 <= i < v.size()` |
| `v.front()` | 第一个元素 | v 非空 |
| `v.back()` | 最后一个元素 | v 非空 |

`size()` 返回元素个数，不是最后一个下标。如果 `v.size()` 是 5，下标是 0、1、2、3、4，最后一个元素是 `v[(int)v.size() - 1]`，但前提是 v 非空。

示例：输出首尾与长度。

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {5, 8, 12, 20};

    cout << "长度：" << v.size() << '\n';
    cout << "第一个：" << v.front() << '\n';
    cout << "最后一个：" << v.back() << '\n';
    cout << "下标 2：" << v[2] << '\n';
    return 0;
}
```

输出：

```text
长度：4
第一个：5
最后一个：20
下标 2：12
```

**⚠️重要提示：空 vector 的 `v.size() - 1` 不是 -1。**

`v.size()` 的返回类型是无符号整数。如果 `v` 为空：

```cpp
v.size()        // 0
v.size() - 1    // 不是 -1，而是一个非常大的数
```

用它当下标会越界。所以：

- 取末尾元素用 `v.back()`，并先 `if (!v.empty())` 判空；
- 倒序遍历先把长度转成 `int`：`int n = (int)v.size();`，再写 `for (int i = n - 1; i >= 0; i--)`。

**一句话：空 vector 不能用 `v.size() - 1` 当下标，要减 1 要先强制类型转换 `(int)v.size()-1`。**

---


## 五、大小调整与末尾增删

### 1．方法速查

| 方法 | 作用 | 结果 |
| :--- | :--- | :--- |
| `v.push_back(x)` | 在末尾加入 x | 长度加 1 |
| `v.pop_back()` | 删除最后一个元素 | 长度减 1 |
| `v.clear()` | 删除全部元素 | 长度变为 0 |
| `v.empty()` | 判断是否为空 | 空时返回真 |
| `v.resize(n)` | 把元素个数改为 n | 扩大补默认值，缩小删末尾 |
| `v.resize(n, x)` | 把元素个数改为 n | 扩大的部分用 x 填充 |

### 2．末尾增删与清空

要点：

- `push_back(x)` 不会覆盖最后一个，而是新增加一个位置；
- `pop_back()` 没有参数，不能写成 `pop_back(x)`；
- 空 vector 不可以 `pop_back()`；
- 本课先不使用 `erase()` 在中间删除元素，它会使后面的元素往前移动，容易写错。

示例：不断读入，遇到 0 停止。

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v;
    int x;

    while (cin >> x && x != 0) {
        v.push_back(x);
    }

    cout << "共读入 " << v.size() << " 个数\n";
    if (!v.empty()) {
        cout << "最后读入的数是 " << v.back() << '\n';
    }
    return 0;
}
```

输入：

```text
6 3 9 0
```

输出：

```text
共读入 3 个数
最后读入的数是 9
```

### 3．`resize`：把元素个数改成 n

```cpp
v.resize(n);        // 大小改为 n
v.resize(n, x);     // 大小改为 n，新元素用 x 填充
```

行为分三种情况：

| 情况 | 结果 |
| :--- | :--- |
| `n > 当前 size` | 末尾补元素；不写 `x` 时补默认值（`int` 补 0） |
| `n == 当前 size` | 不变 |
| `n < 当前 size` | 删除末尾多出来的元素 |

示例：

```cpp
vector<int> v = {1, 2, 3};

v.resize(5);        // 1 2 3 0 0
v.resize(2);        // 1 2
v.resize(4, 9);     // 1 2 9 9
```

要点：

- `resize` 只改 `size`，**不缩小 `capacity`**；缩小后再次扩大，不会恢复原来的元素；
- 缩小后再扩大，新位置是默认值或指定值，不是旧值；
- `resize` 和“先 `vector<int> v(n)`”效果类似，区别是 `resize` 可以在运行中反复调整。

### 4．`capacity()` 与 `reserve()`：预留空间

`resize` 改的是“实际存了多少”，`reserve` 改的是“提前申请多少空间”。

```cpp
v.capacity();       // 当前容量，最多能存多少个而不重新分配
v.reserve(n);       // 提前申请至少 n 个元素的空间
```

- `size()` 是实际元素个数，`capacity()` 是已申请空间能容纳的个数；
- `reserve(n)` 不改变 `size()`，只影响 `capacity()`；
- 预留空间足够时，`push_back` 直接在原块内追加；不够时才重新申请、搬家。

一句话：**`resize` 管“存几个”，`reserve` 管“提前留多少位置”。**

### 5．`push_back` 与 `resize` 混用的陷阱

```cpp
vector<int> v(5);        // 已经有 5 个 0
v.push_back(10);         // 变成 6 个元素，不是把第 1 个改成 10
```

如果已经用 `resize` 或 `vector<int> v(n)` 开好了位置，就**按下标赋值**；如果要用 `push_back`，就从空 vector 开始。两者混用，很容易多出一倍元素。

因为 `vector<int> v(n)` 或 `v.resize(n)` 不是“预留 n 个空位等以后填”，而是**已经创建了 n 个元素**，`size()` 已经是 n。

```cpp
vector<int> v(5);    // 已经有 5 个元素：0 0 0 0 0，size = 5
```

此时再 `push_back`，是在这 5 个元素**后面追加**，不是去填前面那 5 个 0：

```cpp
v.push_back(10);     // 变成 0 0 0 0 0 10，size = 6
v.push_back(20);     // 变成 0 0 0 0 0 10 20，size = 7
```

如果循环 n 次 `push_back`：

```cpp
vector<int> v(n);                // size = n，n 个 0
for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    v.push_back(x);              // 每次在末尾追加
}
// 最终 size = n + n = 2n：前 n 个是 0，后 n 个才是读入的数
```

所以“多出一倍元素”的原因是：**前面的 n 个位置已经被当作真实元素占着了，`push_back` 又在这 n 个元素后面追加了 n 个，总数变成 2n。**

正确做法二选一：

- **已经开了 n 个位置**：按下标赋值 `v[i] = x`，不追加；
- **想用 `push_back`**：从空 vector `vector<int> v;` 开始，不要先写 `v(n)`。

---

## 六、遍历与读入

### 1．最稳妥：下标循环

需要下标、需要修改元素、需要访问前后位置时，用它。

```cpp
for (int i = 0; i < (int)v.size(); i++) {
    cout << v[i] << ' ';
}
```

### 2．C++11 范围 for 循环

只想依次处理每个元素、不关心下标时，可以这样写：

```cpp
for (int x : v) {
    cout << x << ' ';
}
```

这里的 `x` 是元素的一份副本；改 `x` 不会改到 `v`。初学修改元素时，先坚持使用下标循环最安全。

### 3．两种读入模型

| 数据特点 | 推荐写法 | 原因 |
| :--- | :--- | :--- |
| 已知有 n 个数据 | `vector<int> v(n);` 后按下标读入 | 位置已准备好，可直接写 `v[i]` |
| 不知道有多少数据 | 空 vector 配合 `push_back()` | 每读到一个数据就扩展一次 |

示例：求一组数的最大值。

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> v(n);
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }

    int mx = v[0];
    for (int i = 1; i < n; i++) {
        if (v[i] > mx) {
            mx = v[i];
        }
    }

    cout << mx << '\n';
    return 0;
}
```

这个程序要求 `n >= 1`，因为它用 `v[0]` 初始化最大值。看到“第一个元素”“最后一个元素”时，都要先想：会不会为空？

---
## 七、二维 vector

二维 vector 就是“vector 的 vector”：外层每个元素本身又是一个 vector。它适合存表格、网格，也适合存**每行长短不一样**的数据。

### 1．规则二维 vector：n 行 m 列

每行长度相同，像一张 n 行 m 列的表：

```cpp
vector<vector<int>> a(n, vector<int>(m));
```

读法从里到外：

- `vector<int>(m)`：一行有 m 个 int，默认都是 0；
- 外层 vector 有 n 行；
- `a[i][j]` 表示第 i 行第 j 列。

如果要统一初值，可以写 `vector<vector<int>> a(n, vector<int>(m, -1));`，每格都是 -1。

示例：读入并输出 n 行 m 列的表。

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;

    vector<vector<int>> a(n, vector<int>(m));

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> a[i][j];
        }
    }

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cout << a[i][j] << ' ';
        }
        cout << '\n';
    }
    return 0;
}
```

### 2．不规则二维 vector：每行长短不同

规则矩阵要求每行长度一样。但很多数据天生“每行长短不同”：每个寄包柜的格子数不同，每个学生选的课程数不同，每一行同学的人数不同。

这时先只建外层 n 行，每一行先空着，再按需要扩展。

**方式一：用 `push_back` 逐个加入**

```cpp
vector<vector<int>> a(n);      // n 行，每行都是空的

for (int i = 0; i < n; i++) {
    int k;
    cin >> k;
    for (int j = 0; j < k; j++) {
        int x;
        cin >> x;
        a[i].push_back(x);     // 往第 i 行末尾加一个
    }
}
```

适合“读一个加一个”的场景，不需要提前知道这一行最终多长。

**方式二：先 `resize` 调整这一行的长度，再按下标赋值**

```cpp
vector<vector<int>> a(n);      // n 行，每行都是空的

for (int i = 0; i < n; i++) {
    int k;
    cin >> k;
    a[i].resize(k);            // 第 i 行变成 k 个元素，默认 0
    for (int j = 0; j < k; j++) {
        cin >> a[i][j];        // 按下标直接写
    }
}
```

适合“先知道这一行有几个数，再逐个填”的场景。`resize(k)` 之后，这一行就有 k 个位置，可以直接 `a[i][j] = x`，不必用 `push_back`。

两种方式都可以，**关键是不要混用**：如果已经 `resize(k)`，就按下标赋值；如果想 `push_back`，就从空行开始。

### 3．二维 vector 的 `size()`

```cpp
a.size()        // 行数
a[i].size()     // 第 i 行的元素个数
```

遍历不规则二维 vector 时，内层长度必须写 `a[i].size()`：

```cpp
for (int i = 0; i < (int)a.size(); i++) {
    for (int j = 0; j < (int)a[i].size(); j++) {
        cout << a[i][j] << ' ';
    }
    cout << '\n';
}
```

不要写成 `j < a.size()`，那是行数，不是列数。

### 4．常见坑

| 错误 | 后果 | 改正 |
| :--- | :--- | :--- |
| `vector<vector<int>> a(n);` 后直接 `a[i][j] = x` | 这一行还是空的，下标越界 | 先 `a[i].resize(k)` 或 `a[i].push_back(x)` |
| 内层写 `j < a.size()` | 把行数当列数，可能越界 | 内层写 `j < (int)a[i].size()` |
| `a[i].resize(k)` 后又 `push_back` | 实际长度变成 2k，前面是 0 | 二选一，不要混用 |


## 八、用 sort 排序 vector

前面已经学过 `sort` 的默认升序和降序。这一节把 `sort` 用到 vector 上。使用前包含头文件：

```cpp
#include <algorithm>
```

### 1．排序一维 vector

**默认升序：从小到大**

```cpp
sort(v.begin(), v.end());
```

**降序：从大到小**

```cpp
sort(v.begin(), v.end(), greater<int>());
```

**只排一部分**

```cpp
sort(v.begin() + l, v.begin() + r + 1);
```

排序区间“左闭右开”，右端写 `r + 1`。

示例：

```cpp
vector<int> v = {5, 1, 5, -2, 8, 3};
sort(v.begin(), v.end());          // -2 1 3 5 5 8
```

### 2．排序二维 vector 的某一行

二维 vector 的每一行本身就是一个一维 vector，所以**排某一行，就是把那一行的 `begin()` 到 `end()` 交给 `sort`**：

```cpp
sort(a[i].begin(), a[i].end());                    // 第 i 行升序
sort(a[i].begin(), a[i].end(), greater<int>());    // 第 i 行降序
```

外层套一个循环，就能逐行排序：

```cpp
for (int i = 0; i < (int)a.size(); i++) {
    sort(a[i].begin(), a[i].end());
}
```

注意：`sort(a.begin(), a.end())` 排的是“行与行之间”的顺序，比较的是整行，不是行内元素。**要排行内元素，必须写 `a[i].begin()` 和 `a[i].end()`。**

### 3．例题：P1793 排队队（二）

#### 问题描述

同学们排成 n 行，每行人数和身高不同。先把每一行同学按身高从低到高排好，然后从第 1 行到第 n 行，输出每行身高的中位数。n 为偶数时，取中间身高较高者。如果某一行没有同学，输出 0。

```text
输入：
3
5 2 5 1 7 6
3 2 4 3
6 2 1 1 1 9 10
输出：
5
3
2
```

排序后：

- 第 1 行：1 2 5 6 7，中位数 5；
- 第 2 行：2 3 4，中位数 3；
- 第 3 行：1 1 1 2 9 10，中位数 2（偶数个，取较高者）。

#### 思路

- 用不规则二维 vector 存每一行：读入 k，把这一行调整成 k 个元素，再读入身高；
- 对每一行调用 `sort(a[i].begin(), a[i].end())`；
- 中位数下标统一是 `a[i].size() / 2`：
  - 奇数个时，`k / 2` 正好是正中间；
  - 偶数个时，`k / 2` 是中间偏右，正好是“较高者”。
- 如果这一行为空，输出 0。

#### 参考代码

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<vector<int>> a(n);

    for (int i = 0; i < n; i++) {
        int k;
        cin >> k;
        a[i].resize(k);                 // 第 i 行变成 k 个位置
        for (int j = 0; j < k; j++) {
            cin >> a[i][j];
        }
        sort(a[i].begin(), a[i].end()); // 只排这一行
    }

    for (int i = 0; i < n; i++) {
        if (a[i].empty()) {
            cout << 0 << '\n';
        } else {
            cout << a[i][(int)a[i].size() / 2] << '\n';
        }
    }
    return 0;
}
```

#### 要点

- 每一行长度不同，用 `a[i].resize(k)` 把这一行调整成 k 个位置，再按下标读入；
- 排序只排当前行：`sort(a[i].begin(), a[i].end())`，不要写成 `sort(a.begin(), a.end())`；
- 中位数下标统一写 `a[i].size() / 2`，奇数个是正中间，偶数个是中间偏右，正好满足“取较高者”；
- 空行要单独判断，输出 0，不能直接取 `a[i][0]`；
- 总数不超过 \(10^6\)，逐行排序的总复杂度是 \(O(N \log k)\)，可以接受。

**一句话：二维 vector 的每一行就是一个一维 vector，排某一行就写 `sort(a[i].begin(), a[i].end())`；如果写`sort(a.begin(), a.end())` ，那么排的是行与行，每一行当成一个固定的序列，默认按字典序排序，不会改变行内元素及其次序，只在行间排序。**