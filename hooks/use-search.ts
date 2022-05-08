import {atomWithHash} from "jotai/utils"
import {useAtom} from "jotai"

const searchAtom = atomWithHash("search", "")

export function useSearch() {
  const [value, update] = useAtom(searchAtom)

  return {
    value,
    update,
  }
}
