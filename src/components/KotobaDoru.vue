<template>
    <!-- Display game content here -->
    <div v-if="!gameOver" class="ui-container">
      <div class="grid-container">
        <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row-container" :class="{ 'shake-no': 揺れる(rowIndex), 'show-row':Kな暗示Toggle(rowIndex) }"> 
          <div v-for="(cell, cellIndex) in row" :key="cellIndex" :class="['cell', cell.bgColor, { 'flip': cell.flip }]" @click="kanaHint(rowIndex, cellIndex)">
            <div v-if="cell" class="cell-inner" :class="[cell.bgColor]"> 
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
    <div class="hints">
      <span v-if="K暗示" id="hints__kanj__hidden" @click="toggleKanji()">
        Show kanji
      </span>
      <span v-if="K暗示tog" id="hints__kanj">
        {{ 漢字no送 }}
      </span>
      <span v-if="Kな暗示" id="hints__kana" @click="toggleHintKana">
        Kana hint
      </span>
    </div>
    <input v-model="userInput" @input="handleInput" @keydown.backspace="eraseInput" @keyup.enter="checkGuess" ref="inputField" maxlength="5" :disabled="gameOver" class="theField" autofocus>
      
    </div>
    <div v-else>
      <div class="card-container">
        
          <p>{{ 言葉 }}</p>
          <p>{{ 漢字 }}</p>
          <p>{{ gloss }}</p>
        

        <hr style="border-top: 1px solid white;">

        <p>{{ colorArr.length }} 回</p>
        <div class="color-box-container">
          <div v-for="(colorRow, index) in colorArr" :key="index" class="colorGrid">
            <div v-for="(color, colorIndex) in colorRow" :key="colorIndex" :class="['colorGrid-inner', color]"></div>
          </div>
        </div>

         <hr style="border-top: 1px solid white;">

        <p>次の言葉</p>
        <div id="countdown">{{ countdownTimer }}</div>

      </div>
    </div>

    <div v-if="isEepy" class="loader">loading...</div> 
     
  </template>
  
  

  <script>
  // ! TODO ! //

  /* 


    - CODE THE HEADER AND OPT. THE FOOTER

    - CONNECT FOOTER AND HEADER

    - MAKE STYLE RESPONSIVE

    - MAP INIT TO DAILY TIMER : 00:00:00

    - REFRACTOR 

    - REMOVE DEBUG LOGS
  
  
  */

  import * as wanakana from 'wanakana';
  import JMdict from '@/../public/jmdict-eng-common-3.5.0.json'; // 15.2MB
  import DataService from '@/../services/DataService.js';

  export default {
    name: "KotobaDoru",
    data() {
      return {
        isEepy: false, // loading the dic
        辞書: null, // big dic
        始: 0,
        最後: 100, // initial chonk size
        言葉: "", // Word (kana)
        漢字: "", // Word (kanji)
        漢字no送: "", // Word (kanji) without okurigana
        gloss: "", // Word english translation
        grid: [], // Grid matrice
        cursor: { row: 0, col: 0 }, // Current position inside grid
        userInput: "", // Input inside field
        inputBuffer: "", // buff for input
        colorArr: [], // Guess row result to color arr
        gameOver: false, // Game is over
        correct: null, // User found word 💮
        hit: 0, // Enter key hit
        autofocus: true, // On input field
        countdownTimer: "", // Next word countdown (CET)
        指数: null, // shakey
        K暗示: false, // Kanji hint show
        K暗示tog: false, // Kanji hint toggle
        Kな暗示: 0, // Kana hint count
        CanKな暗示: false,
        RowKな暗示: null // Kana hint row
      };
    },
    mounted() {
      this.loadDic();      
      this.init言葉();
      this.initializeGrid();
      this.startCountdown();
    },
    methods: {
      async loadDic() {
        try {
          this.isEepy = true;
          // Load the big chonky boi
          this.辞書 = await DataService.loadJsonDataLazy('/jmdict-all.json', this.始, this.最後);
          this.isEepy = false;
          console.log("big chonk loaded");
        } catch (error) {
          console.error('x_x : ', error);
          this.isEepy = false;
        }
      },
      init言葉() {

        const startTime = new Date();

    
         // Select entries with non-empty "text" field inside "kanji" or empty "kanji" if "text" is absent
        let randomEntry = JMdict.words[Math.floor(Math.random() * JMdict.words.length)];

        // 🚫 NO 🚫 カタカナ 🚫 NO 🚫 SHORTIES 🚫
        while (wanakana.isKatakana(randomEntry.kana[0].text) || randomEntry.kana[0].text.length <= 3 || randomEntry.kana[0].text.length > 6){
          randomEntry = JMdict.words[Math.floor(Math.random() * JMdict.words.length)];
        }

        const kanaContent = randomEntry.kana[0].text;
        const glossContent = randomEntry.sense[0].gloss.map(gloss => gloss.text).join(', ');

        // Check if no 😔 漢字 😔 before extracting content
        let kanjiContent = '';
        if (randomEntry.kanji.length > 0) {
          kanjiContent = randomEntry.kanji[0].text
        }

        // 👍👍👍
        console.log('kana: ', kanaContent);
        console.log('gloss: ', glossContent);
        console.log('kanji: ', kanjiContent);

        this.言葉 = kanaContent
        this.gloss = glossContent
        this.漢字 = kanjiContent
        this.漢字no送 = wanakana.stripOkurigana(kanjiContent)

        const endTime = new Date();
        const elapsedTime = endTime - startTime; // Time in milliseconds

        console.log(`Init done in ${elapsedTime} milliseconds.`);

      },
      initializeGrid() {
        for (let i = 0; i < 5; i++) {
          let row = [];
          for (let j = 0; j < this.言葉.length; j++) {
            row.push({ value: "", bgColor: "def" });
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
      checkWordExist(word) {
        const startTime = new Date();

        for (const wordEntry of this.辞書.words) {
          if (wordEntry.kana[0].text === word){
            const endTime = new Date();
            const elapsedTime = endTime - startTime; // Time in milliseconds

            console.log(`Search completed in ${elapsedTime} milliseconds.`);
            return true
          }
        }

        const endTime = new Date();
        const elapsedTime = endTime - startTime; // Time in milliseconds

        console.log(`Search completed in ${elapsedTime} milliseconds.`);
        return false
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
          if (this.cursor.col < this.言葉.length - 1) { // Move the cursor to the next cell
            this.cursor.col++;

            if(this.inputBuffer.length == 2){ // e.g  "じょ"
              this.grid[this.cursor.row][this.cursor.col].value = this.inputBuffer[1];
              if (this.cursor.col < this.言葉.length - 1) { // Move the cursor to the next cell
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
            case this.言葉.length - 1:
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
      toggleKanji(){
          this.K暗示 = false
          this.K暗示tog = true

      },
      toggleHintKana() {
        if (this.Kな暗示) {
          this.Kな暗示--
          this.RowKな暗示 = this.cursor.row
          this.CanKな暗示 = true
        }
      },
      checkGuess() {
        const guess = this.grid[this.cursor.row].map(cell => cell.value).join('');

        if(guess.length != this.言葉.length || !this.checkWordExist(guess)){
          this.hit++
          switch(this.hit){
            case 50:
              alert("you dont know a lot of words do you...")
              break
            case 100:
              alert("you can pick up a dictionary at this point I think It might be better")
              break
            case 150:
              alert("now you're just doing it on purpose to see what the next prompt is gonna be")
              break
            case 300:
              alert("come on faster")
              break
            case 500:
              alert("half a thousand congrats")
              break
            case 1000:
              alert("how are you able to read this while spamming enter")
              break
            case 1500: 
              alert("you are just reading this through the source there's no way you hit that enter key this much")
              break
            case 5000:
              alert("are you ok")
              break
            case 10000:
              alert("please stop")
              break
          }
      
          this.wrongInputAnim(this.cursor.row)
          return
        }

         // Initialize arrays to hold correctness, correct indices, and orange characters
        let correctness = [];
        let orangeBuff = [];

        // Check each character in the guess against the corresponding character in the word
        for (let i = 0; i < guess.length; i++) {
          if (guess[i] === this.言葉[i]) {
            correctness.push("green");

          } else {
            correctness.push("red");
            orangeBuff.push(i);

            if (orangeBuff.length > 1) {
              for (let j = 0; j < orangeBuff.length; j++){
                if (this.言葉[i] == guess[orangeBuff[j]]) { // If the current correct character was the one stocked in the buff 
                  correctness[orangeBuff[j]] = "orange"; // update the previous character to orange

                  if (this.言葉[orangeBuff[j]] == guess[i]) { // and if the current wrong char and the previous wrong char needs to be swapped
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

          setTimeout(() => {
            cell.flip = true
            
            cell.bgColor = correctness[index]
          }, 500 * index)

        });

        // Check if all characters in the guess are correct
        const allCorrect = correctness.every(correct => correct === "green");

        this.colorArr.push(correctness)

        if (allCorrect) {
          this.correct = true;
          this.gameOver = true;
        
        } else {
          if (this.cursor.row < this.grid.length - 1) {
            this.cursor.row++;
            this.cursor.col = 0;

            switch(this.cursor.row){
              case 2:
                this.K暗示 = true
                break
              case 3: 
                this.Kな暗示++
                break
              default:
                break
            }


    
          } else {
            this.flipAnim(this.cursor.row)
            this.correct = false;
            this.gameOver = true;
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
      
      setTimeout(() => {
        this.指数 = null
      }, 300);
    },
    揺れる(index){
      return index === this.指数
    },
    Kな暗示Toggle(index){
      return index === this.RowKな暗示
    },
    kanaHint(rowIndex, cellIndex) {

      if(this.CanKな暗示){

        if(rowIndex === this.cursor.row){
          this.grid[rowIndex][cellIndex].value = this.言葉[cellIndex];
          this.grid[rowIndex][cellIndex].bgColor = "green";
          this.RowKな暗示 = null
          this.CanKな暗示 = false
        }
      }
    }
    
  }
}

/* eslint-disable */
  </script>
  
  <style scoped lang="scss">

  @import '@/assets/scss/styles.scss';




  



  </style>
  