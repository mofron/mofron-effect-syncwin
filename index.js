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
    constructor (prm) {
        try {
            super();
            this.name('SyncWin');
            this.shortForm('valid', 'offset');
            
            /* init config */
	    this.confmng().add("x_valid", { type: "boolean", init: true });
	    this.confmng().add("y_valid", { type: "boolean", init: true });
            this.confmng().add("x_offset", { type: "size" });
	    this.confmng().add("y_offset", { type: "size" });
            
	    /* set config */
	    if (undefined !== prm) {
                this.config(prm);
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
            let off = this.offset();
            off[0] = (null === off[0]) ? undefined : comutl.getsize(off[0]).toPixel() + 'px';
	    off[1] = (null === off[1]) ? undefined : comutl.getsize(off[1]).toPixel() + 'px';
            
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
		return [ this.confmng("x_valid"), this.confmng("y_valid") ];
	    }
	    /* setter */
	    this.confmng("x_valid", x);
	    this.confmng("y_valid", y);
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
		return [ this.confmng("x_offset"), this.confmng("y_offset") ] 
	    }
	    /* setter */
            this.confmng("x_offset", x);
	    this.confmng("y_offset", y)
         } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
