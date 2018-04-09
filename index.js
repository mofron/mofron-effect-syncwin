/**
 * @file mofron-effect-syncwin/index.js
 * @author simpart
 */

/**
 * @class SyncWin
 * @brief synchronize component with window
 */
mofron.effect.SyncWin = class extends mofron.Effect {
    
    constructor (x_po, y_flg) {
        try {
            super();
            this.name('SyncWin');
            this.prmOpt(x_po, y_flg);
            if (null !== this.param()) {
                this.xflag(x_po);
                this.yflag(y_flg);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    target (prm) {
        try {
            let ret = super.target(prm);
            mofron.func.addResizeWin(
                (eff) => {
                    try {
                        if (true === eff.status()) {
                            eff.execute(true);
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                this,
                200
            );
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    enable (tgt) {
        try {
            if (true === this.xflag()) {
                tgt.width(window.innerWidth);
            }
            if (true === this.yflag()) {
                tgt.height(window.innerHeight);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    disable (tgt) {}
    
    xflag (flg) {
        try {
            if (undefined === flg) {
                /* getter */
                return (undefined === this.m_xflag) ? true : this.m_xflag;
            }
            /* setter */
            if ('boolean' !== typeof flg) {
                throw new Error('invalid parameter');
            }
            this.m_xflag = flg;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    yflag (flg) {
        try {
            if (undefined === flg) {
                /* getter */
                return (undefined === this.m_yflag) ? true : this.m_yflag;
            }
            /* setter */
            if ('boolean' !== typeof flg) {
                throw new Error('invalid parameter');
            }
            this.m_yflag = flg;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.effect.SyncWin;
/* end of file */
