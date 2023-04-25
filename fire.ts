
class Fire {
    private fireWidth: number;
    private fireHeight: number;
    private fireStructure: number[] = [];
    private htmlElement: HTMLElement;
    private debug: boolean;
    private interval?: NodeJS.Timer;
    private readonly colorPallet: Array<{
        r: number;
        g: number;
        b: number;

    }> = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}];
    private wind = 0;

    constructor(width: number, height: number, element: HTMLElement, debug = false){
        this.fireHeight = height;
        this.fireWidth = width
        this.htmlElement = element;
        this.debug = debug;
        this.initializeFireStruct();
        this.render();
    }
    
    private initializeFireStruct(){
        this.fireStructure = new Array<number>(this.fireHeight * this.fireWidth).fill(0);
    }

    public initFire(){
        this.fireBaseSetValue(36);
        this.interval = setInterval(()=>{
            this.calculateFirePropagation();
            this.render();
        }, 100)
    }

    public stopFire(){
        this.fireBaseSetValue(0)
    }

    public changeWind(wind: number){
        this.wind = wind;
    }

    private calculateFirePropagation(){
        for(let row = 0; row < this.fireHeight; row++){
            for(let column = 0; column < this.fireWidth; column++){
                const belowCellIndex = column + this.fireWidth*(row+1);
                const cellIndex = column + this.fireWidth*row;

                if(belowCellIndex >= this.fireHeight * this.fireWidth) return;

                const bellowCellIntensity = this.fireStructure[belowCellIndex];
                const decay = Math.floor(Math.random() * 3);
                const newValue = bellowCellIntensity - decay >= 0 ? bellowCellIntensity - decay : 0;
                this.fireStructure[cellIndex + (decay*this.wind)] = newValue > 0 ? newValue : 0;
            }
        }
    }

    private fireBaseSetValue(baseValue: number){
        for(let column = 0; column < this.fireWidth; column++){
            const cellIndex = column + (this.fireHeight - 1) * this.fireWidth;
            this.fireStructure[cellIndex] = baseValue
        }
    }

    private render(){
        let content = "";

        for(let row = 0; row < this.fireHeight; row++){

            content += `<div class="row">`;

            for(let column = 0; column < this.fireWidth; column++){
                const cellIndex = column + (row*this.fireWidth);
                const cellValue = this.fireStructure[cellIndex];
                if(this.debug){
                    content+=`<div class="debug">`;
                    content+=`<span>${cellIndex}</span>`;
                    content+=cellValue
                } else {
                    content+=`<div class="column" style="background-color: rgb(`;
                    content+=this.colorPallet[cellValue].r + ",";
                    content+=this.colorPallet[cellValue].g + ",";
                    content+=this.colorPallet[cellValue].b + ')"';
                    content+=`>`;
                }
                content+=`</div>`;
            }

            content+= `</div>`;
        }
        this.htmlElement.innerHTML = content;
    }
}

const width = 50;
const height = 60;
const element = document.getElementById("fire-container");
if (element){
    const fire = new Fire(width, height, element, false);
    initForm(fire);
    // fire.initFire();
}

function initForm(fire: Fire){
    document.getElementById("init-fire")?.addEventListener("click", (event)=>{
        fire.initFire();
    })
    document.getElementById("stop-fire")?.addEventListener("click", (event)=>{
        fire.stopFire();
    })
    document.getElementById("wind-direction")?.addEventListener("change", (event)=>{
        const value = (event.target as HTMLInputElement).value;
        const rangeValueElement = document.getElementById("current-wind-value");
        if(rangeValueElement) rangeValueElement.innerHTML = value;
        fire.changeWind(parseInt(value))
    })
}
