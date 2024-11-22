import React from 'react'

export default function usePagination({ limit, skip, total }) {

        const page = Math.floor(skip / limit) + 1;
        const totalPages = Math.ceil(total / limit);
    
        return {
            currentPage: page,
            totalPages: totalPages,
            nextPage: page < totalPages ? page + 1 : null,
            prevPage: page > 1 ? page - 1 : null

    }
}
