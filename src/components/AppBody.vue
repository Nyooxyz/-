<template>
    <!--⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣷⣶⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀
⠀⣿⣿⣿⣿⣿⣿⣧⡀⠤⠤⣤⣤⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⠀⠀
⠀⣿⣿⣿⣿⣿⣿⣿⣇⠀⣦⣤⣤⣄⣈⡉⠉⠛⠛⠷⢶⠄⢠⣴⣦⡀⠀⠀⠀⠀
⠀⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠉⠉⠛⠛⠷⣦⣀⠀⠀⢻νύξ⣿⡀⠀⠀⠀
⠀⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣹⡆⠀⠀⠈⠉⠘⡇⠀⠀⠀
⠀⣿⣿⣿⣿⣿⣿⡟⠁⠀⠀⢀⠀⢀⣀⣠⣤⡴⠾⠋⠁⠀⠀⢀⣠⡾⠃⠀⠀⠀
⠀⣿⣿⣿⣿⣿⣿⠶⠶⠶⠀⠿⠃⠘⠉⠉⠀⠀⢀⣀⣤⣵⠾⠛⠉⠀⠀⠀⠀⠀
⠀⣿⣿⣟⣉⣀⣀⣀⣀⣠⣤⣤⣤⣴⡶⠶⠿⠛⠛⠉⠁⠄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠛⠛⠋⠉⠉⠉⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠄⠀⠀⠀⠀

tottemo 39
-->
  <div class="jellyfish">
    <div class="title">
      <div class="title__text"><span class="kanji">KANJI <span class="漢字">漢字</span></span><span class="galaxy">GALA</span><span class="x">X</span><span class="galaxy">Y</span> <span class="銀河">銀河</span></div>
    </div>
    <div class="marquee">
      <div id="colorlay"></div>
      <div>
        <div>お前に向けて言う、頑張る！生きる！生きるだけでいい！生きるだけでいいのに仕事までしてるなんて偉い！素晴らしい</div>
        <div>お前に向けて言う、頑張る！生きる！生きるだけでいい！生きるだけでいいのに仕事までしてるなんて偉い！素晴らしい</div>
      </div>

      <div>
        <div>お前に向けて言う、頑張る！生きる！生きるだけでいい！生きるだけでいいのに仕事までしてるなんて偉い！素晴らしい</div>
        <div>お前に向けて言う、頑張る！生きる！生きるだけでいい！生きるだけでいいのに仕事までしてるなんて偉い！素晴らしい</div>
      </div>
    </div>
    <div class="main">
      <slot></slot>

    </div>
    <div class="foot__left">
      <h2>Kanji Galaxy 2024</h2>
      <p>This app is to make learning japanese easier <br>
      The goal is to memorise japanese words with the help of spaced repetition <br>
      It is achieved with the help of a video game like user interface and a progress tracking system in a "collection" achievement form <br> 
      It is as much as a japanese learning tool as a web app developpement practice tool for me <br>
      Hope some people find it as useful as I do <br>
      I did my very best 
      </p>
    </div>
    <div class="foot__right">
      <div class="svg-container">
        <a href="https://github.com/Nyooxyz"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"/></svg></a></div>
      <div class="svg-container">
        <a href="https://twitter.com/0x6E796F"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"/></svg></a></div>
      <div class="svg-container">
        <a href="https://www.twitch.tv/nyoosh_"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 5.3125 1 L 2 9.8125 L 2 43 L 13 43 L 13 49 L 20.40625 49 L 26.40625 43 L 35.40625 43 L 48 30.4375 L 48 1 Z M 11 6 L 43 6 L 43 28 L 37 34 L 25 34 L 19 40 L 19 34 L 11 34 Z M 20 13 L 20 27 L 26 27 L 26 13 Z M 30 13 L 30 27 L 36 27 L 36 13 Z"/></svg></a></div>
    </div>
  </div>
  <div id="colorlay"></div>
</template>


<style>

:root {
  --marquee-speed: 40s;
  --marquee-hover-offset: -50px;
  --marquee-hover-transition-speed: 0.7s;
  --marquee-fade-edges: 30%;
}

@font-face {
	font-family: "yasashisa";
	src: url("../assets/fonts/YasashisaGothicBold-V2.otf");
}

@font-face {
	font-family: "square";
	src: url("../assets/fonts/Square.ttf");
}

@font-face {
	font-family: "bison";
	src: url("../assets/fonts/Bison.ttf");
}

@font-face {
	font-family: "exo";
	src: url("../assets/fonts/Exo2-Bold.otf");
}

@font-face {
	font-family: "space";
	src: url("../assets/fonts/Space Angel.ttf");
}

@keyframes animate-marquee {
  0% {
    transform: translateX(0%) translateZ(0);
  }
    100% {
      transform: translateX(-100%) translateZ(0);
  }
}

@keyframes scrole {
  0% {
    transform: translateX(0);
  }
  100% {
      transform: translateX(-50%);
  }
}

.jellyfish {
  width: 60%;
  height: 100%;
  margin: 0 auto;
  margin-top: 5%;
  

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 5% 65% 30%;

  
}

.marquee {
  overflow: hidden;
  mask-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, #000 var(--marquee-fade-edges), #000 calc(100% - var(--marquee-fade-edges)), rgba(0, 0, 0, 0) 100%);
}


.marquee, .marquee > div {
  display: flex;
  white-space: nowrap;
  gap: 30px;
  line-height: 5vh;
  text-transform: uppercase;
  font-weight: 800;
  color: #000;
  font-size: 1.5rem;
}

.marquee > div {
  animation: animate-marquee var(--marquee-speed) infinite linear;
  transition: var(--marquee-hover-transition-speed) margin-left ease-out;
  will-change: transform, margin-left;
}

.marquee:hover > div {
  animation-play-state: paused;
  margin-left: var(--marquee-hover-offset);
}


.main {
  border: 0.2vw solid #FFF;
  box-shadow: rgba(255, 255, 255, 0.45) 0px 25px 20px -20px;  
  grid-column: 1 / span 2; 
  grid-row: 2; 
  mask-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, #000 20%, #000 calc(100% - 20%), rgba(0, 0, 0, 0) 100%);
  overflow: hidden;
  z-index: 20;
  position: relative;
}

.title {
  grid-row: 1; 
  margin-left: 30%;
  position: relative;
  
}

.title__text {
  font-size: 2.38vw;     
  font-weight:lighter;
  font-style: italic;
  position: absolute;
  bottom: 0;  
}

.kanji {
  color: #fff;
  font-family: exo; 
  position: relative;
  z-index: 20;
  margin-right: 0.5vw;
  text-shadow: 0px 0px 8px #FFF;
}

.galaxy {
  color: #fff;
  z-index: 20; 
  font-family: exo;  
  position: relative;
  text-shadow: 0px 0px 8px #FFF;
  
}

.漢字 {
  font-family: yasashisa;
  position:absolute;
  bottom:1vh;
  right:-1.5vw;
  z-index: 222;
  pointer-events: none;
  color: rgba(255, 255, 255, 0.15);
  text-shadow: none;
  user-select: none; 
}

.銀河 {
  font-family: yasashisa;
  position:absolute;
  bottom:1vh;
  right: -1.5vw;
  z-index: 22;
  color: rgba(255, 255, 255, 0.15);
  text-shadow: none;
  user-select: none; 
}

.x {
  font-family: space;
  color: #fff;
  font-size: 2.38vw;  
  position: relative;
  text-shadow: 0px 0px 8px #FFF;
}


.foot__left, .foot__right {
  color: #ffffffbb;
  z-index: 22; 
  display: inline-flex;
  gap: 1vw;
  opacity: 0.2;
  transition: 1s opacity ease-out;
}

.foot__left:hover, .foot__right:hover {
  opacity: 1;
}

.foot__right {
  grid-row: 3;
  grid-column: 2;
  font-size: 1.22vw;  
  margin: auto 0;
  display: inline-flex;
  flex-flow: row-reverse;
}

.foot__left {
  font-family: square;
  font-size: 0.65vw;  
  margin: 2vw 0;
  grid-column: 1;
  grid-row: 3;
}

.foot__left h2{
  text-align: center;
}

.svg-container {
  height: 3.5vh;
  width: 3.5vw;
  position: relative;
}

.svg-container svg{
  position: absolute;
  width: 100%;
  height: 100%;
  fill: #fff;
}


#colorlay {
  position: fixed;
  left: 0;
  top: 0;
  right: -600%;
  bottom: 0;
  z-index: 10;
  background: linear-gradient(to right, #00DEFF 0%, #00FF72 20%, #0066FF 40%, #00FFF6 60%, #3000FF 80%, #00DEFF 100%);
  background-size: 50% 100%;
  mix-blend-mode: multiply;
  pointer-events: none;
  transform: translateX(0);
  animation: 10s scrole linear infinite;
}



</style>