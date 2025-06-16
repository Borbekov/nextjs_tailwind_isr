import { TCarItem } from "@/types/car"
import { TMeta } from "@/types/meta"

type SearchParamsType = {
    _page?: string
    _limit?: string
    _sort?: string
    _order?: string
}

export const getCarsList = async (
    searchParams: SearchParamsType = {}
): Promise<{ data: TCarItem[]; meta: TMeta }> => {
    try {
        const {
            _page = "1",
            _limit = "12",
            _sort,
            _order,
        } = searchParams

        const url = new URL("https://testing-api.ru-rating.ru/cars")
        url.searchParams.set("_page", _page)
        url.searchParams.set("_limit", _limit)

        if (_sort) url.searchParams.set("_sort", _sort)
        if (_order) url.searchParams.set("_order", _order)

        const res = await fetch(url.toString())

        if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`)
        }

        const { data, meta } = await res.json()
        return { data, meta }
    } catch (error) {
        console.error("getCarsList error:", error)
        return { data: [], meta: { last_page: 0 } }
    }
}
