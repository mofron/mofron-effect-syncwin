/**
 * @file mofron-effect-syncwin/index.js
 * @author simpart
 */
const mf = require('mofron');
/**
 * @class SyncWin
 * @brief synchronize component with window
 */
mf.effect.SyncWin = class extends mf.Effect {
    
    constructor (po, p2) {
        try {
            super();
            this.name('SyncWin');
            this.prmMap('xflag', 'yflag');
            this.prmOpt(po, p2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    enable (tgt) {
        try {
            let set_wid = mf.func.sizeSum(this.xofs(), new mf.size.Pixel(window.innerWidth));
            let set_hei = mf.func.sizeSum(this.yofs(), new mf.size.Pixel(window.innerHeight));
            tgt.execOption({
                width  : (true === this.xflag()) ? set_wid : undefined,
                height : (true === this.yflag()) ? set_hei : undefined
            });
                
            if (false === this.initFlag()) {
                mofron.func.rsizWinEvent(
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
                this.initFlag(true);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    disable (tgt) {
        try {
            this.status(false);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
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
    
    initFlag (prm) {
        try {
            if (undefined === prm) {
                /* getter */
               return (undefined === this.m_initflg) ? false : this.m_initflg;
            }
            /* setter */
            if ('boolean' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.m_initflg = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
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
    
    xofs (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_xofs) ? new mf.size.Pixel(0) : this.m_xofs;
            }
            /* setter */
            if ('string' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.m_xofs = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    yofs (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_yofs) ? new mf.size.Pixel(0) : this.m_yofs;
            }
            /* setter */
            if ('string' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.m_yofs = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.effect.SyncWin;
/* end of file */
