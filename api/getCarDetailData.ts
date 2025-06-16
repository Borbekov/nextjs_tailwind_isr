export const getCarsDetailData = async (unique_id: string) => {
    const url = `https://testing-api.ru-rating.ru/cars/${unique_id}`

    const res = await fetch(url)

    if (!res.ok) throw new Error("Failed to fetch car detail data")

    const data = await res.json()

    return data
}
