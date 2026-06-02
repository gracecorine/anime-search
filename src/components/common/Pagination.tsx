export function Pagination({
    currentPage,
    lastPage,
    hasNext,
    onPageChange,
}: {
    currentPage: number
    lastPage: number
    hasNext: boolean
    onPageChange: (page: number) => void
}) {

    const getDesktopPages = (): number[] => {
        if (lastPage <= 5) {
            return Array.from({ length: lastPage }, (_, i) => i + 1)
        }

        let start = currentPage - 2
        let end = currentPage + 2

        if (start < 1) {
            start = 1
            end = 5
        }

        if (end > lastPage) {
            end = lastPage
            start = lastPage - 4
        }

        const pages: number[] = []
        for (let i = start; i <= end; i++) pages.push(i)

        return pages
    }

    const getMobilePages = (): number[] => {
        if (lastPage <= 3) {
            return Array.from({ length: lastPage }, (_, i) => i + 1)
        }

        let start = currentPage - 1
        let end = currentPage + 1

        if (start < 1) {
            start = 1
            end = 3
        }

        if (end > lastPage) {
            end = lastPage
            start = lastPage - 2
        }

        const pages: number[] = []
        for (let i = start; i <= end; i++) pages.push(i)

        return pages
    }

    const desktopPages = getDesktopPages()
    const mobilePages = getMobilePages()

    const btnClass = (isActive: boolean, isDisabled?: boolean) =>
        [
            'w-9 h-9 rounded-full text-sm font-semibold transition-all duration-200 flex items-center justify-center',
            isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
            isActive
                ? 'bg-[#8b5cf6] text-white shadow-md'
                : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-purple-900/20',
        ].join(' ')

    return (
        <div className="flex items-center justify-center gap-2 mt-8">

            {/* prev */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={btnClass(false, currentPage === 1)}
            >
                ←
            </button>

            {/* mobile (3 pages) */}
            <div className="flex sm:hidden items-center gap-2">
                {mobilePages.map(page => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={btnClass(page === currentPage)}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* desktop (5 pages) */}
            <div className="hidden sm:flex items-center gap-2">
                {desktopPages.map(page => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={btnClass(page === currentPage)}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* next */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasNext}
                className={btnClass(false, !hasNext)}
            >
                →
            </button>
        </div>
    )
}