import { Input } from 'antd'
import type { ChangeEvent } from 'react'
import { type AtomEffect, DefaultValue, atom, selector, useRecoilState, useRecoilValue } from 'recoil'

// // persist state
const localStorageEffect
  = key =>
    ({ setSelf, onSet }) => {
      const savedValue = localStorage.getItem(key)
      if (savedValue != null)
        setSelf(JSON.parse(savedValue))

      onSet((newValue, _, isReset) => {
        isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue))
      })
    }

const textState = atom<string>({
  key: 'textState',
  default: '',
  effects: [localStorageEffect('text_state')],
})

const charCountState = selector<number>({
  key: 'charCountState',
  get: ({ get }) => {
    return get(textState).length
  },
})

function TextInput() {
  const [text, setText] = useRecoilState<string>(textState)
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  return (
    <div>
      <Input type="text" value={text} onChange={onChange} className="w-96" />
      <br />
      Echo: {text}
    </div>
  )
}

function CharacterCount() {
  const count = useRecoilValue(charCountState)
  return <>Character Count: {count}</>
}

function CharacterCounter() {
  return (
    <>
      <TextInput />
      <CharacterCount />
    </>
  )
}

export default CharacterCounter
