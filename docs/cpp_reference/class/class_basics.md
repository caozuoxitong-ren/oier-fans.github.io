<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
<script type="text/x-mathjax-config">
	MathJax.Hub.Config({
		tex2jax: {
			skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
			inlineMath: [['$','$']]
		}
	});
</script>

# C++ 语言教程：类基础与构造函数

> 原文链接：[cplusplus.com - Classes (I)](https://cplusplus.com/doc/tutorial/classes/)
> 
> 本文为 cplusplus.com 类教程（第一部分）的中文翻译版，保留了原文的所有代码示例和格式。

---

## 类

**类**（Classes）是**数据结构**概念的扩展：与数据结构一样，它们可以包含数据成员，但它们还可以包含函数作为成员。

**对象**（Object）是类的实例化。用变量的术语来说，类就是类型，而对象就是变量。

类使用关键字 `class` 或关键字 `struct` 来定义，语法如下：

```cpp
class class_name {
  access_specifier_1:
    member1;
  access_specifier_2:
    member2;
  ...
} object_names;

```

其中 `class_name` 是类的有效标识符，`object_names` 是该类对象名称的可选列表。声明的主体可以包含**成员**，成员可以是数据声明或函数声明，还可以包含可选的**访问说明符**。

类与普通**数据结构**的格式相同，只是它们还可以包含函数，并拥有这些被称为**访问说明符**的新东西。**访问说明符**是以下三个关键字之一：`private`、`public` 或 `protected`。这些说明符修改其后成员的访问权限：

-   `private` 成员只能从同一类的其他成员中访问（或从其"友元"中访问）。
-   `protected` 成员可以从同一类的其他成员中访问（或从其"友元"中访问），还可以从其派生类的成员中访问。
-   `public` 成员可以从对象可见的任何地方访问。

默认情况下，使用 `class` 关键字声明的类的所有成员都具有 private 访问权限。因此，在任何其他访问说明符之前声明的成员自动具有 private 访问权限。例如：

```cpp
class Rectangle {
    int width, height;
  public:
    void set_values (int,int);
    int area (void);
} rect;

```

这声明了一个名为 `Rectangle` 的类（即一个类型）和该类的一个对象（即一个变量），名为 `rect`。这个类包含四个成员：两个 `int` 类型的数据成员（成员 `width` 和成员 `height`），具有 **private 访问权限**（因为 private 是默认的访问级别），以及两个具有 **public 访问权限**的成员函数：函数 `set_values` 和 `area`，目前我们只包含了它们的声明，而没有定义。

注意**类名**和**对象名**之间的区别：在上面的例子中，`Rectangle` 是**类名**（即类型），而 `rect` 是 `Rectangle` 类型的对象。这与以下声明中 `int` 和 `a` 的关系相同：

```cpp
int a;

```

其中 `int` 是类型名（类），`a` 是变量名（对象）。

在声明了 `Rectangle` 和 `rect` 之后，对象 `rect` 的任何公共成员都可以像普通函数或普通变量一样访问，只需在**对象名**和**成员名**之间插入一个点号（`.`）。这与访问普通数据结构成员的语法相同。例如：

```cpp
rect.set_values (3,4);
myarea = rect.area();

```

`rect` 中不能从类外部访问的成员只有 `width` 和 `height`，因为它们具有 private 访问权限，只能从同一类的其他成员中引用。

以下是类 Rectangle 的完整示例：

```cpp
// classes example
#include <iostream>
using namespace std;

class Rectangle {
    int width, height;
  public:
    void set_values (int,int);
    int area() {return width*height;}
};

void Rectangle::set_values (int x, int y) {
  width = x;
  height = y;
}

int main () {
  Rectangle rect;
  rect.set_values (3,4);
  cout << "area: " << rect.area();
  return 0;
}

```

**输出：**

```
area: 12

```

这个例子重新引入了**作用域运算符**（`::`，两个冒号），在之前的章节中与命名空间相关时已经见过。这里它在函数 `set_values` 的定义中使用，用于在类外部定义类的成员。

注意成员函数 `area` 的定义已经直接包含在类 `Rectangle` 的定义中，因为它极其简单。相反，`set_values` 在类中仅用原型声明，其定义在类的外部。在这个外部定义中，作用域运算符（`::`）用于指定被定义的函数是类 `Rectangle` 的成员，而不是一个普通的非成员函数。

作用域运算符（`::`）指定了被定义成员所属的类，赋予与函数定义直接包含在类定义中完全相同的作用域属性。例如，上例中的函数 `set_values` 可以访问变量 `width` 和 `height`，它们是类 `Rectangle` 的私有成员，因此只能从该类的其他成员（如本函数）中访问。

在类定义中完全定义成员函数与仅在类中包含声明而稍后在类外定义，唯一的区别在于：第一种情况下，函数被编译器自动视为**内联**成员函数，而第二种情况下它是普通的（非内联）类成员函数。这不会导致行为上的差异，仅影响可能的编译器优化。

成员 `width` 和 `height` 具有 private 访问权限（请记住，如果没有其他指定，使用关键字 `class` 定义的类的所有成员都具有 private 访问权限）。通过将它们声明为 private，不允许从类外部访问。这是合理的，因为我们已经定义了一个成员函数来为对象中的这些成员设置值：成员函数 `set_values`。因此，程序的其余部分不需要直接访问它们。也许在这样一个简单的例子中，很难看出限制对这些变量的访问有什么用处，但在更大的项目中，值不能以意外的方式被修改（从对象的角度来看是意外的）可能非常重要。

类最重要的属性是它是一个类型，因此我们可以声明它的多个对象。例如，继续上面类 `Rectangle` 的例子，我们可以在对象 `rect` 之外再声明对象 `rectb`：

```cpp
// example: one class, two objects
#include <iostream>
using namespace std;

class Rectangle {
    int width, height;
  public:
    void set_values (int,int);
    int area () {return width*height;}
};

void Rectangle::set_values (int x, int y) {
  width = x;
  height = y;
}

int main () {
  Rectangle rect, rectb;
  rect.set_values (3,4);
  rectb.set_values (5,6);
  cout << "rect area: " << rect.area() << endl;
  cout << "rectb area: " << rectb.area() << endl;
  return 0;
}

```

**输出：**

```
rect area: 12
rectb area: 30

```

在这个特定的例子中，类（对象的类型）是 `Rectangle`，它有两个实例（即对象）：`rect` 和 `rectb`。它们各自拥有自己的成员变量和成员函数。

注意调用 `rect.area()` 与调用 `rectb.area()` 的结果不同。这是因为类 `Rectangle` 的每个对象都有自己的变量 `width` 和 `height`，在某种意义上，它们也有自己的函数成员 `set_value` 和 `area`，这些函数操作对象自身的成员变量。

类允许使用面向对象的范式进行编程：数据和函数都是对象的成员，减少了将处理程序或其他状态变量作为参数传递给函数的需要，因为它们是调用成员的对象的一部分。注意在调用 `rect.area` 或 `rectb.area` 时没有传递任何参数。这些成员函数直接使用了它们各自对象 `rect` 和 `rectb` 的数据成员。

---

## 构造函数

在上面的例子中，如果在调用 `set_values` 之前就调用了成员函数 `area`，会发生什么？结果将是不确定的，因为成员 `width` 和 `height` 从未被赋值。

为了避免这种情况，类可以包含一个特殊的函数，称为**构造函数**（constructor），每当创建该类的新对象时，它会被自动调用，允许类初始化成员变量或分配存储空间。

构造函数的声明方式与普通成员函数相同，但其名称与类名匹配，且没有任何返回类型；甚至连 `void` 都没有。

上面的 `Rectangle` 类可以通过实现构造函数来轻松改进：

```cpp
// example: class constructor
#include <iostream>
using namespace std;

class Rectangle {
    int width, height;
  public:
    Rectangle (int,int);
    int area () {return (width*height);}
};

Rectangle::Rectangle (int a, int b) {
  width = a;
  height = b;
}

int main () {
  Rectangle rect (3,4);
  Rectangle rectb (5,6);
  cout << "rect area: " << rect.area() << endl;
  cout << "rectb area: " << rectb.area() << endl;
  return 0;
}

```

**输出：**

```
rect area: 12
rectb area: 30

```

这个例子的结果与前一个例子完全相同。但现在，类 `Rectangle` 没有成员函数 `set_values`，取而代之的是一个执行类似操作的构造函数：它用传递给它的参数初始化 `width` 和 `height` 的值。

注意这些参数是如何在创建该类的对象时传递给构造函数的：

```cpp
Rectangle rect (3,4);
Rectangle rectb (5,6);

```

构造函数不能像普通成员函数那样被显式调用。它们只在创建该类的新对象时执行一次。

注意构造函数的原型声明（在类中）和后面的构造函数定义都没有返回值；甚至连 `void` 都没有：构造函数永远不返回值，它们只是初始化对象。

---

## 构造函数重载

与任何其他函数一样，构造函数也可以被重载为具有不同参数的不同版本：参数数量不同和/或参数类型不同。编译器会自动调用参数与实参匹配的那个版本：

```cpp
// overloading class constructors
#include <iostream>
using namespace std;

class Rectangle {
    int width, height;
  public:
    Rectangle ();
    Rectangle (int,int);
    int area (void) {return (width*height);}
};

Rectangle::Rectangle () {
  width = 5;
  height = 5;
}

Rectangle::Rectangle (int a, int b) {
  width = a;
  height = b;
}

int main () {
  Rectangle rect (3,4);
  Rectangle rectb;
  cout << "rect area: " << rect.area() << endl;
  cout << "rectb area: " << rectb.area() << endl;
  return 0;
}

```

**输出：**

```
rect area: 12
rectb area: 25

```

在上面的例子中，构造了类 `Rectangle` 的两个对象：`rect` 和 `rectb`。`rect` 像前面的例子一样用两个参数构造。

但这个例子还引入了一种特殊的构造函数：**默认构造函数**（default constructor）。默认构造函数是不接受参数的构造函数，它之所以特殊，是因为当对象被声明但没有用任何参数初始化时，会调用它。在上面的例子中，`rectb` 调用了默认构造函数。注意 `rectb` 甚至没有用空括号来构造——事实上，空括号不能用于调用默认构造函数：

```cpp
Rectangle rectb;   // 正确，调用了默认构造函数
Rectangle rectc(); // 错误，默认构造函数未被调用

```

这是因为空括号会使 `rectc` 成为一个函数声明而不是对象声明：它将是一个不接受参数并返回 `Rectangle` 类型值的函数。

---

## 统一初始化

上面展示的用括号将参数括起来调用构造函数的方式，被称为**函数形式**（functional form）。但构造函数也可以用其他语法来调用：

首先，具有单个参数的构造函数可以使用变量初始化语法（等号后跟参数）来调用：

```
class_name object_name = initialization_value;

```

更近地，C++ 引入了使用**统一初始化**（uniform initialization）来调用构造函数的可能性，它本质上与函数形式相同，但使用花括号（`{}`）代替圆括号（`()`）：

```
class_name object_name { value, value, value, ... }

```

可选地，最后这种语法可以在花括号前包含一个等号。

以下是一个示例，展示了构造函数接受单个参数的类的四种构造对象的方式：

```cpp
// classes and uniform initialization
#include <iostream>
using namespace std;

class Circle {
    double radius;
  public:
    Circle(double r) { radius = r; }
    double circum() {return 2*radius*3.14159265;}
};

int main () {
  Circle foo (10.0);   // 函数形式
  Circle bar = 20.0;   // 赋值初始化
  Circle baz {30.0};   // 统一初始化
  Circle qux = {40.0}; // POD 风格

  cout << "foo's circumference: " << foo.circum() << '\n';
  return 0;
}

```

**输出：**

```
foo's circumference: 62.8319

```

统一初始化相对于函数形式的一个优势是，与圆括号不同，花括号不会被误认为函数声明，因此可以用来显式调用默认构造函数：

```cpp
Rectangle rectb;   // 调用默认构造函数
Rectangle rectc(); // 函数声明（默认构造函数未被调用）
Rectangle rectd{}; // 调用默认构造函数

```

调用构造函数的语法选择很大程度上是风格问题。大多数现有代码目前使用函数形式，而一些较新的风格指南建议选择统一初始化而不是其他方式，尽管它也因为优先选择 `initializer_list` 作为其类型而存在潜在的陷阱。

---

## 构造函数中的成员初始化

当构造函数用于初始化其他成员时，这些成员可以直接初始化，而无需借助构造函数体中的语句。这是通过在构造函数体之前插入一个冒号（`:`）和类成员的初始化列表来实现的。例如，考虑一个具有以下声明的类：

```cpp
class Rectangle {
    int width,height;
  public:
    Rectangle(int,int);
    int area() {return width*height;}
};

```

该类的构造函数可以像通常那样定义为：

```cpp
Rectangle::Rectangle (int x, int y) { width=x; height=y; }

```

但也可以使用**成员初始化**定义为：

```cpp
Rectangle::Rectangle (int x, int y) : width(x) { height=y; }

```

甚至：

```cpp
Rectangle::Rectangle (int x, int y) : width(x), height(y) { }

```

注意在最后一种情况下，构造函数除了初始化其成员之外什么也没做，因此它有一个空的函数体。

对于基本类型的成员，构造函数用以上哪种方式定义没有区别，因为它们默认不被初始化，但对于成员对象（其类型为类的那些），如果它们没有在冒号后面被初始化，则会被默认构造。

默认构造类的所有成员可能并不总是方便的：在某些情况下，这是一种浪费（当成员随后在构造函数中被重新初始化时），但在某些其他情况下，默认构造甚至是不可能的（当类没有默认构造函数时）。在这些情况下，成员应当在成员初始化列表中初始化。例如：

```cpp
// member initialization
#include <iostream>
using namespace std;

class Circle {
    double radius;
  public:
    Circle(double r) : radius(r) { }
    double area() {return radius*radius*3.14159265;}
};

class Cylinder {
    Circle base;
    double height;
  public:
    Cylinder(double r, double h) : base (r), height(h) {}
    double volume() {return base.area() * height;}
};

int main () {
  Cylinder foo (10,20);

  cout << "foo's volume: " << foo.volume() << '\n';
  return 0;
}

```

**输出：**

```
foo's volume: 6283.19

```

在这个例子中，类 `Cylinder` 有一个成员对象，其类型是另一个类（`base` 的类型是 `Circle`）。因为 `Circle` 类的对象只能带参数构造，`Cylinder` 的构造函数需要调用 `base` 的构造函数，而唯一的方法就是在**成员初始化列表**中进行。

这些初始化也可以使用统一初始化语法，使用花括号 `{}` 代替圆括号 `()`：

```cpp
Cylinder::Cylinder (double r, double h) : base{r}, height{h} { }

```

---

## 指向类的指针

对象也可以被指针所指向：一旦声明，类就成为一个有效的类型，因此它可以被用作指针所指向的类型。例如：

```cpp
Rectangle * prect;

```

是一个指向 `Rectangle` 类对象的指针。

与普通数据结构类似，可以使用箭头运算符（`->`）从指针直接访问对象的成员。以下是一个包含多种可能组合的示例：

```cpp
// pointer to classes example
#include <iostream>
using namespace std;

class Rectangle {
  int width, height;
public:
  Rectangle(int x, int y) : width(x), height(y) {}
  int area(void) { return width * height; }
};


int main() {
  Rectangle obj (3, 4);
  Rectangle * foo, * bar, * baz;
  foo = &obj;
  bar = new Rectangle (5, 6);
  baz = new Rectangle[2] { {2,5}, {3,6} };
  cout << "obj's area: " << obj.area() << '\n';
  cout << "*foo's area: " << foo->area() << '\n';
  cout << "*bar's area: " << bar->area() << '\n';
  cout << "baz[0]'s area:" << baz[0].area() << '\n';
  cout << "baz[1]'s area:" << baz[1].area() << '\n';       
  delete bar;
  delete[] baz;
  return 0;
}

```

这个例子使用了多个运算符来操作对象和指针（运算符 `*`、`&`、`.`、`->`、`[]`）。它们可以解释为：

| 表达式 | 可读作 |
| --- | --- |
| `*x` | `x` 所指向的 |
| `&x` | `x` 的地址 |
| `x.y` | 对象 `x` 的成员 `y` |
| `x->y` | `x` 所指向的对象的成员 `y` |
| `(*x).y` | `x` 所指向的对象的成员 `y`（与前一个等价） |
| `x[0]` | `x` 所指向的第一个对象 |
| `x[1]` | `x` 所指向的第二个对象 |
| `x[n]` | `x` 所指向的第 (`n+1`) 个对象 |

这些表达式中的大多数已在之前的章节中介绍过。最值得注意的是，关于数组的章节介绍了偏移运算符（`[]`），关于普通数据结构的章节介绍了箭头运算符（`->`）。

---

## 使用 struct 和 union 定义的类

类不仅可以使用关键字 `class` 来定义，还可以使用关键字 `struct` 和 `union` 来定义。

关键字 `struct` 通常用于声明普通数据结构，但也可以用于声明具有成员函数的类，语法与使用关键字 `class` 相同。两者唯一的区别是，使用关键字 `struct` 声明的类的成员默认具有 `public` 访问权限，而使用关键字 `class` 声明的类的成员默认具有 `private` 访问权限。在所有其他方面，这两个关键字在此上下文中是等价的。

相反，**联合体**（union）的概念与使用 `struct` 和 `class` 声明的类不同，因为联合体一次只存储一个数据成员，但尽管如此，它们也是类，因此也可以包含成员函数。联合体类中的默认访问权限是 `public`。