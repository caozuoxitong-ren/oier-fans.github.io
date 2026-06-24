<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
<script type="text/x-mathjax-config">
	MathJax.Hub.Config({
		tex2jax: {
			skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
			inlineMath: [['$','$']]
		}
	});
</script>

# C++ 语言教程：多态

> 原文链接：[cplusplus.com - Polymorphism](https://cplusplus.com/doc/tutorial/polymorphism/)
> 
> 本文为 cplusplus.com 多态教程的中文翻译版，保留了原文的所有代码示例和格式。

---

## 指向基类的指针

类继承的一个关键特性是，指向派生类的指针与指向其基类的指针是类型兼容的。多态就是利用这一简单但强大且通用的特性的艺术。

关于矩形和三角形类的例子可以利用这一特性使用指针重写：

```cpp
// pointers to base class
#include <iostream>
using namespace std;

class Polygon {
  protected:
    int width, height;
  public:
    void set_values (int a, int b)
      { width=a; height=b; }
};

class Rectangle: public Polygon {
  public:
    int area()
      { return width*height; }
};

class Triangle: public Polygon {
  public:
    int area()
      { return width*height/2; }
};

int main () {
  Rectangle rect;
  Triangle trgl;
  Polygon * ppoly1 = &rect;
  Polygon * ppoly2 = &trgl;
  ppoly1->set_values (4,5);
  ppoly2->set_values (4,5);
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

函数 `main` 声明了两个指向 `Polygon` 的指针（名为 `ppoly1` 和 `ppoly2`）。它们分别被赋值为 `rect` 和 `trgl` 的地址，这两个对象分别是 `Rectangle` 和 `Triangle` 类型的。这种赋值是有效的，因为 `Rectangle` 和 `Triangle` 都是从 `Polygon` 派生的类。

对 `ppoly1` 和 `ppoly2` 进行解引用（使用 `ppoly1->` 和 `ppoly2->`）是有效的，允许我们访问其所指对象的成员。例如，以下两条语句在上面的例子中是等价的：

```cpp
ppoly1->set_values (4,5);
rect.set_values (4,5);

```

但由于 `ppoly1` 和 `ppoly2` 的类型都是指向 `Polygon` 的指针（而不是指向 `Rectangle` 或指向 `Triangle` 的指针），只能访问从 `Polygon` 继承的成员，而不能访问派生类 `Rectangle` 和 `Triangle` 的成员。这就是为什么上面的程序直接使用 `rect` 和 `trgl` 来访问两个对象的 `area` 成员，而不是通过指针；指向基类的指针无法访问 `area` 成员。

如果 `area` 是 `Polygon` 的成员而不是其派生类的成员，那么就可以通过指向 `Polygon` 的指针来访问 `area`，但问题在于 `Rectangle` 和 `Triangle` 实现了不同版本的 `area`，因此没有一个可以在基类中实现的单一通用版本。

---

## 虚成员

**虚成员**是一种可以在派生类中重新定义的成员函数，同时通过引用保持其调用特性。使函数成为虚函数的语法是在其声明前加上 `virtual` 关键字：

```cpp
// virtual members
#include <iostream>
using namespace std;

class Polygon {
  protected:
    int width, height;
  public:
    void set_values (int a, int b)
      { width=a; height=b; }
    virtual int area ()
      { return 0; }
};

class Rectangle: public Polygon {
  public:
    int area ()
      { return width * height; }
};

class Triangle: public Polygon {
  public:
    int area ()
      { return (width * height / 2); }
};

int main () {
  Rectangle rect;
  Triangle trgl;
  Polygon poly;
  Polygon * ppoly1 = &rect;
  Polygon * ppoly2 = &trgl;
  Polygon * ppoly3 = &poly;
  ppoly1->set_values (4,5);
  ppoly2->set_values (4,5);
  ppoly3->set_values (4,5);
  cout << ppoly1->area() << '\n';
  cout << ppoly2->area() << '\n';
  cout << ppoly3->area() << '\n';
  return 0;
}

```

**输出：**

```
20
10
0

```

在这个例子中，所有三个类（`Polygon`、`Rectangle` 和 `Triangle`）都有相同的成员：`width`、`height`，以及函数 `set_values` 和 `area`。

成员函数 `area` 在基类中被声明为虚函数，因为它随后在每个派生类中被重新定义。非虚成员也可以在派生类中重新定义，但派生类的非虚成员不能通过基类的引用来访问：也就是说，如果从上面例子中 `area` 的声明中移除 `virtual`，所有三次对 `area` 的调用都将返回零，因为在所有情况下，调用的都将是基类的版本。

因此，本质上，`virtual` 关键字的作用是允许派生类中与基类同名的成员在通过指针调用时被正确调用，更准确地说，当指针的类型是指向基类的指针，而它指向的是派生类的对象时，如上面的例子所示。

声明或继承了虚函数的类称为**多态类**。

注意，尽管其一个成员是虚函数，`Polygon` 仍然是一个常规类，甚至可以实例化对象（`poly`），其 `area` 成员有自己的定义，总是返回 0。

---

## 抽象基类

**抽象基类**与前面例子中的 `Polygon` 类非常相似。它们是只能用作基类的类，因此允许有没有定义的虚成员函数（称为**纯虚函数**）。语法是用 `=0`（一个等号和一个零）替换其定义：

抽象基类 `Polygon` 可以如下所示：

```cpp
// abstract class CPolygon
class Polygon {
  protected:
    int width, height;
  public:
    void set_values (int a, int b)
      { width=a; height=b; }
    virtual int area () =0;
};

```

注意 `area` 没有定义；它已被 `=0` 替换，这使它成为纯虚函数。包含至少一个纯虚函数的类称为**抽象基类**。

抽象基类不能用于实例化对象。因此，这个最后的抽象基类版本的 `Polygon` 不能用于声明如下对象：

```cpp
Polygon mypolygon;   // 如果 Polygon 是抽象基类则无效

```

但抽象基类并非完全无用。它可以用于创建指向它的指针，并利用其所有多态能力。例如，以下指针声明是有效的：

```cpp
Polygon * ppoly1;
Polygon * ppoly2;

```

并且当它们指向派生（非抽象）类的对象时，实际上可以被解引用。以下是完整的例子：

```cpp
// abstract base class
#include <iostream>
using namespace std;

class Polygon {
  protected:
    int width, height;
  public:
    void set_values (int a, int b)
      { width=a; height=b; }
    virtual int area (void) =0;
};

class Rectangle: public Polygon {
  public:
    int area (void)
      { return (width * height); }
};

class Triangle: public Polygon {
  public:
    int area (void)
      { return (width * height / 2); }
};

int main () {
  Rectangle rect;
  Triangle trgl;
  Polygon * ppoly1 = &rect;
  Polygon * ppoly2 = &trgl;
  ppoly1->set_values (4,5);
  ppoly2->set_values (4,5);
  cout << ppoly1->area() << '\n';
  cout << ppoly2->area() << '\n';
  return 0;
}

```

**输出：**

```
20
10

```

在这个例子中，不同但相关类型的对象使用唯一类型的指针（`Polygon*`）来引用，并且每次都调用了正确的成员函数，正是因为它们是虚函数。这在某些情况下非常有用。例如，抽象基类 `Polygon` 的成员甚至可以使用特殊指针 `this` 来访问正确的虚成员，即使 `Polygon` 本身没有此函数的实现：

```cpp
// pure virtual members can be called
// from the abstract base class
#include <iostream>
using namespace std;

class Polygon {
  protected:
    int width, height;
  public:
    void set_values (int a, int b)
      { width=a; height=b; }
    virtual int area() =0;
    void printarea()
      { cout << this->area() << '\n'; }
};

class Rectangle: public Polygon {
  public:
    int area (void)
      { return (width * height); }
};

class Triangle: public Polygon {
  public:
    int area (void)
      { return (width * height / 2); }
};

int main () {
  Rectangle rect;
  Triangle trgl;
  Polygon * ppoly1 = &rect;
  Polygon * ppoly2 = &trgl;
  ppoly1->set_values (4,5);
  ppoly2->set_values (4,5);
  ppoly1->printarea();
  ppoly2->printarea();
  return 0;
}

```

**输出：**

```
20
10

```

虚成员和抽象类赋予了 C++ 多态特性，这对于面向对象项目最为有用。当然，上面的例子是非常简单的用例，但这些特性可以应用于对象数组或动态分配的对象。

以下是一个结合了最近几章中一些特性的例子，例如动态内存、构造函数初始化器和多态：

```cpp
// dynamic allocation and polymorphism
#include <iostream>
using namespace std;

class Polygon {
  protected:
    int width, height;
  public:
    Polygon (int a, int b) : width(a), height(b) {}
    virtual int area (void) =0;
    void printarea()
      { cout << this->area() << '\n'; }
};

class Rectangle: public Polygon {
  public:
    Rectangle(int a,int b) : Polygon(a,b) {}
    int area()
      { return width*height; }
};

class Triangle: public Polygon {
  public:
    Triangle(int a,int b) : Polygon(a,b) {}
    int area()
      { return width*height/2; }
};

int main () {
  Polygon * ppoly1 = new Rectangle (4,5);
  Polygon * ppoly2 = new Triangle (4,5);
  ppoly1->printarea();
  ppoly2->printarea();
  delete ppoly1;
  delete ppoly2;
  return 0;
}

```

**输出：**

```
20
10

```

注意 `ppoly` 指针：

```cpp
Polygon * ppoly1 = new Rectangle (4,5);
Polygon * ppoly2 = new Triangle (4,5);

```

被声明为"指向 `Polygon` 的指针"类型，但分配的对象直接声明为具有派生类类型（`Rectangle` 和 `Triangle`）。