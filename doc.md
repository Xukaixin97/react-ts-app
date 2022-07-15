# 介绍

本文将对比一些流行的react状态管理工具，讨论每个工具的使用场景，下面将通过案例，对比不同工具使用上的差异，帮助你更好的理解。

代码：https://github.com/Xukaixin97/react-ts-app



# 使用React提供的功能进行状态管理

组件之间需要共享状态的时候可以通过状态提升，将状态提取到一个公共组件然后通过props传递给组件。

## Props Drilling

props drilling是数据以 props 的形式从 React 组件树中的一部分传递到另一部分, 只是传递的组件层级过深, 而中间层组件并不需要这些 props, 只是做一个向下转发, 这种情况就叫做 props drilling。

简而言之是指：当一个组件自身不需要这个prop，但为了使子组件能获取到这个prop，而不得已去传递这个prop的行为。

使用简单的hooks，useState，useReducer，useEffect等方式维护数据。

这个例子帮我们演示了状态管理的三个属性

### 状态管理的三个重要属性

1. 获取和设置基本值
2. 如何管理异步工作流
3. 数据之间的连接（派生数据）

### 问题

重构艰难，随着项目复杂度的增加，往往会出现某个prop的传递，穿透多个组件层级的应用场景，因而代码追溯长度也会不断增加，进而导致对component的性能分析异常困难，积攒的负面影响便会爆发形成较大的阻碍。

## [Context](https://zh-hans.reactjs.org/docs/context.html)

为了避免组件间层层传递状态，可以使用 Context 解决方案，虽然比 props drilling好一点，但是当你修改context值的时候，他将重新渲染包裹下所有内容，这一个特点使得你必须要考虑是否符合当前业务场景。并且，当context 下有一个巨大的组件树时，这会非常影响页面的渲染性能。



<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h03g0qvnk3j211r0u0myu.jpg" alt="c114e9bfee4a453a9c59de4348dde636_tplv-k3u1fbpfcp-zoom-in-crop-mark_1434_0_0_0" style="zoom:50%" />



# Atomic State Manager

主要有两大阵营。Facebook的[Recoil](https://recoiljs.org/)和pmndrs组织的[Jotai](https://jotai.org/)，Jotai的主要开发者[daishi kato](https://blog.axlight.com/)，以及我们下面提到的`Zustand`，`Valtio`也是他参与开发的。

## [Recoil](https://recoiljs.org/)

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h0gfmgjphxj21ks0t6whc.jpg" alt="Screen Shot 2022-03-20 at 16.23.07" style="zoom:33%;float:left" />

当前有一个场景。我们更新 List 里面第二个节点，然后希望 Canvas 的第二个节点也跟着更新。

最简单的方式就是我们把 state 放到父组件里面，通过父子组件通信来更新子组件，但带来的问题是父组件下面的子组件都会更新，除非使用 memo 或者 PureComponent。

另一种方式则是借助 Context API，将状态从父组件传给子组件。但这样带来的问题也很明显，如果我们共享的状态越来越多，就需要越来越多的 Provider，又变成了套娃。

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h0gfy4phatj21ks0t6whc.jpg" alt="Screen Shot 2022-03-20 at 16.23.07" style="zoom:33%;float:left" />

相比 Redux 维护的全局 Store，Recoil 则是使用了分散式的 Atom 来管理，方便进行代码分割。

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h03g0xnkofj213u0rzn1t.jpg" alt="6dbeaa9ba6e8442b896d83dca13b9f42_tplv-k3u1fbpfcp-zoom-in-crop-mark_1434_0_0_0" style="zoom: 50%;float:left" />

#### 动机

- 组件间的状态共享只能通过将 state 提升至它们的公共祖先来实现，但这样做可能导致重新渲染一颗巨大的组件树。
- Context 只能存储单一值，无法存储多个各自拥有消费者的值的集合。
- 以上两种方式都很难将组件树的顶层（state 必须存在的地方）与叶子组件 (使用 state 的地方) 进行代码分割。

### 核心概念

`Atom` 是状态的单位。它们可更新也可订阅，当 atom 被更新，每个被订阅的组件都将使用新值进行重渲染。它们也可以在运行时创建。可以使用 atom 替代组件内部的 state。如果多个组件使用相同的 atom，则这些组件共享 atom 的状态。

Selector 是一个纯函数，入参为 atom 或者其他 selector。当上游 atom 或 selector 更新时，将重新执行 selector 函数。组件可以像 atom 一样订阅 selector，当 Selector 发生变化时，重新渲染相关组件。

Selector 被用于计算基于 state 的派生数据，selector 可以同步或异步改变此 state。将最小粒度的状态存储在 atom 中。其它所有内容根据最小粒度的状态进行有效计算。

Selector 是 “幂等” 函数：对于一组给定的输入，它们应该总是产生相同的结果。这一点很重要，因为 selector 的计算可能被缓存、重启或多次执行。正因为如此，Selector 通常是模拟只读数据库查询的好方法。看例子，select 中get依赖的任一项更新都会导致select重新计算，派生状态创建依赖于其他数据的动态数据

通过例子简单了解:

#### mental model

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h02krlb107j20t40tg0vn.jpg" alt="Screen Shot 2022-03-08 at 4.54.10 PM" style="zoom: 33%;float:left" />

#### Selector如何处理一些异变的数据? 

 1. 例子CharacterCounter

2. 还有一种直接拿的官方的例子。userInfoQueryRequestIDState 更新后 userInfoQuery就会重新就算，（加了个依赖，依赖更新更新了就会导致重新计算，尽管此依赖和业务关联不大）

3. ```tsx
   const userInfoQueryRequestIDState = atomFamily        key: 'UserInfoQueryReques  ',
      defu)
 
 const});
    
    const userInfoQuery =  lectorFamily({
      k   'UserInfoQuery',
       ge t: userI    async ({get}) => {
        get(userInfo) // 添加请求ID作为依赖关系
     const // 添加请求ID作为依赖关系
        cons t resp o)
     ift myDBQuery({userI
       throw response.error;
            throwresponse
   }r; )
 
 function   return response;
      },
   });
    
    function useRefreshUserInfo(userID) {
      const setUserInfoQueryRequestI)
   returncoilState    InfoQueryRequestIDState(userID));
      return () =>)
   }   stserInfoQueryRequestID(request  => requestID + 1);
      };
    }
    
    function Cur)
   consto() {
      const currentUserID = useRecoilValue(currentUserID)
   const   const currentUserInfo = useRecoilValue(userInfoQ)
 
   returnerID));
      const refreshUserInfo = useRefreshUserInfo(currentUserID);
    
      return (
        <div>
         <h1{currentUser.name}</h1>
          <button onClick={refreshUserInfo}>刷新</button>
        </div>
      );
    }
    ```

### [Atom Effects](https://recoiljs.org/docs/guides/atom-effects)

Atom effects are an API for managing side-effects and synchronizing or initializing Recoil atoms. They have a variety of useful applications such as state persistence, state synchronization, managing history, logging, &c. They are similar to [React effects](https://reactjs.org/docs/hooks-effect.html), but are defined as part of the atom definition, so each atom can specify and compose their own policies.

### 常用api

1. useRecoilState 读写atom
2. useRecoilValue 获取atom或selector的值
3. useSetRecoilState  获得一个修改atom的方法
4. atomFamily    动态创建atom
5. selectorFamily selector传参 返回一个selector

## [Jotai](https://jotai.org/)

Jotai的基本接口与useState非常类似，并且很灵活，派生的atom可以和其他atom组合，并且像useReducer支持副作用。

看一个例子Counter，比较下区别

```javascript
//You can also create derived atoms. We have three patterns.
//- Read-only atom
const readOnlyAtom = atom((get) => get(priceAtom) * 2)

//- Write-only atom
const writeOnlyAtom = atom(
  null, // it's a convention to pass `null` for the first argument
  (get, set, update) => {
    // `update` is any single value we receive for updating this atom
    set(priceAtom, get(priceAtom) - update.discount)
  }
)

//Read-Write atom
const readWriteAtom = atom(
  (get) => get(priceAtom) * 2,
  (get, set, newPrice) => {
    set(priceAtom, newPrice / 2)
    // you can set as many atoms as you want at the same time
  }
)

// 创建一个异步的atom
const doubledCountAtom = atom(
  async (get) => {
    await new Promise<string>((resolve, _reject) => {
      setTimeout(() => {
        resolve('some returned value');
      }, 500);
    });
    return get(countAtom);
  },
  async (get, set) => {
    await new Promise<string>((resolve, _reject) => {
      setTimeout(() => {
        resolve('some returned value');
      }, 500);
    });
    return get(countAtom) * 2;
  },
);
```

### [onMount](https://jotai.org/docs/api/core#on-mount)

```jsx
const anAtom = atom(1)
anAtom.onMount = (setAtom) => {
  console.log('atom is mounted in provider')
  setAtom(c => c + 1) // increment count on mount
  return () => { ... } // return optional onUnmount function
}
```

### Persistence

```tsx
import { atomWithStorage } from 'jotai/utils'
const countAtom = atomWithStorage('countAtom', 0)
```

### atomFamily()

atom可以按需创建，通过atomfamily来创建atom，如果创建过，会直接返回，如果没有就创建一个

https://recoiljs.org/zh-hans/docs/api-reference/core/atom

例子todo

# [Zustand](https://github.com/pmndrs/zustand)

类似redux，但是更加轻量，api都基于hooks，不需要Provider包裹。

### create a store

```jsx
export const useCounterStore = create<
  ICounterState,
  SetState<ICounterState>,
  GetState<ICounterState>,
  StoreApi<ICounterState>
>(
  (set, get) => ({
    count: 0,
    increaseCount: (count: number) => set((state) => ({ count: state.count + count })),
    doubleCount: () => set((state) => ({ count: state.count * 2 })),
    tripleCount: () => set({ count: get().count * 2 }),  //get()方法可以获取stroe内的值
    deleteEverything: () => set({}, true), // set方法有第二个参数 ,默认是false，merge参数，当为true时则是replace，此操作会清空整个store
  })
);
```

### 取值注意点 

```javascript
//不建议 任意state改变都是导致组件更新
const state = useStore()

//取单个值
const nuts = useStore(state => state.nuts)
```

```tsx
// 取多个值时
import shallow from 'zustand/shallow'

// Object pick, re-renders the component when either state.nuts or state.honey change
const { nuts, honey } = useStore(state => ({ nuts: state.nuts, honey: state.honey }), shallow)

// Array pick, re-renders the component when either state.nuts or state.honey change
const [nuts, honey] = useStore(state => [state.nuts, state.honey], shallow)

// Mapped picks, re-renders the component when state.treats changes in order, count or keys
const treats = useStore(state => Object.keys(state.treats), shallow)
```

### Async actions

```jsx
export const useUserStore = create<IUserState>((set) => ({
  userList: [],
  fetchUserList: async () => {
    const { res: userList } = await api.fetchUserList();
    set({ userList });
  },
}));
```

### 组件外部操作store

```tsx
// store.ts
import { type StoreApiWithSubscribeWithSelector, subscribeWithSelector } from 'zustand/middleware'

export const useCounterStore = create<
  ICounterState,
  SetState<ICounterState>,
  GetState<ICounterState>,
  StoreApiWithSubscribeWithSelector<ICounterState>,
>(
  subscribeWithSelector((set, get) => ({
    count: 0,
    increaseCount: (count: number) => set(state => ({ count: state.count + count })),
    doubleCount: () => set(state => ({ count: state.count * 2 })),
    tripleCount: () => set({ count: get().count * 3 }),
    deleteEverything: () => set({}, true),
  })),
)
```

```tsx
// Counter.tsx
// Getting non-reactive fresh state
const count = useCounterStore.getState()

// Listening to all changes, fires synchronously on every change
const unsub1 = useCounterStore.subscribe(
  state => state.count,
  (paw, previousPaw) => console.log(paw, previousPaw),
  { fireImmediately: true },
)

// Updating state, will trigger listeners
useCounterStore.setState({ count: 2 })
// Unsubscribe listeners
unsub1()
// // Destroying the store (removing all listeners)
useCounterStore.destroy()
```

### Middleware

```tsx
// Log every time state is changed
const log = config => (set, get, api) => config((args) => {
  console.log('  applying', args)
  set(args)
  console.log('  new state', get())
}, get, api)
```

[How to type immer middleware in TypeScript]()

### Jotail与Zustand区别

主要不同就是state模型，zustand是大体是单一的store，当然你也可以创建多个stores，当然他们是分离的，Jotai是定义原始的atoms并且组合使用，

Jotai可以看错是useState和useContext的替代，atoms共享一个巨大的context，而不是创建多个context。

zustand是外部的store，通过hook来链接react组件。

when to use which

1. 如果你想替代usestate和usecontext，jotail更加合适
2. 如果你想在外部更新state，Zustand更好
3. 在代码分割方卖弄，jotai表现更好
4. zustand可以配置redux devtools使用
5. 想使用Suspense，jotai是一种选择

Jotai的设计与Recoil相似，都是状态由存储在React组件树中的原子组成，而Zustand将状态存储在React外部的单个状态对象中，就像Redux采取的方式一样。



# [Valtio](https://github.com/pmndrs/valtio)

Valtio类似Mobx，Vatio的使用符合用户的直觉。

### Create State

```javascript
import { proxy, useSnapshot } from 'valtio'

const state = proxy({ count: 0, text: 'hello' })

// 可以直接操作state
setInterval(() => {
  ++state.count
}, 1000)
```

#### React via useSnapshot

```tsx
// 只有当你使用的值发生变化时才会触发，改编state.text并不会触发一下组件的更新
function Counter() {
  const snap = useSnapshot(state)
  return (
    <div>
      {snap.count}
      <button onClick={() => ++state.count}>+1</button>
    </div>
  )
}
```

### 订阅更新

可以在组件外部订阅更新

```tsx
// 监听state的部分属性，第一位参数接受类型为Object，若监听字段为基础类型，使用subscribeKey
import { subscribe } from 'valtio'

// Suscribe to all state changes
const unsubscribe = subscribe(state, () => console.log('state has changed to', state))
// Unsubscribe by calling the result
unsubscribe()
```

```tsx
import { subscribeKey } from 'valtio/utils'

const state = proxy({ count: 0, text: 'hello' })
subscribeKey(state, 'count', () => console.log('state.count has changed to', state.count))
```

### 监听state

```tsx
import { watch } from 'valtio/utils'

const state = proxy({ count: 0 })
const stop = watch((get) => {
  console.log('state has changed to', get(state)) // auto-subscribe on use
})

```

##### [When I Use Valtio and When I Use Jotai](https://blog.axlight.com/posts/when-i-use-valtio-and-when-i-use-jotai/)

>主要说了两个概念 data-centric 和component centric
>
>data-centric举了一个游戏开发的例子，我们在design components之前会先有game state，这些数据不会被react生命周期影响，
>
>component centric局举了一个GUI intensive app的例子，我们想要控制ui组件的同步更新，但是这两个组件之间离得很远，甚至没有关联。
>
>结论： valtio for data-centric apps and jotai for component-centric apps

#### Recipes

Valtio is unopinionated about best practices. The community is working on recipes on wiki pages.

- [How to organize actions](https://github.com/pmndrs/valtio/wiki/How-to-organize-actions)
- [How to persist states](https://github.com/pmndrs/valtio/wiki/How-to-persist-states)
- [How to use with context](https://github.com/pmndrs/valtio/wiki/How-to-use-with-context)
- [How to split and compose states](https://github.com/pmndrs/valtio/wiki/How-to-split-and-compose-states)

# Redux

在学习 Redux 之前需要先理解其大致工作流程，一般来说是这样的：

- 用户在页面上进行某些操作，通过 dispatch 发送一个 action。
- Redux 接收到这个 action 后通过 reducer 函数处理获取到一个新状态。
- 将新状态更新进 store，store 更新后通知页面进行重新渲染。

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h03ng6ely0g21400u0qv7.gif" alt="ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26" style="zoom: 33%;float:left" />



# Redux缺点

1. 将副作用传给中间件，然后又增加了学习成本
2. 需要书写太多的样板语法
3. reducer需要返回一个新的对象，造成心智负担



现在redux使用都是配合RTK使用，简化了一部分代码。

配合 reduxjs/toolkit 能减少一些代码量



# 状态管理分类

- 响应式（reactive state manager）: `Rxjs`
- 单项数据流（ uni-directional）：`redux`、`zustand`
- 双向绑定（Bi-direcitonal ）：`mobx`、`valtio` (更小 esay to use)
- 状态原子化（Atomic）：`jotai`、`recoil`
- 有限状态机：`xstate`

其中 `单项数据流`、`双向绑定`、`状态原子化` 本质上都是发布订阅模式



# 状态管理的范围

选择模型时，还要考虑一件事，他是否真正意义上上的全局上下文

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h029e59dzuj21360nogp3.jpg" alt="Screen Shot 2022-03-08 at 10.20.38 AM" style="zoom: 33%;float:left" />

React local  某一组件中的状态

React global  对于整个React tree来说

Global 超出react tree  代码实际执行在react外部

像global state hooks  你无法全局访问它，而使用Atomic 、Uni-dir 、Bi-dir模型时你可以外部调用，如果你需要全局访问，你就考虑框架是否支持



# 挑选状态管理时有哪些指标？

- 细粒度render  （只改变数据涉及组件的render）

- 派生状态（联级派生）

- 异步（联级异步）

- 在非 react 上下文也可以订阅和更新

    

# 参考资料

https://www.youtube.com/watch?v=P95DuIBwnqw

https://www.npmtrends.com/jotai-vs-recoil-vs-valtio-vs-zustand

https://mp.weixin.qq.com/s/MmBFwrAUhRzROLllWUa0gg

https://github.com/WangYuLue/react-state-manage

https://mp.weixin.qq.com/s/SQx88imy0ozOXpbhgogGeg

















