"use client"

import { useCreatePageUrl } from "@/hooks/useCreatePageUrl"
import { useSearchParams } from "next/navigation"

type SortOption = "default" | "asc" | "desc"

const PriceFilter = () => {
    const { changeSort } = useCreatePageUrl()
    const searchParams = useSearchParams()

    const sort = searchParams.get('_sort')
    const order = searchParams.get('_order')

    const currentValue: SortOption =
        sort !== "price" || !order ? "default" : (order as SortOption)

    const handleSortChange = (option: SortOption) => {
        if (option === "default") {
            changeSort({
                key: "price",
                value: null,
            })
        } else {
            changeSort({
                key: "price",
                value: option,
            })
        }
    }

    return (
        <div className="w-full max-w-xs">
            <select
                id="price-filter"
                value={currentValue}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
            >
                <option value="default">Цена: по умолчанию</option>
                <option value="asc">Цена: сначала дешевле</option>
                <option value="desc">Цена: сначала дороже</option>
            </select>
        </div>
    )
}

export default PriceFilter
