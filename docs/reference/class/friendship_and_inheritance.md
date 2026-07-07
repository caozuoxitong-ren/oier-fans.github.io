<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
<script type="text/x-mathjax-config">
	MathJax.Hub.Config({
		tex2jax: {
			skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
			inlineMath: [['$','$']]
		}
	});
</script>

# C++ 语言教程：友元与继承

> 原文链接：[cplusplus.com - Friendship and inheritance](https://cplusplus.com/doc/tutorial/inheritance/)
> 
> 本文为 cplusplus.com 友元与继承教程的中文翻译版，保留了原文的所有代码示例和格式。

---

## 友元函数

原则上，类的私有和保护成员不能从声明它们的类外部访问。然而，这条规则不适用于"友元"。

友元是用 `friend` 关键字声明的函数或类。

非成员函数如果被声明为某个类的友元，就可以访问该类的私有和保护成员。这通过在类中包含该外部函数的声明，并在其前面加上关键字 `friend` 来实现：

```cpp
// friend functions
#include <iostream>
using namespace std;

class Rectangle {
    int width, height;
  public:
    Rectangle() {}
    Rectangle (int x, int y) : width(x), height(y) {}
    int area() {return width * height;}
    friend Rectangle duplicate (const Rectangle&);
};

Rectangle duplicate (const Rectangle& param)
{
  Rectangle res;
  res.width = param.width*2;
  res.height = param.height*2;
  return res;
}

int main () {
  Rectangle foo;
  Rectangle bar (2,3);
  foo = duplicate (bar);
  cout << foo.area() << '\n';
  return 0;
}

```

**输出：**

```
24

```

`duplicate` 函数是类 `Rectangle` 的友元。因此，函数 `duplicate` 能够访问 `Rectangle` 类型不同对象的成员 `width` 和 `height`（它们是私有的）。但请注意，无论是在 `duplicate` 的声明中还是在 `main` 中对其的后续使用中，函数 `duplicate` 都不被认为是类 `Rectangle` 的成员。它不是！它只是在不成为成员的情况下拥有对其私有和保护成员的访问权限。

友元函数的典型用例是在两个不同类之间进行的操作，需要访问两者的私有或保护成员。

---

## 友元类

与友元函数类似，友元类是其成员可以访问另一个类的私有或保护成员的类：

```cpp
// friend class
#include <iostream>
using namespace std;

class Square;

class Rectangle {
    int width, height;
  public:
    int area ()
      {return (width * height);}
    void convert (Square a);
};

class Square {
  friend class Rectangle;
  private:
    int side;
  public:
    Square (int a) : side(a) {}
};

void Rectangle::convert (Square a) {
  width = a.side;
  height = a.side;
}

int main () {
  Rectangle rect;
  Square sqr (4);
  rect.convert(sqr);
  cout << rect.area();
  return 0;
}

```

**输出：**

```
16

```

在这个例子中，类 `Rectangle` 是类 `Square` 的友元，允许 `Rectangle` 的成员函数访问 `Square` 的私有和保护成员。更具体地说，`Rectangle` 访问了成员变量 `Square::side`，它描述了正方形的边长。

这个例子中还有一点新的内容：在程序开头，有一个类 `Square` 的空声明。这是必要的，因为类 `Rectangle` 使用了 `Square`（作为成员 `convert` 的参数），而 `Square` 使用了 `Rectangle`（声明它为友元）。

友元关系永远不会是对应的，除非明确指定：在我们的例子中，`Rectangle` 被 `Square` 视为友元类，但 `Square` 并不被 `Rectangle` 视为友元。因此，`Rectangle` 的成员函数可以访问 `Square` 的保护和私有成员，但反过来不行。当然，如果需要，`Square` 也可以被声明为 `Rectangle` 的友元，从而授予这种访问权限。

友元关系的另一个属性是它们不具有传递性：友元的友元不被认为是友元，除非明确指定。

---

## 类之间的继承

C++ 中的类可以被扩展，创建保留基类特征的新类。这个过程称为**继承**，涉及一个基类和一个派生类：派生类继承基类的成员，并在此基础上可以添加自己的成员。

例如，让我们想象一系列类来描述两种多边形：矩形和三角形。这两种多边形具有某些共同的属性，例如计算其面积所需的值：它们都可以简单地用高度和宽度（或底边）来描述。

这可以在类的世界中用一个类 `Polygon` 来表示，从中派生出另外两个类：`Rectangle` 和 `Triangle`：

![继承关系示意图](https://skyagent-artifacts.tiangong.cn/router/agent/2026-06-24/prod_agent_6824d513-5a12-4bb4-9ed3-ce37ac25bccb/inheritance_fc113345c28f4cd6b3e017aa1fcbbe68.png)

`Polygon` 类将包含两种多边形共有的成员。在我们的例子中：`width` 和 `height`。而 `Rectangle` 和 `Triangle` 将是其派生类，具有不同类型多边形之间不同的特定特征。

从其他类派生的类继承基类中所有可访问的成员。这意味着如果基类包含成员 `A`，而我们从中派生一个包含另一个成员 `B` 的类，派生类将同时包含成员 `A` 和成员 `B`。

两个类之间的继承关系在派生类中声明。派生类的定义使用以下语法：

```cpp
class derived_class_name: public base_class_name
{ /*...*/ };

```

其中 `derived_class_name` 是派生类的名称，`base_class_name` 是其所基于的类的名称。`public` 访问说明符可以被任何其他访问说明符（`protected` 或 `private`）替换。此访问说明符限制了从基类继承的成员的最高可访问级别：具有更高可访问级别的成员以此级别继承，而具有相同或更严格访问级别的成员在派生类中保持其严格级别。

```cpp
// derived classes
#include <iostream>
using namespace std;

class Polygon {
  protected:
    int width, height;
  public:
    void set_values (int a, int b)
      { width=a; height=b;}
 };

class Rectangle: public Polygon {
  public:
    int area ()
      { return width * height; }
 };

class Triangle: public Polygon {
  public:
    int area ()
      { return width * height / 2; }
  };

int main () {
  Rectangle rect;
  Triangle trgl;
  rect.set_values (4,5);
  trgl.set_values (4,5);
  cout << rect.area() << '\n';
  cout << trgl.area() << '\n';
  return 0;
}

```

**输出：**

```
20
10

```

类 `Rectangle` 和 `Triangle` 的对象各自包含从 `Polygon` 继承的成员。这些是：`width`、`height` 和 `set_values`。

类 `Polygon` 中使用的 `protected` 访问说明符与 `private` 类似。它唯一的区别实际上发生在继承中：当一个类继承另一个类时，派生类的成员可以访问从基类继承的保护成员，但不能访问其私有成员。

通过将 `width` 和 `height` 声明为 `protected` 而不是 `private`，这些成员也可以从派生类 `Rectangle` 和 `Triangle` 中访问，而不仅仅是从 `Polygon` 的成员中访问。如果它们是 `public`，则可以从任何地方访问。

我们可以根据哪些函数可以访问它们来总结不同的访问类型：

| 访问 | `public` | `protected` | `private` |
| --- | --- | --- | --- |
| 同一类的成员 | 是 | 是 | 是 |
| 派生类的成员 | 是 | 是 | 否 |
| 非成员 | 是 | 否 | 否 |

其中"非成员"表示从类外部的任何访问，例如从 `main`、从另一个类或从一个函数。

在上面的例子中，`Rectangle` 和 `Triangle` 继承的成员具有与它们在基类 `Polygon` 中相同的访问权限：

```cpp
Polygon::width           // protected 访问
Rectangle::width         // protected 访问
Polygon::set_values()    // public 访问
Rectangle::set_values()  // public 访问

```

这是因为继承关系在每个派生类上使用了 `public` 关键字声明：

```cpp
class Rectangle: public Polygon { /* ... */ }

```

冒号（`:`）之后的 `public` 关键字表示从其后指定的类（在本例中为 `Polygon`）继承的成员在派生类（在本例中为 `Rectangle`）中将具有的最高可访问级别。由于 `public` 是最高的可访问级别，指定此关键字意味着派生类将以与基类中相同的级别继承所有成员。

使用 `protected`，基类的所有公共成员在派生类中作为 `protected` 继承。相反，如果指定了最严格的访问级别（`private`），则所有基类成员作为 `private` 继承。

例如，如果 `Daughter` 是从 `Mother` 派生的类，我们将其定义为：

```cpp
class Daughter: protected Mother;

```

这将为 `Daughter` 从 `Mother` 继承的成员设置 `protected` 作为最低限制的访问级别。也就是说，`Mother` 中所有 `public` 的成员在 `Daughter` 中将变为 `protected`。当然，这不会限制 `Daughter` 声明自己的公共成员。该最低限制访问级别仅针对从 `Mother` 继承的成员设置。

如果没有为继承指定访问级别，编译器假定用关键字 `class` 声明的类使用 `private`，用 `struct` 声明的使用 `public`。

实际上，C++ 中大多数继承的用例应该使用公共继承。当基类需要其他访问级别时，它们通常可以更好地表示为成员变量。

---

## 从基类继承了什么？

原则上，一个公共派生类继承对基类每个成员的访问权限，除了：

-   其构造函数和析构函数
-   其赋值运算符成员（`operator=`）
-   其友元
-   其私有成员

尽管对基类的构造函数和析构函数的访问权限并不作为继承，但它们会被派生类的构造函数和析构函数自动调用。

除非另有指定，派生类的构造函数调用其基类的默认构造函数（即不带参数的构造函数）。调用基类的不同构造函数是可能的，使用与初始化列表中初始化成员变量相同的语法：

```cpp
derived_constructor_name (parameters) : base_constructor_name (parameters) {...}

```

例如：

```cpp
// constructors and derived classes
#include <iostream>
using namespace std;

class Mother {
  public:
    Mother ()
      { cout << "Mother: no parameters\n"; }
    Mother (int a)
      { cout << "Mother: int parameter\n"; }
};

class Daughter : public Mother {
  public:
    Daughter (int a)
      { cout << "Daughter: int parameter\n\n"; }
};

class Son : public Mother {
  public:
    Son (int a) : Mother (a)
      { cout << "Son: int parameter\n\n"; }
};

int main () {
  Daughter kelly(0);
  Son bud(0);

  return 0;
}

```

**输出：**

```
Mother: no parameters
Daughter: int parameter

Mother: int parameter
Son: int parameter

```

注意创建新的 `Daughter` 对象时调用了哪个 `Mother` 构造函数，以及创建 `Son` 对象时调用了哪个。这种差异是由于 `Daughter` 和 `Son` 的不同构造函数声明：

```cpp
Daughter (int a)          // 未指定：调用默认构造函数
Son (int a) : Mother (a)  // 指定了构造函数：调用此特定构造函数

```

---

## 多重继承

一个类可以从多个类继承，只需在类的基类列表中（即冒号之后）指定更多基类，用逗号分隔。例如，如果程序有一个特定的类 `Output` 用于在屏幕上打印，而我们希望类 `Rectangle` 和 `Triangle` 除了继承 `Polygon` 的成员之外还继承 `Output` 的成员，我们可以写：

```cpp
class Rectangle: public Polygon, public Output;
class Triangle: public Polygon, public Output;

```

以下是完整的例子：

```cpp
// multiple inheritance
#include <iostream>
using namespace std;

class Polygon {
  protected:
    int width, height;
  public:
    Polygon (int a, int b) : width(a), height(b) {}
};

class Output {
  public:
    static void print (int i);
};

void Output::print (int i) {
  cout << i << '\n';
}

class Rectangle: public Polygon, public Output {
  public:
    Rectangle (int a, int b) : Polygon(a,b) {}
    int area ()
      { return width*height; }
};

class Triangle: public Polygon, public Output {
  public:
    Triangle (int a, int b) : Polygon(a,b) {}
    int area ()
      { return width*height/2; }
};

int main () {
  Rectangle rect (4,5);
  Triangle trgl (4,5);
  rect.print (rect.area());
  Triangle::print (trgl.area());
  return 0;
}

```

**输出：**

```
20
10

```