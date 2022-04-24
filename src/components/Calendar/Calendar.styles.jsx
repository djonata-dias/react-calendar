import styled from "styled-components";

const Calendar = styled.div`
    width: 80vw;
    display: flex;
    justify-self: center;
    align-self: center;
    flex-direction: column;
    border: thin solid black;
    border-collapse: collapse;
    border-color: #7a7a7a;
    font-size: 10pt;

    @media screen and (max-width:1000px) {
        font-size: 8pt;
    }

    @media screen and (max-width:800px) {
        font-size: 6pt;
    }
`;

const MonthHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    text-align: center;
    height: 2rem;
    border: 0.1px solid black;
    border-collapse: collapse;
    background-color: #269fe0;
    color: white;
    font-size: 12pt;
    border-collapse: collapse;
    border-color: #7a7a7a;

    @media screen and (max-width:800px) {
        font-size: 10pt;
    }
`;

const WeekdaysHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 2rem;
    border: 0.1px solid black;
    border-collapse: collapse;
    background-color: #5bb3e3;
    color: white;
    border-color: #7a7a7a;
`;


const DaysContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-color: #7a7a7a;
`;
const WeekContainer = styled.div`
    width: 100%;
    display: flex;
    border-color: #7a7a7a;

    & .weekendCard{
    color: #269fe0;
    background-color: rgba(0, 0, 0, 0.10);
}

& .otherMonthCard{
    color: rgba(0, 0, 0, 0.4);
}
`;

const DayCard = styled.div`
    border: thin solid black;
    border-collapse: collapse;
    height: 12vh;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    overflow-y: auto;
    text-overflow: ellipsis;
    border-color: #7a7a7a;

`;

const DateButton = styled.button`
    font-size: 1.5rem;
    border: 0;
    background-color: transparent;
    color: white;
    border-color: #7a7a7a;

    :hover {
        background-color: white;
        color: black;
    }
`


export {
    Calendar, MonthHeader, WeekdaysHeader, DaysContainer, WeekContainer, DayCard, DateButton
};
