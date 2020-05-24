<template>
    <div class="base-component" :style="'height:'+(size*1.2)+'px; max-width:'+(size*1.2)+'px'">
        <div class="circle-border" :style="borderStyle">
            <div class="shadow-circle" :style="baseStyle"></div>
            <div class="base-circle" :style="baseStyle">
                <div id="active-half-1"  :style="baseHold" ><div :style="basePie1" ></div></div>
                <div id="active-half-2" v-if="perc > 50" :style="baseHold2" ><div :style="basePie2" ></div></div>
                <div class="info-circle">
                    <div class="info-text">
                        <div class="value">
                            {{value}}
                        </div>
                        <div class="perc" :style="'color:'+color">
                            {{perc}}%
                        </div>
                    </div>
                </div>

            </div>
        </div>
       
    </div>
</template>

<script>
export default {
    name: 'ml-chart-circle',
    props: {
        value: {
            type: Number,
            default: 30
        },
        perc: {
            type: Number,
            default: 42
        },
        text: {
            type: String,
            default: 'Testing chart'
        },
        size: {
            type: Number,
            default: 150
        },
        color: {
            type: String,
            default: '#1aff1a'
        }
    },
    data() {
        return {}
    },
    computed: {
       
        
        baseStyle: function() {
            let styleB = {
                height: `${this.size}px`,
                width: `${this.size}px`,
            }

            return styleB
        },

        borderStyle: function(){
            let border = {
               
                height: `${this.size*1.05}px`,
                width: `${this.size*1.05}px`,
                
            }

            return border
        },

        baseHold: function(){
            let hold = {
                position: 'absolute',
                height: `${this.size}px`,
                width: `${this.size}px`,
                clip: `rect(0px, ${this.size}px, ${this.size}px, ${this.size/2}px)`
            }

            return hold
        },
        baseHold2: function(){
            let hold = {
                position: 'absolute',
                height: `${this.size}px`,
                width: `${this.size}px`,
                clip: `rect(0px, ${this.size}px, ${this.size}px, ${(this.size/2)-1}px)`
            }

            return hold
        },

        basePie1: function(){
            let rectRight = Math.ceil(this.size/2)
            // 50 -> 180
            // 30 -> x
            // 50x = 30*180 :: x = (30*180) / 50 :: x = (perc*180) / 50
            let degrees = 180
            if (this.perc < 50) {
                degrees = Math.ceil((this.perc*180) / 50)
            }
            let pie = {
                transition: 'all 1s',
                position: 'absolute',
                height: `${this.size}px`,
                width: `${this.size}px`,
                backgroundColor: this.color,
                transform: `rotate(${degrees}deg)`,
                clip: `rect(0px, ${rectRight}px, ${this.size}px, 0px)`,
            }

            return pie
        },

        basePie2: function(){
            let rectRight = Math.ceil(this.size/2) + 10
            // 50 -> 180
            // 30 -> x
            // 50x = 30*180 :: x = (30*180) / 50 :: x = (perc*180) / 50
            let degrees = 0
            if (this.perc > 50) {
                if (this.perc <= 100) {
                    
                    degrees = Math.ceil(((this.perc-50)*180) / 50)
                    this.perc >= 97 ? degrees -= 4 : null

                } else {
                    degrees = 180
                }
                
            }
            let pie = {
                transition: 'all 1s',
                position: 'absolute',
                height: `${this.size}px`,
                width: `${this.size}px`,
                backgroundColor: this.color,
                transform: `rotate(${degrees}deg)`,
                clip: `rect(0px, ${rectRight}px, ${this.size}px, 0px)`,
                
            }

            return pie
        },

        

    }

}
</script>

<style>



.base-component{
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    margin: 0;
    box-sizing: border-box;
    
}

.circle-border{
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    border-radius: 100%;
    background-color: #EFF5F6;
    overflow: hidden;
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25) ,  1px 1px 4px rgba(0, 0, 0, 0.2);
    
}


.shadow-circle {

    position: absolute;
    display: block;
    border-radius: 100%;
    background-color: transparent;
    overflow: hidden;
    box-shadow: inset 4px 4px 20px rgba(0, 0, 0, 0.1);
    
    /* box-shadow: 4px 4px 10px rgba(0,0,0,0.25) */
}

.base-circle {
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    border-radius: 100%;
    background-color: #EFF5F6;
    overflow: hidden;
    box-shadow: inset 4px 4px 20px rgba(0, 0, 0, 0.25);
    
    /* box-shadow: 4px 4px 10px rgba(0,0,0,0.25) */
}


#active-half-1 {
    transform: rotate(0deg);
    
}
#active-half-2 {
    transform: rotate(180deg);
    /* box-shadow: 1px 1px 20px rgba(255, 0, 184, 0.4), inset 4px 4px 20px rgba(0, 0, 0, 0.25); */
    /* box-shadow: 1px 1px 20px rgba(255, 0, 184, 0.4); */
    
}


.info-circle {
    
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 70%;
    height: 70%;
    background-color: #ffffff;
    border-radius: 100%;
    box-shadow: 6px 6px 20px rgba(0, 0, 0, 0.35), inset 2px 2px 2px #FFFFFF, inset 6px 6px 30px rgba(0, 0, 0, 0.15), inset -1px -1px 2px rgba(0, 0, 0, 0.3), inset -2px -2px 20px #ffffff;
    /* box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25), inset 6px 6px 20px rgba(0, 0, 0, 0.1), inset 1px 1px 2px #FFFFFF; */
    
}

.info-text{
    color: #5F758F;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
}

.value{
    font-size: 2rem;
    font-weight: 900;
}

.perc{
    font-size: 0.650rem;
    font-weight: 700;
}
</style>