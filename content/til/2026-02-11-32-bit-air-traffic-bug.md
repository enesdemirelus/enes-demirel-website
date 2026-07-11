---
title: The 32-bit air traffic control bug
date: "2026-02-11"
---

Did you know that in 2014, a radar data processing system used by the regional air traffic control facility serving Southern California failed after running continuously for an extended period? The failure caused hundreds of flights to be delayed by 1 to 3 hours, and some were even canceled. Later, it was revealed that the failure happened because of a very small software bug involving a signed integer overflow.

**But what is a signed integer overflow?**

Computers store numbers in binary. Most older computers were/are still using 32-bit systems. That means that the biggest number a 32-bit unsigned integer can store is a binary value with 32 1's next to each other. That number is:

<div class="math-box">

$$
2^{32} - 1 = 4,294,967,295
$$

</div>

However, computers need to store negative numbers as well. So, computer scientists in the 1960s came up with a solution. Using the most significant bit to store the sign. If it is 0, that is a positive number; if it is 1, that is a negative number. This is called a 32-bit signed integer. To be able to read a negative number, you have to invert all the bits and add 1.

**Example:**

<div class="math-box">

$$
\begin{aligned} &\rightarrow \text{ } 11111111 = -1 \\ &\rightarrow \text{ } 00000001 = 1 \end{aligned}
$$

</div>

Therefore, we can now represent negative numbers, with a small caveat. The biggest positive number we can go up to now is 31 1's next to each other. So, our range became:

<div class="math-box">

$$
-2,147,483,648 \text{ to } 2,147,483,647
$$

</div>

An integer overflow happens when a number exceeds the maximum value the data type can store. Which basically means that a 32-bit signed integer cannot exceed $2,147,483,647$.

After the investigation, authorities found that the system was keeping track of time using a 32-bit signed integer, counting milliseconds. Which means the system was going to crash after:

<div class="math-box">

$$
2,147,483,647 \text{ ms} \approx 24.85 \text{ days}
$$

</div>

They knew about this, but their solution was basically restarting the system. However, this time they forgot. This was a good lesson for those programmers not to keep track of time using a 32-bit signed integer.

A nice note: A 64-bit signed integer can run for $292$ million years (counting milliseconds) without crashing.

<div class="math-box">

$$
2^{63} - 1 = 9,223,372,036,854,775,807 \text{ ms} \approx 292,471,208 \text{ years}
$$

</div>

I first read about this story in the book [Humble Pi](https://www.amazon.com/Humble-Pi-Comedy-Maths-Errors/dp/0141989149) by [Matt Parker](https://www.standupmaths.com/). I strongly recommend it to everyone interested in math.
