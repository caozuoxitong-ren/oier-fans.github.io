<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
<script type="text/x-mathjax-config">
	MathJax.Hub.Config({
		tex2jax: {
			skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
			inlineMath: [['$','$']]
		}
	});
</script>

对于欧拉函数，信息学竞赛的考察早已不局限于“求个数”本身，而是需要你深刻理解它的**积性结构、容斥本质以及它作为模运算“指数”降幂工具的整套理论**。下面以系统梳理欧拉函数的核心分析方法、证明思路、计算技巧及常见题型。

---

## 一、定义与推导

**定义**：对正整数 $n$，欧拉函数 $\varphi(n)$ 表示 $[1, n]$ 中与 $n$ 互质的整数个数，规定 $\varphi(1)=1$。

**核心公式**：设 $n = p_1^{k_1} p_2^{k_2} \cdots p_m^{k_m}$，则

$
\varphi(n) = n \prod_{i=1}^{m} \left(1 - \frac{1}{p_i}\right) = \prod_{i=1}^{m} p_i^{k_i-1}(p_i - 1)
$

**推导方法**（容斥原理）：  
从 $1\sim n$ 中先去掉所有 $p_i$ 的倍数，但多去除了 $p_ip_j$ 的倍数，再加回来……恰好是：

$
\varphi(n) = n - \sum \frac{n}{p_i} + \sum \frac{n}{p_i p_j} - \cdots = n\prod\left(1-\frac{1}{p_i}\right)
$

容斥原理是分析欧拉函数计数问题的根基，需要熟练掌握这种“去除倍数”的思想。

**题目：求某个正整数的欧拉函数**

【例题】：[P1795. 求欧拉函数](https://marsoj.cn/p/P1795)


---

## 二、欧拉函数的性质

以下每条性质都是竞赛中设计算法、化简问题的关键，必须能说出证明思路。

### 1. 质数的欧拉函数
当p是质数时：

$ \varphi(p)=p-1$

$ \varphi(p^k)=\varphi(p^{k-1})*p$ , 其中 $k >= 2$

### 2. 积性（最重要）
若 $\gcd(a,b)=1$，则 $\varphi(ab) = \varphi(a)\varphi(b)$。  
**证明**：利用中国剩余定理，$[1,ab]$ 中与 $ab$ 互质的数，与数对 $(x \bmod a,\ y \bmod b)$ 且 $\gcd(x,a)=\gcd(y,b)=1$ 形成双射（一一对应），故个数乘积。  
注：欧拉函数**不是完全积性**，例如 $\varphi(4)=2$，$\varphi(2)=1$，$\varphi(4)\neq\varphi(2)^2$。

**例题：求区间[1,n]中每个数的欧拉函数**

- 【例题】[P1741. 欧拉函数](https://marsoj.cn/p/P1741)
- 【例题】[P1796. 仪仗队](https://marsoj.cn/p/P1796)

### 3. 欧拉定理与扩展欧拉定理（降幂核心）
- **欧拉定理**：若 $\gcd(a,m)=1$，则 $a^{\varphi(m)} \equiv 1 \pmod{m}$。
- **费马小定理**：当 $m$ 为素数 $p$，$\varphi(p)=p-1$，即 $a^{p-1}\equiv 1 \pmod{p}$（需 $p \nmid a$）。
- **扩展欧拉定理**（指数降幂，无需互质）：  
    -   当 $b < \varphi(m) $ 时，$  a^b \equiv  a^{b}  \pmod{m} $ ，
    -   当 $b \ge \varphi(m) $ 时，$ a^b \equiv a^{b \bmod \varphi(m) + \varphi(m)} \pmod{m}$

  这里指数 $b$ 通常是超大型（如指数塔、阶乘幂），必须递归使用 $\varphi$ 快速递减（因为 $\varphi$ 对偶数至少减半，对奇数变为偶数，因此递降次数 $\le 2\log_2 m$）。这是处理**幂塔、超高次幂取模**的终极工具。

  拓展学习：[欧拉定理与扩展欧拉定理的证明](proof_euler_theorem.pdf)

**题目：扩展欧拉定理（欧拉降幂公式）**

- 【例题】[P1744. 上帝与集合的正确用法](https://marsoj.cn/p/P1744)

### 4. 偶数值性质
当 $n > 2$ 时，$\varphi(n)$ 必为偶数。  
**证明**：若 $a$ 与 $n$ 互质，则 $n-a$ 也与 $n$ 互质，且 $a \neq n-a$（因为 $n>2$ 时 $a$ 不会是 $n/2$ 且使得 $\gcd(n/2,n)=n/2>1$），故互质数成对出现，个数为偶数。

**题目：欧拉函数表的特征**

- 【例题】[P1794. 欧拉函数的规律](https://marsoj.cn/p/P1794)

---

## 三、计算欧拉函数的系统方法（实现武器库）

根据数据范围与需求选择。

### 方法1：单点计算 $O(\sqrt{n})$
配合质因数分解：
```cpp
int phi(int n) {
    int res = n;
    for (int i = 2; i * i <= n; ++i) {
        if (n % i == 0) {
            res = res / i * (i - 1);   // 等价于乘(1-1/i)
            while (n % i == 0) n /= i;
        }
    }
    if (n > 1) res = res / n * (n - 1);
    return res;
}
```
**易错**：`res = res / i * (i-1)` 不能写 `res = res * (i-1) / i`，防止溢出，且整除必须在前。

### 方法2：埃氏筛区间求欧拉函数 $O(n\log\log n)$
```cpp
void phi_table(int n, vector<int>& phi) {
    iota(phi.begin(), phi.end(), 0);  // phi[i]=i
    for (int i = 2; i <= n; ++i) {
        if (phi[i] == i) {            // i是质数
            for (int j = i; j <= n; j += i)
                phi[j] = phi[j] / i * (i - 1);
        }
    }
}
```
**原理**：利用欧拉函数公式，对每个质数 $p$，将其所有倍数的 $\varphi$ 值乘以 $(1-1/p)$。

### 方法3：线性筛欧拉函数 $O(n)$（竞赛首选）
```cpp
vector<int> primes;
bool is_composite[MAXN];
int phi[MAXN];

void linear_sieve(int n) {
    phi[1] = 1;
    for (int i = 2; i <= n; ++i) {
        if (!is_composite[i]) {
            primes.push_back(i);
            phi[i] = i - 1;                // 质数的欧拉函数
        }
        for (int p : primes) {
            if (i * p > n) break;
            is_composite[i * p] = true;
            if (i % p == 0) {
                phi[i * p] = phi[i] * p;   // p在i中出现过
                break;
            } else {
                phi[i * p] = phi[i] * (p - 1);
            }
        }
    }
}
```
**证明递推公式**：
- 当 $p \mid i$ 时，$i$ 已含质因子 $p$，由积性延伸：$\varphi(i\cdot p) = \varphi(i) \times p$。
- 当 $p \nmid i$ 时，$p$ 为新质因子，$\varphi(i\cdot p) = \varphi(i) \times (p-1)$。

此法可同时求出质数表，是信息学竞赛中处理 $n \le 10^7$ 量级欧拉函数的标准做法。

---

欧拉函数的分析总是围绕“互质计数→容斥/积性”与“指数降幂→欧拉定理递归”两条主线。掌握以上证明、模板和应用流程，便可覆盖信息学奥赛中对欧拉函数的全部要求。