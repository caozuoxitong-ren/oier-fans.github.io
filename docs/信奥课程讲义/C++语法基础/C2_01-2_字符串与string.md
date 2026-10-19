# C++ `string` 字符串教程

字符串的定义、输入输出、常用函数与典型示例

> 学习目标：理解 `string` 的作用和基本特点；掌握字符串的创建、输入、访问、拼接、比较和遍历；会使用 `length`、`size`、`find`、`substr`、`insert`、`erase`、`replace` 等常用函数；能够完成字符串统计、查找、截取、替换和简单判断等基础题目。

---

## 一、什么是字符串

### 1．字符串的概念

字符串就是由若干个字符按照顺序组成的一段文字或数据，例如：

```text
hello
C++
2026
abc123
```

在 C++ 中，推荐使用标准库提供的 `string` 类型表示字符串：

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string name = "Alice";
    cout << name << '\n';
    return 0;
}
```

`string` 可以保存一串字符，并且能够自动管理字符串长度。与字符数组相比，`string` 使用起来更方便，不需要手动计算结尾位置，也可以直接使用许多成员函数完成查找、截取和修改。

### 2．字符和字符串的区别

| 写法 | 类型 | 含义 |
| --- | --- | --- |
| `'A'` | `char` | 一个字符 |
| `"A"` | 字符串字面量 | 由一个字符组成的字符串 |
| `"Hello"` | 字符串字面量 | 一串字符 |
| `string s = "Hello";` | `string` | 一个 `string` 字符串对象 |

字符使用**单引号**，字符串使用**双引号**：

```cpp
char ch = 'A';
string s = "A";
```

下面的写法类型不匹配：

```cpp
char ch = "A";       // 错误：双引号表示字符串
string s = 'A';      // 不推荐：单引号表示字符
```

如果要把一个字符赋给字符串，可以写成：

```cpp
string s = "A";
```

或者：

```cpp
string s(1, 'A');    // 由 1 个 'A' 组成的字符串
```

### 3．下标从 0 开始

字符串中的字符按照下标访问，第一个字符的下标是 `0`：

```text
字符串：  h  e  l  l  o
下标：    0  1  2  3  4
```

```cpp
string s = "hello";

cout << s[0] << '\n';  // h
cout << s[4] << '\n';  // o
```

字符串长度为 `n` 时，合法下标是：

```text
0 到 n - 1
```

不能访问 `s[n]`。

---

## 二、`string` 的创建与初始化

### 1．创建空字符串

```cpp
string s;
```

此时 `s` 是一个空字符串，长度为 `0`。

也可以显式写成：

```cpp
string s = "";
```

或者：

```cpp
string s("");
```

### 2．用字符串字面量初始化

```cpp
string a = "hello";
string b("world");
```

### 3．用重复字符初始化

```cpp
string s(5, '*');
cout << s << '\n';
```

输出：

```text
*****
```

构造形式为：

```cpp
string(重复次数, 字符)
```

例如：

```cpp
string line(10, '-');
```

表示创建由 10 个 `'-'` 组成的字符串。

### 4．用另一个字符串初始化

```cpp
string a = "hello";
string b = a;

cout << b << '\n';   // hello
```

修改 `b` 不会改变 `a`：

```cpp
b[0] = 'H';

cout << a << '\n';   // hello
cout << b << '\n';   // Hello
```

---

## 三、字符串的输入与输出

### 1．使用 `cin` 输入一个不含空格的字符串

```cpp
string s;
cin >> s;
```

`cin >> s` 会跳过开头的空白，并在遇到空格、制表符或换行时停止。

输入：

```text
hello world
```

使用：

```cpp
cin >> s;
```

只能读入：

```text
hello
```

### 2．使用 `getline` 输入整行

如果字符串中可能包含空格，应使用：

```cpp
string line;
getline(cin, line);
```

输入：

```text
hello world
```

得到的 `line` 是：

```text
hello world
```

### 3．`cin` 后直接使用 `getline`

如果先使用 `cin >>`，再使用 `getline`，上一次输入留下的换行可能会被 `getline` 读走：

```cpp
int age;
string name;

cin >> age;
getline(cin, name);   // 可能读到空字符串
```

正确做法是在 `getline` 前清除输入缓冲区中的换行：

```cpp
#include <iostream>
#include <string>
#include <limits>
using namespace std;

int main() {
    int age;
    string name;

    cin >> age;
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
    getline(cin, name);

    cout << age << '\n';
    cout << name << '\n';

    return 0;
}
```

如果前面只读入一个整数，也常见下面的写法：

```cpp
cin >> age;
cin.ignore();
getline(cin, name);
```

`cin.ignore()` 只忽略一个字符，适合确定下一个字符就是换行的情况；更稳妥的通用写法是使用：

```cpp
cin.ignore(numeric_limits<streamsize>::max(), '\n');
```

### 4．输出字符串

```cpp
string s = "hello";

cout << s << '\n';
```

字符串可以和其他内容一起输出：

```cpp
int score = 95;
string name = "Alice";

cout << name << " 的分数是 " << score << '\n';
```

---

## 四、字符串长度与状态判断

### 1．`length()`：获取长度

```cpp
string s = "hello";

cout << s.length() << '\n';
```

输出：

```text
5
```

函数形式：

```cpp
s.length()
```

返回字符串中字符的数量。

### 2．`size()`：获取长度

```cpp
string s = "hello";

cout << s.size() << '\n';
```

`size()` 和 `length()` 对 `string` 来说含义相同，结果也相同。

```cpp
if (s.size() == s.length()) {
    cout << "相等" << '\n';
}
```

在竞赛代码中，两种写法都很常见。可以选择一种并保持习惯统一。

### 3．`empty()`：判断是否为空

```cpp
string s;

if (s.empty()) {
    cout << "空字符串" << '\n';
} else {
    cout << "不是空字符串" << '\n';
}
```

`empty()` 返回布尔值：

-   返回 `true`：字符串为空；
-   返回 `false`：字符串不为空。

也可以使用：

```cpp
if (s.size() == 0) {
    cout << "空字符串" << '\n';
}
```

但 `empty()` 表达的意图更清楚。

### 4．`clear()`：清空字符串

```cpp
string s = "hello";

s.clear();

cout << s.size() << '\n';   // 0
```

`clear()` 会删除字符串中的所有字符，使它变为空字符串。

---

## 五、访问字符串中的字符

### 1．使用下标运算符 `[]`

```cpp
string s = "hello";

cout << s[0] << '\n';  // h
cout << s[1] << '\n';  // e

s[0] = 'H';
cout << s << '\n';     // Hello
```

使用 `[]` 访问时，代码不会自动检查下标是否越界，因此必须保证下标合法。

### 2．使用 `at()`

```cpp
string s = "hello";

cout << s.at(0) << '\n';  // h
```

`at()` 也可以修改字符：

```cpp
s.at(0) = 'H';
```

与 `[]` 相比，`at()` 会进行边界检查。如果下标越界，程序会报告异常。

| 写法 | 特点 |
| --- | --- |
| `s[i]` | 常用、简洁，需自行保证下标合法 |
| `s.at(i)` | 会检查下标是否越界 |

竞赛中遍历字符串通常使用 `s[i]`，因为循环边界由程序员控制，代码更简洁。

### 3．`front()` 和 `back()`

```cpp
string s = "hello";

cout << s.front() << '\n';  // h
cout << s.back() << '\n';   // o
```

-   `front()`：第一个字符；
-   `back()`：最后一个字符。

也可以修改它们：

```cpp
s.front() = 'H';
s.back() = '!';

cout << s << '\n';   // Hell!
```

使用 `front()` 或 `back()` 前，必须确保字符串不为空：

```cpp
if (!s.empty()) {
    cout << s.front() << '\n';
}
```

---

## 六、遍历字符串

### 1．下标循环

这是最常用的遍历方式：

```cpp
string s = "hello";

for (int i = 0; i < static_cast<int>(s.size()); i++) {
    cout << s[i] << ' ';
}
```

输出：

```text
h e l l o
```

如果题目中字符串长度不会超过 `int` 范围，也常写成：

```cpp
for (int i = 0; i < s.size(); i++) {
    cout << s[i] << ' ';
}
```

`size()` 的返回类型实际上是无符号整数类型。为了避免不同类型比较时产生警告，可以使用：

```cpp
for (size_t i = 0; i < s.size(); i++) {
    cout << s[i] << ' ';
}
```

初学阶段使用 `int` 也可以，但要注意下标范围。

### 2．范围 `for` 循环

```cpp
string s = "hello";

for (char ch : s) {
    cout << ch << ' ';
}
```

如果只读取字符，可以使用：

```cpp
for (const char ch : s) {
    cout << ch << ' ';
}
```

如果希望直接修改字符串中的字符，使用引用：

```cpp
for (char& ch : s) {
    if (ch >= 'a' && ch <= 'z') {
        ch = ch - 'a' + 'A';
    }
}

cout << s << '\n';
```

输入：

```text
hello
```

输出：

```text
HELLO
```

如果写成：

```cpp
for (char ch : s) {
    ch = 'A';
}
```

修改的是循环变量的副本，不会改变原字符串。

### 3．统计字符类型

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;

    int digitCount = 0;
    int lowerCount = 0;
    int upperCount = 0;

    for (char ch : s) {
        if (ch >= '0' && ch <= '9') {
            digitCount++;
        } else if (ch >= 'a' && ch <= 'z') {
            lowerCount++;
        } else if (ch >= 'A' && ch <= 'Z') {
            upperCount++;
        }
    }

    cout << digitCount << ' '
         << lowerCount << ' '
         << upperCount << '\n';

    return 0;
}
```

---

## 七、字符串拼接

### 1．使用 `+` 拼接

```cpp
string first = "Hello";
string second = "World";

string result = first + " " + second;

cout << result << '\n';
```

输出：

```text
Hello World
```

`+` 会生成一个新的字符串，不会直接修改原来的字符串。

### 2．使用 `+=` 追加

```cpp
string s = "Hello";

s += ' ';
s += "World";

cout << s << '\n';
```

输出：

```text
Hello World
```

`+=` 会把内容追加到原字符串末尾。

### 3．使用 `append()`

```cpp
string s = "Hello";

s.append(" World");

cout << s << '\n';
```

`append()` 的常见写法：

```cpp
s.append("abc");        // 追加整个字符串
s.append(3, '!');       // 追加 3 个感叹号
```

完整示例：

```cpp
string s = "Hi";

s.append("!");
s.append(2, '?');

cout << s << '\n';   // Hi!??
```

### 4．字符追加与删除

#### `push_back()`

在末尾追加一个字符：

```cpp
string s = "abc";

s.push_back('d');

cout << s << '\n';   // abcd
```

#### `pop_back()`

删除末尾一个字符：

```cpp
string s = "abcd";

s.pop_back();

cout << s << '\n';   // abc
```

调用 `pop_back()` 前，必须保证字符串不为空：

```cpp
if (!s.empty()) {
    s.pop_back();
}
```

### 5．拼接时的类型注意

下面的写法是错误或容易产生误解的：

```cpp
string s = "abc";
s = s + 1;          // 错误：整数 1 不是字符或字符串
```

如果要追加字符 `'1'`，应写成：

```cpp
s += '1';
```

如果要追加字符串 `"1"`，也可以写成：

```cpp
s += "1";
```

字符和字符串的引号不能混淆：

```cpp
'1'    // 一个字符
"1"    // 一个字符组成的字符串
```

---

## 八、字符串比较

### 1．直接使用比较运算符

`string` 可以直接使用：

```cpp
==    !=    <    >    <=    >=
```

示例：

```cpp
string a = "apple";
string b = "banana";

cout << (a == b) << '\n';  // 0
cout << (a < b) << '\n';   // 1
```

字符串比较按照字典序进行，通常从左到右比较第一个不同的字符。

### 2．字典序的比较规则

例如：

```text
"apple" < "banana"
```

因为第一个字符 `'a'` 小于 `'b'`。

再例如：

```text
"abc" < "abd"
```

因为前两个字符相同，第三个字符 `'c'` 小于 `'d'`。

如果一个字符串是另一个字符串的前缀，较短的字符串字典序更小：

```text
"app" < "apple"
```

示例：

```cpp
string a = "abc";
string b = "abd";
string c = "abc";
string d = "abcd";

cout << (a < b) << '\n';   // 1
cout << (a == c) << '\n';  // 1
cout << (a < d) << '\n';   // 1
```

### 3．使用 `compare()`

`compare()` 用来比较两个字符串：

```cpp
string a = "apple";
string b = "banana";

int result = a.compare(b);
```

返回值的含义：

| `compare()` 的结果 | 含义 |
| --- | --- |
| 小于 `0` | 当前字符串字典序更小 |
| 等于 `0` | 两个字符串相等 |
| 大于 `0` | 当前字符串字典序更大 |

判断相等时，直接使用 `==` 更直观：

```cpp
if (a == b) {
    cout << "相同" << '\n';
}
```

### 4．字符串排序

`string` 可以直接使用 `sort()` 按字符升序排序：

```cpp
#include <algorithm>
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "dcaba";

    sort(s.begin(), s.end());

    cout << s << '\n';   // aabcd
    return 0;
}
```

`begin()` 和 `end()` 表示字符串的起点和终点范围。

降序排序：

```cpp
sort(s.begin(), s.end(), greater<char>());
```

需要包含：

```cpp
#include <functional>
```

---

## 九、截取字符串：`substr()`

### 1．基本用法

`substr()` 用来截取子字符串：

```cpp
string s = "abcdef";

string part = s.substr(2, 3);

cout << part << '\n';   // cde
```

形式为：

```cpp
s.substr(起始下标, 长度)
```

这里从下标 `2` 开始，截取 `3` 个字符：

```text
a b c d e f
0 1 2 3 4 5
    ↑---↑
    c d e
```

### 2．省略长度

如果省略第二个参数，就会从起始位置一直截取到字符串末尾：

```cpp
string s = "abcdef";

cout << s.substr(3) << '\n';   // def
```

### 3．实际示例：提取文件扩展名

```cpp
string fileName = "report.txt";

size_t pos = fileName.rfind('.');

if (pos != string::npos) {
    string extension = fileName.substr(pos + 1);
    cout << extension << '\n';   // txt
}
```

### 4．边界注意

`substr(pos, len)` 中：

-   `pos` 必须不大于字符串长度；
-   如果 `len` 超过剩余长度，函数会自动截取到末尾；
-   如果 `pos` 超过字符串长度，通常会抛出异常。

例如：

```cpp
string s = "abc";

cout << s.substr(1, 100) << '\n';   // bc
```

---

## 十、查找字符串：`find()` 与 `rfind()`

### 1．`find()`：从前往后查找

```cpp
string s = "hello world";

size_t pos = s.find("world");

cout << pos << '\n';   // 6
```

`find()` 返回被查找内容第一次出现的起始下标。

也可以查找一个字符：

```cpp
size_t pos = s.find('o');
```

### 2．查找失败时返回 `string::npos`

如果没有找到，`find()` 不会返回 `-1`，而是返回特殊值：

```cpp
string::npos
```

正确判断方式：

```cpp
string s = "hello";

if (s.find("abc") == string::npos) {
    cout << "没有找到" << '\n';
} else {
    cout << "找到了" << '\n';
}
```

推荐写成：

```cpp
size_t pos = s.find("abc");

if (pos == string::npos) {
    cout << "没有找到" << '\n';
}
```

### 3．从指定位置开始查找

```cpp
string s = "banana";

size_t pos = s.find('a', 2);

cout << pos << '\n';   // 3
```

形式为：

```cpp
s.find(查找内容, 开始位置)
```

### 4．`rfind()`：从后往前查找

```cpp
string s = "banana";

size_t pos = s.rfind('a');

cout << pos << '\n';   // 5
```

`rfind()` 返回最后一次出现的位置。

常见用途是查找最后一个点号、最后一个斜杠或最后一个分隔符：

```cpp
string path = "home/user/data.txt";

size_t pos = path.rfind('/');

if (pos != string::npos) {
    cout << path.substr(pos + 1) << '\n';   // data.txt
}
```

### 5．查找所有出现位置

```cpp
string s = "banana";
char target = 'a';

for (size_t pos = s.find(target);
     pos != string::npos;
     pos = s.find(target, pos + 1)) {
    cout << pos << ' ';
}
```

输出：

```text
1 3 5
```

注意每次找到后要从 `pos + 1` 开始继续查找，否则会重复找到同一个位置。

---

## 十一、按字符类型查找

`string` 还提供了按字符集合查找的函数。

| 函数 | 作用 |
| --- | --- |
| `find_first_of(chars)` | 查找第一个属于字符集合的字符 |
| `find_last_of(chars)` | 查找最后一个属于字符集合的字符 |
| `find_first_not_of(chars)` | 查找第一个不属于字符集合的字符 |
| `find_last_not_of(chars)` | 查找最后一个不属于字符集合的字符 |

### 1．`find_first_of()`

```cpp
string s = "abc123";

size_t pos = s.find_first_of("0123456789");

cout << pos << '\n';   // 3
```

表示查找第一个数字字符。

### 2．`find_first_not_of()`

```cpp
string s = "   hello";

size_t pos = s.find_first_not_of(' ');

cout << pos << '\n';   // 3
```

表示查找第一个不是空格的字符。

### 3．判断字符串是否只包含数字

```cpp
bool allDigit(const string& s) {
    if (s.empty()) {
        return false;
    }

    for (char ch : s) {
        if (ch < '0' || ch > '9') {
            return false;
        }
    }

    return true;
}
```

也可以利用 `find_first_not_of()`：

```cpp
bool allDigit(const string& s) {
    return !s.empty()
        && s.find_first_not_of("0123456789") == string::npos;
}
```

初学阶段使用循环版本通常更容易理解和调试。

---

## 十二、修改字符串

### 1．`insert()`：插入内容

```cpp
string s = "ab";

s.insert(1, "XYZ");

cout << s << '\n';   // aXYZb
```

形式为：

```cpp
s.insert(插入位置, 插入字符串)
```

插入一个字符：

```cpp
s.insert(1, 1, 'X');
```

### 2．`erase()`：删除内容

```cpp
string s = "abcdef";

s.erase(2, 2);

cout << s << '\n';   // abef
```

从下标 `2` 开始删除 `2` 个字符，即删除 `c` 和 `d`。

删除到末尾：

```cpp
string s = "abcdef";

s.erase(3);

cout << s << '\n';   // abc
```

清空整个字符串：

```cpp
s.erase();
```

也可以使用：

```cpp
s.clear();
```

### 3．`replace()`：替换内容

```cpp
string s = "I like C";

s.replace(7, 1, "C++");

cout << s << '\n';   // I like C++
```

形式为：

```cpp
s.replace(起始位置, 删除长度, 新字符串)
```

再看一个例子：

```cpp
string s = "abcdef";

s.replace(1, 3, "XYZ");

cout << s << '\n';   // aXYZef
```

从下标 `1` 开始删除 `3` 个字符 `bcd`，再放入 `XYZ`。

### 4．`swap()`：交换两个字符串

```cpp
string a = "hello";
string b = "world";

a.swap(b);

cout << a << '\n';   // world
cout << b << '\n';   // hello
```

也可以使用：

```cpp
swap(a, b);
```

---

## 十三、字符串与数字之间的转换

### 1．数字转字符串：`to_string()`

```cpp
int n = 123;
string s = to_string(n);

cout << s << '\n';   // 123
```

常见类型都可以转换：

```cpp
string a = to_string(123);
string b = to_string(3.14);
string c = to_string(10000000000LL);
```

示例：拼接计算结果：

```cpp
int score = 95;

string message = "score=" + to_string(score);

cout << message << '\n';   // score=95
```

### 2．字符串转整数：`stoi()`

```cpp
string s = "123";

int n = stoi(s);

cout << n + 1 << '\n';   // 124
```

### 3．字符串转长整数：`stoll()`

```cpp
string s = "10000000000";

long long n = stoll(s);

cout << n << '\n';
```

### 4．其他常用转换函数

| 函数 | 返回类型 |
| --- | --- |
| `stoi(s)` | `int` |
| `stol(s)` | `long` |
| `stoll(s)` | `long long` |
| `stof(s)` | `float` |
| `stod(s)` | `double` |

这些函数要求字符串的开头能够表示相应数字：

```cpp
cout << stoi("123abc") << '\n';   // 123
```

但如果字符串完全不能转换为数字，例如：

```cpp
stoi("abc");
```

程序可能抛出异常。竞赛题通常会保证输入格式正确，因此直接使用即可；如果自行编写程序，应注意检查输入内容。

### 5．进制转换

`stoi()` 可以指定进制：

```cpp
string binary = "1011";

int value = stoi(binary, nullptr, 2);

cout << value << '\n';   // 11
```

第三个参数表示进制：

```cpp
stoi("77", nullptr, 8);    // 按八进制转换
stoi("FF", nullptr, 16);   // 按十六进制转换
```

---

## 十四、字符串与字符数组

### 1．`c_str()` 的作用

`string` 可以通过 `c_str()` 得到以 `'\0'` 结尾的 C 风格字符串：

```cpp
string s = "hello";

const char* p = s.c_str();

cout << p << '\n';
```

`c_str()` 常用于需要 C 风格字符串的旧接口。

在初学和一般竞赛题中，如果函数本身支持 `string`，优先直接使用 `string`，不需要主动转换。

### 2．不要随意修改 `c_str()` 返回的内容

```cpp
const char* p = s.c_str();
```

返回的是只读指针，不应该通过 `p` 修改字符串。

而且，当原字符串发生修改时，之前保存的指针可能失效：

```cpp
const char* p = s.c_str();
s += "!";
```

不要继续假设 `p` 一定仍然指向有效的原内容。

### 3．`string` 和字符数组的选择

| 情况 | 建议 |
| --- | --- |
| 普通字符串处理 | 使用 `string` |
| 需要 `find`、`substr`、`erase` 等操作 | 使用 `string` |
| 调用只接受 C 风格字符串的旧函数 | 必要时使用 `c_str()` |
| 练习字符数组底层结构 | 可以使用字符数组 |

本教程主要使用 `string`，因为它更适合初学者进行字符串题目练习。

---

## 十五、常见字符串题目示例

### 示例 1：统计元音字母个数

**题目：** 输入一个只含英文字母的字符串，统计其中 `a`、`e`、`i`、`o`、`u` 的个数。

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;

    int count = 0;

    for (char ch : s) {
        if (ch == 'a' || ch == 'e' || ch == 'i'
            || ch == 'o' || ch == 'u') {
            count++;
        }
    }

    cout << count << '\n';
    return 0;
}
```

### 示例 2：统计数字字符的和

**题目：** 输入一个字符串，计算其中所有数字字符对应数字的和。

例如，输入 `a1b23c`，输出 `6`。

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;

    int sum = 0;

    for (char ch : s) {
        if (ch >= '0' && ch <= '9') {
            sum += ch - '0';
        }
    }

    cout << sum << '\n';
    return 0;
}
```

关键转换：

```cpp
ch - '0'
```

例如：

```text
'7' - '0' = 7
```

只有确认 `ch` 是数字字符时，才可以这样转换。

### 示例 3：判断回文字符串

**题目：** 如果一个字符串从左往右读和从右往左读完全相同，就称为回文字符串。判断输入字符串是否为回文。

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;

    bool isPalindrome = true;

    int left = 0;
    int right = static_cast<int>(s.size()) - 1;

    while (left < right) {
        if (s[left] != s[right]) {
            isPalindrome = false;
            break;
        }

        left++;
        right--;
    }

    if (isPalindrome) {
        cout << "Yes\n";
    } else {
        cout << "No\n";
    }

    return 0;
}
```

思路是让左端和右端的字符逐对比较，只要发现一对不同，就可以提前结束。

### 示例 4：删除所有空格

**题目：** 输入一整行文字，删除其中所有的普通空格后输出。

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    getline(cin, line);

    string result;

    for (char ch : line) {
        if (ch != ' ') {
            result += ch;
        }
    }

    cout << result << '\n';
    return 0;
}
```

也可以直接在原字符串上修改，但边遍历边删除时要特别注意下标变化。初学阶段可以先创建一个新的结果字符串，思路更清楚。

### 示例 5：查找并替换第一个单词

**题目：** 输入一行文字，把其中第一次出现的 `cat` 替换成 `dog`。如果没有 `cat`，保持原文不变。

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    getline(cin, line);

    size_t pos = line.find("cat");

    if (pos != string::npos) {
        line.replace(pos, 3, "dog");
    }

    cout << line << '\n';
    return 0;
}
```

这里使用：

```cpp
find()       // 查找位置
replace()    // 删除旧内容并放入新内容
```

### 示例 6：按空格读取一行中的单词

如果需要把一整行按空格拆成多个单词，可以使用 `stringstream`：

```cpp
#include <iostream>
#include <sstream>
#include <string>
using namespace std;

int main() {
    string line;
    getline(cin, line);

    string word;
    stringstream ss(line);

    while (ss >> word) {
        cout << word << '\n';
    }

    return 0;
}
```

输入：

```text
I love C++
```

输出：

```text
I
love
C++
```

`stringstream` 不是 `string` 的成员函数，但它经常和字符串输入、分词一起使用。

---

## 十六、常用函数速查表

| 操作 | 常用写法 | 作用 |
| --- | --- | --- |
| 获取长度 | `s.size()`、`s.length()` | 返回字符串长度 |
| 判断为空 | `s.empty()` | 判断是否没有字符 |
| 清空 | `s.clear()` | 删除全部字符 |
| 访问字符 | `s[i]`、`s.at(i)` | 访问第 `i` 个字符 |
| 首字符 | `s.front()` | 返回第一个字符 |
| 尾字符 | `s.back()` | 返回最后一个字符 |
| 末尾追加字符 | `s.push_back(ch)` | 添加一个字符 |
| 删除尾字符 | `s.pop_back()` | 删除最后一个字符 |
| 拼接字符串 | `s += t`、`s.append(t)` | 追加字符串 |
| 查找 | `s.find(t)` | 查找第一次出现的位置 |
| 反向查找 | `s.rfind(t)` | 查找最后一次出现的位置 |
| 截取 | `s.substr(pos, len)` | 截取子字符串 |
| 插入 | `s.insert(pos, t)` | 在指定位置插入 |
| 删除 | `s.erase(pos, len)` | 删除指定范围 |
| 替换 | `s.replace(pos, len, t)` | 替换指定范围 |
| 交换 | `s.swap(t)` | 交换两个字符串 |
| 清除前后指定字符集合 | `find_first_not_of` 等 | 查找符合条件的位置 |
| 数字转字符串 | `to_string(x)` | 把数字转换为 `string` |
| 字符串转整数 | `stoi(s)` | 转换为 `int` |
| 字符串转长整数 | `stoll(s)` | 转换为 `long long` |
| 排序 | `sort(s.begin(), s.end())` | 按字符排序 |

---

## 十七、常见错误与注意事项

### 1．把字符和字符串混淆

错误：

```cpp
if (s[i] == "a") {
}
```

`s[i]` 是一个 `char`，应该和字符 `'a'` 比较：

```cpp
if (s[i] == 'a') {
}
```

### 2．用 `cin` 读取带空格的字符串

错误：

```cpp
string s;
cin >> s;
```

如果输入可能含空格，应改用：

```cpp
getline(cin, s);
```

### 3．`cin` 和 `getline` 混用时残留换行

错误示例：

```cpp
int n;
string line;

cin >> n;
getline(cin, line);
```

应在 `getline` 前清理换行：

```cpp
cin >> n;
cin.ignore(numeric_limits<streamsize>::max(), '\n');
getline(cin, line);
```

并包含：

```cpp
#include <limits>
```

### 4．字符串下标越界

错误：

```cpp
string s = "abc";
cout << s[3] << '\n';
```

合法下标只有 `0、1、2`。

遍历时应写：

```cpp
for (int i = 0; i < s.size(); i++) {
    cout << s[i];
}
```

### 5．空字符串调用 `front()`、`back()` 或 `pop_back()`

错误：

```cpp
string s;
cout << s.front() << '\n';
```

应先判断：

```cpp
if (!s.empty()) {
    cout << s.front() << '\n';
}
```

### 6．误判 `find()` 的返回值

错误：

```cpp
if (s.find("abc") == -1) {
    // ...
}
```

正确写法：

```cpp
if (s.find("abc") == string::npos) {
    // 没找到
}
```

### 7．删除时下标发生变化

下面的代码可能跳过相邻的目标字符：

```cpp
for (int i = 0; i < s.size(); i++) {
    if (s[i] == 'a') {
        s.erase(i, 1);
    }
}
```

例如删除连续的 `aa` 时，删除第一个后，第二个会移动到当前位置，而循环马上进入下一个下标。

更安全的写法是：

```cpp
for (int i = 0; i < static_cast<int>(s.size()); ) {
    if (s[i] == 'a') {
        s.erase(i, 1);
    } else {
        i++;
    }
}
```

或者创建新的结果字符串，避免边遍历边修改。

### 8．中文字符与下标

普通 `string` 按字节存储内容。对于英文、数字和常见 ASCII 符号，一个字符通常占一个字节；中文字符通常占多个字节。

因此：

```cpp
string s = "中国";
cout << s.size() << '\n';
```

输出的长度通常不是 `2`，而是由当前编码决定的字节数。

本教程中的下标、`length()`、`substr()` 等操作主要面向英文、数字和 ASCII 字符串。若要按中文“字”进行处理，需要专门的 Unicode 字符串处理方法，不能简单套用 `s[i]`。

---

## 十八、字符串题目的基本分析套路

遇到字符串题目时，可以按下面的顺序思考：

1.  输入是否包含空格？
    -   不含空格：通常使用 `cin >> s`；
    -   可能含空格：使用 `getline(cin, s)`。
2.  需要逐个字符处理吗？
    -   使用下标循环或范围 `for`。
3.  需要统计、判断或分类吗？
    -   设置计数器、标记变量或结果字符串。
4.  需要查找一段内容吗？
    -   使用 `find()`，并检查是否等于 `string::npos`。
5.  需要截取一段内容吗？
    -   使用 `substr()`。
6.  需要插入、删除或替换吗？
    -   分别考虑 `insert()`、`erase()`、`replace()`。
7.  需要把数字和字符串互相转换吗？
    -   数字转字符串用 `to_string()`；
    -   字符串转整数用 `stoi()` 或 `stoll()`。
8.  修改字符串时，下标是否会发生变化？
    -   边遍历边删除要特别小心；
    -   必要时创建新的结果字符串。

---

## 十九、本课小结

`string` 是 C++ 中处理字符串的常用类型。最需要掌握的内容包括：

-   使用 `string` 保存一串字符；
-   字符使用单引号，字符串使用双引号；
-   `cin >> s` 读取不含空格的字符串；
-   `getline(cin, s)` 读取整行；
-   `size()` 和 `length()` 获取长度；
-   `empty()` 判断是否为空；
-   `s[i]`、`at(i)`、`front()`、`back()` 访问字符；
-   `+`、`+=`、`append()` 完成拼接；
-   `find()` 查找内容，找不到时返回 `string::npos`；
-   `substr()` 截取子字符串；
-   `insert()`、`erase()`、`replace()` 修改字符串；
-   `stoi()`、`stoll()`、`to_string()` 完成数字与字符串转换；
-   使用 `sort(s.begin(), s.end())` 对字符串中的字符排序；
-   使用字符串函数前，要检查输入方式、下标范围和空字符串情况。

可以把常见操作记成：

```text
读入：cin / getline
长度：size / length
访问：[] / at
拼接：+ / += / append
查找：find / rfind
截取：substr
修改：insert / erase / replace
转换：stoi / stoll / to_string
```