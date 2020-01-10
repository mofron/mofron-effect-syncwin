/**
 * @file mofron-effect-syncwin/index.js
 * @brief synchronize component with window
 *        target component size is changed even if the window size is changed.
 * @license MIT
 */
const comutl = mofron.util.common;

module.exports = class extends mofron.class.Effect {
    /**
     * initialize effect
     * 
     * @param (mixed) valid parameter
     *                key-value: effect option
     * @param (array) offset parameter
     * @short valid,offset
     * @type private
     */
    constructor (p1, p2) {
        try {
            super();
            this.name('SyncWin');
            this.shortForm('valid', 'offset');
            
            /* init config */
	    this.confmng().add("valid", { type: "array", init: [true, true] });
            this.confmng().add("offset", { type: "array", init: ["0px", "0px"] });
            
	    /* set config */
	    if (0 < arguments.length) {
                this.config(p1, p2);
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
            if (true === this.valid()[0]) {
                /* set horizon size */
		try {
                    tgt.width(
		        comutl.sizesum(window.innerWidth + 'px',this.offset()[0])
		    );
		} catch (e) {
                    tgt.width(window.innerWidth + 'px');
		}
	    }
	    if (true === this.valid()[1]) {
                /* set vertical size */
		try {
                    tgt.height(
                        comutl.sizesum(window.innerHeight + 'px',this.offset()[1])
		    );
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
		return this.confmng("valid");
	    }
	    /* setter */
	    if (('boolean' !== typeof x) || ('boolean' !== typeof y)) {
                throw new Error("invalid parameter");
	    }
            this.confmng("valid",[ x,y ]);
         } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter offset size
     * 
     * @param (string (size)) horizon offset size
     * @param (string (size)) vertical offset size
     * @return (array) [horizon offset size, vertical offset size]
     * @type parameter
     */
    offset (x, y) {
        try {
            if (undefined === x) {
                /* getter */
                return this.confmng("offset");
            }
            /* setter */
            this.confmng(
	        "offset",
		[ comutl.getsize(x), comutl.getsize(y) ]
	    );
         } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
