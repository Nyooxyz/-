<template>

  <div class="jellyfish">
    <div id="title">
      <span style="color: #c4a747;">KANJI</span> <span style="color: #bbb9c3;">GALAXY</span>
    </div>
    <div class="settings-panel">

    </div>

    <div class="main">
      
    </div>
  </div>
 
</template>


<style>



@font-face {
	font-family: "yasashisa";
	src: url("../assets/fonts/YasashisaGothicBold-V2.otf");
}

.jellyfish {
  width: 60%;
  height: 70%;
  margin: 0 auto;
  margin-top: 5%;
  

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 10% 90%;
  border: 2px solid yellow;

  
}

.settings-panel{
  grid-row: 1;
  border: 2px solid green;

}

.main {
  border: 2px solid blue;
  width: 100%;
  grid-column: 1 / span 2; 
  grid-row: 2; 
}

#title {
  grid-row: 1; 
  font-size: 2em;
  font-family: yasashisa;          
  font-weight: 300;
  
  margin-left: 20%;
}

</style>