/**
 * @file mofron-effect-syncwin/index.js
 * @brief synchronize component with window
 *        target component size is changed even if the window size is changed.
 * @license MIT
 */
const comutl = mofron.util.common;

let get_offsiz = (off) => {
    try {
        let ret = [];
        for (let oidx in off) {
            if (null === off[oidx]) {
                ret.push(undefined);
		continue;
	    }
	    let siz = comutl.getsize(off[oidx]);
	    if ('%' === siz.type()) {
	        let oval = siz.value() / 100;
                ret.push((0 == oidx) ? window.innerWidth*oval+"px" : window.innerHeight*oval+"px");
	    } else {
                ret.push(siz.toPixel() + 'px');
	    }
	}
        return ret;
    } catch (e) {
        console.error(e.stack);
        throw e;
    }
}

module.exports = class extends mofron.class.Effect {
    /**
     * initialize effect
     * 
     * @param (mixed) valid config parameter
     *                dict: effect config list
     * @param (mixed) offset config parameter
     * @short valid,offset
     * @type private
     */
    constructor (p1, p2) {
        try {
            super();
            this.modname('SyncWin');
            this.shortForm('valid', 'offset');
            
            /* init config */
	    this.confmng().add("x_valid", { type: "boolean", init: true });
	    this.confmng().add("y_valid", { type: "boolean", init: true });
            this.confmng().add("x_offset", { type: "size" });
	    this.confmng().add("y_offset", { type: "size" });
            
	    /* set config */
	    if (0 < arguments.length) {
                this.config(p1,p2);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * enable synchronize window size
     * 
     * @param (component) effect target component
     * @type private
     */
    contents (tgt) {
        try {
            let off = get_offsiz(this.offset());
            
            if (true === this.valid()[0]) {
                /* set horizon size */
		try {
                    tgt.width(comutl.sizesum(window.innerWidth + 'px', off[0]));
		} catch (e) {
                    tgt.width(window.innerWidth + 'px');
		}
	    }
	    if (true === this.valid()[1]) {
                /* set vertical size */
		try {
                    tgt.height(comutl.sizesum(window.innerHeight + 'px', off[1]));
		} catch (e) {
                    tgt.height(window.innerHeight + 'px');
		}
	    }
            
            if (false === this.isInited()) {
	        let fnc = (eff) => {
	            try {
		       eff.execute();
		    } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        };
                mofron.window.resizeEvent(fnc, this);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set x,y valid flag
     * 
     * @param (boolean) valid flag for horizon
     * @param (boolean) valid flag for vertical
     * @return (array) [x-flag, y-flag ]
     * @type pararmeter
     */
    valid (x, y) {
        try {
            if (undefined === x) {
                /* getter */
		return [ this.x_valid(), this.y_valid() ];
	    }
	    /* setter */
	    this.x_valid(x);
	    this.y_valid(y);
         } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * horizonal valid flag setter/getter
     * 
     * @param (boolean) true: enabled horizonal sync [default]
     *                  false: disabled horizonal sync
     *                  undefined: call as getter
     * @return (boolean) horizonal valid flag
     * @type parameter
     */
    x_valid (prm) {
        try {
            return this.confmng("x_valid", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * vertical valid flag setter/getter
     * 
     * @param (boolean) true: enabled vertical sync [default]
     *                  false: disabled vertical sync
     *                  undefined: call as getter
     * @return (boolean) vertival valid flag
     * @type parameter
     */
    y_valid (prm) {
        try {
            return this.confmng("y_valid", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter offset size
     * 
     * @param (string (size)) horizonal offset size
     * @param (string (size)) vertical offset size
     * @return (array) [horizon offset size, vertical offset size]
     * @type parameter
     */
    offset (x, y) {
        try {
            if (undefined === x) {
                /* getter */
		return [ this.x_offset(), this.y_offset() ];
	    }
	    /* setter */
            this.x_offset(x);
	    this.y_offset(y);
         } catch (e) {
            console.error(e.stack);
            throw e;
         }
    }
    
    /**
     * horizonal offset size setter/getter
     * 
     * @param (string(size)) horizonal offset size
     * @return (string(size)) horizonal offset size
     * @type parameter
     */
    x_offset (prm) {
        try {
            return this.confmng("x_offset", prm);
	} catch (e) {
	    console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * vertical offset size setter/getter
     * 
     * @param (string(size)) vertical offset size
     * @return (string(size)) vertical offset size
     * @type parameter
     */
    y_offset (prm) {
        try {
            return this.confmng("y_offset", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
