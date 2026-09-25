<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
<script type="text/x-mathjax-config">
	MathJax.Hub.Config({
		tex2jax: {
			skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
			inlineMath: [['$','$']]
		}
	});
</script>

# C2-01 字符串与string

`string` 是 C++ 标准库提供的字符串类型。它把“一串字符”封装成一个可以直接比较、拼接、查找、截取和排序的对象。信奥基础题中，题目中的姓名、单词、句子、编码、日期、回文串等，通常都可以用 `string` 处理。

> **一句话理解**：把 `string` 当作“长度可变、能按下标访问的字符数组”。

本文所有程序均使用 **C++11** 标准，可在常见 OJ 中直接编译。

## 一、字符串与 `string` 的基础框架

### 1\. 字符串是什么

字符串（string）是按顺序排列的字符序列。例如：

-   `"hello"`：5 个字符；
-   `"2026-09-10"`：10 个字符；
-   `"A B C"`：5 个字符，**空格也是字符**；
-   `""`：空字符串，长度为 0。

在 C++ 中，单引号表示一个字符，双引号表示一个字符串：

| 写法 | 类型 | 含义 |
| --- | --- | --- |
| `'A'` | `char` | 一个字符 |
| `"A"` | 字符串常量 | 只含一个字符的字符串 |
| `"hello"` | 字符串常量 | 5 个字符组成的字符串 |
| `string s = "hello";` | `string` | 一个可修改的字符串对象 |

### 2\. 最常用的完整程序骨架

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";

    cout << s << "\n";
    cout << s.length() << "\n";
    cout << s[0] << "\n";

    return 0;
}
```

| 行号 | 代码 | 作用 |
| --: | --- | --- |
| 1 | `#include <iostream>` | 提供 `cin`、`cout`。 |
| 2 | `#include <string>` | 提供 `string` 类型及其成员函数。 |
| 3 | `using namespace std;` | 省去每次写 `std::`。 |
| 6 | `string s = "Hello";` | 定义并初始化字符串 `s`。 |
| 8 | `cout << s` | 输出整个字符串。 |
| 9 | `s.length()` | 得到字符串长度。 |
| 10 | `s[0]` | 访问下标为 0 的第一个字符。 |

运行结果：

```text
Hello
5
H
```

### 3\. `string` 与 `char[]` 的区别

| 对比项 | `string` | `char[]` |
| --- | --- | --- |
| 长度 | 用 `s.length()` 或 `s.size()` | 常用 `strlen(a)` |
| 比较内容 | 可以直接 `s1 == s2` | 不能直接用 `==` 比较内容 |
| 拼接 | 可以直接 `s1 + s2` | 需要 `strcat` 等函数 |
| 赋值 | 可以直接 `s = "abc"` | 数组不能直接整体赋值 |
| 安全性 | 相对方便，不必手动管理结尾字符 | 需注意 `'\0'` 和数组容量 |
| 信奥基础题推荐 | 优先使用 | 题目明确要求字符数组时再使用 |

> 在 `string` 中，`s.length()` 与 `s.size()` 对字符串来说效果相同；初学阶段统一使用 `s.length()`，更容易记忆。

---

## 二、定义、初始化、赋值与基本访问

### 1\. 定义和初始化

```cpp
string a;                  // 空字符串
string b = "hello";        // 用字符串常量初始化
string c("world");         // 另一种初始化写法
string d(5, 'x');          // "xxxxx"，5 个字符 x
```

| 写法 | 结果 |
| --- | --- |
| `string a;` | `a` 是空串，长度为 0 |
| `string b = "hello";` | `b` 为 `"hello"` |
| `string d(5, 'x');` | `d` 为 `"xxxxx"` |

### 2\. 赋值、长度与下标

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    s = "program";

    cout << "字符串：" << s << "\n";
    cout << "长度：" << s.length() << "\n";

    s[0] = 'P';
    cout << "修改后：" << s << "\n";

    return 0;
}
```

输出：

```text
字符串：program
长度：7
修改后：Program
```

字符串下标从 0 开始。若 `s = "cat"`：

| 下标 | `s[0]` | `s[1]` | `s[2]` |
| --: | --- | --- | --- |
| 字符 | `c` | `a` | `t` |

合法下标范围为：

$$
0 \le i < s.length()
$$

因此最后一个字符的下标是 `s.length() - 1`。空字符串不能访问 `s[0]`。

### 3\. 遍历每个字符

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "C++11";

    for (int i = 0; i < (int)s.length(); i++) {
        cout << "s[" << i << "] = " << s[i] << "\n";
    }

    return 0;
}
```

这里把 `s.length()` 转成 `int`，是为了避免它返回的无符号整数类型与 `int i` 混合比较带来的警告。基础题中也可以写：

```cpp
for (int i = 0; i < s.size(); i++) {
    // 使用 s[i]
}
```

---

## 三、输入输出：单词与含空格的整行字符串

### 1\. `cin >> s`：读入一个单词

```cpp
string s;
cin >> s;
```

`cin >> s` 会跳过开头空白，并在遇到空格、换行或制表符时停止。因此输入：

```text
hello world
```

读入后 `s` 只有：

```text
hello
```

适合读入不含空格的单词、账号、DNA 序列、数字串等。

### 2\. `getline(cin, s)`：读入一整行

```cpp
string s;
getline(cin, s);
```

输入：

```text
I love C++ programming
```

读入后 `s` 为整行，包括其中的空格。

| 输入方式 | 遇到空格 | 适用场景 |
| --- | --- | --- |
| `cin >> s` | 停止读入 | 单词、编码、无空格字符串 |
| `getline(cin, s)` | 继续读入 | 句子、地址、标题、含空格文本 |

### 3\. 先读数字再 `getline` 的换行陷阱

如果先用 `cin >> n`，输入流中通常还留着一个换行符。紧接着 `getline` 会把这个空行读走。

错误示例：

```cpp
int n;
string s;
cin >> n;
getline(cin, s);   // 往往读到空串
```

正确写法：

```cpp
#include <iostream>
#include <string>
#include <limits>
using namespace std;

int main() {
    int n;
    string s;

    cin >> n;
    cin.ignore();  // 默认忽略 1 个字符
    getline(cin, s);

    cout << n << "\n";
    cout << s << "\n";

    return 0;
}
```

若题目明确保证数字后只有一个换行，常写 `cin.ignore();`，默认忽略 1 个字符。

> **特别提醒**：读完数字以后，若下一项要读“可能含空格的一整行”，先处理残留换行符。

---

## 四、拼接、追加、插入和删除

### 1\. 字符串拼接

`+` 可以连接两个字符串。

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string firstName = "Zhang";
    string lastName = "San";
    string fullName = firstName + " " + lastName;

    cout << fullName << "\n";
    return 0;
}
```

输出：

```text
Zhang San
```

`+=` 表示在原字符串末尾追加内容：

```cpp
string s = "C";
s += "+";
s += "+";
// s 为 "C++"
```

还可用 `push_back` 在末尾追加一个字符：

```cpp
string s = "abc";
s.push_back('d');  // "abcd"
```

### 2\. 插入、删除与替换

| 操作 | 写法 | 含义 |
| --- | --- | --- |
| 插入 | `s.insert(pos, t)` | 在下标 `pos` 前插入字符串 `t` |
| 删除 | `s.erase(pos, len)` | 从 `pos` 开始删掉 `len` 个字符 |
| 替换 | `s.replace(pos, len, t)` | 用 `t` 替换原来的 `len` 个字符 |
| 清空 | `s.clear()` | 变成空串 |

示例：

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "I like apple";

    s.insert(7, "red ");
    cout << s << "\n";  // I like red apple

    s.erase(7, 4);
    cout << s << "\n";  // I like apple

    s.replace(7, 5, "pear");
    cout << s << "\n";  // I like pear

    return 0;
}
```

---

## 五、字典序与字符串比较

### 1\. 什么是字典序

字典序就是像查字典一样比较字符串：从左到右找到第一对不同字符，谁的该字符小，谁的字符串就小。

例如比较 `"apple"` 和 `"apply"`：

```text
a 相同，p 相同，p 相同，l 相同；
第 5 个字符：e < y；
所以 apple < apply。
```

如果一个字符串是另一个的前缀，较短字符串更小：

```text
app < apple
```

因为前 3 个字符相同，`"app"` 已结束。

### 2\. 直接使用比较运算符

| 表达式 | 含义 |
| --- | --- |
| `a == b` | 两串完全相同 |
| `a != b` | 两串不相同 |
| `a < b` | `a` 的字典序更小 |
| `a > b` | `a` 的字典序更大 |
| `a <= b`、`a >= b` | 对应的不大于、不小于比较 |

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string a = "apple";
    string b = "apply";

    if (a < b) {
        cout << a << " 排在 " << b << " 前面\n";
    }

    return 0;
}
```

### 3\. 比较正确性的说明

设两个字符串从左到右第一次不同的位置为 `k`。

-   在 `0` 到 `k - 1` 的位置，字符都相同，无法决定先后；
-   第 `k` 位是第一个能区分二者的位置；
-   字符编码较小的字符应排在前面，因此该位置字符较小的字符串字典序较小；
-   若始终没有不同字符，则两串相等；若一个先结束，则短串是长串的前缀，短串排前面。

这正是 `string` 的 `<`、`>` 等比较的含义。

> 大小写会影响比较：通常 `'A' < 'a'`。若题目要求“不区分大小写”，应先统一转成小写或大写后再比较。

---

## 六、字符串拆分、子串与查找

### 1\. 子串的概念

若一个字符串可以通过删除原串开头和结尾若干字符得到，那么得到的字符串叫原串的**子串**。子串必须连续。

例如 `s = "programming"`：

| 写法 | 结果 |
| --- | --- |
| `s.substr(0, 7)` | `"program"` |
| `s.substr(3, 4)` | `"gram"` |
| `s.substr(7)` | `"ming"` |

`substr(pos, len)` 表示从下标 `pos` 开始取 `len` 个字符；省略 `len` 时，取到字符串末尾。

### 2\. `find` 查找子串

```cpp
string s = "banana";
int pos = (int)s.find("ana");
```

`find` 返回第一次找到的位置；找不到时返回 `string::npos`。

安全写法：

```cpp
size_t pos = s.find("ana");
if (pos != string::npos) {
    cout << "找到，起点为 " << pos << "\n";
} else {
    cout << "未找到\n";
}
```

> **易错点**：不能把 `find` 的结果直接和 `-1` 随意混用。最清楚的判断是 `pos != string::npos`。

### 3\. 按分隔符拆分字符串

以下程序把形如 `2026-09-10` 的字符串按 `-` 拆成三部分。

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    string s;
    getline(cin, s);

    vector<string> part;
    string current = "";

    for (int i = 0; i < (int)s.length(); i++) {
        if (s[i] == '-') {
            part.push_back(current);
            current = "";
        } else {
            current += s[i];
        }
    }
    part.push_back(current);

    for (int i = 0; i < (int)part.size(); i++) {
        cout << part[i] << "\n";
    }

    return 0;
}
```

输入：

```text
2026-09-10
```

输出：

```text
2026
09
10
```

逐行关键解释：

| 行号 | 代码 | 作用 |
| --: | --- | --- |
| 10 | `vector<string> part;` | 保存拆分出的每一段。 |
| 11 | `string current = "";` | 暂存当前正在收集的一段字符。 |
| 14 | `if (s[i] == '-')` | 遇到分隔符时，一段结束。 |
| 15 | `part.push_back(current);` | 把这一段放入答案。 |
| 16 | `current = "";` | 清空，准备下一段。 |
| 18 | `current += s[i];` | 非分隔符则属于当前段。 |
| 21 | `part.push_back(current);` | 循环结束后，最后一段还未入库，必须补上。 |

### 4\. 拆分算法正确性

遍历到任意位置时，`current` 始终恰好保存“从上一个分隔符后到当前位置之前的所有非分隔符字符”。

-   遇到普通字符，追加到 `current`，这个不变式继续成立；
-   遇到分隔符，`current` 正好是一整段，存入答案并清空；
-   循环结束后，末尾一段没有下一个分隔符触发保存，因此再保存一次即可。

每个字符只处理一次，时间复杂度为 $O(n)$，其中 $n$ 是字符串长度。

---

## 七、典型题型一：字符串平移（循环移位）

### 1\. 左移和右移

设 `s = "abcdef"`。

-   左移 2 位：`"cdefab"`；
-   右移 2 位：`"efabcd"`。

左移 `k` 位的本质是：

```text
前 k 个字符移到末尾。
```

若 $k$ 可能大于字符串长度 $n$，先取：

$$
k \leftarrow k \bmod n
$$

因为完整移动 $n$ 位后，字符串恢复原状。

### 2\. 左移的 `substr` 实现

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    int k;
    cin >> s >> k;

    int n = (int)s.length();
    if (n > 0) {
        k %= n;
        s = s.substr(k) + s.substr(0, k);
    }

    cout << s << "\n";
    return 0;
}
```

输入：

```text
abcdef 8
```

计算：$8 \bmod 6 = 2$，输出：

```text
cdefab
```

### 3\. 为什么公式正确

左移 `k` 位后：

-   原串下标 `k` 到 `n - 1` 的字符应排到前面，即 `s.substr(k)`；
-   原串下标 `0` 到 `k - 1` 的字符应接到后面，即 `s.substr(0, k)`；
-   二者按这个顺序拼接，恰好得到左移结果。

时间复杂度为 $O(n)$，因为需要构造一个长度为 $n$ 的新字符串。

---

## 八、典型题型二：特殊字符串——回文字符串

### 1\. 回文的定义

正着读和反着读完全相同的字符串叫回文串。

| 字符串 | 是否回文 | 原因 |
| --- | --- | --- |
| `"level"` | 是 | 正反均为 `level` |
| `"abba"` | 是 | 两端依次相同 |
| `"abc"` | 否 | `a` 与 `c` 不同 |
| `""` | 是 | 没有矛盾的字符对 |

### 2\. 双指针判断模板

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;

    int left = 0;
    int right = (int)s.length() - 1;
    bool ok = true;

    while (left < right) {
        if (s[left] != s[right]) {
            ok = false;
            break;
        }
        left++;
        right--;
    }

    if (ok) {
        cout << "Yes\n";
    } else {
        cout << "No\n";
    }

    return 0;
}
```

| 行号 | 代码 | 作用 |
| --: | --- | --- |
| 9 | `int left = 0;` | 左指针从首字符开始。 |
| 10 | `int right = ... - 1;` | 右指针从尾字符开始。 |
| 13 | `while (left < right)` | 每次比较一对对称位置，交错后无需继续。 |
| 14 | `s[left] != s[right]` | 一对不同即可说明不是回文。 |
| 18—19 | `left++; right--;` | 向中间移动，继续比较下一对。 |

### 3\. 双指针算法的正确性证明

循环开始前，尚未比较任何对称字符。

每轮循环比较 `s[left]` 与 `s[right]`：

-   若不同，这一对在回文定义中必须相同，却实际不同，所以字符串一定不是回文；
-   若相同，说明最外层这一对满足要求，两个指针向内移动；
-   当 `left >= right` 时，所有对称位置都已比较且相同，因此字符串是回文。

每个字符至多参与一次比较，时间复杂度为 $O(n)$，额外空间复杂度为 $O(1)$。

### 4\. 变形：忽略大小写和非字母数字

题目若说“忽略大小写、空格和标点”，不能直接按原串比较。做法是：

1.  遇到非字母数字就跳过；
2.  将两端字符统一转小写；
3.  再比较。

```cpp
#include <cctype>
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);

    int left = 0;
    int right = (int)s.length() - 1;
    bool ok = true;

    while (left < right) {
        while (left < right && !isalnum((unsigned char)s[left])) {
            left++;
        }
        while (left < right && !isalnum((unsigned char)s[right])) {
            right--;
        }

        char a = (char)tolower((unsigned char)s[left]);
        char b = (char)tolower((unsigned char)s[right]);

        if (a != b) {
            ok = false;
            break;
        }
        left++;
        right--;
    }

    cout << (ok ? "Yes" : "No") << "\n";
    return 0;
}
```

---

## 九、典型题型三：字符串排序与最小字典序

### 1\. 对字符串中的字符排序

`sort(s.begin(), s.end())` 可以把字符串中的字符按升序排列。

```cpp
#include <algorithm>
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;

    sort(s.begin(), s.end());

    cout << s << "\n";
    return 0;
}
```

输入：

```text
cabca
```

输出：

```text
aabcc
```

`sort` 的时间复杂度是 $O(n \log n)$。

### 2\. 对多个字符串排序

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<string> words(n);
    for (int i = 0; i < n; i++) {
        cin >> words[i];
    }

    sort(words.begin(), words.end());

    for (int i = 0; i < n; i++) {
        cout << words[i] << "\n";
    }

    return 0;
}
```

`string` 本身已经定义了字典序比较，因此 `sort(words.begin(), words.end())` 会按字典序排列。

输入：

```text
4
banana
apple
app
cat
```

输出：

```text
app
apple
banana
cat
```

### 3\. 最小字典序拼接的思考

若题目要求将两个字符串 `a`、`b` 拼接，使结果尽量小，不应只比较 `a < b`，而应比较：

```cpp
a + b < b + a
```

例如 `a = "9"`，`b = "34"`：

```text
a + b = "934"
b + a = "349"
```

显然应让 `"34"` 排在前面。

> 这类题的比较对象不是原串本身，而是“交换前后的拼接结果”。

---

## 十、典型题型四：字符串应用题的常用模型

### 1\. 字符统计：统计元音字母个数

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);

    int count = 0;
    for (int i = 0; i < (int)s.length(); i++) {
        char ch = s[i];
        if (ch == 'a' || ch == 'e' || ch == 'i' ||
            ch == 'o' || ch == 'u' ||
            ch == 'A' || ch == 'E' || ch == 'I' ||
            ch == 'O' || ch == 'U') {
            count++;
        }
    }

    cout << count << "\n";
    return 0;
}
```

它的套路是“逐个字符扫描 + 满足条件就统计”，时间复杂度为 $O(n)$。

### 2\. 字符替换：把所有 `-` 改成 `/`

```cpp
for (int i = 0; i < (int)s.length(); i++) {
    if (s[i] == '-') {
        s[i] = '/';
    }
}
```

适用于日期格式转换、敏感字符替换、大小写转换、编码规范化等。

### 3\. 删除指定字符：保留想要的字符

```cpp
string result = "";

for (int i = 0; i < (int)s.length(); i++) {
    if (s[i] != ' ') {
        result += s[i];
    }
}
```

例如把 `"a b c"` 变成 `"abc"`。这个写法比一边遍历一边 `erase` 更容易保证下标不乱。

### 4\. 反转字符串

```cpp
#include <algorithm>

reverse(s.begin(), s.end());
```

例如 `"hello"` 反转后为 `"olleh"`。回文题也可以复制一份、反转后比较：

```cpp
string t = s;
reverse(t.begin(), t.end());
if (s == t) {
    // 是回文
}
```

这种写法清楚，但额外空间为 $O(n)$；双指针法只需 $O(1)$ 额外空间。

### 5\. 数字串处理

输入 `"001230"` 时，字符串方式可以保留前导零：

```cpp
string s;
cin >> s;
```

常见操作：

-   每位数字求和：`sum += s[i] - '0';`
-   判断是否只含数字：检查每个字符是否在 `'0'` 到 `'9'`；
-   模拟大整数加减、竖式运算；
-   判断手机号、身份证号、日期格式等固定格式。

> `s[i] - '0'` 的前提是 `s[i]` 确实是数字字符；不要对字母或符号直接这样计算。

---

## 十一、常见错误与修正

| 编号 | 错误 | 后果 | 改正 |
| --: | --- | --- | --- |
| 1 | 用 `cin >> s` 读一句话 | 空格后的内容丢失 | 含空格时用 `getline(cin, s)` |
| 2 | `cin >> n` 后直接 `getline` | 常读到空串 | 先用 `cin.ignore(...)` 清理换行 |
| 3 | 访问 `s[s.length()]` | 越界，最后一个合法下标不是它 | 最后一个字符用 `s[s.length() - 1]`，且先保证非空 |
| 4 | 空串也访问 `s[0]` | 越界 | 先判断 `!s.empty()` |
| 5 | `find` 找不到时仍用返回值取下标 | 越界或逻辑错 | 先判断 `pos != string::npos` |
| 6 | 拆分时忘记加入最后一段 | 最后一段丢失 | 循环结束后补 `part.push_back(current)` |
| 7 | 平移时没有 `k %= n` | `k` 过大导致逻辑复杂或越界 | 非空时先取模 |
| 8 | 一边按递增下标遍历一边 `erase` | 删除后后面的字符左移，可能漏检查 | 优先新建 `result` 收集保留字符 |
| 9 | 用 `==` 比较两个 `char[]` | 比较的是地址，不是内容 | 使用 `string`，或字符数组用 `strcmp` |
| 10 | 把 `s[i] - '0'` 用在非数字字符上 | 得到无意义数值 | 先保证字符是 `'0'` 到 `'9'` |

> **字符串题先问三个问题**：输入是否有空格？下标是否会越界？题目要求的是字符顺序、单词顺序，还是字典序？

---

## 十二、方法、套路与策略小结

### 1\. 基础操作速查

| 需求 | 常用写法 |
| --- | --- |
| 定义字符串 | `string s;` |
| 读一个单词 | `cin >> s;` |
| 读一整行 | `getline(cin, s);` |
| 长度 | `s.length()` |
| 第 `i` 个字符 | `s[i]` |
| 拼接 | `a + b`、`a += b` |
| 截取 | `s.substr(pos, len)` |
| 查找 | `s.find(t)` |
| 比较 | `a < b`、`a == b` |
| 反转 | `reverse(s.begin(), s.end())` |
| 排序 | `sort(s.begin(), s.end())` |
| 清空 | `s.clear()` |

### 2\. 见题识别套路

-   **题目给一句话、地址、标题**：优先想 `getline`。
-   **题目要求某个字符出现次数、替换、删除、转换大小写**：从左到右扫描每个字符。
-   **题目要求按逗号、横线、空格切开**：维护 `current`，遇分隔符就存入答案。
-   **题目问两个串谁排前面**：用字典序比较；若是拼接最小/最大，比较 `a+b` 与 `b+a`。
-   **题目包含“首尾相同、正反一样、对称”**：优先考虑双指针回文判断。
-   **题目包含“向左/向右移动”**：先对长度取模，再用两段子串拼接。
-   **题目要求重新排列字符**：若只处理一个字符串的字符，使用 `sort(s.begin(), s.end())`。
-   **题目是长数字、前导零不能丢、逐位操作**：把输入当 `string`，不要立刻转整数。

### 3\. 信奥策略意识

-   读完题先写清楚字符串的下标范围：`0` 到 `n - 1`。
-   `string` 题的绝大多数基础操作可在 $O(n)$ 或 $O(n \log n)$ 内完成；不必为了小数据写复杂结构。
-   遇到边界样例要主动验证：空串、单字符、全相同字符、首尾不同、分隔符在开头或结尾。
-   字符串含空格时，输入方式本身就是题目的一部分；代码逻辑对了，读入错了也会 WA。
-   提交前至少手算两类样例：一个普通样例，一个边界样例。例如回文题同时测试 `level` 与 `abc`；平移题同时测试 `k < n` 与 `k > n`。

掌握 `string` 后，很多“看起来像文字题”的题目都会变成固定流程：**读入 → 遍历/比较/切分 → 按规则构造答案 → 输出**。