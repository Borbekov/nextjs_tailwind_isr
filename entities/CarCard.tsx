import { priceFormatter } from "@/helpers/priceFormatter"
import { TCarItem } from "@/types/car"
import { Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type CarCardProps = {
    car: TCarItem
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
    return (
        <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
                <Image
                    src={car.images.image[0]}
                    alt="2024 Tesla Model S"
                    width={400}
                    height={240}
                    className="w-full h-60 object-cover"
                />
                <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {car.engine_type}
                </div>
                <button className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 cursor-pointer">
                    <Heart />
                </button>
            </div>

            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                        {car.mark_id} {car.folder_id}
                    </h3>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>{car.run} км</span>
                    <span className="mx-2">•</span>
                    <span>{car.modification_id}</span>
                    <span className="mx-2">•</span>
                    <span>{car.year}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-bold text-gray-900">{priceFormatter(car.price)}</p>
                    </div>
                    <Link
                        href={`/${car.unique_id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer"
                    >
                        Подробнее
                    </Link>
                </div>
            </div>
        </div>
    )
}
