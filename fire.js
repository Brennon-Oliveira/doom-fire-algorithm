var Fire = /** @class */ (function () {
    function Fire(width, height, element, debug) {
        if (debug === void 0) { debug = false; }
        this.fireStructure = [];
        this.colorPallet = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }];
        this.wind = 0;
        this.fireHeight = height;
        this.fireWidth = width;
        this.htmlElement = element;
        this.debug = debug;
        this.initializeFireStruct();
        this.render();
    }
    Fire.prototype.initializeFireStruct = function () {
        this.fireStructure = new Array(this.fireHeight * this.fireWidth).fill(0);
    };
    Fire.prototype.initFire = function () {
        var _this = this;
        this.fireBaseSetValue(36);
        this.interval = setInterval(function () {
            _this.calculateFirePropagation();
            _this.render();
        }, 100);
    };
    Fire.prototype.stopFire = function () {
        this.fireBaseSetValue(0);
    };
    Fire.prototype.changeWind = function (wind) {
        this.wind = wind;
    };
    Fire.prototype.calculateFirePropagation = function () {
        for (var row = 0; row < this.fireHeight; row++) {
            for (var column = 0; column < this.fireWidth; column++) {
                var belowCellIndex = column + this.fireWidth * (row + 1);
                var cellIndex = column + this.fireWidth * row;
                if (belowCellIndex >= this.fireHeight * this.fireWidth)
                    return;
                var bellowCellIntensity = this.fireStructure[belowCellIndex];
                var decay = Math.floor(Math.random() * 3);
                var newValue = bellowCellIntensity - decay >= 0 ? bellowCellIntensity - decay : 0;
                this.fireStructure[cellIndex + (decay * this.wind)] = newValue > 0 ? newValue : 0;
            }
        }
    };
    Fire.prototype.fireBaseSetValue = function (baseValue) {
        for (var column = 0; column < this.fireWidth; column++) {
            var cellIndex = column + (this.fireHeight - 1) * this.fireWidth;
            this.fireStructure[cellIndex] = baseValue;
        }
    };
    Fire.prototype.render = function () {
        var content = "";
        for (var row = 0; row < this.fireHeight; row++) {
            content += "<div class=\"row\">";
            for (var column = 0; column < this.fireWidth; column++) {
                var cellIndex = column + (row * this.fireWidth);
                var cellValue = this.fireStructure[cellIndex];
                if (this.debug) {
                    content += "<div class=\"debug\">";
                    content += "<span>".concat(cellIndex, "</span>");
                    content += cellValue;
                }
                else {
                    content += "<div class=\"column\" style=\"background-color: rgb(";
                    content += this.colorPallet[cellValue].r + ",";
                    content += this.colorPallet[cellValue].g + ",";
                    content += this.colorPallet[cellValue].b + ')"';
                    content += ">";
                }
                content += "</div>";
            }
            content += "</div>";
        }
        this.htmlElement.innerHTML = content;
    };
    return Fire;
}());
var width = 50;
var height = 60;
var element = document.getElementById("fire-container");
if (element) {
    var fire = new Fire(width, height, element, false);
    initForm(fire);
    // fire.initFire();
}
function initForm(fire) {
    var _a, _b, _c;
    (_a = document.getElementById("init-fire")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (event) {
        fire.initFire();
    });
    (_b = document.getElementById("stop-fire")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function (event) {
        fire.stopFire();
    });
    (_c = document.getElementById("wind-direction")) === null || _c === void 0 ? void 0 : _c.addEventListener("change", function (event) {
        var value = event.target.value;
        var rangeValueElement = document.getElementById("current-wind-value");
        if (rangeValueElement)
            rangeValueElement.innerHTML = value;
        fire.changeWind(parseInt(value));
    });
}
