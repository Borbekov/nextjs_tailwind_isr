import { getCarsDetailData } from '@/api/getCarDetailData';
import { getCarsList } from '@/api/getCarsList';
import React from 'react'

export const dynamicParams = false

// для ISR (Incremental Static Regeneration)
export const revalidate = 3600

export async function generateStaticParams() {
    const { data } = await getCarsList({ _page: "1", _limit: "999999" })

    return data.map((d) => ({
        unique_id: String(d.unique_id),
    })) ?? []
}

const CarDetailPage = async ({ params }: { params: Promise<{ unique_id: string }> }) => {
    const { unique_id } = await params
    const carDetailData = await getCarsDetailData(unique_id)

    const car = carDetailData.data[0]

    return (
        <div>
            <h1>CarDetailPage</h1>
            <p className="text-emerald-900 font-bold text-2xl">{car.mark_id} {car.folder_id}</p>
        </div>
    )
}

export default CarDetailPage