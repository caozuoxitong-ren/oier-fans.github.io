<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
<script type="text/x-mathjax-config">
	MathJax.Hub.Config({
		tex2jax: {
			skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
			inlineMath: [['$','$']]
		}
	});
</script>
	
# 算术基本定理（唯一分解定理）

## 算术基本定理

**算术基本定理**，又称为**正整数**的**唯一分解定理**，即：每个大于1的自然数，要么本身就是素数，要么可以写为2个或以上的素数的积，而且这些素因子按大小排列之后，写法仅有一种方式。

**也可以表述为：**对于任意整数 A > 1 , 存在 A 的一种质因数分解形式 A = p1^b1 × p2^b2 × ... × Pk^bk，其中p1 < p2 < ... < pk，且pi是质数，bi是正整数。这种表示的方法是存在的，而且是唯一的。

**也可以表述为：**设正整数 A > 1，那么必有表示 A=p1 * p2 * ... * pk，其中pi(1<=i<=k)是素数，并且在不考虑次序的情况下，这种表示方式是唯一的。

例如：

$ 6936 = 2^3 × 3 × 17^2$

$1200 = 2^4 × 3 × 5^2$

$5207 = 41 × 127$

$19 = 19$

算术基本定理的内容由两部分构成：

- 分解的存在性：
- 分解的唯一性，即若不考虑排列的顺序，正整数分解为素数乘积的方式是唯一的。

## 分解质因数的方法

### 暴力枚举法

num 的质因子一定在区间 [2,num]之间，只需要枚举 2 到 num 之间的每一个数 i ，如果 i 能整除 num ，则说明当前的 i 是 num 的因子（**必是质因子，为什么？**），那么将 num 连续除以 i 直到不含质因子 i，同时记录质因子 i 的个数。**时间复杂度 O(n)**.

```cpp
#include<bits/stdc++.h>
using namespace std;

int main(){
	int num;
	cin>>num;

    //分解质因数
	int a[100]={},cnt[100]={},len=0;
	for(int i=2;i<=num;i++){//时间复杂度 O(n)
		if(num%i==0){
			a[++len]=i;
			while(num%i==0) cnt[len]++,num/=i;
		}
	}

    //输出
	for(int i=1;i<=len;i++){
		cout<<a[i]<<" "<<cnt[i]<<endl;
	}
	return 0;
}
```

### 利用数学结论

结论：**任意正整数 N 至多有一个大于 sqrt(N) 的质因子。**

证明：（反证法）假设正整数 N 存在两个不同的质因子 a 和 b，并且a > sqrt(N) , b > sqrt(N) .

由于 a 和 b 是 N 的质因子，且互质，故 ab|N，因此 a*b <= N　　　　(1)

另一方面，由　a > sqrt(N) 和 b > sqrt(N) 可得，a*b> sqrt(N) * sqrt(N) = N　　　　(2)

(1)和(2)矛盾，所以假设不成立。

因此，N 不可能有两个不同的质因子均大于 sqrt(N)，即如果存在的话至多存在一个。

</br>

利用这个结论，可以优化代码，**时间复杂度降低到O(sqrt(n))**.

```cpp
#include<bits/stdc++.h>
using namespace std;

int main(){
	int num;
	cin>>num;

	//分解质因数 num 
	int a[100]={},cnt[100]={},len=0;
	for(int i=2;i<=num/i;i++){//时间复杂度 O(sqrt(n)) 
		if(num%i==0){
			a[++len]=i;
			while(num%i==0) cnt[len]++,num/=i;
		}
	}
	if(num>1) a[++len]=num,cnt[len]=1;

	//输出
	for(int i=1;i<=len;i++){
		cout<<a[i]<<" "<<cnt[i]<<endl;
	}
	return 0;
}
```

## 约数个数定理

定理：由算数基本定理可知，对于一个大于 $1$ 的正整数 $N$ 可以分解质因数

<div align="center">
$ N = p_{1}^{a_{1}} \times p_{1}^{a_{1}} \times \dots  \times p_{k}^{a_{k}} $
</div>

其中 $p_{i}(1 \leq i \leq k) $ 为质数，则 $N$ 的正约数个数

<div align="center">
 $d\left ( N \right ) =\left ( a_{1}+1 \right ) \left ( a_{2}+1 \right ) \dots \left ( a_{k}+1 \right ) =\prod_{i=1}^{k} \left ( a_{i}+1 \right ) $
</div>

证明：容易知道 $p_{i}^{a_{i}}$ 的正约数有 $p_{i}^{0}$ 、  $p_{i}^{1}$ 、  $p_{i}^{2}$ 、 $...$ 、 $p_{i}^{a_{i}}$ ，共 $a_{i}+1$ 个。根据乘法原理，第 $i$ 个质因子可能的组合情况是 $a_{i}+1$ 种 , 一共有 $k$ 个不同的质因子，所以 $N$ 的正约数个数就是 $ \prod_{i=1}^{k} \left ( a_{i}+1 \right )$ 个。

例如：$60=2^2×3^1×5^1$ ，质因子2、3、5的个数分别为 2 、 1 、1 个，所以60的约数个数为 $(2+1)×(1+1)×(1+1)=12$ 个，分别为：$1$、$2$、$3$、$4$、$5$、$6$、$10$、$12$、$15$、$25$、$30$、$60$.

## 约数和定理

定理：由算数基本定理可知，对于一个大于 $1$ 的正整数 $N$ 可以分解质因数

<div align="center">
$ N = p_{1}^{a_{1}} \times p_{1}^{a_{1}} \times \dots  \times p_{k}^{a_{k}} $
</div>

由约数个数定理可知 $N$ 的正约数的个数为

<div align="center">
 $d\left ( N \right ) =\left ( a_{1}+1 \right ) \left ( a_{2}+1 \right ) \dots \left ( a_{k}+1 \right ) =\prod_{i=1}^{k} \left ( a_{i}+1 \right ) $
</div>

这 $d(N)$ 个正约数的和为

<div align="center">
 $S\left ( N \right ) = \left ( p_{1}^{0} + p_{1}^{1} + ... + p_{1}^{a_{1}} \right) × \left ( p_{2}^{0} + p_{2}^{1} + ... + p_{2}^{a_{2}} \right) × ... × \left ( p_{k}^{0} + p_{k}^{1} + ... + p_{k}^{a_{k}} \right)$
</div>

可以等比数列求和，进行化简：

记
<div align="center">
 $S_{i}=p_{i}^{0} + p_{i}^{1} + ... +p_{i}^{a_{i}-1}+ p_{i}^{a_{i}}$　　　　　（1）式
</div>

两边同乘以公比 $p_{i}$,得

<div align="center">
$p_{i}×S_{i} = p_{i}^{1} + p_{i}^{2} + ... +p_{i}^{a_{i}}+ p_{i}^{a_{i}+1}$　　　　　（2）式
</div>

（2）式减去（1）式，得

<div align="center">
$\left ( p_{i}-1 \right ) × S_{i} = p_{i}^{a_{i}+1}-p_{i}^{0}$
</div>

可得

<div align="center">
$S_{i}=\frac{p_{i}^{a_{i}+1}-p_{i}^{0}}{p_{i}-1}=\frac{p_{i}^{a_{i}+1}-1}{p_{i}-1}$
</div>

因为有 $k$ 个不同的质因子，所以 $N$ 的约数和为

<div align="center">
$S(N)=\prod_{i=1}^{k} S_{i} =\prod_{i=1}^{k} \frac{p_i^{a_i+1} - 1}{p_i - 1}$
</div>