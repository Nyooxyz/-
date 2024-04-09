<title>存在予想</title>
<template>
    <!--ｚ  
　 z　　　   
　　z  
　＜⌒／ヽ-､_＿_  
／＜_/＿＿＿＿／  
￣￣￣￣￣￣￣νύξ
tottemo 39
-->
    <!-- HOME COMP [flex with 4 boxes cross shaped] -->
    <div class="home"> 
        
        <!-- USER -->
        <div class="user-panel">
            <div v-if="logged" class="user-panel__online">
            </div>

            <div v-else class="user-panel__offline">
            </div>
        </div>

        <!-- DAILIES -->
        <div class="daily-panel">
            <div v-if="logged" class="daily-panel__online">
            </div>

            <div v-else class="daily-panel__offline">
            </div>
        </div>


        <!-- GODLE -->
        <div class="godle-panel">
            <div v-if="doneGodle" class="goddle-panel__done">
            </div>

            <div v-else class="godle-panel__done">
            </div>
        </div>

        <!-- LIBRARY -->

        <div class="library-panel">
            <div class="library-panel__link">
            </div>
        </div>



    </div>
    
</template>

<script>

/*      TODO

STYLE : grey - gold ? cyan - black ?


*/

import axios from 'axios';

export default {
    name: "LeHome",
    data() {
        return {
            word: "",
            doneGodle: null,

        }
    },

    mounted() {
        this.initPage()
    },

    methods: {
        async initPage() {
            try {
                const resp = await axios.get('http://localhost:3000/word')
                this.word = resp.data.word
            } catch (e) {
                console.error('fetching fail : ', e)
            }
        }
    }

}

</script>

<style>
h1 {
    color: white;
}

</style>