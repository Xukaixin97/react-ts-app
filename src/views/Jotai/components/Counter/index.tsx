import { Button } from 'antd'
import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { type FC } from 'react'

const countAtom = atom(0)

// persist state
// const countAtom = atomWithStorage('countAtom', 0);

countAtom.onMount = (setCountAtom) => {
  // atom is mounted in provider
  setCountAtom(c => (c = c + 21)) // increment count on mount
  // return optional onUnmount function
  return () => {
    console.log('unmounting')
  }
}

// writable derived atom
// const doubledCountAtom = atom((get) => get(countAtom) * 2);
// Async derived atom
const doubledCountAtom = atom(
  async (get) => {
    await new Promise<string>((resolve, _reject) => {
      setTimeout(() => {
        resolve('some returned value')
      }, 500)
    })
    return get(countAtom) * 2
  },
  async (get, set, value: number) => {
    await new Promise<string>((resolve, _reject) => {
      setTimeout(() => {
        resolve('some returned value')
      }, 500)
    })
    return set(countAtom, value)
  },
)

// write-only derived atom
const multiplyCountAtom = atom(null, (get, set, by: number) => set(countAtom, get(countAtom) * by))

function Controls() {
  const [, multiply] = useAtom(multiplyCountAtom)
  return (
    <Button onClick={() => multiply(3)} className="ml-2" type="primary">
      triple
    </Button>
  )
}

export const Counter: FC = () => {
  const [count, setCount] = useAtom(countAtom)
  const [doubledCount] = useAtom(doubledCountAtom)

  return (
    <div>
      <h1>count: {count}</h1>
      <h1>doubledCount: {doubledCount}</h1>
      <Button onClick={() => setCount(c => (c = c + 1))} type="primary">
        +1
      </Button>
      <Controls />
    </div>
  )
}

export default Counter
