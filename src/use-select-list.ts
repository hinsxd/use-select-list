import * as React from 'react'
type ToggleListOptions<T, K> = {
  items: T[]
  key?: K
  isMulti?: boolean
  defaultSelected?: T[]
}
export function useToggleList<T, K extends keyof T>(options: ToggleListOptions<T, K>) {
  const { items, key, isMulti = false, defaultSelected = [] } = options
  const [selected, setSelected] = React.useState<T[]>(defaultSelected)
  if (key !== undefined) {
    /** items is an object array */
    const selectItem = (item: T) => {
      if (!selected.find(selectedItem => selectedItem[key] === item[key])) {
        let newValues: T[]
        if (isMulti) {
          newValues = [...selected, item]
        } else {
          newValues = [item]
        }
        setSelected(newValues)
      }
    }
    const deselectItem = (item: T) => {
      setSelected(selected.filter(selectedItem => selectedItem[key] !== item[key]))
    }
    const isSelected = (item: T) =>
      selected.findIndex(selectedItem => selectedItem[key] === item[key]) !== -1

    const toggleItem = (item: T) => {
      if (!isSelected(item)) {
        selectItem(item)
      } else {
        deselectItem(item)
      }
    }
    const selectAll = () => setSelected([...items])
    const reset = () => setSelected([])
    return { selected, isSelected, toggleItem, selectAll, reset }
  } else {
    /** items is primitive array */
    const selectItem = (item: T) => {
      if (!selected.find(selectedItem => selectedItem === item)) {
        let newValues: T[]
        if (isMulti) {
          newValues = [...selected, item]
        } else {
          newValues = [item]
        }
        setSelected(newValues)
      }
    }
    const deselectItem = (item: T) => {
      setSelected(selected.filter(selectedItem => selectedItem !== item))
    }
    const isSelected = (item: T) => selected.includes(item)

    const toggleItem = (item: T) => {
      if (!isSelected(item)) {
        selectItem(item)
      } else {
        deselectItem(item)
      }
    }
    const selectAll = () => setSelected([...items])
    const reset = () => setSelected([])
    return { selected, isSelected, toggleItem, selectAll, reset }
  }
}
