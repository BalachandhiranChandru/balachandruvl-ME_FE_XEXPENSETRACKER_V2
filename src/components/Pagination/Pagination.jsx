import styles from './Pagination.module.css'
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const Pagination = ({ updatePage, currentPage, totalPages }) => {

    const handlePrev = () => {
        if (currentPage > 1) {
            updatePage(prev => prev - 1)
        }
    }

    const handleNext = () => {
        if (totalPages !== currentPage) {
            updatePage(prev => prev + 1)
        }
    }

    const isPrevDisabled = currentPage === 1;
    const isNextDisabled = totalPages === currentPage;

    return (
        <div className={styles.paginationWrapper}>
            
            <button 
                onClick={handlePrev} 
                disabled={isPrevDisabled}
            > 
                <IoIosArrowRoundBack />
            </button>

            <p>{currentPage}</p> 

            <button 
                onClick={handleNext} 
                disabled={isNextDisabled}
            > 
                <IoIosArrowRoundForward />
            </button>
            
        </div>
    )
}

export default Pagination;