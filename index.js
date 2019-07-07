/**
 * @file mofron-effect-syncwin/index.js
 * @brief synchronize component with window
 * @author simpart
 */
const mf = require('mofron');
/**
 * @class mf.effect.SyncWin
 * @brief synchronize component with window
 */
mf.effect.SyncWin = class extends mf.Effect {
    
    /**
     * initialize effect
     * 
     * @param p1 (object) effect option
     * @param p1 (boolean) horizon flag
     * @param p2 (boolean) vertical flag
     */
    constructor (po, p2) {
        try {
            super();
            this.name('SyncWin');
            this.prmMap(['valid', 'offset']);
            this.prmOpt(po, p2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * enable synchronize window size
     *
     * @note private method
     */
    contents (tgt) {
        try {
            let ofs     = this.offset();
            let set_siz = [null, null];
            
            for (let oidx in ofs) {
                if ('%' === ofs[oidx].type()) {
                    let px_val = null;
                    let win = (0 == oidx) ? window.innerWidth : window.innerHeight;
                    px_val = (win*Math.abs(ofs[oidx].value()))/100 + 'px';
                    set_siz[oidx] = mf.func.sizeSum(
                        (0 == oidx) ? window.innerWidth + 'px' : window.innerHeight + 'px',
                        (0 > ofs[oidx].value()) ? '-' + px_val : px_val
                    );
                } else {
                    set_siz[oidx] = mf.func.sizeSum(
                        (0 == oidx) ? window.innerWidth + 'px' : window.innerHeight + 'px',
                        ofs[oidx].toPxnum() + 'px',
                    );
                }
            
            }
            let vld = this.valid();
            if (true === vld[0]) {
                tgt.option({ width: set_siz[0] });
            } else if (true === vld[1]) {
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
                this.execute();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    valid (x, y) {
        try {
            if ( (undefined === x) && (undefined === y) ) {
                /* getter */
                return [this.getMember('valid_x'), this.getMember('valid_y')];
            }
            /* setter */
            this.member('valid_x', 'boolean', x, true);
            this.member('valid_y', 'boolean', y, true);
         } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter offset size
     * 
     * @param p1 (string) horizon offset size (css value)
     * @param p1 (undefined) cass as getter
     * @param p2 (string) vertical offset size (css value)
     * @return (Array) [horizon offset size, vertical offset size]
     */
    offset (x, y) {
        try {
            if ( (undefined === x) && (undefined === y) ) {
                /* getter */
                return [
                    this.member('ofs_x', 'string', x, mf.func.getSize('0px')),
                    this.member('ofs_y', 'string', y, mf.func.getSize('0px'))
                ];
            }
            /* setter */
            this.member(
                'ofs_x', ['Base', 'Size'], ('number' === typeof x) ? mf.func.getSize(x + 'px') :  mf.func.getSize(x)
            );
            this.member(
                'ofs_y', ['Base', 'Size'], ('number' === typeof y) ? mf.func.getSize(y + 'px') : mf.func.getSize(y)
            );
         } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.effect.SyncWin;
/* end of file */
