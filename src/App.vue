<template>
  <div id="app">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<Header />
    <router-view></router-view>
  </div>
</template>

<script>

import Header from './components/AppHeader.vue';

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
	
}

html::-webkit-scrollbar {
    width: 0.5em;
}

#app {
  min-height: 100%;
  text-align: center;
  background: linear-gradient(135deg, hsl(230, 40%, 12%), hsl(230, 20%, 7%));
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


</style>
