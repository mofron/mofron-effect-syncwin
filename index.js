/**
 * @file mofron-effect-syncwin/index.js
 * @brief synchronize component with window
 *        target component size is changed even if the window size is changed.
 * @author simpart
 */
const mf = require('mofron');

mf.effect.SyncWin = class extends mf.Effect {
    /**
     * initialize effect
     * 
     * @param (mixed) valid parameter
     *                object: effect option
     * @param (array) offset parameter
     * @pmap valid,offset
     * @type private
     */
    constructor (po, p2) {
        try {
            super();
            this.name('SyncWin');
            this.prmMap(['valid', 'offset']);
            this.valid(true, true);
            this.offset("0px", "0px");
            this.prmOpt(po, p2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * enable synchronize window size
     * 
     * @type private
     */
    contents (tgt) {
        try {
            let ofs     = this.offset();
            let set_siz = [null, null];
            let win     = [window.innerWidth, window.innerHeight];

	    /* set offset size */
            for (let oidx in ofs) {
                if ('%' === ofs[oidx].type()) {
                    let px_val = (win[oidx] * Math.abs(ofs[oidx].value()))/100 + 'px';
                    set_siz[oidx] = mf.func.sizeSum(
		        win[oidx] + 'px', (0 > ofs[oidx].value()) ? '-' + px_val : px_val
                    );
                } else {
                    set_siz[oidx] = mf.func.sizeSum(
		        win[oidx] + 'px', ofs[oidx].toPxnum() + 'px',
                    );
                }
            
            }
            let vld = this.valid();
            if (true === vld[0]) {
                tgt.option({ width: set_siz[0] });
            }
            if (true === vld[1]) {
                tgt.option({ height: set_siz[1] });
            }
            
            if (false === this.isInited()) {
                let fnc = (eff) => {
                    try { eff.execute(); } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
                mf.func.rsizWinEvent(fnc, this, 200);
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
     * @return (array) [x-flag, y-flag]
     * @type parameter
     */
    valid (x, y) {
        try {
            if ( (undefined === x) && (undefined === y) ) {
                /* getter */
                return [this.valid_x(),this.valid_y()];
            }
            /* setter */
            this.valid_x(x);
            this.valid_y(y)
         } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * valid flag for horizon
     * 
     * @param (boolean) valid flag for horizon
     * @return (boolean) valid flag for horizon
     * @type private
     */
    valid_x (prm) {
        try {
	    return this.member("valid_x", "boolean", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * valid flag for vertical
     * @param (boolean) valid flag for vertical
     * @return (boolean) valid flag for vertical
     * @type private
     */
    valid_y (prm) {
        try {
	    return this.member("valid_y", "boolean", prm);
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
            if ( (undefined === x) && (undefined === y) ) {
                /* getter */
                return [
                    mf.func.getSize(this.member("offset_x")),
                    mf.func.getSize(this.member("offset_y"))
                ];
            }
            /* setter */
            this.offset_x(x);
            this.offset_y(y);
         } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * offset size for horizon
     * 
     * @param (string (size)) offset size for horizon
     * @return (string (size)) offset size for horizon
     * @type private
     */
    offset_x (prm) {
        try {
            return this.member("offset_x", "size", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * offset size for vertical
     * 
     * @param (string (size)) offset size for vertical
     * @return (string (size)) offset size for vertical
     * @type private
     */
    offset_y (prm) {
        try {
            return this.member("offset_y", "size", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.effect.SyncWin;
/* end of file */
