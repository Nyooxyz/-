<template>
  <div id="app">
	<Header />
    <router-view></router-view>
	<Footer />
  </div>
</template>

<script>

import Footer from './components/AppFooter.vue';
import Header from './components/AppHeader.vue';

export default {
  name: 'App',
  components: {
	Header,
	Footer
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
	background: linear-gradient(to left, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%);
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
	opacity: 0.5;
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
	opacity: 0.5;
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
