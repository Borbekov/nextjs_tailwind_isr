import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export function useCreatePageUrl() {
    const { replace } = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)

    const changePage = (pageNumber: number | string) => {
        params.set('_limit', "12")
        params.set('_page', pageNumber.toString())
        replace(`${pathname}?${params.toString()}`)
    }

    const changeSort = (sort: { key: string; value: string | null }) => {
        if (sort.value) {
            params.set('_sort', sort.key)
            params.set('_order', sort.value)
        } else {
            params.delete('_sort')
            params.delete('_order')
        }
        replace(`${pathname}?${params.toString()}`)
    }

    return { changePage, changeSort }
}
