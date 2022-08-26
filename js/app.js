(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    var __assign = void 0 && (void 0).__assign || function() {
        return (__assign = Object.assign || function(t) {
            for (var i, n = 1, s = arguments.length; n < s; n++) for (var a in i = arguments[n]) Object.prototype.hasOwnProperty.call(i, a) && (t[a] = i[a]);
            return t;
        }).apply(this, arguments);
    }, CountUp = function() {
        function t(t, i, n) {
            var s = this;
            this.endVal = i, this.options = n, this.version = "2.3.2", this.defaults = {
                startVal: 0,
                decimalPlaces: 0,
                duration: 2,
                useEasing: !0,
                useGrouping: !0,
                smartEasingThreshold: 999,
                smartEasingAmount: 333,
                separator: ",",
                decimal: ".",
                prefix: "",
                suffix: "",
                enableScrollSpy: !1,
                scrollSpyDelay: 200,
                scrollSpyOnce: !1
            }, this.finalEndVal = null, this.useEasing = !0, this.countDown = !1, this.error = "", 
            this.startVal = 0, this.paused = !0, this.once = !1, this.count = function(t) {
                s.startTime || (s.startTime = t);
                var i = t - s.startTime;
                s.remaining = s.duration - i, s.useEasing ? s.countDown ? s.frameVal = s.startVal - s.easingFn(i, 0, s.startVal - s.endVal, s.duration) : s.frameVal = s.easingFn(i, s.startVal, s.endVal - s.startVal, s.duration) : s.frameVal = s.startVal + (s.endVal - s.startVal) * (i / s.duration);
                var n = s.countDown ? s.frameVal < s.endVal : s.frameVal > s.endVal;
                s.frameVal = n ? s.endVal : s.frameVal, s.frameVal = Number(s.frameVal.toFixed(s.options.decimalPlaces)), 
                s.printValue(s.frameVal), i < s.duration ? s.rAF = requestAnimationFrame(s.count) : null !== s.finalEndVal ? s.update(s.finalEndVal) : s.callback && s.callback();
            }, this.formatNumber = function(t) {
                var i, n, a, e, r = t < 0 ? "-" : "";
                i = Math.abs(t).toFixed(s.options.decimalPlaces);
                var o = (i += "").split(".");
                if (n = o[0], a = o.length > 1 ? s.options.decimal + o[1] : "", s.options.useGrouping) {
                    e = "";
                    for (var l = 0, h = n.length; l < h; ++l) 0 !== l && l % 3 == 0 && (e = s.options.separator + e), 
                    e = n[h - l - 1] + e;
                    n = e;
                }
                return s.options.numerals && s.options.numerals.length && (n = n.replace(/[0-9]/g, (function(t) {
                    return s.options.numerals[+t];
                })), a = a.replace(/[0-9]/g, (function(t) {
                    return s.options.numerals[+t];
                }))), r + s.options.prefix + n + a + s.options.suffix;
            }, this.easeOutExpo = function(t, i, n, s) {
                return n * (1 - Math.pow(2, -10 * t / s)) * 1024 / 1023 + i;
            }, this.options = __assign(__assign({}, this.defaults), n), this.formattingFn = this.options.formattingFn ? this.options.formattingFn : this.formatNumber, 
            this.easingFn = this.options.easingFn ? this.options.easingFn : this.easeOutExpo, 
            this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, 
            this.endVal = this.validateValue(i), this.options.decimalPlaces = Math.max(this.options.decimalPlaces), 
            this.resetDuration(), this.options.separator = String(this.options.separator), this.useEasing = this.options.useEasing, 
            "" === this.options.separator && (this.options.useGrouping = !1), this.el = "string" == typeof t ? document.getElementById(t) : t, 
            this.el ? this.printValue(this.startVal) : this.error = "[CountUp] target is null or undefined", 
            "undefined" != typeof window && this.options.enableScrollSpy && (this.error ? console.error(this.error, t) : (window.onScrollFns = window.onScrollFns || [], 
            window.onScrollFns.push((function() {
                return s.handleScroll(s);
            })), window.onscroll = function() {
                window.onScrollFns.forEach((function(t) {
                    return t();
                }));
            }, this.handleScroll(this)));
        }
        return t.prototype.handleScroll = function(t) {
            if (t && window && !t.once) {
                var i = window.innerHeight + window.scrollY, n = t.el.getBoundingClientRect(), s = n.top + n.height + window.pageYOffset;
                s < i && s > window.scrollY && t.paused ? (t.paused = !1, setTimeout((function() {
                    return t.start();
                }), t.options.scrollSpyDelay), t.options.scrollSpyOnce && (t.once = !0)) : window.scrollY > s && !t.paused && t.reset();
            }
        }, t.prototype.determineDirectionAndSmartEasing = function() {
            var t = this.finalEndVal ? this.finalEndVal : this.endVal;
            this.countDown = this.startVal > t;
            var i = t - this.startVal;
            if (Math.abs(i) > this.options.smartEasingThreshold && this.options.useEasing) {
                this.finalEndVal = t;
                var n = this.countDown ? 1 : -1;
                this.endVal = t + n * this.options.smartEasingAmount, this.duration = this.duration / 2;
            } else this.endVal = t, this.finalEndVal = null;
            null !== this.finalEndVal ? this.useEasing = !1 : this.useEasing = this.options.useEasing;
        }, t.prototype.start = function(t) {
            this.error || (this.callback = t, this.duration > 0 ? (this.determineDirectionAndSmartEasing(), 
            this.paused = !1, this.rAF = requestAnimationFrame(this.count)) : this.printValue(this.endVal));
        }, t.prototype.pauseResume = function() {
            this.paused ? (this.startTime = null, this.duration = this.remaining, this.startVal = this.frameVal, 
            this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count)) : cancelAnimationFrame(this.rAF), 
            this.paused = !this.paused;
        }, t.prototype.reset = function() {
            cancelAnimationFrame(this.rAF), this.paused = !0, this.resetDuration(), this.startVal = this.validateValue(this.options.startVal), 
            this.frameVal = this.startVal, this.printValue(this.startVal);
        }, t.prototype.update = function(t) {
            cancelAnimationFrame(this.rAF), this.startTime = null, this.endVal = this.validateValue(t), 
            this.endVal !== this.frameVal && (this.startVal = this.frameVal, null == this.finalEndVal && this.resetDuration(), 
            this.finalEndVal = null, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count));
        }, t.prototype.printValue = function(t) {
            var i = this.formattingFn(t);
            "INPUT" === this.el.tagName ? this.el.value = i : "text" === this.el.tagName || "tspan" === this.el.tagName ? this.el.textContent = i : this.el.innerHTML = i;
        }, t.prototype.ensureNumber = function(t) {
            return "number" == typeof t && !isNaN(t);
        }, t.prototype.validateValue = function(t) {
            var i = Number(t);
            return this.ensureNumber(i) ? i : (this.error = "[CountUp] invalid start or end value: ".concat(t), 
            null);
        }, t.prototype.resetDuration = function() {
            this.startTime = null, this.duration = 1e3 * Number(this.options.duration), this.remaining = this.duration;
        }, t;
    }();
    const animItems = document.querySelectorAll("._anim-items");
    console.log("1", 1);
    if (animItems.length > 0) {
        window.addEventListener("scroll", animOnScroll);
        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 4;
                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) animItemPoint = window.innerHeight - window.innerHeight / animStart;
                if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) animItem.classList.add("_active"); else if (!animItem.classList.contains("_anim-no-hide")) animItem.classList.remove("_active");
            }
        }
        function offset(el) {
            const rect = el.getBoundingClientRect(), scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            };
        }
        setTimeout((() => {
            animOnScroll();
        }), 300);
    }
    window.onload = function() {
        setTimeout((() => {
            let textDelay = document.querySelector(".text2");
            textDelay.classList.add("animated");
        }), 1500);
        setTimeout((() => {
            let textDelay = document.querySelector(".text3");
            textDelay.classList.add("animated");
        }), 3e3);
        setTimeout((() => {
            let textDelay = document.querySelector(".main__subtitle");
            textDelay.classList.add("animated");
        }), 4500);
    };
    function numbers() {
        const options = {
            duration: 6
        };
        let countUp = new CountUp("target1", 7, options);
        let countUp2 = new CountUp("target2", 50, options);
        let countUp3 = new CountUp("target3", 30, options);
        countUp.start();
        countUp2.start();
        countUp3.start();
    }
    let counter = document.querySelector(".row-personal");
    console.log("counter", counter);
    if (counter.classList.contains("_active")) numbers();
    window["FLS"] = true;
    isWebp();
})();