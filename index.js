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
            let ofs = this.offset();
            let vld = this.valid();
            let set_wid = mf.func.sizeSum(ofs[0] + 'px', window.innerWidth + 'px');
            let set_hei = mf.func.sizeSum(ofs[1] + 'px', window.innerHeight + 'px');
            
            tgt.option({
                width  : (true === vld[0]) ? set_wid : undefined,
                height : (true === vld[1]) ? set_hei : undefined
            });
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
                return [this.getMember('ofs_x'), this.getMember('ofs_y')];
            }
            /* setter */
            this.member('ofs_x', 'number', x, 0);
            this.member('ofs_y', 'number', y, 0);
         } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.effect.SyncWin;
/* end of file */
