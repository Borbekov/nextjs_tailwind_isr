"use client"
import { CarCard } from '@/entities/CarCard'
import Pagination from '@/entities/Pagination'
import PriceFilter from '@/entities/PriceFilter'
import { TCarItem } from '@/types/car'
import { TMeta } from '@/types/meta'
import React from 'react'

type CarsListPageProps = {
    data: TCarItem[]
    meta: TMeta
}

const CarsListPage: React.FC<CarsListPageProps> = ({ data, meta }) => {
    return (
        <div className="flex flex-col gap-10">
            <PriceFilter />

            <div className="flex flex-wrap gap-y-10">
                {data.map(d => (
                    <CarCard key={d.unique_id} car={d} />
                ))}
            </div>

            <Pagination
                totalPages={meta.last_page}
            />
        </div>
    )
}

export default CarsListPage