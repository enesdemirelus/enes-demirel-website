---
title: today I learned...
excerpt: I'll share all the interesting facts I read about science, math, sports, and computer science here. Some of them might be incorrect or contain mathematical errors, as they are researched and written by me.
date: "2026-02-11"
readTime: 1 min
emoji: "🤔"
pinned: true
---

<div class="entry-box">

## February 21, 2026

Did you know that, in 2008, Steve Jobs noticed that the Google logo displayed as an icon on the original iPhone did not match Google's official brand colors, spesifically the yellow in the second "o." He contacted Google to point out the issue. After reviewing the logo, Google changed the color to match the official brand colors. The change was only visible on the iPhone, and not on other devices.

</div>

<div class="entry-box">

## February 12, 2026

Did you know that you can **almost** fit all the planets in the solar system between the Earth and the Moon by putting them next to each other without any space between them?

**Wait, how?**

It is actually pretty simple elemantary school mathematics.

<div class="math-box">

$$
\begin{array}{|c|c|}
\hline
\textbf{Planet} & \textbf{Mean Distance (km)} \\
\hline
\mathit{Jupiter} & 142,984 \\
\hline
\mathit{Saturn} & 120,536 \\
\hline
\mathit{Uranus} & 51,118 \\
\hline
\mathit{Neptune} & 49,528 \\
\hline
\mathit{Venus} & 12,104 \\
\hline
\mathit{Mars} & 6,792 \\
\hline
\mathit{Mercury} & 4,879 \\
\hline
\end{array}
\\[0.5cm]
\begin{array}{|c|c|}
\hline
\textbf{Total} & 387,942 \\
\hline
\end{array}
$$

</div>

**Average Lunar Distance:**

<div class="math-box">

$$
384,399 \text{ km}
$$

</div>

Therefore, all the planets in solar system can **almost** fit in the space between Earth and the Moon.

**A nice note:** If you line the planets up top-to-bottom (pole-to-pole), they fit with plenty of room to spare!

</div>

<div class="entry-box">

## February 11, 2026

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

</div>

<div class="entry-box">

## February 10, 2026

Did you know that all possible arangements of a 52 deck cards is greater than the number of atoms in the solar system?

**Explanation:**

We first need to calculate the total number of permutations of a 52 deck cards. This can be done with calculating how many ways we can arrange 52 distinct cards:

<div class="math-box">

$$
\begin{aligned} &\text{There are 52 choices for the first card.} \\ &\text{There are 51 choices for the second card.} \\ &\vdots \\ &\text{There is 1 choice for the 52nd card.} \end{aligned}
$$

</div>

By the [product principle](https://en.wikipedia.org/wiki/Rule_of_product), the total number of permutations is:

<div class="math-box">

$$
52 \times 51 \times \cdots \times 1 = 52! ≈ 10^{67}
$$

</div>

The number of atoms in the solar system is estimated to be around $10^{50}$.

<div class="math-box">

$$
52! > 10^{50}
$$

</div>

Therefore, the number of permutations of a 52 deck cards is greater than the number of atoms in the solar system.

</div>
