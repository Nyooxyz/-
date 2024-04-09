<template>
  <div id="app">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<Header />
    <router-view></router-view>
  </div>
</template>

<script>

import Header from '@/components/AppHeader.vue';

export default {
  name: 'App',
  components: {
	Header
  }
}
</script>

<style>

html {
	background-color: #000;
	min-height: 100%;
	/* font-family: "Paragraph", sans-serif; */
	max-width: 100%;
	overflow-x: hidden;
  overflow-y: hidden;
	
}

html::-webkit-scrollbar {
    width: 0.5em;
}

#app {
  min-height: 100%;
  background: #000;
}

#app::before {
  content: "";
	position: fixed;
	left: 0;
	top: 0;
	width: 16px;
	height: 100%;
	background: linear-gradient(to right, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%);
	z-index: 1000;
}

#app::after {
  content: "";
	position: fixed;
	right: 0;
	top: 0;
	width: 16px;
	height: 100%;
	z-index: 1000;

}


/* Scanlines */

html:not(.no-scanlines):not(.force-no-scanlines) #app::before {
	content: "";
	display: block;
	position: fixed;
	left: 0;
	top: 0;
	width: calc(100% + 32px);
	height: calc(100% + 32px);
	background-image: url("assets/scanlines.png");
	background-position: 0 0;
	background-repeat: repeat;
	z-index: 10000000;
	animation: ScanlineAnimationLeft 2s linear infinite;
	pointer-events: none;
	opacity: 0.4;
}

html:not(.no-scanlines):not(.force-no-scanlines) #app::after {
	content: "";
	display: block;
	position: fixed;
	left: -32px;
	top: 0;
	width: calc(100% + 32px);
	height: calc(100% + 32px);
	background-image: url("assets/scanlines.png");
	background-position: 0 0;
	background-repeat: repeat;
	z-index: 10000000;
	animation: ScanlineAnimationRight 0.4s linear infinite;
	pointer-events: none;
	opacity: 0.4;
}

@keyframes ScanlineAnimationLeft {
	0% {
		transform: translateX(0px) translateY(0px);
	}
	100% {
		transform: translateX(-32px) translateY(-32px);
	}
}

@keyframes ScanlineAnimationRight {
	0% {
		transform: translateX(0px) translateY(0px);
	}
	100% {
		transform: translateX(32px) translateY(-32px);
	}
}

@font-face {
  font-family: "yasashisa";
  src: url("assets/fonts/YasashisaGothicBold-V2.otf");
}
@font-face {
  font-family: "zero";
  src: url("assets/fonts/ZeroGothic.otf");
}
@font-face {
  font-family: "CNT";
  src: url("assets/fonts/Square.ttf");
}
@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
.red {
  background: linear-gradient(to bottom right, #ff616d 0%, #ffc171 100%);
}
.red .char {
  background: -webkit-linear-gradient(#ff616d, #ffc171);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.green {
  background: linear-gradient(to bottom right, #58ac30 0%, #a7df62 100%);
}
.green .char {
  background: -webkit-linear-gradient(#58ac30, #a7df62);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "yasashisa";
}

.orange {
  background: linear-gradient(to bottom right, #f3f9a6 0%, #cbc634 100%);
}
.orange .char {
  background: -webkit-linear-gradient(#f3f9a6, #cbc634);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "yasashisa";
}

.def {
  background: linear-gradient(to bottom right, #37cfdc 0%, #5a88e5 100%);
}
.def .char {
  background: -webkit-linear-gradient(#37cfdc, #5a88e5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.grid-container {
  margin: 0 auto;
}

@media only screen and (max-width: 878px) {
  .grid-container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    flex-wrap: wrap;
  }
  .grid-container .row-container {
    flex-direction: column;
  }
}
.row-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;
}

.cell {
  position: relative;
  padding: 4px;
  z-index: 1;
  width: 75px;
  max-width: 100px;
  height: 65px;
  cursor: default;
  transition: all 0.3s ease;
}
.cell .cell-inner {
  background: #202e38;
  padding: 10px 15px;
  width: calc(100% - 30px);
  height: calc(100% - 20px);
  transition: inherit;
}
.cell .char {
  font-family: yasashisa;
  font-size: 1.8em;
  transition: 0.8s ease 600ms;
}
.cell:hover {
  transform: scale(1.12);
  z-index: 10;
}
.cell:hover .cell-inner {
  background: transparent;
}
.cell:hover .char {
  -webkit-text-fill-color: #222;
}

/* help */
@media only screen and (max-width: 878px) {
  .cell {
    width: 50px;
    height: 50px;
  }
  .cell .char {
    font-size: 1.3em;
  }
}
.legend-table {
  padding: 15px;
  text-align: center;
  font-size: 15px;
  margin: 2em auto 0;
}
.legend-table__marker {
  width: 25px;
  height: 25px;
  margin: 5px 5px 10px;
  display: inline-block;
  vertical-align: middle;
  box-shadow: 0.5px 1px rgba(0, 0, 0, 0.15);
}
.legend-table__text {
  display: inline-block;
  vertical-align: middle;
  margin: 0 25px 5px 5px;
  background: -webkit-linear-gradient(#ccc, #eee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.color-box-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.colorGrid {
  display: inline-flex;
  flex-direction: row;
}

.colorGrid-inner {
  width: 25px;
  height: 25px;
  margin: 5px 5px 10px;
}

.theField {
  font-size: 2.2em;
  background-color: #000;
  border: 1px solid rgb(0, 255, 255);
  color: rgb(255, 255, 255);
  letter-spacing: 6px;
  text-align: center;
  outline: none;
  margin-bottom: 5%;
  max-width: 98%;
}
.theField:focus {
  transition: 0.3s;
  box-shadow: inset 0px 8px 64px rgba(0, 255, 255, 0.2);
}

.shake-no {
  animation: shake 0.2s linear infinite;
}

#countdown {
  font-family: CNT;
  text-align: center;
  font-size: 2em;
  color: #37cfdc;
  text-shadow: 0px 1vh rgba(0, 255, 255, 0.2), 0px 1vh 5vh rgba(0, 247, 255, 0.2);
  mix-blend-mode: lighten;
}

.ui-container {
  border: 1px solid #00eeff;
  margin: 2% 20% 10% 20%;
  box-shadow: 0px 1vh 5vh rgba(0, 247, 255, 0.2);
  background: linear-gradient(135deg, hsla(234, 100%, 13%, 0.2), hsla(200, 57%, 9%, 0.2));
}

@media only screen and (max-width: 878px) {
  .ui-container {
    margin: 2% 10% 10% 10%;
  }
}
@media only screen and (max-width: 480px) {
  .ui-container {
    margin: 1% 1% 10% 1%;
  }
}
.card-container {
  font-size: 1.5em;
  color: white;
  font-family: "yasashisa";
  width: 50%;
  margin: 0 auto;
  border: 1px solid #00eeff;
  padding: 10px 15px 20px 15px;
  box-shadow: 0px 0.5vh rgba(0, 255, 255, 0.2), 0px 1vh 5vh rgba(0, 247, 255, 0.2);
}

.hints {
  display: flex;
  gap: 50px;
  justify-content: center;
}

#hints__kanj__hidden {
  border: 2px solid;
  line-height: 1;
  color: #ef6eae;
}
#hints__kanj__hidden:hover, #hints__kanj__hidden:focus {
  animation: pulse 1s;
  box-shadow: 0 0 0 2em transparent;
}

#hints__kanj {
  color: #00eeff;
  font-size: 1.5em;
}

#hints__kana {
  border: 2px solid;
  line-height: 1;
  color: #e4cb58;
}
#hints__kana:hover, #hints__kana:focus {
  box-shadow: 0 0.5em 0.5em -0.4em white;
  transform: translateY(-0.25em);
}

#hints__kana,
#hints__kanj__hidden {
  transition: 0.25s;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 5px;
}
#hints__kana:hover, #hints__kana:focus,
#hints__kanj__hidden:hover,
#hints__kanj__hidden:focus {
  color: white;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 #ef6eae;
  }
}
.flip {
  animation: weee 0.5s ease-in-out;
}

@keyframes weee {
  0% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
.loader {
  display: inline-grid;
  color: white;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 2222;
  font-size: 25px;
}

.loader:before,
.loader:after {
  content: "⛩";
  grid-area: 1/1;
}

.loader:after {
  animation: l10 1s infinite;
}

@keyframes l10 {
  to {
    transform: scale(1.8);
    opacity: 0;
  }
}
.show-row .cell-inner {
  cursor: pointer;
  background: linear-gradient(to bottom right, #c896fe 0%, #eb7b9c 100%);
}
.show-row .cell-inner .char {
  background: -webkit-linear-gradient(#c896fe, #eb7b9c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}





</style>
