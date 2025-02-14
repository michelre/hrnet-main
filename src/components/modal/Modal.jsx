import './modal.css'
//import CloseBtnImage from '../../assets/cross-btn.png'

const Modal = ({handleCloseClick}) => {
    const onClick = (e) => {
        e.preventDefault()
        handleCloseClick()
    }


    return <div className="modal-container">
        <div className="modal-content">
            Employee Created!
            <a href='#' className='modal-close-btn' onClick={onClick}></a>
        </div>        
    </div>
}

export default Modal;