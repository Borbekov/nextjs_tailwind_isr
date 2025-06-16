import { getCarsList } from "@/api/getCarsList"
import CarsListPage from "@/components/CarsListPage"
import { ReadonlyURLSearchParams } from "next/navigation"

type PageProp = {
    searchParams: Promise<{
        _page?: string
        _limit?: string
        _sort?: string
        _order?: string
    } & ReadonlyURLSearchParams>
}

const Page: React.FC<PageProp> = async ({ searchParams }) => {
    const { data, meta } = await getCarsList(await searchParams)

    return <CarsListPage data={data} meta={meta} />
}

export default Page
