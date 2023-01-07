import { useToast } from 'vue-toastification'
export const go = (name: string, id?: string | number) => {
  const router = useRouter()
  if (id)
    router.push(`/${name}/${id}`)
}

export const isDark = useDark()
export const toggleDark = useToggle(isDark)
export const Toast = useToast()
