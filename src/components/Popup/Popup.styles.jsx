import styled from "styled-components"

const PopupContainer = styled.div`
    position: fixed;
    background: #00000050;
    width: 100%;
    height: 100vh;
    color: black;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .buttons{
        width: 5rem;
        margin: 1rem;
    }
`

const PopoupBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    max-width: 40rem;
    text-align: center;
    height: auto;
    max-height: 70vh;
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 0.5rem;
    border: 1px solid #999;

    
    .field-container{
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-top: 1rem;
        width: 100%;
    }
    
    .close-icon {
        cursor: pointer;
        position: sticky;
        left: 100%;
        width: 2rem;
        height: 2rem;
        border-radius: 100%;
        font-size: 1.5rem;
        margin: 0;
        padding: 0;

        :active {
            background: #cfcfcf;
        }
    }
`

export { PopupContainer, PopoupBox }