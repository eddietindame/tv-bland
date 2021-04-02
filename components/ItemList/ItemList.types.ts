export interface ItemListProps {
    className?: string
    mobileGrid?: boolean
    fallback?: boolean
    items: Item[]
}

export interface Item {
    key: string
    value: string
    image?: {
        src?: string
        alt?: string
    }
}
