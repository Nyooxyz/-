<template>
  <title>言葉ドル</title>
  <header>
    <h1>
      言葉ドル
    </h1>



  </header>
    <!-- Display game content here -->
    <div v-if="!gameOver">
      <div class="grid-container">
        <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="cell-wrapper">
          <div v-if="cell" class="background-cell" :class="cell.bgColor"></div> <!-- Background cell -->
          <div v-for="(cell, cellIndex) in row" :key="cellIndex" :class="['cell', cell.bgColor]" @click="setCursorPosition(rowIndex, cellIndex)">
            <div class="char">{{ cell.value }}</div>
          </div>
          
        </div>
      </div>
    
      <input v-model="userInput" @input="handleInput" @keydown.backspace="eraseInput" @keyup.enter="checkGuess" ref="inputField" maxlength="5" placeholder="Type your guess" autofocus :disabled="gameOver">
      <p v-if="result">{{ result }}</p>
    </div>
    <div v-else>
      <div>
        <p>{{ word }}</p>
        <p>{{ colorArr.length }} 回</p>
        <div class="color-box-container">
          <div v-for="(colorRow, index) in colorArr" :key="index" class="color-row">
            <div v-for="(color, colorIndex) in colorRow" :key="colorIndex" :class="['color-box', color]"></div>
          </div>
        </div>
        <p>次の言葉 (CET): {{ countdownTimer }}</p>
      </div>
    </div>
        <!-- Add any additional content or styling for the end game window here -->
  </template>
  
  <script>
  import * as wanakana from 'wanakana';

  export default {
    name: "KotobaDoru",
    data() {
      return {
        word: "だいじょうぶ",
        grid: [],
        result: "",
        cursor: { row: 0, col: 0 },
        userInput: "",
        inputBuffer: "",
        colorArr: [],
        gameOver: false,
        countdownTimer: ""
      };
    },
    mounted() {
      this.initializeGrid();
      this.startCountdown();
    },
    methods: {
      initializeGrid() {
        for (let i = 0; i < 5; i++) {
          let row = [];
          for (let j = 0; j < this.word.length; j++) {
            row.push({ value: "", bgColor: "" });
          }
          this.grid.push(row);
        }
      },
      handleInput(event) {

          // Get the current value of the input field
        const inputValue = event.target.value;

          // Check if input ends with 'n'
        if (inputValue.endsWith('n')) {
        
          // If the input already ends with 'n', check if the previous character was also 'n'
          const prevChar = inputValue[inputValue.length - 2];
          if (prevChar === 'n') {
            // If the previous character was 'n', replace the last 'n' with ん
            const convertedValue = 'ん';
            this.inputBuffer = convertedValue;
            this.handleFinal();
            return
          } else {
            return
          }
        }
      
        // Otherwise, convert the input to Kana using Wanakana
        const convertedValue = wanakana.toKana(inputValue);
        
        // Update lastInput with the converted value
        this.inputBuffer = convertedValue;

        this.handleFinal()
      },
      handleFinal(){
      // Check if the last character of lastInput is hiragana
        if (wanakana.isHiragana(this.inputBuffer.slice(-1))) {

          if (!(wanakana.isHiragana(this.inputBuffer[0]))){
            // Clear the input buff after updating the grid
            this.inputBuffer = "";
            // Clear the input field after updating the grid
            this.userInput = "";
            return
          }

          this.grid[this.cursor.row][this.cursor.col].value = this.inputBuffer[0];
          if (this.cursor.col < this.word.length - 1) { // Move the cursor to the next cell
            this.cursor.col++;

            if(this.inputBuffer.length == 2){ // e.g  "じょ"
              this.grid[this.cursor.row][this.cursor.col].value = this.inputBuffer[1];
              if (this.cursor.col < this.word.length - 1) { // Move the cursor to the next cell
                this.cursor.col++;
              }
            }
          }   
          // Clear the input buff after updating the grid
          this.inputBuffer = "";
          // Clear the input field after updating the grid
          this.userInput = "";
        }
      },
      setCursorPosition(row, col) {
        this.cursor.row = row;
        this.cursor.col = col;
      },
      eraseInput(event){
        if (!(event.target.value)){
          switch(this.cursor.col){
            case 0:
              break
            case this.word.length - 1:
              if (this.grid[this.cursor.row][this.cursor.col].value){
                  this.grid[this.cursor.row][this.cursor.col].value = '';
                  break
                }
              this.cursor.col--;
              if (this.grid[this.cursor.row][this.cursor.col].value){
                this.grid[this.cursor.row][this.cursor.col].value = '';
              }
              break
            default:
              this.cursor.col--;
              if (this.grid[this.cursor.row][this.cursor.col].value){
                this.grid[this.cursor.row][this.cursor.col].value = '';
              }
          }
        }
      },
      checkGuess() {
        const guess = this.grid[this.cursor.row].map(cell => cell.value).join('');

         // Initialize arrays to hold correctness, correct indices, and orange characters
        let correctness = [];
        let orangeBuff = [];

        // Check each character in the guess against the corresponding character in the word
        for (let i = 0; i < guess.length; i++) {
          if (guess[i] === this.word[i]) {
            correctness.push("green");

          } else {
            correctness.push("red");
            orangeBuff.push(i);

            if (orangeBuff.length > 1) {
              for (let j = 0; j < orangeBuff.length; j++){
                if (this.word[i] == guess[orangeBuff[j]]) { // If the current correct character was the one stocked in the buff 
                  correctness[orangeBuff[j]] = "orange"; // update the previous character to orange

                  if (this.word[orangeBuff[j]] == guess[i]) { // and if the current wrong char and the previous wrong char needs to be swapped
                    correctness[i] = "orange"; // update this one orange aswell 
                  }
                  orangeBuff.splice(j, 1);
                }
              }  
            }
          }
        }

        // Update the bgColor property in the grid based on correctness
        this.grid[this.cursor.row].forEach((cell, index) => {
          cell.bgColor = correctness[index];
        });

        // Check if all characters in the guess are correct
        const allCorrect = correctness.every(correct => correct === "green");

        this.colorArr.push(correctness)

        if (allCorrect) {
          this.result = "Congratulations! You've guessed the word!";
          this.gameOver = true;
        
        } else {
          if (this.cursor.row < this.grid.length - 1) {
            this.result = "Incorrect guess. Try again.";
            this.cursor.row++;
            this.cursor.col = 0;
          } else {
            this.result = "Incorrect guess. Game over";
          }
        }
      },
      startCountdown() {
      const now = new Date();
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, 0, 0 // Set time to midnight
      );
      const timeUntilNextDay = endOfDay.getTime() - now.getTime();

      this.countdownInterval = setInterval(() => {
        const remainingTime = timeUntilNextDay - Date.now() + now.getTime();
        if (remainingTime > 0) {
          const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
          this.countdownTimer = `${hours}時 ${minutes}分 ${seconds}時`;
        } else {
          this.countdownTimer = "00h 00m 00s";
          clearInterval(this.countdownInterval);
        }
      }, 1000);
    }
  }
}
  </script>
  
  <style scoped lang="scss">

  @import '@/assets/scss/styles.scss';

 
  .cell {
    background: #202e38;
		padding: 10px 15px;
		width: calc(100% - 30px);
		height: calc(100% - 20px);
		transition: inherit;
  }

  .char {
    font: 700 34px/1.3 "Poppins", sans-serif;
		margin: 0.3em 0 0;
		transition: 0.8s ease 600ms;
  }

  .grid-container {
    --word-length: calc(string-length(this.word.length));
  }

  .green {
    background-image: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(255,0,10,1) 0%, rgba(36,167,55,1) 0%, rgba(33,33,33,1) 100%);
  }

  .red {
    background-image: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(255,0,10,1) 0%, rgba(167,36,36,1) 0%, rgba(33,33,33,1) 100%);
  }

  .orange {
    background-image: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(255,0,10,1) 0%, rgba(171,103,47,1) 0%, rgba(42,36,36,1) 100%);
  }


  .cell-wrapper {
    position: relative; /* Relative position for absolute positioning of cells */
  }

  .background-cell {
    position: relative;
    padding: 4px;
    z-index: 1;
    cursor: default;
    transition: all 0.3s ease;
    background: linear-gradient(to bottom right, #f3f9a6 0%, #cbc634 100%);
  }

  .background-cell .cell {
    background: #202e38;
    padding: 10px 15px;
    width: calc(100% - 30px);
    height: calc(100% - 20px);
    transition: inherit;
  }

  .background-cell:hover {
    transform: scale(1.12);
    z-index: 10;
  }
  .background-cell:hover .cell {
    background: transparent;
  } 

  .background-cell:hover .char{
	 -webkit-text-fill-color: #222;
  }
  .background-cell:hover:after {
    top: 105%;
	  opacity: 1;
  }
  



  </style>
  