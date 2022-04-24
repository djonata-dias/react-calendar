import * as Styled from './Popup.styles'

const Popup = ({ children, props, handleClose }) => {

    return (
        <Styled.PopupContainer>
            <Styled.PopoupBox props={props}>
                <div className='close-icon' onClick={() => handleClose()}>x</div>
                {children}
            </Styled.PopoupBox>
        </Styled.PopupContainer>
    )
}

export default Popup;