# 最大公约数和最小公倍数

## 公约数与最大公约数

如果一个整数 x 既是整数 A 的约数，也是整数 B 的约数，那么就说 x 是 A 和 B 的公共约数，简称**公约数**（也被称为公因数）。

例如：5是20和15的公约数，7是21和35的公约数。

在一些数字的公约数中，最大的公约数被称为**最大公约数**（或者最大公因数），也被记作 GCD（Greatest Common Divisor)。

例如：2、3、4、6、12都是24、36、60的公约数，其中最大的公约数是12，所以12是24、36、60的最大公约数。

**规定：gcd ( a , 0 ) = gcd ( a , a ) = a**

### 暴力枚举法

思路：正整数a和b的最大公约数一定处于[1,min(a,b)]之间，只要暴力枚举区间中的所有值，记录最大的公约数，就是最大公约数。

```cpp
int gcd=1;
for(int i=1;i<=min(a,b);i++){ 
    if(a%i==0 && b%i==0) d=i;
}
cout<<gcd<<endl;
```
优化：考虑到最大公约数一定是 [1,min(a,b)] 中能整除 a 和 b 的最大的约数，所以可以从大到小枚举区间 [1,min(a,b)] 中的每个数字，只要找到公约数，必然是最大公约数，即可结束枚举。时间复杂度 O(min(a,b)).

```cpp
int gcd=1;
for(int i=min(a,b);i>=1;i--){ 
    if(a%i==0 && b%i==0){
        gcd=i;
        break;
    }
}
cout<<gcd<<endl;
```

### 质因数分解法

思路：将两数分别分解质因数，取每个公共质因数的较小指数，将这些质因数的幂相乘，即得最大公约数。**核心就是：公共质因数取小指数，然后相乘。** 

```cpp
int gcd(int a,int b){
	//对a分解质因数
	int pa[100]={},cnta[100]={},lena=0;
	for(int i=2;i<=a/i;i++){
		if(a%i==0){
			pa[++lena]=i;
			while(a%i==0) cnta[lena]++,a/=i;
		}
	} 
	if(a>1) pa[++lena]=a,cnta[lena]=1;

	//对b分解质因数
	int pb[100]={},cntb[100]={},lenb=0;
	for(int i=2;i<=b/i;i++){
		if(b%i==0){
			pb[++lenb]=i;
			while(b%i==0) cntb[lenb]++,b/=i;
		}
	} 
	if(b>1) pb[++lenb]=b,cntb[lenb]=1;

	//求累乘公共质因子的最小指数幂 
	int d=1;
	int i=1,j=1;
	while(i<=lena && j<=lenb){
		if(pa[i] < pb[j]) i++;
		else if(pa[i] > pb[j]) j++;
		else{
			int mincnt=min(cnta[i],cntb[j]);
			for(int k=1;k<=mincnt;k++) d*=pa[i];
			i++,j++;
		}
	} 
	return d;
}
```

### 更相减损法
更相减损术是中国古代《九章算术》记载的求最大公约数的算法，原用于分数约分，后扩展为通用数学方法。其名称源于“以减代除”的运算特征，通过反复相减实现数理简化。

更相减损法的正确性是基于这样一个结论：**整数a和b（假设a>=b）的最大公约数一定是 a-b 的最大公约数。** 

证明：设 c 为 a 和 b 的最大公约数，记 a = p * c , b = q * c ，那么 a - b = p * c - q * c = ( p - q ) * c 也是 c 的倍数，所以 c 也是 a - b 的公约数。

我们可以证得 c 一定是 a - b 的最大公约数。因为如果 c 不是 a - b 的最大公约数，那么记 a - b 的最大公约数为 d = k * c > c,那么 k 必能整除 p - q ，记 p = r * k , q= s * k , 那么 a = p * c = r * k * c , b = q * c = s * k * c ,那么可以推出 a 和 b 具有公因数为 k * c = d > c，这就说明 a 和 b 存在一个大于 c 的最大公约数，这与最初的假设相矛盾，所以 c 一定是 a - b 的最大公约数。

在此结论下，就有：`gcd(a,b)=gcd(abs(a-b),min(a,b))` ，这样每次a和b两个数字中，每次都会让较大值减少（减损），直至两个数字相等，即为最大公约数。


例如，求28和60的最大公约数

```cpp
初始值：28 60
第1次：28 32  //每次用较大值减去较小值 60-28=32
第2次：28  4  
第3次：24  4
第4次：20  4
第5次：16  4
第6次：12  4
第7次： 8  4
第8次： 4  4  //两个值相等时，即求得最大公约数
```

代码实现：
```cpp
//更相减损法 
int gcd(int a,int b){
	if(a==0 || b==0) return a+b;
	while(a!=b){
		if(a>b) a-=b;
		else b-=a;
	} 
	return a;
}
```

问题：更相减损法，当 a 远远大于 b 时，比如 a = 10 000 000 000 , b = 1 时，需要运行 9999999999 次，时间复杂度为 O(n).

优化思路（stein算法）：

1. 若 2|a 且 2|b ，则 2 是 a 和 b 的最大公约数，可以提取公因数 2 , 有 gcd(a,b)=2*gcd(a/2,b/2).
2. 若a 或 b 只有一个偶数，则 2 一定不是 a 和 b 的公约数，那么可以把因子 2 丢弃，即：(1) 若2|a 但 2∤b ，那么 gcd(a,b)=gcd(a/2,b);(2) 若 2∤a 但 2|b ，那么 gcd(a,b)=gcd(a,b/2). 
3. 若 a 和 b 均不含因子 2 ，那么 gcd(a,b)=(abs(a-b),min(a,b)).

因为 当 a 和 b 均不含因子 2 时，a 和 b 均为奇数，那么下一次运算 a-b 必然是偶数，所以每一次或2次运算，最大值至少减少到原来一半，所以时间复杂度为 O(log(max(a,b))).

代码实现：
```cpp
//更相减损法，优化，时间复杂度 O(log(max(a,b))) 
int gcd_stein(int a,int b){
	// 处理0的情况：gcd(0, x) = x, gcd(0,0) = 0
	if(a==0 || b==0) return a+b;

	// 步骤1：提取a和b中所有的公因子2
	int d=1;//累计公因子 2
	while(a%2==0&&b%2==0) d*=2,a/=2,b/=2;//提取公因数2
	// 步骤2：消除a或b中单独的因子2
	while(a%2==0) a/=2;
	while(b%2==0) b/=2;
	// 步骤3：更相减损
	while(a!=b){
		//大减小 
		if(a>b) a-=b;
		else b-=a;
		// 每次减法后，结果可能变成偶数，需要再次消除因子2
		while(a%2==0) a/=2;
		while(b%2==0) b/=2;
	}
	// 最终结果
	return a*d;
}
```
可用位运算优化为：
```cpp
int gcd_stein(int a, int b) {
    if (a==0||b==0) return a + b;
    // 提取公因子2
    int shift = 0;
    while (((a | b) & 1) == 0) a >>= 1,b >>= 1, ++shift;
    // 确保b是奇数
    while ((b & 1) == 0) a >>= 1;
    do {
        // 确保a是奇数
        while ((a & 1) == 0) a >>= 1;
        // 确保a >= b
        if (a < b) swap(a, b);
        // 更相减损
        a = a - b;
    } while (a != 0);
    return b << shift;
}
```

**说明：大整数取模的时间复杂度较高，而加减法时间复杂度较低．针对大整数，我们可以用加减代替乘除求出最大公约数．**

### 辗转相除法

在更相减损法中，我们知道 a、b（不妨假设a>b）和 a-b三者的最大公约数是一样的，每次用较大值a减去减小值b，我们可以想象如果多次执行减法直到不能减的时候，就剩下一个余数了a%b，我们直接用这个余数作为后续的操作数不就省了大量的时间吗？！

根据这个思路，有：**gcd ( a , b ) = gcd ( b , a % b )** ,这里其实是把更相减损法的从a中多次减法b直到不够减得到余数a%b，变成直接通过除法获取a/b之后的余数a%b，然后交替进行这样的操作，所以叫做**辗转相除法**，也称为**欧几里得算法**。时间复杂度 O(log(max(a,b))).

代码实现：
```cpp
int gcd(int a,int b){
	if(b==0) return a;
	return gcd(b,a%b);
} 
```
也可以用写成迭代的形式：
```cpp
int gcd(int a,int b){
	while(b!=0){
		int t=a;
		a=b;
		b=t%b;
	}
	return a;
} 
```

## 公倍数与最小公倍数

如果一个整数 x 既是整数 A 的倍数，也是整数 B 的倍数，那么就说 x 是 A 和 B 的公共倍数，简称**公倍数**。

例如：20是2和5的公倍数，36是18和12的公倍数。

在一些数字的公倍数中，最小的公倍数被称为**最小公倍数**，也被记作 LCM（Least Common Multiple）。

例如：6、12、24都是2、3、6的公倍数，其中最小的公倍数是6，所以6是2、3、6的最小公倍数。

### 暴力枚举法
思路：正整数 a 和 b 的最小公倍数一定不超过 a*b，所以可以在区间[1,a * b] 内从小到大枚举，最小的那个能同时被 a 和 b 整除的数字就是 a 和 b 的最小公倍数。

代码实现：
```cpp
int lcm(int a,int b){
	for(int i=1;i<=a*b;i++){
		if(i%a==0 && i%b==0){
			return i;
		}
	}
}
```

### 质因数分解法

思路：将两数分别分解质因数，取每个公共质因数的较大指数，将这些质因数的幂相乘，即得最小公倍数。**核心就是：公共质因数取大指数，然后相乘。** 

代码实现：
```cpp
int lcm(int a,int b){
	//对a分解质因数
	int pa[100]={},cnta[100]={},lena=0;
	for(int i=2;i<=a/i;i++){
		if(a%i==0){
			pa[++lena]=i;
			while(a%i==0) cnta[lena]++,a/=i;
		}
	} 
	if(a>1) pa[++lena]=a,cnta[lena]=1;

	//对b分解质因数
	int pb[100]={},cntb[100]={},lenb=0;
	for(int i=2;i<=b/i;i++){
		if(b%i==0){
			pb[++lenb]=i;
			while(b%i==0) cntb[lenb]++,b/=i;
		}
	} 
	if(b>1) pb[++lenb]=b,cntb[lenb]=1;

	//求累乘公共质因子的最大指数幂 
	int d=1;
	int i=1,j=1;
	while(i<=lena && j<=lenb){
		if(pa[i] < pb[j]) i++;
		else if(pa[i] > pb[j]) j++;
		else{
			int maxcnt=max(cnta[i],cntb[j]);
			for(int k=1;k<=maxcnt;k++) d*=pa[i];
			i++,j++;
		}
	} 
	return d;
}
```

### 用最大公约数计算

根据唯一分解定理，对正整数a和b分解质因数：

对a分解质因数：

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">  <mi>A</mi>  <mo>=</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mn>1</mn>    </mrow>    <mrow>      <msub>        <mi>a</mi>        <mrow>          <mn>1</mn>        </mrow>      </msub>    </mrow>  </msubsup>  <mo>&#xD7;</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mn>2</mn>    </mrow>    <mrow>      <msub>        <mi>a</mi>        <mrow>          <mn>2</mn>        </mrow>      </msub>    </mrow>  </msubsup>  <mo>&#xD7;</mo>  <mo>&#x22EF;</mo>  <mo>&#xD7;</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mi>n</mi>    </mrow>    <mrow>      <msub>        <mi>a</mi>        <mrow>          <mi>n</mi>        </mrow>      </msub>    </mrow>  </msubsup></math>

对b分解质因数：

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">  <mi>B</mi>  <mo>=</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mn>1</mn>    </mrow>    <mrow>      <msub>        <mi>b</mi>        <mrow>          <mn>1</mn>        </mrow>      </msub>    </mrow>  </msubsup>  <mo>&#xD7;</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mn>2</mn>    </mrow>    <mrow>      <msub>        <mi>b</mi>        <mrow>          <mn>2</mn>        </mrow>      </msub>    </mrow>  </msubsup>  <mo>&#xD7;</mo>  <mo>&#x22EF;</mo>  <mo>&#xD7;</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mi>n</mi>    </mrow>    <mrow>      <msub>        <mi>b</mi>        <mrow>          <mi>n</mi>        </mrow>      </msub>    </mrow>  </msubsup></math>

注：上面对a和b分解质因数时，为了实现质因数对齐，若a或b不含某个质因子pi，则该质因子pi的指数可看做是0即可。

最大公约数为：

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">  <mi>G</mi>  <mi>C</mi>  <mi>D</mi>  <mo>=</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mn>1</mn>    </mrow>    <mrow>      <mi>m</mi>      <mi>i</mi>      <mi>n</mi>      <mrow data-mjx-texclass="INNER">        <mo data-mjx-texclass="OPEN">(</mo>        <msub>          <mi>a</mi>          <mrow>            <mn>1</mn>          </mrow>        </msub>        <mo>,</mo>        <msub>          <mi>b</mi>          <mrow>            <mn>1</mn>          </mrow>        </msub>        <mo data-mjx-texclass="CLOSE">)</mo>      </mrow>    </mrow>  </msubsup>  <mo>&#xD7;</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mn>2</mn>    </mrow>    <mrow>      <mi>m</mi>      <mi>i</mi>      <mi>n</mi>      <mrow data-mjx-texclass="INNER">        <mo data-mjx-texclass="OPEN">(</mo>        <msub>          <mi>a</mi>          <mrow>            <mn>2</mn>          </mrow>        </msub>        <mo>,</mo>        <msub>          <mi>b</mi>          <mrow>            <mn>2</mn>          </mrow>        </msub>        <mo data-mjx-texclass="CLOSE">)</mo>      </mrow>    </mrow>  </msubsup>  <mo>&#xD7;</mo>  <mo>&#x22EF;</mo>  <mo>&#xD7;</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mi>n</mi>    </mrow>    <mrow>      <mi>m</mi>      <mi>i</mi>      <mi>n</mi>      <mrow data-mjx-texclass="INNER">        <mo data-mjx-texclass="OPEN">(</mo>        <msub>          <mi>a</mi>          <mrow>            <mi>n</mi>          </mrow>        </msub>        <mo>,</mo>        <msub>          <mi>b</mi>          <mrow>            <mi>n</mi>          </mrow>        </msub>        <mo data-mjx-texclass="CLOSE">)</mo>      </mrow>    </mrow>  </msubsup></math>

最小公倍数为：

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">  <mi>L</mi>  <mi>C</mi>  <mi>M</mi>  <mo>=</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mn>1</mn>    </mrow>    <mrow>      <mi>m</mi>      <mi>a</mi>      <mi>x</mi>      <mrow data-mjx-texclass="INNER">        <mo data-mjx-texclass="OPEN">(</mo>        <msub>          <mi>a</mi>          <mrow>            <mn>1</mn>          </mrow>        </msub>        <mo>,</mo>        <msub>          <mi>b</mi>          <mrow>            <mn>1</mn>          </mrow>        </msub>        <mo data-mjx-texclass="CLOSE">)</mo>      </mrow>    </mrow>  </msubsup>  <mo>&#xD7;</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mn>2</mn>    </mrow>    <mrow>      <mi>m</mi>      <mi>a</mi>      <mi>x</mi>      <mrow data-mjx-texclass="INNER">        <mo data-mjx-texclass="OPEN">(</mo>        <msub>          <mi>a</mi>          <mrow>            <mn>2</mn>          </mrow>        </msub>        <mo>,</mo>        <msub>          <mi>b</mi>          <mrow>            <mn>2</mn>          </mrow>        </msub>        <mo data-mjx-texclass="CLOSE">)</mo>      </mrow>    </mrow>  </msubsup>  <mo>&#xD7;</mo>  <mo>&#x22EF;</mo>  <mo>&#xD7;</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mi>n</mi>    </mrow>    <mrow>      <mi>m</mi>      <mi>a</mi>      <mi>x</mi>      <mrow data-mjx-texclass="INNER">        <mo data-mjx-texclass="OPEN">(</mo>        <msub>          <mi>a</mi>          <mrow>            <mi>n</mi>          </mrow>        </msub>        <mo>,</mo>        <msub>          <mi>b</mi>          <mrow>            <mi>n</mi>          </mrow>        </msub>        <mo data-mjx-texclass="CLOSE">)</mo>      </mrow>    </mrow>  </msubsup></math>

观察上面的 GCD 和 LCM 进行观察，可以发现 min(ai,bi) 和 max(ai,bi) 分别取到了 ai 和 bi 各一次。

所以有

<math xmlns="http://www.w3.org/1998/Math/MathML" display="left">  <mi>A</mi>  <mo>&#xD7;</mo>  <mi>B</mi></math>


<math xmlns="http://www.w3.org/1998/Math/MathML" display="left">  <mo>=</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mn>1</mn>    </mrow>    <mrow>      <msub>        <mi>a</mi>        <mrow>          <mn>1</mn>        </mrow>      </msub>    </mrow>  </msubsup>  <mo>&#xD7;</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mn>2</mn>    </mrow>    <mrow>      <msub>        <mi>a</mi>        <mrow>          <mn>2</mn>        </mrow>      </msub>    </mrow>  </msubsup>  <mo>&#xD7;</mo>  <mo>&#x22EF;</mo>  <mo>&#xD7;</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mi>n</mi>    </mrow>    <mrow>      <msub>        <mi>a</mi>        <mrow>          <mi>n</mi>        </mrow>      </msub>    </mrow>  </msubsup>  <mo>&#xD7;</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mn>1</mn>    </mrow>    <mrow>      <msub>        <mi>b</mi>        <mrow>          <mn>1</mn>        </mrow>      </msub>    </mrow>  </msubsup>  <mo>&#xD7;</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mn>2</mn>    </mrow>    <mrow>      <msub>        <mi>b</mi>        <mrow>          <mn>2</mn>        </mrow>      </msub>    </mrow>  </msubsup>  <mo>&#xD7;</mo>  <mo>&#x22EF;</mo>  <mo>&#xD7;</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mi>n</mi>    </mrow>    <mrow>      <msub>        <mi>b</mi>        <mrow>          <mi>n</mi>        </mrow>      </msub>    </mrow>  </msubsup></math>


<math xmlns="http://www.w3.org/1998/Math/MathML" display="left">  <mo>=</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mn>1</mn>    </mrow>    <mrow>      <mi>m</mi>      <mi>i</mi>      <mi>n</mi>      <mrow data-mjx-texclass="INNER">        <mo data-mjx-texclass="OPEN">(</mo>        <msub>          <mi>a</mi>          <mrow>            <mn>1</mn>          </mrow>        </msub>        <mo>,</mo>        <msub>          <mi>b</mi>          <mrow>            <mn>1</mn>          </mrow>        </msub>        <mo data-mjx-texclass="CLOSE">)</mo>      </mrow>    </mrow>  </msubsup>  <mo>&#xD7;</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mn>2</mn>    </mrow>    <mrow>      <mi>m</mi>      <mi>i</mi>      <mi>n</mi>      <mrow data-mjx-texclass="INNER">        <mo data-mjx-texclass="OPEN">(</mo>        <msub>          <mi>a</mi>          <mrow>            <mn>2</mn>          </mrow>        </msub>        <mo>,</mo>        <msub>          <mi>b</mi>          <mrow>            <mn>2</mn>          </mrow>        </msub>        <mo data-mjx-texclass="CLOSE">)</mo>      </mrow>    </mrow>  </msubsup>  <mo>&#xD7;</mo>  <mo>&#x22EF;</mo>  <mo>&#xD7;</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mi>n</mi>    </mrow>    <mrow>      <mi>m</mi>      <mi>i</mi>      <mi>n</mi>      <mrow data-mjx-texclass="INNER">        <mo data-mjx-texclass="OPEN">(</mo>        <msub>          <mi>a</mi>          <mrow>            <mi>n</mi>          </mrow>        </msub>        <mo>,</mo>        <msub>          <mi>b</mi>          <mrow>            <mi>n</mi>          </mrow>        </msub>        <mo data-mjx-texclass="CLOSE">)</mo>      </mrow>    </mrow>  </msubsup>  <mo>&#xD7;</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mn>1</mn>    </mrow>    <mrow>      <mi>m</mi>      <mi>a</mi>      <mi>x</mi>      <mrow data-mjx-texclass="INNER">        <mo data-mjx-texclass="OPEN">(</mo>        <msub>          <mi>a</mi>          <mrow>            <mn>1</mn>          </mrow>        </msub>        <mo>,</mo>        <msub>          <mi>b</mi>          <mrow>            <mn>1</mn>          </mrow>        </msub>        <mo data-mjx-texclass="CLOSE">)</mo>      </mrow>    </mrow>  </msubsup>  <mo>&#xD7;</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mn>2</mn>    </mrow>    <mrow>      <mi>m</mi>      <mi>a</mi>      <mi>x</mi>      <mrow data-mjx-texclass="INNER">        <mo data-mjx-texclass="OPEN">(</mo>        <msub>          <mi>a</mi>          <mrow>            <mn>2</mn>          </mrow>        </msub>        <mo>,</mo>        <msub>          <mi>b</mi>          <mrow>            <mn>2</mn>          </mrow>        </msub>        <mo data-mjx-texclass="CLOSE">)</mo>      </mrow>    </mrow>  </msubsup>  <mo>&#xD7;</mo>  <mo>&#x22EF;</mo>  <mo>&#xD7;</mo>  <msubsup>    <mi>p</mi>    <mrow>      <mi>n</mi>    </mrow>    <mrow>      <mi>m</mi>      <mi>a</mi>      <mi>x</mi>      <mrow data-mjx-texclass="INNER">        <mo data-mjx-texclass="OPEN">(</mo>        <msub>          <mi>a</mi>          <mrow>            <mi>n</mi>          </mrow>        </msub>        <mo>,</mo>        <msub>          <mi>b</mi>          <mrow>            <mi>n</mi>          </mrow>        </msub>        <mo data-mjx-texclass="CLOSE">)</mo>      </mrow>    </mrow>  </msubsup></math>



<math xmlns="http://www.w3.org/1998/Math/MathML" display="left">  <mo>=</mo>  <mi>G</mi>  <mi>C</mi>  <mi>D</mi>  <mo>&#xD7;</mo>  <mi>L</mi>  <mi>C</mi>  <mi>M</mi></math>

也就是说

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">  <mi>A</mi>  <mo>&#xD7;</mo>  <mi>B</mi>  <mo>=</mo>  <mi>G</mi>  <mi>C</mi>  <mi>D</mi>  <mo>&#xD7;</mo>  <mi>L</mi>  <mi>C</mi>  <mi>M</mi></math>

那么，最小公倍数

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">  <mi>L</mi>  <mi>C</mi>  <mi>M</mi>  <mo>=</mo>  <mfrac>    <mrow>      <mi>A</mi>      <mo>&#xD7;</mo>      <mi>B</mi>    </mrow>    <mrow>      <mi>G</mi>      <mi>C</mi>      <mi>D</mi>    </mrow>  </mfrac></math>

代码实现：
```cpp
int gcd(int a,int b){
	if(b==0) return a;
	return gcd(b,a%b);
} 

int lcm(int a,int b){
	return a/gcd(a,b)*b;//这里先除以GCD，再乘以b，避免先算a*b导致溢出
}
```