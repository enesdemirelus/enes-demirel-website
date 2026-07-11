---
title: Sum of squared differences as a dot product
date: "2026-07-10"
---

Last week, I learned that you can represent the sum of squared differences equation with a vector dotted with itself ($v^Tv$), instead of writing out the full summation.

Let's say we have:

<div class="math-box">

$$
\sum_{i=1}^{n} (x_i - y_i)^2 = (x_1 - y_1)^2 + (x_2 - y_2)^2 + \cdots + (x_n - y_n)^2
$$

</div>

$x$ and $y$ are two different vectors. We want to look at their differences. Let's define a vector $v$ whose entries are those differences.

<div class="math-box">

$$
v = \begin{bmatrix} x_1 - y_1 \\ x_2 - y_2 \\ \vdots \\ x_n - y_n \end{bmatrix}
$$

</div>

Therefore, the multiplication ($v^Tv$) is equal to

<div class="math-box">

$$
v^T v = \begin{bmatrix} x_1 - y_1 & \cdots & x_n - y_n \end{bmatrix} \begin{bmatrix} x_1 - y_1 \\ \vdots \\ x_n - y_n \end{bmatrix} = \sum_{i=1}^{n} (x_i - y_i)^2
$$

</div>
