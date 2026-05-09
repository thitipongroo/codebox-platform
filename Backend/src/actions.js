export const exampleAction = (someValue) => {
  return { type: 'something', showtext: someValue }
}

export const keyData = (name, val) => {
  return { type: 'keyInput', val: val, name: name }
}

export const createUserAuth = (user) => {
  return { type: 'updateUser', val: user }
}

export const customerList = (cus) => {
  return { type: 'customerList', val: [...cus] }
}

export const customerDetail = (cus) => {
  return { type: 'customerDetail', val: cus }
}

export const removeList = () => {
  return { type: 'removeList' }
}

export const resetProp = () => {
  return { type: 'resetProp' }
}
