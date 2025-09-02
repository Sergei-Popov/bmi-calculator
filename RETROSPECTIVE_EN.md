# BMI Calculator Project Retrospective

## What are you most proud of, and what would you do differently next time?

### Most Proud Of:
- **Clean Code Architecture**: Separated logic into distinct functions for metric and imperial BMI calculations, making the code readable and scalable
- **Responsive Design**: Implemented a fully responsive interface using modern CSS techniques (Flexbox, Grid)
- **Data Validation**: Added input validation and constraints to prevent incorrect calculations
- **UX/UI Solutions**: The calculator works in real-time without requiring users to click a "Calculate" button

### Would Do Differently:
- **Use TypeScript**: For better type safety and preventing errors during development
- **Implement Modular Architecture**: Would split JavaScript into separate modules (calculator.js, validation.js, ui.js)
- **Add State Management**: Would use a pattern for managing calculator state
- **Include Animations**: Smooth transitions between states and micro-animations to enhance user experience

## What challenges did you encounter, and how did you overcome them?

### Challenge 1: Switching Between Metric and Imperial Systems
**Problem**: Complexity in managing input field visibility and resetting values when switching units
**Solution**: 
```javascript
function toggleCalculator() {
  if (checkboxMetric.checked) {
    calculatorMetric.style.display = 'flex';
    calculatorImperial.style.display = 'none';
  } else {
    calculatorMetric.style.display = 'none';
    calculatorImperial.style.display = 'flex';
  }
}
```

### Challenge 2: Calculating Ideal Weight for Different BMI Categories
**Problem**: Need to dynamically calculate healthy weight range based on height and current BMI category
**Solution**: Created `resultClassification()` function that returns both the category and weight range for each BMI category

### Challenge 3: Responsive Layout for Complex Grid
**Problem**: Implementing complex layout for "Limitations of BMI" section with uneven element positioning
**Solution**: Used CSS Grid with named areas for precise element positioning across different resolutions

## What specific areas of your project would you like help with?

### 1. Performance Optimization
- **Specific Question**: How to best optimize BMI recalculations during rapid data input? Should I use debouncing or throttling?
- **Current Implementation**: Every input change triggers recalculation via `addEventListener('input')`

### 2. Accessibility (A11y)
- **Specific Question**: Are ARIA attributes properly implemented for unit switching radio buttons? How to improve keyboard navigation?
- **Area for Improvement**: Current radio buttons use custom styling

### 3. Validation and Error Handling
- **Specific Question**: How to better organize validation error display to users? Show them inline or in a separate area?
- **Current State**: Has HTML5 validation (min/max) but no visual feedback

### 4. Code Architecture
- **Specific Question**: Should I refactor towards class-based architecture or functional approach with modules?
- **Current Structure**: All code in one file with procedural approach

### 5. Testing
- **Specific Question**: What testing approach to choose for vanilla JS project? Jest for unit tests and Cypress for e2e?
- **Problem**: Project completely lacks tests

---

*I would appreciate any advice and recommendations for improving these aspects of the project!*
