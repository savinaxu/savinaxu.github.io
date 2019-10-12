/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */
{
    const lineEq = (y2, y1, x2, x1, currentVal) => {
        // y = mx + b 
        var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
        return m * currentVal + b;
    };

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

    const setRange = (obj) => {
        for(let k in obj) {
            if( obj[k] == undefined ) {
                obj[k] = [0,0];
            }
            else if( typeof obj[k] === 'number' ) {
                obj[k] = [-1*obj[k],obj[k]];
            }
        }
    };

    // from http://www.quirksmode.org/js/events_properties.html#position
	const getMousePos = (e) => {
        let posx = 0;
        let posy = 0;
		if (!e) e = window.event;
		if (e.pageX || e.pageY) 	{
			posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) 	{
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return { x : posx, y : posy }
	};
    
    class Item {
		constructor(el, options) {
            this.DOM = {el: el};

            this.options = {   
                image: {
                    translation : {x: -10, y: -10, z: 0},
                    rotation : {x: 0, y: 0, z: 0}
                },
                title: {
                    translation : {x: 20, y: 10, z: 0}
                },
                text: {
                    translation : {x: 20, y: 50, z: 0},
                    rotation : {x: 0, y: 0, z: -20}
                },
                deco: {
                    translation : {x: -20, y: 0, z: 0},
                    rotation : {x: 0, y: 0, z: 3}
                },
                shadow: {
                    translation : {x: 30, y: 20, z: 0},
                    rotation : {x: 0, y: 0, z: -2},
                    reverseAnimation : {duration: 2, ease: 'Back.easeOut'}
                },
                content: {
                    translation : {x: 5, y: 3, z: 0}
                }
            };
            Object.assign(this.options, options);

            this.DOM.animatable = {};
            this.DOM.animatable.image = this.DOM.el.querySelector('.box__img');
            this.DOM.animatable.title = this.DOM.el.querySelector('.box__title');
            this.DOM.animatable.text = this.DOM.el.querySelector('.box__text');
            this.DOM.animatable.deco = this.DOM.el.querySelector('.box__deco');
            this.DOM.animatable.shadow = this.DOM.el.querySelector('.box__shadow');
            this.DOM.animatable.content = this.DOM.el.querySelector('.box__content');
            
            this.initEvents();
        }
        initEvents() { 
            let enter = false;
            this.mouseenterFn = () => {
                if ( enter ) {
                    enter = false;
                };
                clearTimeout(this.mousetime);
                this.mousetime = setTimeout(() => enter = true, 40);
            };
            this.mousemoveFn = ev => requestAnimationFrame(() => {
                if ( !enter ) return;
                this.tilt(ev);
            });
            this.mouseleaveFn = (ev) => requestAnimationFrame(() => {
                if ( !enter || !allowTilt ) return;
                enter = false;
                clearTimeout(this.mousetime);

                for (let key in this.DOM.animatable ) {
                    if( this.DOM.animatable[key] == undefined || this.options[key] == undefined ) {continue;}
                    TweenMax.to(this.DOM.animatable[key],
                        this.options[key].reverseAnimation != undefined ? this.options[key].reverseAnimation.duration || 0 : 1.5, {
                        ease: this.options[key].reverseAnimation != undefined ? this.options[key].reverseAnimation.ease || 'Power2.easeOut' : 'Power2.easeOut',
                        x: 0,
                        y: 0,
                        z: 0,
                        rotationX: 0,
                        rotationY: 0,
                        rotationZ: 0
                    });
                }
            });
            this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
            this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
            this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
        }
        tilt(ev) {
            if ( !allowTilt ) return;
            const mousepos = getMousePos(ev);
            // Document scrolls.
            const docScrolls = {
                left : document.body.scrollLeft + document.documentElement.scrollLeft, 
                top : document.body.scrollTop + document.documentElement.scrollTop
            };
            const bounds = this.DOM.el.getBoundingClientRect();
            // Mouse position relative to the main element (this.DOM.el).
            const relmousepos = { 
                x : mousepos.x - bounds.left - docScrolls.left, 
                y : mousepos.y - bounds.top - docScrolls.top 
            };
            
            // Movement settings for the animatable elements.
            for (let key in this.DOM.animatable) {
                if ( this.DOM.animatable[key] == undefined || this.options[key] == undefined ) {
                    continue;
                }
                
                let t = this.options[key] != undefined ? this.options[key].translation || {x:0,y:0,z:0} : {x:0,y:0,z:0},
                    r = this.options[key] != undefined ? this.options[key].rotation || {x:0,y:0,z:0} : {x:0,y:0,z:0};

                setRange(t);
                setRange(r);
                
                const transforms = {
                    translation : {
                        x: (t.x[1]-t.x[0])/bounds.width*relmousepos.x + t.x[0],
                        y: (t.y[1]-t.y[0])/bounds.height*relmousepos.y + t.y[0],
                        z: (t.z[1]-t.z[0])/bounds.height*relmousepos.y + t.z[0],
                    },
                    rotation : {
                        x: (r.x[1]-r.x[0])/bounds.height*relmousepos.y + r.x[0],
                        y: (r.y[1]-r.y[0])/bounds.width*relmousepos.x + r.y[0],
                        z: (r.z[1]-r.z[0])/bounds.width*relmousepos.x + r.z[0]
                    }
                };

                TweenMax.to(this.DOM.animatable[key], 1.5, {
                    ease: 'Power1.easeOut',
                    x: transforms.translation.x,
                    y: transforms.translation.y,
                    z: transforms.translation.z,
                    rotationX: transforms.rotation.x,
                    rotationY: transforms.rotation.y,
                    rotationZ: transforms.rotation.z
                });
            }
        }
    }

    class Savina {
        constructor(el) {
            this.DOM = {el: el};
            const item = this.DOM.el.querySelector('.box__item')
            const itemObj = new Item(item)
        }
    }

    let allowTilt = true;

    $(function() {
        new Savina(document.querySelector('.intro-right'))
        imagesLoaded(document.querySelector('.box__img'), () => document.body.classList.remove('loading'));

    })
    

    // Preload all the images in the page..
}
