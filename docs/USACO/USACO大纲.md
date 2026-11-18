# USACO 各阶段授课大纲

> 配套文档：`USACO课程体系调研报告.md`（难度对标与知识点聚类的依据来源）  
> 设计日期：2026-11-18  
> 编写原则：每个教学单元的取舍都对应 USACO Guide 的真题频次标注（VF=Very Frequent / SF=Somewhat Frequent / NF=Not Frequent / Rare），配套真题均为 USACO 官方题库真实题名，不按传统 OI 教材的权重平均用力。

---

## 第一部分 课程总体设计

### 1.1 五级体系与课时总表

课程在 USACO 官方四级之前增加一个**预备段**（不属于竞赛级别，仅做语言与思维衔接）。标准班按每周 2 讲、每讲 90 分钟设计。

| 阶段         | 定位                  | 建议课时     | 周期         | 结课目标                |
| ---------- | ------------------- | -------- | ---------- | ------------------- |
| 0 预备段      | 语言与计算思维（非 USACO 级别） | 6 讲      | 3 周        | 能独立写出 100 行内的过程模拟程序 |
| 1 Bronze   | 把文字翻译成代码            | 14 讲     | 7 周        | 稳定 700+，冲满分跳级       |
| 2 Silver   | 算法起步与复杂度意识          | 18 讲     | 9 周        | 稳定 750+             |
| 3 Gold     | DP 与图论建模主战场         | 20 讲     | 10 周       | 稳定 850+             |
| 4 Platinum | 构造与高级数据结构           | 18 讲     | 9 周        | 能独立完成 2 题以上         |
| **合计**     | 零基础到铂金              | **76 讲** | **约 38 周** | —                   |

> 分班售卖时可按阶段切分：铜升银班=阶段 1 后半+阶段 2，银升金班=阶段 3，金升铂班=阶段 4。每阶段末尾的桥接课是独立卖点，也是续班钩子。

### 1.2 每讲标准结构（90 分钟）

| 环节    | 时长     | 内容                            |
| ----- | ------ | ----------------------------- |
| 复盘与错讲 | 10 min | 上节作业高频错误，只讲思路不讲完整代码           |
| 知识讲授  | 25 min | 一个概念 + 一个 focus problem 的建模过程 |
| 例题精讲  | 25 min | 2 道真题，现场写代码，强调复杂度估算           |
| 独立练习  | 25 min | 1–2 道真题限时独立完成，当堂判分            |
| 作业布置  | 5 min  | 3–5 道分级题单 + 复杂度说明             |

### 1.3 教材与真题资源

- **主干**：USACO Guide 对应级别模块（Bronze/Silver/Gold/Plat 路径），每个模块自带题单与官方题解。
- **题库**：usaco.org 历年真题（2011 年后齐全，含官方题解与在线判题）。
- **题量配比**：Bronze 级别 115 题、Silver 263 题、Gold 427 题、Platinum 274 题（Guide 收录口径，比赛级合计 1079 题）；另有 Advanced 区 377 题，属非比赛主题池，不进入晋级课程，仅可作拔高拓展。课程精选其中约 25% 作为精讲与作业，其余作为自主刷题池。
- **对拍与复杂度验证**：Gold 以上要求先写慢解拿部分分，再用慢解对拍优化解。

### 1.4 阶段验收标准（对标官方晋级线）

| 阶段       | 模考形式         | 通关线    | 依据                   |
| -------- | ------------ | ------ | -------------------- |
| Bronze   | 4 小时 3 题官方真题 | ≥700   | 2024-25 月赛晋级线 700    |
| Silver   | 4 小时 3 题官方真题 | ≥750   | 2025 US Open 晋级线 750 |
| Gold     | 4 小时 3 题官方真题 | ≥850   | 2025 US Open 晋级线 850 |
| Platinum | 4 小时 3 题官方真题 | 完成 2 题 | 无官方晋级线，以题目完成度衡量      |

> 晋级线随场次波动（金升铂跨赛季可差 150 分），训练标准留出冗余，不以压线为目标。

---

## 第二部分 分阶段教学大纲

### 阶段 0｜预备段（6 讲，非 USACO 级别）

**目标**：消除语言障碍，建立"操作数估算"直觉，能读懂英文题面。

| 单元  | 主题                          | 核心知识点                                                       | 课时 |
| --- | --------------------------- | ----------------------------------------------------------- | -- |
| 0.1 | C++ 环境与文件 IO                | 编译运行、`freopen`、输入输出格式、常见 RE 原因                              | 1  |
| 0.2 | 顺序/分支/循环                    | 变量、条件、嵌套循环、累加计数                                             | 1  |
| 0.3 | 数组与字符串                      | 一维数组、字符数组、字符串遍历、ASCII                                       | 1  |
| 0.4 | pair / vector / 栈 / 队列 / 函数 | STL 基础容器、栈与队列的 push/pop、函数拆分、传参；**结构体与自定义比较器留到 Silver 2.5** | 1  |
| 0.5 | 复杂度直觉（一）                    | 用循环层数估算操作数，10³ / 10⁵ / 10⁷ 的量级差异                            | 1  |
| 0.6 | 英文题面精读 + 结业测                | 题干结构、约束条件读法、样例手算验证                                          | 1  |

**说明**：预备段不设 USACO 真题作业，用自编小练习；结业测为 3 道纯模拟小题，达标即进入 Bronze。官方所说的"二分基本概念"指有序数组折半查找的思想，在此用 5–10 分钟讲清即可，不单列课时、不要求写二分答案；正式的二分在 Silver 2.3（有序数组二分，SF）与 2.4（二分答案，VF）。

---

### 阶段 1｜Bronze 铜级（14 讲）

**定位**：官方原文为 "Bronze, for students who have recently learned to program, but who have no training in algorithms beyond basic concepts like sorting and binary search."——这是在描述**学员起点**（最多接触过排序和二分的基本概念），不是 Bronze 的考纲。Guide 青铜 13 个模块中没有二分模块，Bronze 真题用暴力枚举即可解决。因此本阶段**不设二分课时**：概念在预备段讲清，正式的二分在 Silver 2.3 / 2.4。此阶段卡点是工程性的：读题、边界、调试，不是算法。  
**题群依据**：13 模块 / 115 题；VF 为**基础完全搜索、贪心入门、Ad Hoc**；模拟为 SF；set/map 为 SF；排序、Casework 为 NF；递归枚举、图入门、矩形几何为 Rare。Guide 贪心页特别说明：官网虽称贪心从 Silver 起，但大量 Bronze 题可用贪心解——故贪心入门按 VF 给足课时。

| 单元   | 主题                | 知识点                                                   | 频次依据                                  | 配套真题                                                                       | 课时  |
| ---- | ----------------- | ----------------------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------- | --- |
| 1.1  | 赛制导论 + 复杂度（二）     | 赛制、提交系统、逐级操作数估算                                       | Getting Started 模块 15 题               | 模块题单                                                                       | 1   |
| 1.2  | 数据结构入门            | 数组、pair、tuple 的使用场景；**不学结构体**（Guide 明说 Bronze 定长数组即够） | 官方模块                                  | 模块题单                                                                       | 1   |
| 1.3  | 模拟 I：过程复现         | 按题意逐步更新状态、计数与最大值                                      | **Simulation SF**                     | Shell Game、Mixing Milk、The Cow-Signal、Speeding Ticket                      | 2   |
| 1.4  | 模拟 II：网格与多状态      | 二维网格、方向数组、多变量联动                                       | **Simulation SF**                     | The Bovine Shuffle、Circular Barn、Mowing the Field、Reflection               | 1   |
| 1.5  | 模拟 III：边界与溢出      | 边界检查、整数溢出、结束条件                                        | Simulation（难题端）                       | Milk Measurement（Hard）、Stuck in a Rut（Very Hard）                           | 1   |
| 1.6  | 完全搜索 I：暴力枚举       | 遍历解空间、嵌套循环、剪枝初步                                       | **Basic Complete Search VF**          | The Bucket List、The Lost Cow 等枚举型题                                         | 2   |
| 1.7  | 贪心入门 I：直觉与建模      | 每步取当前最优、贪心为何常对                                        | **Introduction to Greedy VF**         | Mad Scientist（focus，Easy）、Watching Mooloo、Cow Tipping、Even More Odd Photos | 1   |
| 1.7b | 贪心入门 II：证明与反例     | 正确性论证、Proof by AC 的局限、与 Casework 联动                   | **Introduction to Greedy VF**         | Out of Place、Milking Order（Hard）、Photoshoot（Hard）、FEB / Race（Very Hard）    | 1   |
| 1.8  | 排序与 set/map 入门    | sort、去重、键值维护                                          | Sorting & Sets **NF**                 | 模块配套题单                                                                     | 1   |
| 1.9  | Casework 与 Ad Hoc | 分类讨论、无套路题的拆解方法                                        | Ad Hoc **VF** / Casework NF           | 模块配套题单                                                                     | 1   |
| 1.10 | 图的概念 + 矩形几何（选讲）   | 顶点边、邻接表概念；轴平行矩形                                       | 均 **NF/Rare**                         | 模块配套题单                                                                     | 1   |
| 1.11 | 递归完全搜索（桥接课 A）     | 子集/排列枚举，为 Silver 图遍历铺路                                | Complete Search with Recursion **NF** | 模块配套题单                                                                     | 1   |
| 1.12 | Bronze 综合模考 + 讲评  | 4 小时 3 题全真模考                                          | Conclusion 模块 18 题                    | 官方历年 Bronze 真题                                                             | 2-3 |

**阶段验收**：4 小时模考 ≥700 分，且第 3 题有非暴力部分分。

---

### 阶段 2｜Silver 银级（18 讲）

**定位**：暴力不再够用，必须主动换算法。此阶段卡点从"工程性"转为"思维性"——题目不再告诉你用什么方法，需要识别出模型。  
**题群依据**：14 模块 / 263 题；VF 为前缀和、二分、排序贪心、图遍历；SF 为有序数组二分、自定义比较器/坐标压缩（**含结构体排序**）、优先队列、树入门、位运算；NF 为双指针、Flood Fill；Rare 为函数图。

| 单元   | 主题               | 知识点                                                                    | 频次依据                                               | 配套真题                                                                                                        | 课时 |
| ---- | ---------------- | ---------------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | -- |
| 2.1  | 复杂度（三）+ 桥接课 B    | n≤10³→n≤10⁵ 的震撼教育：同一暴力在 Silver 数据上 TLE                                 | Bronze→Silver 断层                                   | 用 1.6 枚举题改造大数据重跑                                                                                            | 1  |
| 2.2  | 前缀和              | 一维前缀和、区间和 O(1)、下标处理                                                    | **Prefix Sums VF**（31 题）                           | Breed Counting、Subsequences Summing to Sevens、Hoof Paper Scissors (Silver)、Farmer John's Favorite Operation | 2  |
| 2.3  | 二分（有序数组）         | lower_bound / upper_bound、有序性前提                                        | Binary Search on Sorted Array **SF**               | 模块配套题单                                                                                                      | 1  |
| 2.4  | 二分答案（核心）         | 单调性证明、check 函数、边界与溢出、三种常见错误                                            | **Binary Search VF**                               | Cow Dance Show、Convention、Angry Cows (Silver)、Social Distancing、Loan Repayment、Bakery                       | 3  |
| 2.5  | 自定义比较器与坐标压缩      | **结构体排序（重载 `operator<` / lambda / Python key）**、pair/array 排序、大值域映射小区间 | Custom Comparators & Coordinate Compression **SF** | Wormhole Sort（模块示例）、Rectangular Pasture（坐标压缩示例）                                                             | 1  |
| 2.6  | 排序贪心             | 排序后贪心选择、调度模型、贪心失效反例                                                    | **Greedy with Sorting VF**                         | Lemonade Line、High Card Wins、Rest Stops、Berry Picking、Bovine Acrobatics、Closest Cow Wins                    | 3  |
| 2.7  | 优先队列             | 堆、动态取最值、与贪心联动                                                          | Priority Queues **SF**                             | 模块配套题单                                                                                                      | 1  |
| 2.8  | DFS / BFS        | 图遍历、访问标记、连通块、递归栈风险；**队列是 BFS 的底层容器，在此首次实战**                            | **Graph Traversal VF**                             | Closing the Farm、Moocast、Fence Planning、Redistributing Gifts                                                | 2  |
| 2.9  | BFS 与二分图染色       | 按距离分层、二染色判定、Flood Fill 网格                                              | Graph Traversal VF / Flood Fill **NF**             | The Great Revegetation、Moo Route II、Wormhole Sort、Connecting Two Barns                                      | 2  |
| 2.10 | 树入门 + 函数图（选讲）    | 树的特殊性、functional graph 成环                                              | Tree **SF** / Functional Graph **Rare**            | 模块配套题单                                                                                                      | 1  |
| 2.11 | 位运算（选讲）          | 六种位运算、异或前缀和                                                            | Intro to Bitwise **SF**                            | 模块配套题单                                                                                                      | 1  |
| 2.12 | 同题跨级精讲           | Angry Cows Silver vs Gold 双版本对比                                        | 调研核心案例                                             | Angry Cows (Silver cpid=594) vs (Gold cpid=597)                                                             | 1  |
| 2.13 | Silver 综合模考 + 讲评 | 4 小时 3 题全真模考                                                           | Additional Practice 模块 69 题                        | 官方历年 Silver 真题                                                                                              | 2  |

**阶段验收**：4 小时模考 ≥750 分；二分答案与图遍历两类题能独立识别并写出。

---

### 阶段 3｜Gold 金级（20 讲）

**定位**：USACO 最重要分水岭。唯一 VF 主题是 DP 入门——课程权重必须显著向 DP 与图论建模倾斜。官方明确"大多数 Gold 和 Platinum 比赛至少有一道 DP 题"。  
**题群依据**：29 模块 / 427 题；唯一 VF 为 Introduction to DP；SF 为无权最短路、DSU、滑动窗口、PURS、有序集合操作；NF 为模运算、组合、网格路径、Bitmask DP、非负权最短路、栈、树 DP 入门；Rare 为整除、背包、区间 DP、数位 DP、拓扑、MST、全根、欧拉、LCA、三分、哈希、折半枚举。**LIS 标注为 Has Not Appeared，降为选讲不占位**。

| 单元   | 主题             | 知识点                                                  | 频次依据                             | 配套真题                                                                         | 课时 |
| ---- | -------------- | ---------------------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------- | -- |
| 3.1  | 桥接课 C：从会写到会建模  | 递归记忆化→状态设计；Gold 数据下暴力只能拿小分                           | Silver→Gold 断层                   | Angry Cows 双版本对比                                                             | 1  |
| 3.2  | DP 入门（核心）      | 最优子结构、记忆化、push/pull DP、状态定义                          | **Introduction to DP VF（唯一 VF）** | Hoof, Paper, Scissors、Time is Mooney、Teamwork、Snakes                         | 3  |
| 3.3  | DP 进阶          | 前缀和优化、多状态、难题状态设计                                     | DP 模块 101 题（该级最大题群）              | Circular Barn Revisited、Taming the Herd、Drought、Moortal Cowmbat              | 3  |
| 3.4  | DP 高阶选讲        | 网格路径、Bitmask、区间、数位、背包                                | NF / Rare                        | Stamp Painting、Bovine Genetics、Interstellar Intervals                        | 2  |
| 3.5  | 无权图最短路         | BFS 求最短路、多源 BFS                                      | Shortest Paths Unweighted **SF** | 模块配套题单                                                                       | 1  |
| 3.6  | 带权最短路          | Bellman-Ford、Floyd-Warshall、Dijkstra 及 `continue` 陷阱 | Non-Negative Weights **NF**      | Milk Pumping、Why Did the Cow Cross the Road、Fine Dining、Shortcut、Telephone   | 3  |
| 3.7  | 并查集 DSU        | 路径压缩、按-size 合并、动态连通性                                 | **DSU SF**                       | Closing the Farm (Gold)、MooTube、Reachable Pairs、Strongest Friendship Group   | 2  |
| 3.8  | 点更新区间和 PURS    | 线段树、树状数组、第 k 小、逆序对、坐标压缩                              | **PURS SF**                      | Haircut、Balanced Photo、Why Did the Cow Cross the Road III、Sleepy Cow Sorting | 3  |
| 3.9  | 滑动窗口与单调结构      | 双端队列维护区间最值                                           | Sliding Window **SF**            | 模块配套题单                                                                       | 1  |
| 3.10 | 栈与有序集合进阶       | 单调栈、迭代器、自定义比较器容器                                     | Stacks NF / Sorted Sets NF       | 模块配套题单                                                                       | 1  |
| 3.11 | 树 DP 与换根       | 子树 DP、全根重算、欧拉序、LCA（选讲）                               | Tree DP **NF** / 全根 LCA Rare     | 模块配套题单                                                                       | 2  |
| 3.12 | 数学选讲           | 模运算、整除、组合计数、哈希、折半枚举                                  | 均 **NF/Rare**                    | 模块配套题单                                                                       | 1  |
| 3.13 | Gold 综合模考 + 讲评 | 4 小时 3 题全真模考                                         | Additional Practice 模块 62 题      | 官方历年 Gold 真题                                                                 | 2  |

**阶段验收**：4 小时模考 ≥850 分；DP 状态设计能独立推导，图论题能选出正确算法。

---

### 阶段 4｜Platinum 铂金级（18 讲）

**定位**：官方明确无固定考纲、难度无上界。Guide 中**没有任何 VF 模块**，最高仅 SF。因此本阶段不从"讲更多算法"入手，而从"读官方题解 + 手写高级结构 + 标准做法失效时自己设计"入手。  
**题群依据**：23 模块 / 274 题；SF 为线段树进阶、倍增；NF 为扫描线区间查询、凸包、凸包优化、SOS DP；其余为 Rare；虚树标注 Has Not Appeared。

| 单元  | 主题                 | 知识点                              | 频次依据                                            | 配套真题                                                     | 课时 |
| --- | ------------------ | -------------------------------- | ----------------------------------------------- | -------------------------------------------------------- | -- |
| 4.1 | 桥接课 D：从推出式子到必须优化   | Gold 转移式在 Platinum 数据上超时；常数与空间意识 | Gold→Platinum 断层                                | High Card Low Card (Gold cpid=573 vs Platinum cpid=577)  | 1  |
| 4.2 | 线段树进阶（核心）          | 树上行走、非交换合并函数、有序集合、动态开点           | **More Applications of SegTree SF**（区间查询群 78 题） | High Card Low Card (Platinum)、Pareidolia、Marathon        | 3  |
| 4.3 | 区间查询扩展             | 扫描线、RURQ 懒标记、二维区间查询、分治 SRQ、根号分治  | 扫描线 **NF** / 其余 Rare                            | 模块配套题单                                                   | 2  |
| 4.4 | 倍增与 LCA（核心）        | 2^k 祖先、LCA 三种实现、距离查询             | **Binary Jumping SF**（树群 71 题）                  | 262144、Max Flow、Disruption、Tree Boxes、The Cow Gathering  | 3  |
| 4.5 | 树分解进阶              | 小到大合并、重链剖分、重心分解、Kruskal 重构树      | 均 **Rare**                                      | 模块配套题单                                                   | 2  |
| 4.6 | 凸包与凸包优化            | 几何基础、扫描线、凸包、CHT                  | 凸包/CHT **NF**（几何群 57 题）                         | 模块配套题单                                                   | 2  |
| 4.7 | 组合与 DP 专题          | 容斥、矩阵快速幂、分治 DP、SOS DP            | SOS DP **NF** / 其余 Rare                         | 模块配套题单                                                   | 2  |
| 4.8 | 官方题解精读课            | 每周 1 道 Platinum 真题，从题面到完整解法的构造过程 | Platinum 无固定考纲                                  | 2025 US Open：Forklift Certified、Lazy Sort、Package Pickup | 2  |
| 4.9 | Platinum 综合模考 + 复盘 | 4 小时 3 题全真模考                     | Additional Practice 模块 17 题                     | 官方历年 Platinum 真题                                         | 2  |

**阶段验收**：4 小时模考独立完成 ≥2 题；能手写线段树/倍增模板并说明适用场景。

---

## 第三部分 三个断层桥接课（课程关键设计）

调研显示三个断层会导致"学过但用不上"，课程必须单独设课，不能指望学生自然跨越。

### 桥接课 B：Bronze → Silver（放在 2.1）

- **现象**：Bronze 的 O(n²) 暴力在 Silver 的 n≤10⁵ 数据上直接 TLE。
- **教法**：取一道学生已掌握的 Bronze 枚举题，把 n 从 10³ 改到 10⁵ 现场重跑，计时对比（10⁶ vs 10¹⁰ 次操作）。
- **产出**：让学生把"写代码前先估操作数"变成固定动作。

### 桥接课 C：Silver → Gold（放在 3.1 与 2.12 呼应）

- **现象**：Silver 会用单个算法，Gold 要求 DP 状态设计 + 图论建模，且题面不提示方法。
- **教法**：Angry Cows 双版本对照——Silver 版（cpid=594，标签二分+排序）与 Gold 版（cpid=597，标签二分+贪心+排序+双指针），讲清"同一题面在不同级别的解法差异"。
- **产出**：学生能自己问出"这题该建什么模型"，而不是"这题用什么模板"。


### 桥接课 D：Gold → Platinum（放在 4.1）
- **现象**：Gold 推出转移式即可得分，Platinum 不优化就超时；且主题与 Gold 基本重合，区别在优化与建模深度。
- **教法**：High Card Low Card 的 Gold 版与 Platinum 版对照；演示"贪心+排序"在 Gold 可过、在 Platinum 必须换线段树。
- **产出**：建立"常数与空间也是考点"的意识，理解 Platinum 无套路可套。

---

## 第四部分 实施建议

### 4.1 作业与刷题量

| 阶段 | 每周精做题 | 每周自主刷题 | 备注 |
| --- | --- | --- | --- |
| Bronze | 3–5 | 5 | 以写对、边界全过为标准 |
| Silver | 4–6 | 8 | 每道题标注所用算法与复杂度 |
| Gold | 5–8 | 10 | 要求先写慢解拿部分分再优化 |
| Platinum | 3–5 | 8 | 以读官方题解 + 复现为主 |

### 4.2 语言路线

- **Bronze 及以前**：Python 完全可行，降低语法门槛。
- **Silver 起**：建议切 C++（IOI 仅支持 C++，Python 常数在高组别吃亏）。若学员已熟 C++ 则从预备段直接用 C++。
- **Gold 以上**：C++ 唯一推荐。

### 4.3 模考安排

每个阶段末安排 1 次 4 小时全真模考（Bronze/Silver 在周五至周一窗口任选连续 4 小时；Gold/Platinum 需注意 2025-26 赛季认证成绩需在美东周六 12:00–12:15 开赛窗口内开始，模考也应模拟该约束）。

### 4.4 常见陷阱（授课时反复强调）

1. **二分答案的三种错误**：off-by-one 死循环、负边界向下取整、整数溢出——USACO Guide 二分模块专门列出，必须讲。
2. **Dijkstra 缺 `continue`**：官方模块明确警告会在最后一个测试点 TLE。
3. **Floyd-Warshall 三重循环顺序**：必须是 KIJ，写成 IJK/IKJ 会出错。
4. **递归 DFS 栈溢出**：n=10⁵ 链式图可能 segfault，需改 BFS 或调栈。
5. **不要平均用力**：LIS 标注 Has Not Appeared、虚树标注 Has Not Appeared，Rare 主题降为选讲。
6. **不要把 Advanced 区当比赛考纲**：网络流、字符串高级算法、平衡树在 Guide 中属于 Advanced（非比赛级别，41 模块 / 377 题），不应进入 Bronze→Platinum 晋级主线；若开拔高课，须与晋级课明确分开。

### 4.5 与调研结论的对应检查表

| 调研结论 | 大纲落实位置 |
| --- | --- |
| Bronze VF=完全搜索/贪心入门/Ad Hoc（模拟为 SF） | 1.6、1.7、1.7b、1.9 共 5 讲；模拟 1.3–1.5 共 4 讲按 SF 配置 |
| Silver VF=前缀和/二分/排序贪心/图遍历 | 2.2、2.4、2.6、2.8–2.9 共 10 讲，占 Silver 过半 |
| Gold 唯一 VF=DP 入门 | 3.2–3.4 共 8 讲，为 Gold 最大权重 |
| Platinum 无 VF | 4.2、4.4 以 SF 为核心，4.8 题解精读替代套路讲授 |
| 三个断层点 | 桥接课 B/C/D 独立设课 |
| 复杂度 10³→10⁵ | 0.5、1.1、2.1 三次递进 |
| 同题跨级对比 | 2.12、桥接课 C、桥接课 D |

### 4.6 工具型数据结构与结构体的引入时点

这些概念按"工具"而非"考点"处理，不单独占 Bronze 课时。依据是 Guide 全库检索：Bronze/Silver 没有独立的栈、队列、链表模块；Bronze 数据结构页原话是"定长数组对几乎每道 Bronze 题都够用，vector/pair/tuple 只是简化实现"；结构体与自定义比较器明确归 Silver 模块。

| 概念 | 何时学 | 落点 | 备注 |
| --- | --- | --- | --- |
| 栈、队列的基础操作 | 预备段 0.4 | `stack` / `queue` 的 push/pop | 只讲工具用法，2 分钟演示即可 |
| 队列的第一次实战 | Silver 2.8 | BFS 用队列逐层扩展 | Graph Traversal 是 VF，队列在这里才真正用起来 |
| 优先队列 | Silver 2.7 | 堆、动态取最值 | Priority Queues **SF** |
| **结构体 + 结构体排序** | **Silver 2.5** | `operator<` / lambda / Python `key=` | Custom Comparators **SF**，Guide 模块示例为 Wormhole Sort |
| 单调栈 | Gold 3.10 | Stacks **NF** | 作为专题，不占主线 |
| 双端队列 / 滑动窗口 | Gold 3.9 | Sliding Window **SF** | 与单调结构联动 |
| 链表 | **不安排课时** | Guide 全库无此模块 | 定长数组/vector 足以覆盖 USACO 需求；`std::list` 常数差，不是竞赛工具 |

> 判定口径：Guide 没有链表模块、Bronze 排序页写明"自定义结构体在 Silver 覆盖"、Silver 比较器页用 `struct Edge` 教排序——所以"结构体排序不需要学"是误解，准确说法是**不在 Bronze 学，在 Silver 2.5 学**。

---

*本大纲可直接拆解为逐讲教案；每讲的 focus problem、代码模板与题单链接均可在对应 USACO Guide 模块页获取。*
