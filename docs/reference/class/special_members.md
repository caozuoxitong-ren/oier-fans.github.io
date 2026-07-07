<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
<script type="text/x-mathjax-config">
	MathJax.Hub.Config({
		tex2jax: {
			skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
			inlineMath: [['$','$']]
		}
	});
</script>

# C++ 语言教程：类的特殊成员

> 原文链接：[cplusplus.com - Special Members](https://cplusplus.com/doc/tutorial/classes2/)
> 
> 本文为 cplusplus.com 类特殊成员教程的中文翻译版，保留了原文的所有代码示例和格式。

---

> \[本章需要正确理解动态分配内存的相关知识\]

**特殊成员函数**是在特定情况下隐式定义为类成员的成员函数。共有六种：

| 成员函数 | 类 C 的典型形式 |
| --- | --- |
| 默认构造函数 | `C::C();` |
| 析构函数 | `C::~C();` |
| 拷贝构造函数 | `C::C (const C&);` |
| 拷贝赋值 | `C& operator= (const C&);` |
| 移动构造函数 | `C::C (C&&);` |
| 移动赋值 | `C& operator= (C&&);` |

下面逐一考察这些特殊成员函数：

---

## 默认构造函数

默认构造函数是在类的对象被声明但未用任何参数初始化时调用的构造函数。

如果类定义中没有构造函数，编译器会假定该类有一个隐式定义的默认构造函数。因此，在声明如下类之后：

```cpp
class Example {
  public:
    int total;
    void accumulate (int x) { total += x; }
};

```

编译器假定 `Example` 有一个默认构造函数。因此，该类的对象可以通过简单地声明它们（不带任何参数）来构造：

```cpp
Example ex;

```

但一旦类显式声明了任何接受任意数量参数的构造函数，编译器就不再提供隐式的默认构造函数，也不再允许不带参数声明该类的新对象。例如，以下类：

```cpp
class Example2 {
  public:
    int total;
    Example2 (int initial_value) : total(initial_value) { };
    void accumulate (int x) { total += x; };
};

```

这里，我们声明了一个接受 `int` 类型参数的构造函数。因此以下对象声明是正确的：

```cpp
Example2 ex (100);  // 正确：调用构造函数

```

但以下声明：

```cpp
Example2 ex;  // 无效：没有默认构造函数

```

将是无效的，因为该类已声明了一个显式的接受一个参数的构造函数，它替代了隐式的不带参数的默认构造函数。

因此，如果该类的对象需要不带参数构造，则应在类中正确声明默认构造函数。例如：

```cpp
// classes and default constructors
#include <iostream>
#include <string>
using namespace std;

class Example3 {
    string data;
  public:
    Example3 (const string& str) : data(str) {}
    Example3() {}
    const string& content() const {return data;}
};

int main () {
  Example3 foo;
  Example3 bar ("Example");
  cout << "bar's content: " << bar.content() << '\n';
  return 0;
}

```

**输出：**

```
bar's content: Example

```

这里，`Example3` 有一个默认构造函数（即不带参数的构造函数），定义为空块：

```cpp
Example3() {}

```

这允许 `Example3` 类的对象不带参数构造（如本例中 `foo` 的声明）。通常，对于没有其他构造函数的所有类，这样的默认构造函数是隐式定义的，因此不需要显式定义。但在本例中，`Example3` 还有另一个构造函数：

```cpp
Example3 (const string& str);

```

当类中显式声明了任何构造函数时，就不会自动提供隐式默认构造函数。

---

## 析构函数

析构函数的功能与构造函数相反：它们负责在类的生命周期结束时进行必要的清理工作。我们在前面章节中定义的类没有分配任何资源，因此实际上不需要任何清理。

但现在，让我们想象上一个例子中的类分配了动态内存来存储其数据成员中的字符串；在这种情况下，有一个在对象生命周期结束时自动调用的函数来释放这些内存将非常有用。为此，我们使用析构函数。析构函数是一个与默认构造函数非常相似的成员函数：它不接受任何参数，也不返回任何东西（甚至不是 `void`）。它也使用类名作为自己的名称，但前面加了一个波浪号（`~`）：

```cpp
// destructors
#include <iostream>
#include <string>
using namespace std;

class Example4 {
    string* ptr;
  public:
    // 构造函数：
    Example4() : ptr(new string) {}
    Example4 (const string& str) : ptr(new string(str)) {}
    // 析构函数：
    ~Example4 () {delete ptr;}
    // 访问内容：
    const string& content() const {return *ptr;}
};

int main () {
  Example4 foo;
  Example4 bar ("Example");
  cout << "bar's content: " << bar.content() << '\n';
  return 0;
}

```

**输出：**

```
bar's content: Example

```

在构造时，`Example4` 为一个 `string` 分配了存储空间。该存储空间随后由析构函数释放。

对象的析构函数在其生命周期结束时被调用；在 `foo` 和 `bar` 的情况下，这发生在 `main` 函数结束时。

---

## 拷贝构造函数

当对象以其自身类型的命名对象作为参数传递时，会调用其拷贝构造函数来构造一个副本。

拷贝构造函数是一个构造函数，其第一个参数的类型是对类本身的引用（可能是 const 限定的），并且可以用该类型的单个参数调用。例如，对于类 `MyClass`，拷贝构造函数可能具有以下签名：

```cpp
MyClass::MyClass (const MyClass&);

```

如果类没有自定义的拷贝或移动构造函数（或赋值），则会提供一个隐式拷贝构造函数。此拷贝构造函数简单地对其成员执行拷贝。例如，对于如下类：

```cpp
class MyClass {
  public:
    int a, b;
    string c;
};

```

会自动定义一个隐式拷贝构造函数。假定该函数的定义执行浅拷贝，大致等价于：

```cpp
MyClass::MyClass(const MyClass& x) : a(x.a), b(x.b), c(x.c) {}

```

这个默认拷贝构造函数可能适合许多类的需求。但浅拷贝只拷贝类的成员本身，这对于我们上面定义的 `Example4` 这样的类可能不是我们期望的行为，因为它包含管理自身存储的指针。对于该类，执行浅拷贝意味着指针值被拷贝，但内容本身没有被拷贝；这意味着两个对象（副本和原始对象）将共享同一个字符串对象（它们都指向同一个对象），而在某个时刻（析构时），两个对象都会尝试删除同一块内存，很可能导致程序在运行时崩溃。这可以通过定义以下自定义拷贝构造函数来解决，它执行深拷贝：

```cpp
// copy constructor: deep copy
#include <iostream>
#include <string>
using namespace std;

class Example5 {
    string* ptr;
  public:
    Example5 (const string& str) : ptr(new string(str)) {}
    ~Example5 () {delete ptr;}
    // 拷贝构造函数：
    Example5 (const Example5& x) : ptr(new string(x.content())) {}
    // 访问内容：
    const string& content() const {return *ptr;}
};

int main () {
  Example5 foo ("Example");
  Example5 bar = foo;
  cout << "bar's content: " << bar.content() << '\n';
  return 0;
}

```

**输出：**

```
bar's content: Example

```

此拷贝构造函数执行的深拷贝为一个新的字符串分配了存储空间，并将其初始化为包含原始对象的副本。这样，两个对象（副本和原始对象）拥有存储在不同位置的内容的独立副本。

---

## 拷贝赋值

对象不仅在构造时被拷贝（即初始化时），还可以在任何赋值操作中被拷贝。请看区别：

```cpp
MyClass foo;
MyClass bar (foo);       // 对象初始化：调用拷贝构造函数
MyClass baz = foo;       // 对象初始化：调用拷贝构造函数
foo = bar;               // 对象已初始化：调用拷贝赋值

```

注意 `baz` 在构造时使用等号初始化，但这不是赋值操作！（虽然看起来像）：对象的声明不是赋值操作，它只是调用单参数构造函数的另一种语法。

对 `foo` 的赋值是一个赋值操作。这里没有声明任何对象，而是在已有对象 `foo` 上执行操作。

拷贝赋值运算符是 `operator=` 的重载，它以类本身的值或引用作为参数。返回值通常是对 `*this` 的引用（虽然这不是必需的）。例如，对于类 `MyClass`，拷贝赋值可能具有以下签名：

```cpp
MyClass& operator= (const MyClass&);

```

拷贝赋值运算符也是一个特殊函数，如果类没有自定义的拷贝或移动赋值（也没有移动构造函数），它也会被隐式定义。

但同样，隐式版本执行浅拷贝，适合许多类，但不适合包含管理存储的指针的类，如 `Example5` 的情况。在这种情况下，不仅类面临两次删除所指对象的风险，而且赋值操作还会产生内存泄漏，因为在赋值之前没有删除对象所指向的对象。这些问题可以通过一个删除前一个对象并执行深拷贝的拷贝赋值来解决：

```cpp
Example5& operator= (const Example5& x) {
  delete ptr;                      // 删除当前指向的字符串
  ptr = new string (x.content());  // 为新字符串分配空间，并拷贝
  return *this;
}

```

或者更好的做法是，因为其字符串成员不是常量，它可以复用同一个字符串对象：

```cpp
Example5& operator= (const Example5& x) {
  *ptr = x.content();
  return *this;
}

```

---

## 移动构造函数和移动赋值

与拷贝类似，移动也使用一个对象的值来设置另一个对象的值。但与拷贝不同的是，内容实际上从一个对象（源）转移到另一个对象（目标）：源失去该内容，由目标接管。这种移动只在值的源是未命名对象时发生。

未命名对象是临时性质的对象，因此甚至没有被赋予名称。未命名对象的典型例子是函数的返回值或类型转换。

使用这些临时对象的值来初始化另一个对象或赋值，实际上不需要拷贝：该对象永远不会被用于其他任何用途，因此其值可以被移动到目标对象中。这些情况触发移动构造函数和移动赋值：

移动构造函数在对象使用未命名临时对象在构造时初始化时被调用。同样，移动赋值在对象被赋予未命名临时对象的值时被调用：

```cpp
MyClass fn();            // 返回 MyClass 对象的函数
MyClass foo;             // 默认构造函数
MyClass bar = foo;       // 拷贝构造函数
MyClass baz = fn();      // 移动构造函数
foo = bar;               // 拷贝赋值
baz = MyClass();         // 移动赋值

```

`fn` 返回的值和用 `MyClass` 构造的值都是未命名临时对象。在这些情况下，不需要制作拷贝，因为未命名对象非常短暂，可以在更高效的操作中被另一个对象获取。

移动构造函数和移动赋值是接受类本身的右值引用类型参数的成员：

```cpp
MyClass (MyClass&&);             // 移动构造函数
MyClass& operator= (MyClass&&);  // 移动赋值

```

右值引用通过在类型后跟两个与号（`&&`）来指定。作为参数，右值引用匹配此类型临时对象的参数。

移动的概念对于管理其使用存储的对象最有用，例如用 `new` 和 `delete` 分配存储的对象。在这些对象中，拷贝和移动是真正不同的操作：

-   从 A **拷贝**到 B 意味着为 B 分配新内存，然后将 A 的全部内容拷贝到为 B 分配的新内存中。
-   从 A **移动**到 B 意味着已分配给 A 的内存被转移到 B，而不分配任何新存储。它只涉及简单地拷贝指针。

例如：

```cpp
// move constructor/assignment
#include <iostream>
#include <string>
using namespace std;

class Example6 {
    string* ptr;
  public:
    Example6 (const string& str) : ptr(new string(str)) {}
    ~Example6 () {delete ptr;}
    // 移动构造函数
    Example6 (Example6&& x) : ptr(x.ptr) {x.ptr=nullptr;}
    // 移动赋值
    Example6& operator= (Example6&& x) {
      delete ptr;
      ptr = x.ptr;
      x.ptr=nullptr;
      return *this;
    }
    // 访问内容：
    const string& content() const {return *ptr;}
    // 加法：
    Example6 operator+(const Example6& rhs) {
      return Example6(content()+rhs.content());
    }
};

int main () {
  Example6 foo ("Exam");
  Example6 bar = Example6("ple");   // 移动构造
  foo = foo + bar;                   // 移动赋值
  cout << "foo's content: " << foo.content() << '\n';
  return 0;
}

```

**输出：**

```
foo's content: Example

```

编译器已经在许多形式上需要移动构造调用的情况下进行了优化，这被称为**返回值优化**（Return Value Optimization）。最值得注意的是，当函数返回的值用于初始化对象时。在这些情况下，移动构造函数实际上可能永远不会被调用。

注意，虽然右值引用可用于任何函数参数的类型，但除了移动构造函数之外，它很少有用。右值引用比较棘手，不必要的使用可能是难以追踪的错误之源。

---

## 隐式成员

上面描述的六种特殊成员函数是在特定情况下隐式声明为类成员的：

| 成员函数 | 隐式定义的条件 | 默认定义 |
| --- | --- | --- |
| 默认构造函数 | 如果没有其他构造函数 | 不做任何操作 |
| 析构函数 | 如果没有析构函数 | 不做任何操作 |
| 拷贝构造函数 | 如果没有移动构造函数且没有移动赋值 | 拷贝所有成员 |
| 拷贝赋值 | 如果没有移动构造函数且没有移动赋值 | 拷贝所有成员 |
| 移动构造函数 | 如果没有析构函数、没有拷贝构造函数且没有拷贝和移动赋值 | 移动所有成员 |
| 移动赋值 | 如果没有析构函数、没有拷贝构造函数且没有拷贝和移动赋值 | 移动所有成员 |

注意并非所有特殊成员函数都在相同的情况下被隐式定义。这主要是为了与 C 结构和早期 C++ 版本保持向后兼容性，事实上其中包含一些已弃用的情况。幸运的是，每个类可以使用关键字 `default` 和 `delete` 分别显式选择哪些成员存在并使用其默认定义，或哪些成员被删除。语法为：

```cpp
function_declaration = default;
function_declaration = delete;

```

例如：

```cpp
// default and delete implicit members
#include <iostream>
using namespace std;

class Rectangle {
    int width, height;
  public:
    Rectangle (int x, int y) : width(x), height(y) {}
    Rectangle() = default;
    Rectangle (const Rectangle& other) = delete;
    int area() {return width*height;}
};

int main () {
  Rectangle foo;
  Rectangle bar (10,20);
  cout << "bar's area: " << bar.area() << '\n';
  return 0;
}

```

**输出：**

```
bar's area: 200

```

这里，`Rectangle` 可以用两个 `int` 参数构造，也可以默认构造（不带参数）。但它不能从另一个 `Rectangle` 对象拷贝构造，因为此函数已被删除。因此，假设有上例中的对象，以下语句将无效：

```cpp
Rectangle baz = bar;  // 无效：拷贝构造函数已被删除

```

然而，可以通过将其拷贝构造函数显式定义为以下方式使其有效：

```cpp
Rectangle::Rectangle (const Rectangle& other) = default;

```

这基本上等价于：

```cpp
Rectangle::Rectangle (const Rectangle& other) : width(other.width), height(other.height) {}

```

注意，关键字 `default` 并不定义一个等同于默认构造函数的成员函数（即默认构造函数是指不带参数的构造函数），而是等同于如果不被删除则会隐式定义的构造函数。

一般来说，为了未来的兼容性，显式定义了一个拷贝/移动构造函数或一个拷贝/移动赋值但没有同时定义两者的类，建议在其未显式定义的其他特殊成员函数上指定 `delete` 或 `default`。