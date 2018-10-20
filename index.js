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
            this.prmMap(['xflag', 'yflag']);
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
    enable (tgt) {
        try {
            let set_wid = mf.func.sizeSum(this.xofs(), window.innerWidth + 'px');
            let set_hei = mf.func.sizeSum(this.yofs(), window.innerHeight + 'px');
            tgt.execOption({
                width  : (true === this.xflag()) ? set_wid : undefined,
                height : (true === this.yflag()) ? set_hei : undefined
            });
            
            if (undefined === this.m_initflg) {
                let fnc = (eff) => {
                    try {
                        if (true === eff.status()) {
                            eff.execute(true);
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
                mf.func.rsizWinEvent(fnc, this, 200);
                this.m_initflg = true;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * disable synchronize window size
     *
     * @note private method
     */
    disable () {}
    
    /**
     * setter/getter horizon synchronize flag
     * 
     * @param p1 (boolean) horizon enable flag
     * @param p1 (undefined) call as getter
     * @return (boolean) horizon enable flag
     */
    xflag (flg) {
        try { return this.member('xflag', 'boolean', flg, true); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter vertical synchronize flag
     * 
     * @param p1 (boolean) horizon enable flag
     * @param p1 (undefined) call as getter
     * @return (boolean) horizon enable flag
     */
    yflag (flg) {
        try { return this.member('yflag', 'boolean', flg, true); } catch (e) {
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
             let x_ret = this.xofs(x);
             let y_ret = this.yofs(y);
             return (undefined !== x_ret) ? [x_ret, y_ret] : undefined;
         } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter horizon offset size
     *
     * @param p1 (string) horizon offset size (css value)
     * @param p1 (undefined) call as getter
     * @return (string) horizon offset size (css value)
     */
    xofs (prm) {
        try { return this.member('xofs', 'string', prm, '0px'); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter vertical offset size
     * 
     * @param p1 (string) vertical offset size (css value)
     * @param p1 (undefined) call as getter
     * @return (string) vertical offset size (css value)
     */
    yofs (prm) {
        try { return this.member('yofs', 'string', prm, '0px'); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.effect.SyncWin;
/* end of file */
