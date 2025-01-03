import { AnimatePresence, motion, MotionConfig } from "motion/react"
import { useState } from "react"
import { CloseSVG } from "./components/close-svg"
import { CheckSVG } from "./components/check-svg"
import { NikeSVG } from "./components/nike-svg"
import { Credits } from "./components/credits"

function App() {
  const [state, setState] = useState<'idle' | 'hover' | 'beforeExit' | 'exited'>('idle')

  return (
    <section className="w-full h-dvh flex justify-center items-center">
      {/* <Credits /> */}
      <MotionConfig transition={{ type: 'tween', duration: .15, ease: 'easeOut' }}>
        <motion.div
          style={{ 
            boxShadow: state == 'exited' ? 'none' : '0px 0px 2px rgba(0, 0, 0, .4)' 
          }} 
          className="w-72 relative rounded-xl p-2 bg-white overflow-hidden"
        >
          {
            state == 'exited' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .3, type: 'tween', ease: 'easeOut' }}
                className=" absolute inset-0 bg-white z-20 flex flex-col justify-center items-center"
              >
                <CheckSVG />
                <span className="font-medium">
                  Thank you for your purchase
                </span>
              </motion.div>
            )
          }
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">We think you'll like this</span>
            <span
              className="cursor-pointer"
              onClick={() => setState(state == 'beforeExit' ? 'exited' : 'beforeExit')}
            >
              <CloseSVG />
            </span>
          </div>
          <img 
            alt="Shoe" 
            className="w-full my-7"
            src="/shoe.webp" 
          />
          <div className="flex justify-between -my-1 leading-none">
            <div className="leading-none flex items-center gap-1">
              <NikeSVG />
              <span className="leading-none">Nike Air Force 1</span>
            </div>
            <span>$125</span>
          </div>
          <span className="text-xs text-gray-500 leading-none">Mens Shoes</span>
          <div className="flex items-center gap-4 mt-2 relative">
              <motion.div 
                layout
                style={{ 
                  borderRadius: 24,
                  width: state == 'idle' ? '48%' : '100%', 
                }}
                onMouseLeave={() => setState('idle')}
                className="h-10 flex items-center justify-center text-xs text-center bg-black text-white"
              >
                <AnimatePresence initial={false} mode="popLayout">
                  {
                    state == 'idle' && (
                      <motion.span 
                        key="idle-text"
                        layout
                        initial={{ scale: .1, y: -8, x: -10, opacity: 0 }}
                        animate={{ scale: 1, y: 0, x: 0, opacity: 1 }}
                        exit={{ scale: .1, y: -8, x: -10, opacity: 0 }}
                      >
                        Buy Now
                      </motion.span>
                    )
                  }
                  {
                    state == 'hover' && (
                      <motion.span 
                        key="hover-text"
                        layout
                        initial={{ y: 20, x: 10, opacity: 0 }}
                        animate={{ y: 0, x: 0, opacity: 1 }}
                        exit={{ y: 20, x: 10, opacity: 0 }}
                      >
                        I said buy it now
                      </motion.span>
                    )
                  }
                  {
                    state == 'beforeExit' && (
                      <motion.span 
                        key="beforeExit-text"
                        layout
                        initial={{ y: 20, x: 4, opacity: 0 }}
                        animate={{ y: 0, x: 0, opacity: 1 }}
                        exit={{ y: 20, x: 4, opacity: 0 }}
                      >
                        Nice try... Buy it now
                      </motion.span>
                    )
                  }
                </AnimatePresence>
              </motion.div>
              <motion.div
                key="not-interested" 
                onMouseEnter={() => setState('hover')}
                animate={{ x: state == 'idle' ? 0 : 150 }}
                transition={{ type: 'tween', duration: .15, ease: 'easeOut' }}
                className="w-1/2 absolute right-0 h-10 flex justify-center items-center rounded-3xl bg-gray-300"
              >
                <span className="text-xs">
                  Not interested
                </span>
              </motion.div>
          </div>
        </motion.div>
      </MotionConfig>
    </section>
  )
}

export default App
