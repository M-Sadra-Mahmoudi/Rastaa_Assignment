function handleSubmit() {
    const inputTable = document.getElementById("inputTable");
    const rows = inputTable.getElementsByTagName("tr");
    const inputArray = [];
    const validRange = { min: 1, max: 10 };

    // Check and validate input values
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        for (let j = 0; j < cells.length; j++) {
        const input = cells[j].querySelector("input");
        const value = parseInt(input.value);
        if (isNaN(value) || value < validRange.min || value > validRange.max) {
            alert("Invalid input. Numbers should be integers from 1 to 10.");
            return;
        }
        }
    }
    
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const rowArray = [];
      
      for (let j = 0; j < cells.length; j++) {
        const inputValue = parseFloat(cells[j].querySelector("input").value);
        rowArray.push(inputValue);
      }
      
      inputArray.push(rowArray);
    }
    
    // Call function f with the inputArray and get the result
    const result = f(inputArray);
  
    // Update the table cells with green background color based on the result
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      
      for (let j = 0; j < cells.length; j++) {
        if (result.some(tuple => tuple[0] === i - 1 && tuple[1] === j)) {
          cells[j].classList.add("green");
        }
      }
    }
  }
  function clearTable() {
    const inputTable = document.getElementById("inputTable");
    const rows = inputTable.getElementsByTagName("tr");
  
    // Clear input values and remove green color class
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
  
      for (let j = 0; j < cells.length; j++) {
        const input = cells[j].querySelector("input");
        input.value = "";
        cells[j].classList.remove("green");
      }
    }
  
    // Clear the inputArray
    inputArray = [];
  } 
  // Example function f - Replace this with your actual function implementation



  
function generatePermutations(n) {
    const result = [];
    const nums = Array.from({ length: n }, (_, i) => i + 1);
    
    function swap(i, j) {
      const temp = nums[i];
      nums[i] = nums[j];
      nums[j] = temp;
    }
  
    function permute(start) {
      if (start === n - 1) {
        result.push([...nums]);
        return;
      }
  
      for (let i = start; i < n; i++) {
        swap(start, i);
        permute(start + 1);
        swap(start, i);
      }
    }
  
    permute(0);
    return result;
  }

  function f(inputArray) {
    const n = inputArray.length;
    let permutations = generatePermutations(n);
    let best_answer = permutations[0];
  
    function getTotalInterest(assignment) {
      let totalInterest = 0;
      for (let i = 0; i < n; i++) {
        totalInterest += inputArray[i][assignment[i] - 1];
      }
      return totalInterest;
    }
    let best_answer_value = getTotalInterest(best_answer);
  
    for (let i = 1; i < permutations.length; i++) { // Fixed the typo here
      let p = permutations[i];
      let pv = getTotalInterest(p);
      if (pv > best_answer_value) {
        best_answer_value = pv;
        best_answer = p;
      }
    }
  
    let output = [];
    for (let i = 0; i < n; i++) {
      output.push([i, best_answer[i] - 1]);
    }
  
    return output;
  }