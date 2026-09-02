# map 模板

## 〇、C++ STL介绍

C++ 标准模板库（Standard Template Library，STL）是一套功能强大的 C++ 模板类和函数的集合，它提供了一系列通用的、可复用的算法和数据结构。

STL 的设计基于泛型编程，这意味着使用模板可以编写出独立于任何特定数据类型的代码。

STL 分为多个组件，包括容器（Containers）、迭代器（Iterators）、算法（Algorithms）、函数对象（Function Objects）和适配器（Adapters）等。

使用 STL 的好处:

- 代码复用：STL 提供了大量的通用数据结构和算法，可以减少重复编写代码的工作。
- 性能优化：STL 中的算法和数据结构都经过了优化，以提供最佳的性能。
- 泛型编程：使用模板，STL 支持泛型编程，使得算法和数据结构可以适用于任何数据类型。
- 易于维护：STL 的设计使得代码更加模块化，易于阅读和维护。

C++ 标准模板库的核心包括以下重要组件组件：

- 容器（Containers）。容器是 STL 中最基本的组件之一，提供了各种数据结构，包括向量（vector）、链表（list）、队列（queue）、栈（stack）、集合（set）、映射（map）等。这些容器具有不同的特性和用途，可以根据实际需求选择合适的容器。
- 算法（Algorithms）。STL 提供了大量的算法，用于对容器中的元素进行各种操作，包括排序、搜索、复制、移动、变换等。这些算法在使用时不需要关心容器的具体类型，只需要指定要操作的范围即可。
- 迭代器（iterators）。迭代器用于遍历容器中的元素，允许以统一的方式访问容器中的元素，而不用关心容器的内部实现细节。STL 提供了多种类型的迭代器，包括随机访问迭代器、双向迭代器、前向迭代器和输入输出迭代器等。
- 函数对象（Function Objects）。函数对象是可以像函数一样调用的对象，可以用于算法中的各种操作。STL 提供了多种函数对象，包括一元函数对象、二元函数对象、谓词等，可以满足不同的需求。
- 适配器（Adapters）。	适配器用于将一种容器或迭代器适配成另一种容器或迭代器，以满足特定的需求。STL 提供了多种适配器，包括栈适配器（stack adapter）、队列适配器（queue adapter）和优先队列适配器（priority queue adapter）等。

这些个组件都带有丰富的预定义函数，帮助我们通过简单的方式处理复杂的任务。

**容器**

容器是用来存储数据的序列，它们提供了不同的存储方式和访问模式。

STL 中的容器可以分为三类：

**1. 序列容器**：存储元素的序列，允许双向遍历。
   
   - std::vector：动态数组，支持快速随机访问。
   - std::deque：双端队列，支持快速插入和删除。
   - std::list：链表，支持快速插入和删除，但不支持随机访问。
   
**2. 关联容器**：存储键值对，每个元素都有一个键（key）和一个值（value），并且通过键来组织元素。
   
   - std::set：集合，不允许重复元素。
   - std::multiset：多重集合，允许多个元素具有相同的键。
   - std::map：映射，每个键映射到一个值。
   - std::multimap：多重映射，存储了键值对（pair），其中键是唯一的，但值可以重复，允许一个键映射到多个值。
   
**3. 无序容器**（C++11 引入）：哈希表，支持快速的查找、插入和删除。

   - std::unordered_set：无序集合。
   - std::unordered_multiset：无序多重集合。
   - std::unordered_map：无序映射。
   - std::unordered_multimap：无序多重映射。

## 一、map简介
map是一种关联容器，用于存储由**键值(key value)**和**映射值(mapped value)**按特定顺序组合而成的元素。

在 map 中，键值（key value）通常用于对元素进行排序和唯一标识，而映射值(mapped value)则存储与该键关联的内容。键和映射值的类型可以不同，它们被归类到成员类型 ` value_type`中，该类型是一个键值对，包含键和映射值:

```cpp
typedef pair<const Key, T> value_type;
```

在内部，map 中的元素始终按照其键值（key value）进行排序，排序遵循由其内部比较对象指定的特定严格弱排序准则。

map 容器通常比 unordered_map 通过键(key value)访问单个元素的速度慢，但它们允许基于顺序直接迭代子集。

map 中的映射值(mapped value)可以通过方括号运算符（` operator[]` ）直接通过其对应的键(key value)访问。

映射通常以二叉搜索树的形式实现。

## 二、容器属性

- **访问标识**：map 容器中的元素是通过其键（key value)来引用的，而不是通过它们在容器中的绝对位置来引用的。
- **有序性**: map 容器中的元素始终遵循严格的顺序。所有插入的元素都会按照此顺序被赋予一个位置。
- **键值对**：每个元素都将一个键(key value)与一个映射值(mapped value)关联起来。
- **唯一性**：容器中任意两个元素都不能拥有相同的键（key value)。
- **自动管理内存使用**：容器使用分配器对象来动态处理其存储需求。

## 三、头文件和定义

包含头文件：
```cpp
#include <map>
```

声明 map 容器：
```cpp
#include<map>
map<key_type, value_type> myMap; //key_type 是键的类型,value_type 是值的类型
```

示例：
```cpp
map<string,int> mp; //声明一个key为string，value为int的map
```

## 四、键值对 pair

在map中，存储的元素有key和value，对应的是STL中定义的pair类型。

**std::pair**：是键值对容器，是 utility 库中最常用的组件，用于将两个值组合成一个单一对象。

pair类型可以单独定义，它可以理解为含有两个变量first和second的结构体。
```cpp
#include <utility>

// 创建 pair 对象的基本方式
// std::pair<类型1, 类型2> 变量名(值1, 值2);

std::pair<string,int> p("jim",12);
cout<< p.first<<" "<<p.second<<endl;
```

pair的定义和初始化方式：
```cpp
pair<int,double> p1;//未初始化，int和double均不保证 
pair<string,int> p2;//string调用构造函数初始化为空串，int不保证
pair<string,int> p3{};//直接列表式初始化，first为空串，second=0
pair<string,int> p4={};//拷贝列表式初始化，first为空串，second=0
pair<string,int> p5("hello",1);//直接调用构造函数初始化
pair<string,int> p6=make_pair("hello",1);//使用make_pair
pair<string,int> p6=make_pair<string,int>("hello",1);//使用make_pair，并显式指定类型 
```

<!-- ## map常用操作汇总
|   map常用操作 |   |
|   -----   |   -----   |
|   **迭代器**  |
|   begin() |   返回指向容器第一个元素的迭代器  |
|   end()  |   返回指向容器末尾（最后一个元素之后）的迭代器 |
|   rbegin()    |   返回指向容器第一个元素的反向迭代器（即反向遍历的开始）  |
|   rend()  |   返回指向容器末尾的反向迭代器（即反向遍历的结束）    |
|   **容量**    |
|   empty() |   判断容器是否为空（无元素）  |
|   size()  |   返回容器中的元素数量    |
|   **元素访问**    |
|   operator[]  |   通过键访问元素。若键不存在，则插入一个值初始化的新元素并返回其引用  |
|   at() (C++11)    |   通过键访问元素，若键不存在则抛出 std::out_of_range 异常 |
|  **修改操作**    |
|   insert()    |   插入一个或多个元素（接受值、迭代器范围或初始化列表）    |
|   erase() |   移除指定位置或键的元素（可接受迭代器、键或迭代器范围）  |
|   clear() |   清空所有元素    |
|   **查找操作**    |
|   find(key)   |   查找指定键的元素，返回迭代器；若未找到则返回 end()  |
|   **统计**    |
|   count() |   返回键等于给定值的元素数量（对于 map 只能是 0 或 1）    | -->

## 五、成员函数

### 0、**基本操作**

- （构造函数）：构建映射
- （析构函数）：映射析构函数
- 运算符 = ：复制容器内容

```cpp
#include<bits/stdc++.h>
using namespace std;

int main(){
	map<int,string> mp1;
	mp1[1]="cat";
	mp1[2]="dog";
	mp1[3]="bird";
	map<int,string> mp2=mp1;//将mp1赋值给mp2 
	for(map<int,string>::iterator it=mp2.begin();it!=mp2.end();it++){
		cout<< it->first <<" "<<it->second<<endl;
	}
	return 0;
}
```

### 1、**迭代器**
- begin()：返回迭代器，指向第一个元素作为开头
- end()：返回迭代器末尾
- rbegin()：返回反向迭代器，指向最后一个元素作为开头
- rend()：返回反向迭代器对应的末尾

**遍历 map**:
```cpp
#include<iostream>
#include<map>
using namespace std;

int main(){
	map<string,int> mp;
	mp["jim"]=5;
	mp["lily"]=12;
	
	//正序遍历 
	for(map<string,int>::iterator it=mp.begin();it!=mp.end();it++){
		cout<< it->first <<" "<<it->second<<endl;
	}
	cout<<endl;
	//倒序遍历
	for(map<string,int>::reverse_iterator rit=mp.rbegin();rit!=mp.rend();rit++){
		cout<< rit->first <<" "<< rit->second <<endl;
	}	
	return 0;
}
```

C++11 及以上标准，遍历部分可以简化为范围 for 循环，代码更简洁：
```cpp
for (auto &p : m) {
    std::cout << p.first << " : " << p.second << std::endl;
}
```

### 2、**容量**
- empty()：测试容器是否为空，为空返回true，非空返回false
- size()：返回容器大小（即包含元素个数）

```cpp
#include<bits/stdc++.h>
using namespace std;

int main(){
	map<int,string> mp;
	mp[1]="cat";
	mp[2]="dog";
	mp[3]="bird";

	//判断mp是否为空 
	if(!mp.empty()) cout<<"mp is not empty."<<endl;
	else cout<<"mp is empty."<<endl;

	//输出map中元素个数 
	cout<<mp.size()<<endl;
	return 0;
}
```

### 3、**元素访问**
- operator[]：访问元素
- at()：访问元素

**方法一：直接使用operator[]**
```cpp
// accessing mapped values
#include <iostream>
#include <map>
#include <string>

int main ()
{
  std::map<char,std::string> mymap;

  mymap['a']="an element";
  mymap['b']="another element";
  mymap['c']=mymap['b'];

  std::cout << "mymap['a'] is " << mymap['a'] << '\n';
  std::cout << "mymap['b'] is " << mymap['b'] << '\n';
  std::cout << "mymap['c'] is " << mymap['c'] << '\n';
  std::cout << "mymap['d'] is " << mymap['d'] << '\n';

  std::cout << "mymap now contains " << mymap.size() << " elements.\n";

  return 0;
}
```

**方法二：使用map.at()**
```cpp
//mp.at(key),若key存在，则返回对应的value，若key不存在，抛出异常
#include<iostream>
#include<map>
#include<utility> 
using namespace std;

int main(){
	map<string,int> mp;
	
	mp.insert(pair<string,int>("jim",12));
	mp.insert(pair<string,int>("lily",13));
	
	try{
		cout<<mp.at("jim")<<endl;
		cout<<mp.at("lily")<<endl;
		cout<<mp.at("cat")<<endl;
	}catch(...){
		cout<<"访问的key不存在"<<endl; 
	}
	return 0;
}
```

### 4、**修改操作**
- insert()：插入元素，用于插入已经构造好的pair

```cpp
// map::insert (C++98)
#include <iostream>
#include <map>

int main ()
{
  std::map<char,int> mymap;

  // first insert function version (single parameter):
  mymap.insert ( std::pair<char,int>('a',100) );
  mymap.insert ( std::pair<char,int>('z',200) );

  std::pair<std::map<char,int>::iterator,bool> ret;
  ret = mymap.insert ( std::pair<char,int>('z',500) );
  if (ret.second==false) {
    std::cout << "element 'z' already existed";
    std::cout << " with a value of " << ret.first->second << '\n';
  }

  // second insert function version (with hint position):
  std::map<char,int>::iterator it = mymap.begin();
  mymap.insert (it, std::pair<char,int>('b',300));  // max efficiency inserting
  mymap.insert (it, std::pair<char,int>('c',400));  // no max efficiency inserting

  // third insert function version (range insertion):
  std::map<char,int> anothermap;
  anothermap.insert(mymap.begin(),mymap.find('c'));

  // showing contents:
  std::cout << "mymap contains:\n";
  for (it=mymap.begin(); it!=mymap.end(); ++it)
    std::cout << it->first << " => " << it->second << '\n';

  std::cout << "anothermap contains:\n";
  for (it=anothermap.begin(); it!=anothermap.end(); ++it)
    std::cout << it->first << " => " << it->second << '\n';

  return 0;
}
```

- erase()：删除元素

```cpp
// erasing from map
#include <iostream>
#include <map>

int main ()
{
  std::map<char,int> mymap;
  std::map<char,int>::iterator it;

  // insert some values:
  mymap['a']=10;
  mymap['b']=20;
  mymap['c']=30;
  mymap['d']=40;
  mymap['e']=50;
  mymap['f']=60;

  it=mymap.find('b');
  mymap.erase (it);                   // erasing by iterator

  mymap.erase ('c');                  // erasing by key

  it=mymap.find ('e');
  mymap.erase ( it, mymap.end() );    // erasing by range

  // show content:
  for (it=mymap.begin(); it!=mymap.end(); ++it)
    std::cout << it->first << " => " << it->second << '\n';

  return 0;
}
```

- swap()：交换内容

```cpp
// swap maps
#include <iostream>
#include <map>

int main ()
{
  std::map<char,int> foo,bar;

  foo['x']=100;
  foo['y']=200;

  bar['a']=11;
  bar['b']=22;
  bar['c']=33;

  foo.swap(bar);

  std::cout << "foo contains:\n";
  for (std::map<char,int>::iterator it=foo.begin(); it!=foo.end(); ++it)
    std::cout << it->first << " => " << it->second << '\n';

  std::cout << "bar contains:\n";
  for (std::map<char,int>::iterator it=bar.begin(); it!=bar.end(); ++it)
    std::cout << it->first << " => " << it->second << '\n';

  return 0;
}
```

- clear()：清空容器

```cpp
// map::clear
#include <iostream>
#include <map>

int main ()
{
  std::map<char,int> mymap;

  mymap['x']=100;
  mymap['y']=200;
  mymap['z']=300;

  std::cout << "mymap contains:\n";
  for (std::map<char,int>::iterator it=mymap.begin(); it!=mymap.end(); ++it)
    std::cout << it->first << " => " << it->second << '\n';

  mymap.clear();
  mymap['a']=1101;
  mymap['b']=2202;

  std::cout << "mymap contains:\n";
  for (std::map<char,int>::iterator it=mymap.begin(); it!=mymap.end(); ++it)
    std::cout << it->first << " => " << it->second << '\n';

  return 0;
}
```

- emplace()：构造并插入元素

```cpp
// map::emplace
#include <iostream>
#include <map>

int main ()
{
  std::map<char,int> mymap;

  mymap.emplace('x',100);
  mymap.emplace('y',200);
  mymap.emplace('z',100);

  std::cout << "mymap contains:";
  for (auto& x: mymap)
    std::cout << " [" << x.first << ':' << x.second << ']';
  std::cout << '\n';

  return 0;
}
```

### 5、**其他操作**
- find()：获取元素的迭代器

```cpp
// map::find
#include <iostream>
#include <map>

int main ()
{
  std::map<char,int> mymap;
  std::map<char,int>::iterator it;

  mymap['a']=50;
  mymap['b']=100;
  mymap['c']=150;
  mymap['d']=200;

  it = mymap.find('b');
  if (it != mymap.end())
    mymap.erase (it);

  // print content:
  std::cout << "elements in mymap:" << '\n';
  std::cout << "a => " << mymap.find('a')->second << '\n';
  std::cout << "c => " << mymap.find('c')->second << '\n';
  std::cout << "d => " << mymap.find('d')->second << '\n';

  return 0;
}
```

- count()：统计具有特定键(key value)的元素数量

```cpp
// map::count
#include <iostream>
#include <map>

int main ()
{
  std::map<char,int> mymap;
  char c;

  mymap ['a']=101;
  mymap ['c']=202;
  mymap ['f']=303;

  for (c='a'; c<'h'; c++)
  {
    std::cout << c;
    if (mymap.count(c)>0)
      std::cout << " is an element of mymap.\n";
    else 
      std::cout << " is not an element of mymap.\n";
  }

  return 0;
}
```

- lower_bound()：返回下界迭代器（指向大于等于key的第一个元素的迭代器）

```cpp
// map::lower_bound/upper_bound
#include <iostream>
#include <map>

int main ()
{
  std::map<char,int> mymap;
  std::map<char,int>::iterator itlow,itup;

  mymap['a']=20;
  mymap['b']=40;
  mymap['c']=60;
  mymap['d']=80;
  mymap['e']=100;

  itlow=mymap.lower_bound ('b');  // itlow points to b
  itup=mymap.upper_bound ('d');   // itup points to e (not d!)

  mymap.erase(itlow,itup);        // erases [itlow,itup)

  // print content:
  for (std::map<char,int>::iterator it=mymap.begin(); it!=mymap.end(); ++it)
    std::cout << it->first << " => " << it->second << '\n';

  return 0;
}
```

- upper_bound()：返回上限迭代器（指向大于key的第一个元素的迭代器）

```cpp
// map::lower_bound/upper_bound
#include <iostream>
#include <map>

int main ()
{
  std::map<char,int> mymap;
  std::map<char,int>::iterator itlow,itup;

  mymap['a']=20;
  mymap['b']=40;
  mymap['c']=60;
  mymap['d']=80;
  mymap['e']=100;

  itlow=mymap.lower_bound ('b');  // itlow points to b
  itup=mymap.upper_bound ('d');   // itup points to e (not d!)

  mymap.erase(itlow,itup);        // erases [itlow,itup)

  // print content:
  for (std::map<char,int>::iterator it=mymap.begin(); it!=mymap.end(); ++it)
    std::cout << it->first << " => " << it->second << '\n';

  return 0;
}
```

- equal_range()：获取相等元素的范围

```cpp
// map::equal_range
#include <iostream>
#include <map>

int main ()
{
  std::map<char,int> mymap;

  mymap['a']=10;
  mymap['b']=20;
  mymap['c']=30;

  std::pair<std::map<char,int>::iterator,std::map<char,int>::iterator> ret;
  ret = mymap.equal_range('b');

  std::cout << "lower bound points to: ";
  std::cout << ret.first->first << " => " << ret.first->second << '\n';

  std::cout << "upper bound points to: ";
  std::cout << ret.second->first << " => " << ret.second->second << '\n';

  return 0;
}
```

## 六、时间复杂度

C++ 标准库中的 std::map 是一个有序关联容器，其内部通常采用红黑树（Red-Black Tree） 实现。红黑树是一种自平衡的二叉查找树，能够保证在最坏情况下仍具有较好的性能。

主要操作的复杂度（根据key操作，且不带提示的情况下）：

- 插入（Insert）：O(log⁡ n)
- 删除（Erase）：O(log⁡ n)
- 查找（Find / Count / [] / at）：O(log⁡ n)
- 遍历整个 map（如使用迭代器）的时间复杂度为 O(n)