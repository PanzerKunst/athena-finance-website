# The review comments

In src/UI/LandingPage/PerformanceStats/PnlPerPair.tsx, about:
```
// The bar only restates the amount printed next to it, hence `aria-hidden`: a screen reader is
// read the pair and its result, and spared a decoration it cannot convey
```
Comment:
The accessibility comment is grammatically incorrect: “a screen reader is read” should say that the screen reader reads the content.
