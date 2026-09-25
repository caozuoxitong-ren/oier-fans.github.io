<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
<script type="text/x-mathjax-config">
	MathJax.Hub.Config({
		tex2jax: {
			skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
			inlineMath: [['$','$']]
		}
	});
</script>

# 第 01 课 STL进阶

**学习目标**：认识 STL 的容器、算法与迭代器；掌握 `pair`、`map`、`set` 的定义、增删改查和遍历；理解有序、去重、比较器与常见坑。

## 一、STL 简介

### 1\. 什么是 STL

STL（Standard Template Library，标准模板库）是 C++ 标准库中提供的一套现成数据结构和算法工具。许多常用功能不必从零手写：变长数组、映射、去重集合、排序、求最值等，都可以直接使用 STL。

| 组成 | 作用 | 举例 |
| --- | --- | --- |
| 容器（container） | 存储数据的数据结构 | `vector`、`map`、`set`、`stack`、`queue` |
| 算法（algorithm） | 操作数据的函数 | `sort()`、`max()`、`min()`、`count()` |
| 迭代器（iterator） | 访问容器元素、连接容器与算法 | `begin()`、`end()` |

> **一句话理解**：STL 就是 C++ 自带的工具箱：容器是装东西的箱子，算法是工具，迭代器是拿取箱中元素的把手。

### 2\. 信奥常用容器一览

| 容器 | 底层结构 | 特点 | 典型用途 |
| --- | --- | --- | --- |
| `vector` | 动态数组 | 按下标访问 $O(1)$，尾部增删均摊 $O(1)$ | 可变长数组 |
| `map` | 平衡二叉搜索树（红黑树） | 按 key 有序；一个 key 对应一个 value | 映射、计数、按键排序 |
| `set` | 平衡二叉搜索树（红黑树） | 有序、去重，只存元素本身 | 去重、判存在 |
| `stack` | 容器适配器（默认 `deque`） | 后进先出 LIFO | 括号匹配、模拟递归 |
| `queue` | 容器适配器（默认 `deque`） | 先进先出 FIFO | BFS、排队模拟 |
| `priority_queue` | 堆 | 默认每次取最大值 | 合并果子；Dijkstra 需配小根堆 |

本课重点讲 `map` 和 `set`。它们底层都是平衡二叉搜索树，对查找、插入和删除等按 key/元素的操作，时间复杂度通常为 $O(\log n)$。

---

## 二、map：有序键值对容器

### 1\. map 是什么

`map` 是有序键值对容器。可以把它想象成一本字典：每个词是 key，每个解释是 value。给定一个 key，就能找到与之对应的 value。

```cpp
map<键类型, 值类型> 变量名;

map<string, int> mp;  // 字符串 → 整数，可用于统计每个单词出现次数
```

### 2\. 底层原理与核心特性

`map` 的 key 按比较规则自动排序。默认使用从小到大的排序规则，因此遍历 `map` 时，key 会按从小到大的顺序出现。

| 特性 | 说明 |
| --- | --- |
| 有序 | 默认按 key 从小到大排序；也可以传入自定义比较器。 |
| 键唯一 | 同一个 key 至多保存一份 value。`insert` 遇到已有 key 不会覆盖；`mp[key] = value` 会覆盖。 |
| 按键访问 | `mp[key]` 用 key 查找或创建元素，复杂度为 $O(\log n)$，不是 $O(1)$ 随机访问。 |
| 复杂度 | `find`、`count`、`insert`、`erase(key)` 的复杂度一般为 $O(\log n)$。 |

> **注意**：`mp[key]` 在 key 不存在时会插入一个 value 默认构造的元素。若 value 是 `int`，默认值通常为 `0`；如果只是判存在，请用 `count` 或 `find`。

---

## 三、pair：把两个值绑定在一起

### 1\. pair 是什么

`pair` 是一个装两个元素的轻量容器，也可理解为“二元组”。`map` 里的每个元素本质上就是 `pair<const key类型, value类型>`。

```cpp
#include <utility>

pair<int, int> p1(3, 5);       // 构造时赋值
pair<int, int> p2 = {3, 5};    // C++11 列表初始化
pair<int, int> p3;
p3.first = 3;
p3.second = 5;

cout << p1.first << " " << p1.second;  // 输出：3 5
```

| 操作 | 写法 | 说明 |
| --- | --- | --- |
| 访问第一个值 | `p.first` | 返回第一个元素 |
| 访问第二个值 | `p.second` | 返回第二个元素 |
| 构造 | `pair<T1, T2>(a, b)` | 用 `a`、`b` 构造 |
| 列表初始化 | `{a, b}` | C++11 起可用 |
| 比较 | `p1 < p2` | 先比 `first`；`first` 相同再比 `second` |

### 2\. make\_pair

```cpp
pair<int, int> p = make_pair(3, 5);

// C++11 也可简写：
// auto p = make_pair(3, 5);
```

> **遍历 map**：迭代器指向的元素是 `pair`，`it->first` 取 key，`it->second` 取 value。

---

## 四、map 的定义、初始化与插入

### 1\. 基本定义

```cpp
#include <map>
#include <string>
using namespace std;

map<int, int> mp;          // int → int
map<string, int> cnt;      // string → int
map<int, string> id2name;  // int → string
```

### 2\. 初始化方式

```cpp
map<int, int> mp1;  // 空 map

// C++11 列表初始化
map<int, int> mp2 = {{1, 10}, {2, 20}, {3, 30}};

// 拷贝构造
map<int, int> mp3(mp2);

// 迭代器范围构造
map<int, int> mp4(mp2.begin(), mp2.end());
```

| 初始化方式 | 写法 | 说明 |
| --- | --- | --- |
| 空 map | `map<K, V> mp;` | 后续再插入 |
| 列表初始化 | `map<K, V> mp = {{k1, v1}, {k2, v2}};` | C++11 起 |
| 拷贝构造 | `map<K, V> mp2(mp1);` | 复制已有 map |
| 范围构造 | `map<K, V> mp(beg, end);` | 复制迭代器范围 |

### 3\. 插入元素：覆盖与不覆盖

```cpp
map<string, int> mp;

mp["apple"] = 3;                              // 不存在则创建；存在则覆盖
mp.insert(pair<string, int>("banana", 5));    // 已存在则不覆盖
mp.insert(make_pair("cherry", 2));            // 已存在则不覆盖
mp.insert({"date", 1});                       // C++11 列表初始化
mp.emplace("elderberry", 4);                  // C++11 原地构造
```

| 方式 | key 已存在时 | 适用场景 |
| --- | --- | --- |
| `mp[key] = value` | 覆盖旧 value | 明确要写入或更新 |
| `insert(pair)` | 不插入，保留旧 value | 不希望误覆盖 |
| `emplace(key, value)` | 不插入，保留旧 value | C++11；直接构造元素 |

> **关键区别**：同一个 key 只能有一个 value，但“重复插入覆盖旧值”只适用于 `mp[key] = value`；`insert` 和 `emplace` 均不会覆盖旧值。

---

## 五、map 的增删改查与遍历

### 1\. 删除与修改

```cpp
map<string, int> mp = {
    {"apple", 3}, {"banana", 5}, {"cherry", 2}
};

mp.erase("banana");  // 按 key 删除，返回 0 或 1

map<string, int>::iterator it = mp.find("cherry");
if (it != mp.end()) {
    it->second = 20;  // 修改 value
    mp.erase(it);     // 按迭代器删除
}

mp.clear();  // 清空所有元素
```

`map` 中的 key 不能修改。因为 key 决定元素在树中的位置；改 key 会破坏排序结构。可以修改的是 `it->second`，也就是 value。

### 2\. 查询：operator\[\]、at 与 find

```cpp
map<string, int> mp = {{"apple", 3}, {"banana", 5}};

cout << mp["apple"];     // 输出 3
cout << mp.at("apple");  // 输出 3；不存在时抛出 out_of_range 异常

map<string, int>::iterator it = mp.find("apple");
if (it != mp.end()) {
    cout << it->first << ": " << it->second;
} else {
    cout << "不存在";
}
```

| 方式 | key 不存在时 | 推荐场景 |
| --- | --- | --- |
| `mp[key]` | 自动插入默认构造的 value | 确定要插入，或确定 key 已存在 |
| `mp.at(key)` | 抛出 `out_of_range` 异常 | 确定存在且需要受检访问 |
| `mp.find(key)` | 返回 `end()` 迭代器 | 判存在并读取 value，最安全 |
| `mp.count(key)` | 返回 `0` 或 `1` | 只需要判断 key 是否存在 |

### 3\. 遍历元素

```cpp
map<string, int> mp = {
    {"apple", 3}, {"banana", 5}, {"cherry", 2}
};

// 方式 1：迭代器遍历（显式类型）
for (map<string, int>::iterator it = mp.begin(); it != mp.end(); it++) {
    cout << it->first << " " << it->second << '\n';
}

// 方式 2：范围 for（显式类型）
for (const pair<const string, int>& p : mp) {
    cout << p.first << " " << p.second << '\n';
}
```

> **auto 简写**：实战中可以写 `for (auto it = mp.begin(); it != mp.end(); it++)` 或 `for (const auto& p : mp)`。学习阶段优先理解显式类型。

| 写法 | 特点 | 提醒 |
| --- | --- | --- |
| 迭代器 | `it->first` / `it->second` | 可精确控制迭代过程 |
| 范围 for | `p.first` / `p.second` | 只读遍历时简洁清楚 |
| `auto` 简写 | 编译器推导迭代器或 `pair` 类型 | C++11 可用；学习阶段先理解显式类型 |

> **遍历顺序**：`map` 默认按 key 从小到大遍历，而不是按 value 排序。

---

## 六、map 常用函数与嵌套

### 1\. 常用函数

| 函数 | 写法 | 返回值或作用 | 复杂度 |
| --- | --- | --- | --- |
| 元素个数 | `mp.size()` | 元素数量 | $O(1)$ |
| 判空 | `mp.empty()` | `bool` | $O(1)$ |
| 统计 | `mp.count(key)` | `0` 或 `1` | $O(\log n)$ |
| 查找 | `mp.find(key)` | 迭代器 | $O(\log n)$ |
| 清空 | `mp.clear()` | 删除所有元素 | $O(n)$ |
| 下界 | `mp.lower_bound(key)` | 第一个不小于 key 的迭代器 | $O(\log n)$ |
| 上界 | `mp.upper_bound(key)` | 第一个大于 key 的迭代器 | $O(\log n)$ |

### 2\. map 套 map 与 map 套 vector

```cpp
#include <map>
#include <vector>

// C++11 可以连写 >>
map<int, map<int, int> > weight;
weight[1][2] = 100;  // 第一维 key=1，第二维 key=2

map<int, vector<int> > group;
group[1].push_back(10);
group[1].push_back(20);
group[2].push_back(30);

for (vector<int>::iterator it = group[1].begin();
     it != group[1].end(); it++) {
    cout << *it << " ";
}
```

| 嵌套形式 | 典型用途 | 说明 |
| --- | --- | --- |
| `map<int, map<int, int> >` | 稀疏二维映射、带权关系 | 外层 key 对应一张内层表 |
| `map<int, vector<int> >` | 分组存储 | 一个 key 对应一组元素 |
| `map<int, set<int> >` | 分组去重 | 一个 key 对应一个去重集合 |

> **C++11 提示**：嵌套模板的右尖括号可以连写，例如 `map<int, map<int, int>>`；本讲义为清晰起见也保留了 `> >` 的写法。

---

## 七、map 存放 struct 与自定义排序

### 1\. value 是 struct

```cpp
#include <map>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    map<int, Student> mp;  // 学号 → 学生信息
    mp[1] = {"张三", 95};
    mp[2] = {"李四", 87};

    cout << mp[1].name << " " << mp[1].score;
    return 0;
}
```

### 2\. key 是 struct：必须提供比较规则

`map` 的 key 需要排序。自定义 `struct` 没有默认大小关系，因此必须重载 `operator<`，或提供比较器。

```cpp
struct Point {
    int x, y;

    bool operator<(const Point& other) const {
        if (x != other.x) return x < other.x;
        return y < other.y;
    }
};

map<Point, int> mp;
mp[{1, 2}] = 100;
mp[{3, 4}] = 200;
```

| 写法 | 排序规则 | 适用场景 |
| --- | --- | --- |
| 在 `struct` 内重载 `operator<` | 固定为一种规则 | 类型本身只有一种自然排序 |
| 自定义比较器 | 把比较器作为 `map` 第三个模板参数 | 同一类型需要多种排序方式 |

```cpp
struct CmpPoint {
    bool operator()(const Point& a, const Point& b) const {
        if (a.x != b.x) return a.x > b.x;  // x 从大到小
        return a.y < b.y;                  // x 相同按 y 从小到大
    }
};

map<Point, int, CmpPoint> mp;
```

> **关键**：`operator<` 和比较器的 `operator()` 都要写 `const`；比较函数必须满足严格弱序，不能出现 `a < a` 为 `true`。

---

## 八、set：有序去重集合

### 1\. set 是什么

`set` 是有序去重集合。它只保存元素本身，不保存 value，可以理解成“只保留 key 的 `map`”。

```cpp
#include <set>
using namespace std;

set<int> s1;
set<int> s2 = {3, 1, 4, 1, 5, 9};  // 自动去重并排序

for (set<int>::iterator it = s2.begin(); it != s2.end(); it++) {
    cout << *it << " ";  // 输出：1 3 4 5 9
}
```

| 特性 | 说明 |
| --- | --- |
| 有序 | 默认从小到大遍历 |
| 去重 | 重复值只保留一份 |
| 无下标 | 不能写 `s[i]`，通过迭代器访问元素 |
| 复杂度 | `insert`、`erase`、`find`、`count` 一般为 $O(\log n)$ |

---

## 九、set 的增删改查与遍历

### 1\. 插入、删除与查询

```cpp
set<int> s = {1, 3, 4, 5, 9};

s.insert(3);  // 重复插入无效
s.erase(3);   // 按值删除，返回 0 或 1

set<int>::iterator it = s.find(4);
if (it != s.end()) {
    s.erase(it);  // 按迭代器删除
}

if (s.count(5)) {
    cout << "5 在集合中";
}

s.clear();
```

| 操作 | 写法 | 说明 |
| --- | --- | --- |
| 插入 | `s.insert(val)` | 重复值不会插入第二份 |
| 按值删除 | `s.erase(val)` | 返回删除数量，通常为 `0` 或 `1` |
| 查找 | `s.find(val)` | 找不到返回 `s.end()` |
| 判存在 | `s.count(val)` | 返回 `0` 或 `1`，最简洁 |
| 清空 | `s.clear()` | 删除全部元素 |

### 2\. 遍历与修改

```cpp
set<int> s = {3, 1, 4, 1, 5, 9};

for (int x : s) {
    cout << x << " ";  // 输出：1 3 4 5 9
}

// set 元素不能直接修改：要把 3 改成 4，只能先删后插
s.erase(3);
s.insert(4);
```

> **为什么不能直接改**：`set` 中元素的位置由排序决定。直接修改会破坏树的有序性，因此 STL 不允许通过迭代器修改 `set` 元素。

---

## 十、set 存放 struct 与自定义排序

### 1\. 在 struct 内重载 operator\<

```cpp
struct Student {
    string name;
    int score;

    // 分数从高到低；同分时按姓名排序，避免同分学生被当作重复元素
    bool operator<(const Student& other) const {
        if (score != other.score) return score > other.score;
        return name < other.name;
    }
};

set<Student> s;
s.insert({"张三", 95});
s.insert({"李四", 87});
s.insert({"王五", 92});

for (set<Student>::iterator it = s.begin(); it != s.end(); it++) {
    cout << it->name << " " << it->score << '\n';
}
```

### 2\. 自定义比较器

```cpp
struct Point {
    int x, y;
};

struct CmpSum {
    bool operator()(const Point& a, const Point& b) const {
        int sumA = a.x + a.y;
        int sumB = b.x + b.y;

        if (sumA != sumB) return sumA < sumB;
        if (a.x != b.x) return a.x < b.x;
        return a.y < b.y;
    }
};

set<Point, CmpSum> s;
s.insert({1, 2});
s.insert({0, 1});
s.insert({3, 3});
```

> **严格弱序**：若 `!(a < b)` 且 `!(b < a)`，`set` 会把 `a` 和 `b` 视作“等价元素”，只保留一份。因此按 `x+y` 排序时，还要用 `x`、`y` 作为第二、第三关键字，避免不同点被错误去重。

---

## 十一、multimap 与 multiset：允许重复的有序容器

### 1\. multimap：一个 key 可以对应多份 value

`multimap` 和 `map` 一样按 key 有序，但同一个 key 可以出现多次。它适合保存“一对多”关系，例如一个学生对应多门课程，或一条边的起点对应多条记录。

```cpp
#include <map>

multimap<string, int> score;
score.insert(make_pair("张三", 90));
score.insert(make_pair("张三", 95));  // 同一个 key 可以重复
score.insert(make_pair("李四", 88));

pair<multimap<string, int>::iterator,
     multimap<string, int>::iterator> range = score.equal_range("张三");

for (multimap<string, int>::iterator it = range.first;
     it != range.second; it++) {
    cout << it->first << " " << it->second << '\n';
}
```

`multimap` 没有 `operator[]` 和 `at()`，因为一个 key 对应的 value 不唯一，不能写 `mm[key]`。查找某个 key 的所有元素时，常用 `equal_range(key)` 获取一段迭代器范围。

### 2\. multiset：允许重复的有序集合

`multiset` 和 `set` 一样有序，但允许重复元素。例如统计一组数并持续取最小值/最大值、保存可重复的排名数据时，可以使用 `multiset`。

```cpp
#include <set>

multiset<int> ms;
ms.insert(3);
ms.insert(1);
ms.insert(3);  // 可以重复插入
// ms 中元素：1 3 3

cout << ms.count(3) << '\n';  // 输出 2

multiset<int>::iterator it = ms.find(3);
if (it != ms.end()) {
    ms.erase(it);  // 只删除其中一个 3
}

// 注意：ms.erase(3) 会删除所有值为 3 的元素
```

| 容器 | 是否有序 | 是否允许重复 | 要点 |
| --- | --- | --- | --- |
| `map` | 是，按 key | key 不允许重复 | 一个 key 对应一个 value；可用 `mp[key]` |
| `multimap` | 是，按 key | key 允许重复 | 没有 `[]`；用 `equal_range` 查询同 key 的全部元素 |
| `set` | 是，按元素 | 不允许重复 | 适合去重、判存在 |
| `multiset` | 是，按元素 | 允许重复 | `count(val)` 可大于 1；`erase(val)` 删除全部相同值 |

> **选择口诀**：需要去重用 `map/set`；需要保留重复项用 `multimap/multiset`。对于 `multiset`，想删一个重复值就 `erase(find(val))`，不要直接 `erase(val)`。

---

## 十二、常见错误提醒

| 编号 | 错误 | 后果 | 改正 |
| --: | --- | --- | --- |
| 1 | 用 `mp[key]` 判断 key 是否存在 | 不存在 key 被自动插入 | 用 `mp.count(key)` 或 `mp.find(key)` |
| 2 | 以为 `map` 的 `insert` 会覆盖旧值 | 数据没有按预期更新 | 覆盖使用 `mp[key] = value` |
| 3 | `set` 中直接修改元素值 | 编译报错或破坏有序性 | 先 `erase`，再 `insert` |
| 4 | `struct` 做 key 时没有比较规则 | 编译报错 | 重载 `operator<` 或传比较器 |
| 5 | `operator<` 忘记加 `const` | 编译报错 | 写成 `bool operator<(const T& o) const` |
| 6 | 遍历 `map` 时写 `it.first` | 编译报错 | 迭代器使用 `it->first` |
| 7 | 以为 `map` 按 value 排序 | 逻辑错误 | `map` 只按 key 排序 |
| 8 | 比较器只比较一个可能相同的关键字 | 不同元素被当作重复 | 补充第二、第三关键字 |

> **最常见的坑**：判存在用 `count`，查值用 `find`。不要写 `if (mp[key] != 0)` 来判断 key 是否存在，因为这会先把 key 插入 `map`。

---

## 十三、方法、套路与策略总结

### 1\. 选择容器的思路

-   长度可变、需要按下标访问：优先考虑 `vector`。
-   一个 key 对应一个 value，且希望按 key 有序：使用 `map`。
-   只需要有序去重与判存在：使用 `set`。
-   有序且允许重复：使用 `multimap` 或 `multiset`。
-   只需后进先出或先进先出：选择 `stack` 或 `queue`。
-   需要不断取得当前最大值：默认 `priority_queue`；需要最小值时使用小根堆写法。

### 2\. map 与 set 的操作套路

-   需要写入或更新 `map`：`mp[key] = value`。
-   只想判 key/元素是否存在：`count`。
-   既要判存在又要取得值：`find`，并与 `end()` 比较。
-   遍历 `map`：key 用 `first`，value 用 `second`；遍历 `set`：解引用迭代器得到元素。
-   涉及 `struct`：先写好严格弱序的比较规则，再放入 `map` 或 `set`。

## 十四、训练题单

### 1\. 基础题目
- map
    - [P1077. 记名字（有重复key）](https://marsoj.cn/p/P1077){:target="_blank"}
    - [P1114. 一个数出现多少次](https://marsoj.cn/p/P1114){:target="_blank"}
    - [P1122. 第一次出现的位置](https://marsoj.cn/p/P1122){:target="_blank"}
    - [P1162. Babelfish](https://marsoj.cn/p/P1162){:target="_blank"}
    - [P1163. Hardwood Species](https://marsoj.cn/p/P1163){:target="_blank"}
    - [P2139. 第k次出现的位置](https://marsoj.cn/p/P2139){:target="_blank"}
- set
    - [P1156. 不重复数字](https://marsoj.cn/p/P1156){:target="_blank"}
    - [P1962. 人见人爱A-B](https://marsoj.cn/p/P1962){:target="_blank"}
    - [P1591. 序列和](https://marsoj.cn/p/P1591){:target="_blank"}

### 2\. 拓展题目

- [P1593. 第几个字符串](https://marsoj.cn/p/P1593){:target="_blank"}
- [P1592. 恩尼格码机](https://marsoj.cn/p/P1592){:target="_blank"}
- [P1161. 电梯里的爱情](https://marsoj.cn/p/P1161){:target="_blank"}
- [P1964. 贪婪的送礼者Greedy Gift Givers](https://marsoj.cn/p/P1964){:target="_blank"}
- [P1164. Double Queue](https://marsoj.cn/p/P1164){:target="_blank"}