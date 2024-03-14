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
        <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row-container" :class="{ 'shake-no': 揺れる(rowIndex) }">
          <div v-for="(cell, cellIndex) in row" :key="cellIndex" :class="['cell', cell.bgColor]">
            <div v-if="cell" class="cell-inner" :class="cell.bgColor"> 
              <div :class="['char', cell.bgColor]">{{ cell.value }}</div> 
            </div>
          </div>
        </div>
      </div>

    <div class="legend-table">
      <div class="legend-table__wrapper">
        <span class="legend-table__marker green">正</span><span class="legend-table__text">Right character</span>
        <span class="legend-table__marker red">不</span><span class="legend-table__text">Wrong character</span>
        <span class="legend-table__marker orange">近</span><span class="legend-table__text">Character is at the wrong spot</span>
      </div>
    </div>
    
      <input v-model="userInput" @input="handleInput" @keydown.backspace="eraseInput" @keyup.enter="checkGuess" ref="inputField" maxlength="5" :disabled="gameOver" class="theField" autofocus>
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
        <p>次の言葉</p>
        <div id="countdown">{{ countdownTimer }}</div>
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
        autofocus: true,
        countdownTimer: "",
        指数: null // shakey
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
            row.push({ value: "", bgColor: "def" });
          }
          this.grid.push(row);
        }
      },
      handleInputBlur() {
        // Refocus the input field if it loses focus
        this.$refs.inputField.focus();
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

        if(guess.length != this.word.length){
          this.result = 'Word too short!'
          this.wrongInputAnim(this.cursor.row)
          return
        }

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
    },
    // -- Answers Animations -- //
    wrongInputAnim(index) {
      this.指数 = index
      console.log(this.指数)
      setTimeout(() => {
        this.指数 = null;
      }, 300);
    },
    揺れる(index){
      return index === this.指数;
    }
    
  }
}

/* eslint-disable */
  </script>
  
  <style scoped lang="scss">

  @import '@/assets/scss/styles.scss';




  



  </style>
  