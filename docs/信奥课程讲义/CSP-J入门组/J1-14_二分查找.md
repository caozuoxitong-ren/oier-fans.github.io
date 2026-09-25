## 一、二分算法的知识框架

### 1\. 使用条件

二分通常需要同时满足以下条件：

1.  **搜索范围有序**：例如数组满足 `a[0] <= a[1] <= ... <= a[n-1]`。
2.  **判断结果具有单调性**：随着下标增大，判断结果只能从“假”变“真”，或从“真”变“假”，不能来回变化。
3.  **每次判断可以排除一半范围**：中点的结果能告诉我们答案不可能在哪一侧。

### 2\. 三类常见查询

| 查询类型 | 标准定义 | 常见返回值 |
| --- | --- | --- |
| 存在性查询 | 是否存在 `a[i] == x` | `true` 或 `false` |
| 左边界查询 | 第一个满足 `a[i] >= x` 的位置 | 下标；不存在时返回 `n` |
| 右边界查询 | 最后一个满足 `a[i] <= x` 的位置 | 下标；不存在时返回 `-1` |

二分查找的写法很多，但核心规律其实只有两件事：

1. **你的搜索区间是“闭区间”还是“左闭右开”**
2. **你要找的是“精确值”“左边界”还是“右边界”**

这两点决定了：

- `while` 里写 `left < right` 还是 `left <= right`
- 更新时写 `right = mid - 1` 还是 `right = mid`
- 最后返回 `left` 还是 `right`

下面系统地说。

---

## 一、先搞清两种区间定义

### 1. 闭区间 `[left, right]`

表示 `left` 和 `right` 都是候选元素。

```java
int left = 0, right = nums.length - 1;
while (left <= right) {
    int mid = left + (right - left) / 2;
    // ...
}
```

特点：

- 初始：`left = 0, right = n - 1`
- 循环条件：`left <= right`
- 更新：`left = mid + 1`，`right = mid - 1`
- 退出时：`left = right + 1`

因为 `left == right` 时，区间里还有一个元素，所以还要循环。

---

### 2. 左闭右开 `[left, right)`

表示 `left` 是候选，`right` 不是候选。

```java
int left = 0, right = nums.length;
while (left < right) {
    int mid = left + (right - left) / 2;
    // ...
}
```

特点：

- 初始：`left = 0, right = n`
- 循环条件：`left < right`
- 更新：`left = mid + 1`，`right = mid`
- 退出时：`left == right`

因为 `left == right` 时，区间已经空了，所以循环结束。

---

## 二、三分支：精确查找某个值

如果你只是想知道 `target` 是否存在，找到就返回，这是最常见的三分支写法。

### 闭区间写法

```java
int binarySearch(int[] nums, int target) {
    int left = 0, right = nums.length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target) {
            return mid;          // 找到直接返回
        } else if (nums[mid] < target) {
            left = mid + 1;      // target 在右边
        } else {
            right = mid - 1;     // target 在左边
        }
    }

    return -1;                   // 没找到
}
```

### 左闭右开写法

```java
int binarySearch(int[] nums, int target) {
    int left = 0, right = nums.length;

    while (left < right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;         // 注意这里是 right = mid，不是 mid - 1
        }
    }

    return -1;
}
```

**注意：**

三分支里 `==` 直接返回，所以它只能找到任意一个 `target`。

如果数组里有重复元素，比如：

```java
nums = [1, 2, 2, 2, 3]
target = 2
```

三分支可能返回中间的 `2`，不保证是第一个或最后一个。

---

## 三、找左边界：第一个等于 target，或者第一个 >= target

如果你要的是：

- 第一个等于 `target` 的下标
- 或者如果没有 `target`，返回第一个大于 `target` 的位置

这就是“左边界”。

### 核心规则

**等于 `target` 时，不能直接返回，而是要收缩右边界，继续往左找。**

也就是说，`==` 要当成 `>=` 处理。

---

### 闭区间写法

```java
int leftBound(int[] nums, int target) {
    int left = 0, right = nums.length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            // nums[mid] >= target
            // 等于 target 也收缩右边界，继续往左找
            right = mid - 1;
        }
    }

    // 退出时：left = right + 1
    // left 是第一个 >= target 的下标
    // right 是最后一个 < target 的下标

    if (left < nums.length && nums[left] == target) {
        return left;       // 第一个等于 target
    }

    return -1;             // 不存在
}
```

退出后：

- `left` 是第一个 `>= target` 的位置
- `right` 是最后一个 `< target` 的位置

所以左边界返回 `left`。

---

### 左闭右开写法

```java
int leftBound(int[] nums, int target) {
    int left = 0, right = nums.length;

    while (left < right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            // nums[mid] >= target
            right = mid;
        }
    }

    // 退出时：left == right
    // 这个位置就是第一个 >= target 的下标

    if (left < nums.length && nums[left] == target) {
        return left;
    }

    return -1;
}
```

退出后：

- `left == right`
- 这个位置就是第一个 `>= target` 的位置

所以左边界返回 `left` 或 `right` 都一样。

---

## 四、找右边界：最后一个等于 target，或者最后一个 <= target

如果你要的是：

- 最后一个等于 `target` 的下标
- 或者如果没有 `target`，返回最后一个小于 `target` 的位置

这就是“右边界”。

### 核心规则

**等于 `target` 时，不能直接返回，而是要收缩左边界，继续往右找。**

也就是说，`==` 要当成 `<=` 处理。

---

### 闭区间写法

```java
int rightBound(int[] nums, int target) {
    int left = 0, right = nums.length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] <= target) {
            // 等于 target 也收缩左边界，继续往右找
            left = mid + 1;
        } else {
            // nums[mid] > target
            right = mid - 1;
        }
    }

    // 退出时：left = right + 1
    // right 是最后一个 <= target 的下标
    // left 是第一个 > target 的下标

    if (right >= 0 && nums[right] == target) {
        return right;      // 最后一个等于 target
    }

    return -1;
}
```

退出后：

- `right` 是最后一个 `<= target` 的位置
- `left` 是第一个 `> target` 的位置

所以右边界返回 `right`。

---

### 左闭右开写法

```java
int rightBound(int[] nums, int target) {
    int left = 0, right = nums.length;

    while (left < right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] <= target) {
            left = mid + 1;
        } else {
            // nums[mid] > target
            right = mid;
        }
    }

    // 退出时：left == right
    // 这个位置是第一个 > target 的下标
    // 所以最后一个 <= target 是 left - 1

    int r = left - 1;

    if (r >= 0 && nums[r] == target) {
        return r;           // 最后一个等于 target
    }

    return -1;
}
```

注意：

左闭右开退出时 `left == right`，但这个位置是第一个 `> target`。

所以右边界要返回 `left - 1` 或 `right - 1`。

---

## 五、返回 left 还是 right 的规律总结

### 闭区间 `while (left <= right)`

退出时一定满足：

```java
left = right + 1
```

也就是说 `left` 和 `right` 差 1，它们分别代表两个分界点。

| 循环中的条件 | 退出后 left | 退出后 right |
|---|---|---|
| `nums[mid] < target` 时 `left = mid + 1`，否则 `right = mid - 1` | 第一个 `>= target` | 最后一个 `< target` |
| `nums[mid] <= target` 时 `left = mid + 1`，否则 `right = mid - 1` | 第一个 `> target` | 最后一个 `<= target` |

所以：

- 找左边界：返回 `left`
- 找右边界：返回 `right`

---

### 左闭右开 `while (left < right)`

退出时一定满足：

```java
left == right
```

| 循环中的条件 | 退出后 left / right |
|---|---|
| `nums[mid] < target` 时 `left = mid + 1`，否则 `right = mid` | 第一个 `>= target` |
| `nums[mid] <= target` 时 `left = mid + 1`，否则 `right = mid` | 第一个 `> target` |

所以：

- 找左边界：返回 `left` 或 `right`
- 找右边界：返回 `left - 1` 或 `right - 1`

---

## 六、更本质的规律：循环不变量

二分查找的本质是维护一个“分界点”。

### 找左边界时

我们维护：

- `left` 左边都是 `< target`
- `right` 右边都是 `>= target`

当循环结束时，搜索区间为空，`left` 和 `right` 之间就是分界点。

所以：

- `left` 是第一个 `>= target`
- `right` 是最后一个 `< target`

### 找右边界时

我们维护：

- `left` 左边都是 `<= target`
- `right` 右边都是 `> target`

当循环结束时：

- `left` 是第一个 `> target`
- `right` 是最后一个 `<= target`

---

## 七、等号分支为什么重要？

可以这样记：

### 精确查找

```java
if (nums[mid] == target) {
    return mid;       // 直接返回
}
```

### 找左边界

```java
if (nums[mid] == target) {
    right = mid - 1;  // 继续往左找
}
```

等价于：

```java
if (nums[mid] >= target) {
    right = mid - 1;
}
```

### 找右边界

```java
if (nums[mid] == target) {
    left = mid + 1;   // 继续往右找
}
```

等价于：

```java
if (nums[mid] <= target) {
    left = mid + 1;
}
```

所以：

- **等号往左收缩，就是找左边界**
- **等号往右收缩，就是找右边界**
- **等号直接返回，就是精确查找**

---

## 八、推荐模板：左闭右开

我个人推荐统一使用左闭右开模板，因为退出时 `left == right`，不会搞混。

### 左边界：第一个 >= target

```java
int lowerBound(int[] nums, int target) {
    int left = 0, right = nums.length;

    while (left < right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left; // 第一个 >= target
}
```

### 右边界：最后一个 <= target

```java
int lastLeq(int[] nums, int target) {
    int left = 0, right = nums.length;

    while (left < right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left - 1; // 最后一个 <= target
}
```

### 判断 target 是否存在

```java
int left = lowerBound(nums, target);

if (left < nums.length && nums[left] == target) {
    // 存在
} else {
    // 不存在
}
```

```java
int right = lastLeq(nums, target);

if (right >= 0 && nums[right] == target) {
    // 存在
} else {
    // 不存在
}
```

---

## 九、常见坑

### 1. `while (left < right)` 却用 `right = mid - 1`

这样可能漏掉最后一个元素。

因为 `left == right` 时循环就结束了，但那个元素可能还没被检查。

如果你要用 `right = mid - 1`，循环条件最好写 `left <= right`。

### 2. `while (left <= right)` 却用 `right = mid`

这样可能死循环。

因为当 `left == right` 时，`mid == left == right`，如果执行 `right = mid`，区间不会缩小。

### 3. 找边界时 `==` 直接返回

这样只能找到任意一个 `target`，不是左边界或右边界。

### 4. 忘记检查存在性

找左边界时，如果 `target` 不存在，返回的可能是第一个大于 `target` 的位置。

所以最后要检查：

```java
if (left < nums.length && nums[left] == target)
```

找右边界时同理：

```java
if (right >= 0 && nums[right] == target)
```

---

## 总结一句话

- `while (left <= right)` 搭配 `right = mid - 1`，退出时 `left = right + 1`
- `while (left < right)` 搭配 `right = mid`，退出时 `left == right`
- 找左边界：等号往左收缩，返回 `left`
- 找右边界：等号往右收缩，闭区间返回 `right`，左闭右开返回 `left - 1`
- 精确查找：等号直接返回 `mid`

抓住“区间定义”和“等号归属”，二分查找就不会乱。