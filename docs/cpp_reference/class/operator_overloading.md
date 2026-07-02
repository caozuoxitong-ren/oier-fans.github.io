<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
<script type="text/x-mathjax-config">
	MathJax.Hub.Config({
		tex2jax: {
			skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
			inlineMath: [['$','$']]
		}
	});
</script>

# C++ 语言教程：运算符重载与类模板

> 原文链接：[cplusplus.com - Classes (II)](https://cplusplus.com/doc/tutorial/templates/)
> 
> 本文为 cplusplus.com 类教程（第二部分）的中文翻译版，保留了原文的所有代码示例和格式。

---

## 运算符重载

类本质上定义了在 C++ 代码中使用的新类型。而 C++ 中的类型不仅通过构造和赋值与代码交互，还通过运算符进行交互。例如，对基本类型执行以下操作：

```cpp
int a, b, c;
a = b + c;

```

这里，基本类型（`int`）的不同变量被应用了加法运算符，然后是赋值运算符。对于基本算术类型，此类操作的含义通常是显而易见且明确的，但对于某些类类型可能并非如此。例如：

```cpp
struct myclass {
  string product;
  float price;
} a, b, c;
a = b + c;

```

这里，对 `b` 和 `c` 执行加法操作的结果并不明显。事实上，这段代码本身会导致编译错误，因为类型 `myclass` 没有定义加法的行为。然而，C++ 允许大多数运算符被重载，使得它们的行为可以为几乎任何类型（包括类）定义。以下是所有可重载运算符的列表：

**可重载的运算符：**

```
+    -    *    /    =    <    >    +=   -=   *=   /=   <<   >>   
<<=  >>=  ==   !=   <=   >=   ++   --   %    &    ^    !    |   
~    &=   ^=   |=   &&   ||   %=   []   ()   ,    ->*  ->   new   
delete   new[]   delete[]

```

运算符通过**运算符函数**来重载，它们是具有特殊名称的常规函数：其名称以关键字 `operator` 开头，后跟被重载的运算符符号。语法为：

```cpp
type operator sign (parameters) { /*... body ...*/ }

```

例如，笛卡尔向量是包含两个坐标（x 和 y）的集合。两个笛卡尔向量的加法操作定义为将两个 x 坐标相加、两个 y 坐标相加。例如，将笛卡尔向量 (3,1) 和 (1,2) 相加的结果为 (3+1,1+2) = (4,3)。这可以用以下 C++ 代码实现：

```cpp
// overloading operators example
#include <iostream>
using namespace std;

class CVector {
  public:
    int x,y;
    CVector () {};
    CVector (int a,int b) : x(a), y(b) {}
    CVector operator + (const CVector&);
};

CVector CVector::operator+ (const CVector& param) {
  CVector temp;
  temp.x = x + param.x;
  temp.y = y + param.y;
  return temp;
}

int main () {
  CVector foo (3,1);
  CVector bar (1,2);
  CVector result;
  result = foo + bar;
  cout << result.x << ',' << result.y << '\n';
  return 0;
}

```

**输出：**

```
4,3

```

如果对这么多 `CVector` 的出现感到困惑，请考虑其中一些指的是类名（即类型）`CVector`，而另一些是具有该名称的函数（即构造函数，必须与类同名）。例如：

```cpp
CVector (int, int) : x(a), y(b) {}          // 函数名 CVector（构造函数）
CVector operator+ (const CVector&);          // 返回 CVector 的函数

```

类 `CVector` 的函数 `operator+` 为该类型重载了加法运算符（`+`）。一旦声明，此函数可以隐式使用运算符调用，也可以显式使用其函数名调用：

```cpp
c = a + b;
c = a.operator+ (b);

```

这两个表达式是等价的。

运算符重载只是常规函数，可以有任何行为；实际上并不要求该重载执行的操作与运算符的数学或通常含义有关系，尽管强烈建议这样做。例如，一个类重载 `operator+` 来实际执行减法，或重载 `operator==` 来将对象填充为零，是完全有效的，尽管使用这样的类可能会令人困惑。

对于像 `operator+` 这样的操作的成员函数重载，其期望的参数自然是运算符右侧的操作数。这对所有二元运算符（左侧有一个操作数、右侧有一个操作数的运算符）都是通用的。但运算符可以有多种形式。以下是每种可重载运算符所需参数的摘要表（请将 `@` 替换为具体运算符）：

| 表达式 | 运算符 | 成员函数 | 非成员函数 |
| --- | --- | --- | --- |
| `@a` | `+ - * & ! ~ ++ --` | `A::operator@()` | `operator@(A)` |
| `a@` | `++ --` | `A::operator@(int)` | `operator@(A,int)` |
| `a@b` | \`+ - \* / % ^ & | \< \> == != \<= \>= \<\< \>\> && |  |
| `a@b` | \`= += -= \*= /= %= ^= &= | \= \<\<= \>\>= \[\]\` | `A::operator@(B)` |
| `a(b,c...)` | `()` | `A::operator()(B,C...)` | \- |
| `a->b` | `->` | `A::operator->()` | \- |
| `(TYPE) a` | `TYPE` | `A::operator TYPE()` | \- |

其中 `a` 是类 `A` 的对象，`b` 是类 `B` 的对象，`c` 是类 `C` 的对象。`TYPE` 是任何类型（该运算符重载向类型 `TYPE` 的转换）。

注意某些运算符可以以两种形式重载：作为成员函数或作为非成员函数。上面的例子中 `operator+` 使用了第一种情况。但某些运算符也可以作为非成员函数重载；在这种情况下，运算符函数以适当类的对象作为第一个参数。

例如：

```cpp
// non-member operator overloads
#include <iostream>
using namespace std;

class CVector {
  public:
    int x,y;
    CVector () {}
    CVector (int a, int b) : x(a), y(b) {}
};

CVector operator+ (const CVector& lhs, const CVector& rhs) {
  CVector temp;
  temp.x = lhs.x + rhs.x;
  temp.y = lhs.y + rhs.y;
  return temp;
}

int main () {
  CVector foo (3,1);
  CVector bar (1,2);
  CVector result;
  result = foo + bar;
  cout << result.x << ',' << result.y << '\n';
  return 0;
}

```

**输出：**

```
4,3

```

---

## 关键字 this

关键字 `this` 代表一个指向正在执行成员函数的对象的指针。它在类的成员函数中用于引用对象本身。

它的一个用途是检查传递给成员函数的参数是否是对象本身。例如：

```cpp
// example on this
#include <iostream>
using namespace std;

class Dummy {
  public:
    bool isitme (Dummy& param);
};

bool Dummy::isitme (Dummy& param) {
  if (&param == this) return true;
  else return false;
}

int main () {
  Dummy a;
  Dummy* b = &a;
  if ( b->isitme(a) )
    cout << "yes, &a is b\n";
  return 0;
}

```

**输出：**

```
yes, &a is b

```

它也经常用于通过引用返回对象的 `operator=` 成员函数中。继续前面笛卡尔向量的例子，其 `operator=` 函数可以定义为：

```cpp
CVector& CVector::operator= (const CVector& param) {
  x=param.x;
  y=param.y;
  return *this;
}

```

事实上，这个函数与编译器为该类隐式生成的 `operator=` 代码非常相似。

---

## 静态成员

类可以包含静态成员，无论是数据还是函数。

类的静态数据成员也被称为"类变量"，因为同一类的所有对象只有一个共同的变量，共享相同的值：即，其值在该类的不同对象之间没有差异。

例如，它可以用于类中的一个变量，包含当前分配的该类对象数量的计数器，如下例所示：

```cpp
// static members in classes
#include <iostream>
using namespace std;

class Dummy {
  public:
    static int n;
    Dummy () { n++; };
};

int Dummy::n=0;

int main () {
  Dummy a;
  Dummy b[5];
  cout << a.n << '\n';
  Dummy * c = new Dummy;
  cout << Dummy::n << '\n';
  delete c;
  return 0;
}

```

**输出：**

```
6
7

```

事实上，静态成员具有与非成员变量相同的属性，但它们享有类作用域。因此，为了避免它们被多次声明，它们不能在类中直接初始化，而需要在类外部某处初始化。如上例所示：

```cpp
int Dummy::n=0;

```

因为它是同一类所有对象的共同变量值，它可以作为该类任何对象的成员来引用，甚至直接通过类名引用（当然这仅对静态成员有效）：

```cpp
cout << a.n;
cout << Dummy::n;

```

以上两个调用引用的是同一个变量：类 `Dummy` 中所有对象共享的静态变量 `n`。

同样，它就像一个非成员变量，但其名称需要像类的成员（或对象的成员）一样访问。

类也可以有静态成员函数。它们代表相同的概念：类的成员对所有该类的对象是共同的，行为与非成员函数完全相同，但像类的成员一样被访问。因为它们像非成员函数，它们不能访问类的非静态成员（无论是成员变量还是成员函数）。它们也不能使用关键字 `this`。

---

## const 成员函数

当一个类的对象被限定为 const 对象时：

```cpp
const MyClass myobject;

```

从类外部对其数据成员的访问被限制为只读，就好像所有数据成员对于从类外部访问它们的人来说都是 `const` 的。但请注意，构造函数仍然会被调用，并允许初始化和修改这些数据成员：

```cpp
// constructor on const object
#include <iostream>
using namespace std;

class MyClass {
  public:
    int x;
    MyClass(int val) : x(val) {}
    int get() {return x;}
};

int main() {
  const MyClass foo(10);
  // foo.x = 20;            // 无效：x 不能被修改
  cout << foo.x << '\n';    // 正确：数据成员 x 可以被读取
  return 0;
}

```

**输出：**

```
10

```

const 对象的成员函数只有在它们本身被指定为 const 成员时才能被调用；在上面的例子中，成员 `get`（未被指定为 const）不能从 `foo` 调用。要指定一个成员为 const 成员，`const` 关键字应放在函数原型之后，在其参数的闭括号之后：

```cpp
int get() const {return x;}

```

注意 `const` 可以用来限定成员函数返回的类型。这个 `const` 与指定成员为 const 的 `const` 不同。两者是独立的，位于函数原型中的不同位置：

```cpp
int get() const {return x;}             // const 成员函数
const int& get() {return x;}            // 返回 const& 的成员函数
const int& get() const {return x;}      // 返回 const& 的 const 成员函数

```

被指定为 const 的成员函数不能修改非静态数据成员，也不能调用其他非 const 成员函数。本质上，const 成员不应修改对象的状态。

const 对象只能访问标记为 const 的成员函数，但非 const 对象不受限制，因此可以访问 const 和非 const 成员函数。

你可能认为你很少会声明 const 对象，因此将所有不修改对象的成员标记为 const 不值得费力，但 const 对象实际上非常常见。大多数以类为参数的函数实际上通过 const 引用接收它们，因此这些函数只能访问其 const 成员：

```cpp
// const objects
#include <iostream>
using namespace std;

class MyClass {
    int x;
  public:
    MyClass(int val) : x(val) {}
    const int& get() const {return x;}
};

void print (const MyClass& arg) {
  cout << arg.get() << '\n';
}

int main() {
  MyClass foo (10);
  print(foo);
  return 0;
}

```

**输出：**

```
10

```

如果在这个例子中，`get` 未被指定为 const 成员，则 `print` 函数中对 `arg.get()` 的调用将不可能，因为 const 对象只能访问 const 成员函数。

成员函数可以根据其 const 性进行重载：即，一个类可以有两个签名相同的成员函数，只是一个为 const 而另一个不是：在这种情况下，const 版本仅在对象本身为 const 时被调用，非 const 版本在对象本身为非 const 时被调用。

```cpp
// overloading members on constness
#include <iostream>
using namespace std;

class MyClass {
    int x;
  public:
    MyClass(int val) : x(val) {}
    const int& get() const {return x;}
    int& get() {return x;}
};

int main() {
  MyClass foo (10);
  const MyClass bar (20);
  foo.get() = 15;         // 正确：get() 返回 int&
  // bar.get() = 25;      // 无效：get() 返回 const int&
  cout << foo.get() << '\n';
  cout << bar.get() << '\n';
  return 0;
}

```

**输出：**

```
15
20

```

---

## 类模板

就像我们可以创建函数模板一样，我们也可以创建类模板，允许类的成员使用模板参数作为类型。例如：

```cpp
template <class T>
class mypair {
    T values [2];
  public:
    mypair (T first, T second)
    {
      values[0]=first;
      values[1]=second;
    }
};

```

我们刚刚定义的类用于存储两个任何有效类型的元素。例如，如果我们想声明该类的对象来存储两个 `int` 类型值 115 和 36，我们会写：

```cpp
mypair<int> myobject (115, 36);

```

同一个类也可以用于创建存储任何其他类型的对象，例如：

```cpp
mypair<double> myfloats (3.0, 2.18);

```

构造函数是前一个类模板中唯一的成员函数，它已在类定义本身中内联定义。如果成员函数在类模板定义之外定义，它应以 `template <...>` 前缀开头：

```cpp
// class templates
#include <iostream>
using namespace std;

template <class T>
class mypair {
    T a, b;
  public:
    mypair (T first, T second)
      {a=first; b=second;}
    T getmax ();
};

template <class T>
T mypair<T>::getmax () {
  T retval;
  retval = a>b? a : b;
  return retval;
}

int main () {
  mypair <int> myobject (100, 75);
  cout << myobject.getmax();
  return 0;
}

```

**输出：**

```
100

```

注意成员函数 `getmax` 定义的语法：

```cpp
template <class T>
T mypair<T>::getmax ()

```

被这么多 `T` 搞糊涂了？这个声明中有三个 `T`：第一个是模板参数。第二个 `T` 指的是函数返回的类型。第三个 `T`（尖括号之间的那个）也是一个要求：它指定此函数的模板参数也是类模板参数。

---

## 模板特化

当特定类型作为模板参数传递时，可以为模板定义不同的实现。这被称为**模板特化**（template specialization）。

例如，假设我们有一个非常简单的类叫 `mycontainer`，它可以存储一个任何类型的元素，并且只有一个名为 `increase` 的成员函数，用于增加其值。但我们发现当它存储 `char` 类型元素时，有一个完全不同的实现，包含一个名为 `uppercase` 的成员函数会更方便，因此我们决定为该类型声明一个类模板特化：

```cpp
// template specialization
#include <iostream>
using namespace std;

// 类模板：
template <class T>
class mycontainer {
    T element;
  public:
    mycontainer (T arg) {element=arg;}
    T increase () {return ++element;}
};

// 类模板特化：
template <>
class mycontainer <char> {
    char element;
  public:
    mycontainer (char arg) {element=arg;}
    char uppercase ()
    {
      if ((element>='a')&&(element<='z'))
        element+='A'-'a';
      return element;
    }
};

int main () {
  mycontainer<int> myint (7);
  mycontainer<char> mychar ('j');
  cout << myint.increase() << endl;
  cout << mychar.uppercase() << endl;
  return 0;
}

```

**输出：**

```
8
J

```

这是类模板特化使用的语法：

```cpp
template <> class mycontainer <char> { ... };

```

首先，注意我们在类名前加了 `template<>`，包含一个空的参数列表。这是因为所有类型都已已知，此特化不需要模板参数，但它仍然是类模板的特化，因此需要这样标记。

但比这个前缀更重要的是类模板名之后的 `<char>` 特化参数。此特化参数本身标识了模板类被特化的类型（`char`）。注意通用类模板和特化之间的区别：

```cpp
template <class T> class mycontainer { ... };     // 通用模板
template <> class mycontainer <char> { ... };      // 特化

```

第一行是通用模板，第二行是特化。

当我们为模板类声明特化时，我们必须也定义其所有成员，即使是与通用模板类相同的成员，因为从通用模板到特化没有成员的"继承"。